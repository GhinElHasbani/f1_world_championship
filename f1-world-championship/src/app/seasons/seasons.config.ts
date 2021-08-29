import { DataTableColumnFormat } from "../shared/enums";
import { DataTableColumnDefinition } from "../shared/models/frontend";

export const seasonsListingDatatableColumnDefinition: DataTableColumnDefinition[] = [
    new DataTableColumnDefinition('season', 'Season'),
    new DataTableColumnDefinition('url', 'Information', DataTableColumnFormat.Link, true, undefined, undefined, 'assets/images/link-icons.jpg'),
];
