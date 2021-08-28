import { PropVal } from './prop-val.model';

export class FilterConfig {
    constructor(
        public enabled = false,
        public filterableProps?: PropVal
    ) {
    }
}
