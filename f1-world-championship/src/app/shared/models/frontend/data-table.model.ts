export class DataTable<RowModel> {
    constructor(
        public currentlyVisibleRows?: RowModel[],
        public totalNumberOfVisibleRows?: number,
    ) { }
}
