export class PaginatorConfig {
    constructor(
        public enabled = false,
        public offset = 0,
        public limit = 20,
        public limitOptions = [10, 20, 50],
        public length = 0,
        public showFirstLastButtons = true,
    ) { }
}
