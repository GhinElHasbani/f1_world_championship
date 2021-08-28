import { DataTableBaseClass } from "../bases/data-table-base.class";
import { DataTableColumnDefinition } from "../models/frontend";

export interface ColumnActionMethod
{
    (instance: DataTableBaseClass<any>, row?: any, col?: DataTableColumnDefinition)
}