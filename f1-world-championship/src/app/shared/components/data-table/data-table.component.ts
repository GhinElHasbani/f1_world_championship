import { AfterViewInit, Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { defaultPaginatorConfig } from '../../configs';
import { DataTableColumnFormat } from '../../enums/data-table-column-format.enum';
import { DataTable, DataTableColumnDefinition, PaginatorConfig } from '../../models/frontend';
import { SelectionModel } from '@angular/cdk/collections';
import { PageChangeEvent } from '../../models/backend';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HelpersBaseClass } from '../../bases/helpers-base.class';

@Component({
  selector: 'f1app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent extends HelpersBaseClass implements OnInit, AfterViewInit, OnDestroy {
  @Input('columnsDefinition') columnsDefinition: DataTableColumnDefinition[];
  @Input('paginatorConfig') paginatorConfig: PaginatorConfig = defaultPaginatorConfig;
  @Input('rowClickable') rowClickable = false;
  @Input('data') data: DataTable<any>;
  @Input('noResultMessage') noResultMessage = 'No Results Found.';

  @Output('page') page = new EventEmitter<PageChangeEvent>();
  @Output('rowClick') rowClick = new EventEmitter<any>();
  @Output('rowColCustomActionClick') rowColCustomActionClick = new EventEmitter<any>();
  @Output('cellActionClick') cellActionClick = new EventEmitter<{ row: any, col: any }>();
  @Output('selectionChange') selectionChange = new EventEmitter<any>();

  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  columnFormat = DataTableColumnFormat;
  columnsProperty: string[];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Element>(true, []);
  private pageChangeEvent: PageChangeEvent;
  private pageEventSubscription: Subscription;
  private resultsNotFound: boolean;
  selectedRow: any;

  constructor(
  ) {
    super();
    this.selection.changed.subscribe(selections => this.selectionChange.emit(selections));
  }

  /** Table Related */

  ngOnChanges(changes: SimpleChanges) {
    const dataChange = changes['data'];
    const columnsChange = changes['columnsDefinition'];

    if (this.isDefined(dataChange)) {
      const dataDidChange = dataChange.previousValue !== dataChange.currentValue;
      if (dataDidChange) {
        this.onDataChange();
      }
    }
    if (this.isDefined(columnsChange)) {
      const columnsDidChange = columnsChange.previousValue !== columnsChange.currentValue;
      if (columnsDidChange) {
        this.extractValuableInfoFromColumns(this.columnsDefinition);
      }
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.hookPaginationAndSortingToDataTable();
    this.setPageChangeEvent(this.matPaginatorEvent);
  }

  clearDataTable() {
    this.setDataTableData({
      currentlyVisibleRows: [],
      totalNumberOfVisibleRows: this.paginatorConfig.length
    });
  }

  resetDataTable() {
    this.clearDataTable();
    this.resetPaginator();
  }

  setDataTableData(data: DataTable<any>) {
    this.data = data;
    this.dataSource.data = this.getPropValue(data, 'currentlyVisibleRows');
    if (this.isPaginatorEnabled()) {
      this.matPaginatorLength = this.getPropValue(data, 'totalNumberOfVisibleRows');

    }
  }

  isColumnDefined(column: DataTableColumnDefinition) {
    return this.isDefined(column);
  }

  isColumnsDefined(columns: DataTableColumnDefinition[]) {
    return this.isDefined(columns);
  }

  extractValuableInfoFromColumns(columns: DataTableColumnDefinition[]) {
    if (this.isColumnsDefined(columns)) {
      this.columnsProperty = columns.filter(col => col.visible).map(col => col.property);
    }
  }

  getSelectableCellClass(column: DataTableColumnDefinition) {
    return this.frameworkHelper.objectAssign([{ 'hover': true }], this.getCellClass(column))
  }

  getCellClass(column: DataTableColumnDefinition) {
    if (this.isColumnDefined(column)) {
      var result = {};
      switch (column.format) {
        case this.columnFormat.Date:
          result = { 'date-cell': true };
          break;
        case this.columnFormat.Link:
          result = { 'link-cell': true };
          break;
        default:
          break;
      }
      if (column.customClasses) {
        column.customClasses.forEach(className => result[className] = true)
      }
    }
    return result;
  }

  formatCellValue(column: DataTableColumnDefinition, row: any): string {
    let columnValue = '';
    if (this.isColumnDefined(column)) {
      columnValue = this.frameworkHelper.getValuePromNestedObj(row, column.property);
    }
    return columnValue;
  }

  onTableCellActionClick(row: any, col: any) {
    this.cellActionClick.emit({ row: row, col: col });
  }

  onCustomActionClick(row: any) {
    this.rowColCustomActionClick.emit(row);
  }

  onRowClick(row: any) {
    this.selectedRow = row;
    this.rowClick.emit(row);
  }

  openWindow(link) {
    window.open(link, "_blank");
  }

  hookPaginationAndSortingToDataTable() {
    if (this.isPaginatorEnabled()) {
      this.pageEventSubscription = this.matPaginatorPage.subscribe((event: any) => this.onPage(event));
    }
  }

  isResultsNotFound() {
    return this.resultsNotFound;
  }

  showResultsNotFound() {
    this.resultsNotFound = true;
  }

  hideResultsNotFound() {
    this.resultsNotFound = false;
  }

  onDataChange() {
    this.setDataTableData(this.data);
    this.toggleWarningDependingOnResults();
    //this.scrollTop();
    this.selection.clear();
  }

  private toggleWarningDependingOnResults() {
    if (
      !this.isDefined(this.data) ||
      !this.isDefined(this.data.currentlyVisibleRows) ||
      this.data.totalNumberOfVisibleRows <= 0
    ) {
      this.showResultsNotFound();
    } else {
      this.hideResultsNotFound();
    }
  }

  /** Paginator Related */

  get matPaginatorPageIndex() { return this.getPropValue(this.matPaginator, 'pageIndex'); }
  set matPaginatorPageIndex(offset: number) {
    this.frameworkHelper.setPropValueIfObjIsDefined(this.matPaginator, 'pageIndex', offset);
    this.setPageChangeEvent(this.matPaginatorEvent);
  }

  get matPaginatorPageSize() { return this.getPropValue(this.matPaginator, 'pageSize'); }
  set matPaginatorPageSize(limit: number) {
    this.frameworkHelper.setPropValueIfObjIsDefined(this.matPaginator, 'pageSize', limit);
    this.setPageChangeEvent(this.matPaginatorEvent);
  }

  get matPaginatorLength() { return this.getPropValue(this.matPaginator, 'length'); }
  set matPaginatorLength(length: number) { this.frameworkHelper.setPropValueIfObjIsDefined(this.matPaginator, 'length', length); }

  get matPaginatorPage() { return this.getPropValue<EventEmitter<PageEvent>>(this.matPaginator, 'page'); }

  get matPaginatorEvent(): PageEvent {
    return {
      pageIndex: this.matPaginatorPageIndex,
      pageSize: this.matPaginatorPageSize,
      length: this.matPaginatorLength
    };
  }

  resetPaginator() {
    this.matPaginatorPageIndex = this.paginatorConfig.offset;
    this.matPaginatorPageSize = this.paginatorConfig.limit;
    this.matPaginatorLength = this.paginatorConfig.length;
  }

  onPage(pageEvent: PageEvent) {
    this.setPageChangeEvent(pageEvent);
    this.page.emit(this.pageChangeEvent);
  }

  setPageChangeEvent(pageEvent: PageEvent) {
    if (this.isPaginatorEnabled()) {
      this.pageChangeEvent = {
        offset: pageEvent.pageIndex + 1,
        limit: pageEvent.pageSize,
      };
    }
  }

  isPaginatorEnabled() {
    return this.paginatorConfig.enabled;
  }

  getPageChangeEvent() {
    return this.pageChangeEvent;
  }


  ngOnDestroy() {
    this.frameworkHelper.unsubscribeAll(
      [
        this.pageEventSubscription
      ]
    );
  }
}
