import { DataTableColumnDefinition, LookupOptionModel } from "../../shared/models/frontend";

export interface ModuleConfig {
    name: string,
    columnDef: DataTableColumnDefinition[],
    propNameInApi: string
}

export class RaceModel {
    constructor(
        public season?: number,
        public round?: number,
        public raceName?: string,
        public date?: Date,
        public Circuit?: LookupOptionModel,
        public top1?: any,
        public Locality?: LookupOptionModel,
        public Country?: LookupOptionModel,
        public Information?: LookupOptionModel,
    ) {
    }
}
