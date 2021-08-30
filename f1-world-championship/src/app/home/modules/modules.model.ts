import { DataTableColumnDefinition, LookupOptionModel } from "../../shared/models/frontend";

export interface ModuleConfig {
    name: string,
    columnDef: DataTableColumnDefinition[],
    propNameInApi: string
}

export class RaceModel {
    constructor(
        public Season?: number,
        public Round?: number,
        public RaceName?: string,
        public Date?: Date,
        public Circuit?: LookupOptionModel,
        public Locality?: LookupOptionModel,
        public Country?: LookupOptionModel,
        public Information?: LookupOptionModel,
    ) {
    }
}
