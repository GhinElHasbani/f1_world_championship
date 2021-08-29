import { Race } from "../shared/models/backend/be-data.model";
import { LookupOptionModel } from "../shared/models/frontend";

export class SeasonModel {
    constructor(
        public Season?: number,
        public Url?: number,
        public Races?: Race[]
    ) {
    }
}
