import { DataTableColumnFormat } from '../../enums/data-table-column-format.enum';
import { ColumnActionMethod } from '../../interfaces/column-action-method.interface';

export class DataTableColumnDefinition {
    constructor(
        public property: string,
        public label: string,
        public format?: DataTableColumnFormat,
        public visible = true,
        public customClasses?: string[],
        public action? : ColumnActionMethod,
        public icon?: string,
        public iconTooltip?: string
    ) { }
}
