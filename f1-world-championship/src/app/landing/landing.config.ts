import { DataTableColumnFormat } from "../shared/enums";
import { DataTableColumnDefinition } from "../shared/models/frontend";
import { MenuItem } from "./sidenav-menu/menu-items.model";

export const seriesListingDatatableColumnDefinition: DataTableColumnDefinition[] = [
    new DataTableColumnDefinition('season', 'Season'),
    new DataTableColumnDefinition('round', 'Round'),
    new DataTableColumnDefinition('raceName', 'Race Name'),
    new DataTableColumnDefinition('date', 'Date', DataTableColumnFormat.Date),
    new DataTableColumnDefinition('Circuit.circuitName', 'Circuit'),
    new DataTableColumnDefinition('Circuit.Location.locality', 'Locality'),
    new DataTableColumnDefinition('Circuit.Location.country', 'Country'),
    new DataTableColumnDefinition('url', 'Information'),
];

export const landingMenuItems: MenuItem[] = [
    {
        label: "Races",
        link: "'/races'"
    },
    {
        label: "Constructors",
        link: "'/constructors'"
    },
    {
        label: "Circiuts",
        link: "'/circuits'"
    },
    {
        label: "Drivers",
        link: "'/divers'"
    }
];
