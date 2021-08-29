import { LookupOptionModel } from "../shared/models/frontend";

export class SeasonModel {
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
