import { HttpResponse } from '@angular/common/http';
import { Directive, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { defaultPaginatorConfig } from '../configs';
import { DataTableRequestModel } from '../models/backend';
import { PageChangeEvent } from '../models/backend/page-change-event.model';
import { DataTable, DataTableColumnDefinition } from '../models/frontend';
import { HelpersBaseClass } from './helpers-base.class';

@Directive()
export abstract class DataTableBaseClass<RowModel> extends HelpersBaseClass {
    @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
    dataTableData: DataTable<RowModel>;
    dataTableColumnsDefinition: DataTableColumnDefinition[];
    rowClickable = true;
    route: ActivatedRoute;
    router: Router;
    paginatorConfig = defaultPaginatorConfig;

    constructor(protected injector: Injector) {
        super();
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
    }

    onPage(pageChangeEvent: PageChangeEvent) { }

    setDataTableData(response: HttpResponse<any>, property?: string) {
        this.dataTableData = this.getDataTablePayloadFromResponse(response, property);
    }


    getDataTablePayloadFromResponse(response: HttpResponse<any>, property?: string): DataTable<any> {
        const dataTablePayload = new DataTable<any>();

        const body = this.getBody(response)?.MRData;

        const rows = this.isNotDefined(property) ? (body || []) : (this.getPropValue(body, property) || []);

        dataTablePayload.currentlyVisibleRows = rows;
        dataTablePayload.totalNumberOfVisibleRows = body.total;

        return this.languageHelper.objectAssign([dataTablePayload]);
    }

    getDataTableDataFromArray(array: any[]) {
        const dataTablePayload = new DataTable<any>();
        if (!this.isDefined(array)) { array = []; }

        dataTablePayload.currentlyVisibleRows = array;
        dataTablePayload.totalNumberOfVisibleRows = this.arrayCount(array);

        return dataTablePayload;
    }

    getPaginationParam(paginationObj?: PageChangeEvent): DataTableRequestModel {
        let pagParam: DataTableRequestModel;
        if (paginationObj && this.isPaginatorEnabled()) {
            pagParam = {
                offset: paginationObj.offset * paginationObj.limit,
                limit: paginationObj.limit

            }
        }
        return pagParam;
    }

    isDataTableComponentDefined() {
        return this.isDefined(this.dataTableComponent);
    }

    onRowDoubleClick(row: any) {
        DataTableBaseClass.openDetailsById(this, row);
    }

    onCustomActionClick(row: any) { }

    onTableCellActionClick(row: any, col?: DataTableColumnDefinition) { }

    static openDetailsById(instance: DataTableBaseClass<any>, row: any) {
        const { id } = row;
        if (instance.isDefined(id)) {
            instance.router.navigate([id], {
                relativeTo: instance.route
            });
        } else {
            console.log('Please define an id column for the data table in order to access the details of the selected row: ', row);
        }
    }

    isDataTableDefined(dataTableComponent: DataTableComponent) {
        return this.isDefined(dataTableComponent);
    }

    clearDataTableData() {
        this.dataTableData = undefined;
    }

    resetDataTable(dataTableComponent?: DataTableComponent) {
        const dataTable = dataTableComponent || this.dataTableComponent;
        if (this.isDataTableDefined(this.dataTableComponent)) {
            this.clearDataTableData();
            dataTable.resetDataTable();
        }
    }

    isPaginatorEnabled() { return this.paginatorConfig.enabled; }

    resetPaginatorPageIndex(dataTableComponent?: DataTableComponent) {
        const dataTable = dataTableComponent || this.dataTableComponent;
        if (
            this.isDataTableDefined(this.dataTableComponent) &&
            this.isPaginatorEnabled()
        ) {
            dataTable.matPaginatorPageIndex = this.paginatorConfig.offset;
        }
    }
}
