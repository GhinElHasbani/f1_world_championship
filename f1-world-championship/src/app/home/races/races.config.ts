import { DataTableColumnFormat } from "../../shared/enums";
import { DataTableColumnDefinition } from "../../shared/models/frontend";

export const racesListingDatatableColumnDefinition: DataTableColumnDefinition[] = [
    new DataTableColumnDefinition('season', 'Season'),
    new DataTableColumnDefinition('round', 'Round'),
    new DataTableColumnDefinition('raceName', 'Races Name'),
    new DataTableColumnDefinition('date', 'Date', DataTableColumnFormat.Date),
    new DataTableColumnDefinition('Circuit.circuitName', 'Circuit'),
    new DataTableColumnDefinition('Circuit.Location.locality', 'Locality'),
    new DataTableColumnDefinition('Circuit.Location.country', 'Country'),
    new DataTableColumnDefinition('url', '', DataTableColumnFormat.Link, true, undefined, undefined, 'link'),
];
