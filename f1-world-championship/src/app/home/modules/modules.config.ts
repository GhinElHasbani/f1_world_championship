import { DataTableColumnFormat } from "../../shared/enums";
import { DataTableColumnDefinition } from "../../shared/models/frontend";
import { ModuleConfig } from "./modules.model";

export const MODULES_CONFIG: ModuleConfig[] = [
    {
        name: 'races',
        columnDef: [
            new DataTableColumnDefinition('round', 'Round'),
            new DataTableColumnDefinition('raceName', 'Races Name'),
            new DataTableColumnDefinition('date', 'Date', DataTableColumnFormat.Date),
            new DataTableColumnDefinition('Circuit.circuitName', 'Circuit'),
            new DataTableColumnDefinition('Circuit.Location.locality', 'Locality'),
            new DataTableColumnDefinition('Circuit.Location.country', 'Country'),
            new DataTableColumnDefinition('url', '', DataTableColumnFormat.Link, true, undefined, undefined, 'link'),
        ],
        propNameInApi: 'RaceTable.Races'
    },
    {
        name: 'drivers',
        columnDef: [
            new DataTableColumnDefinition('permanentNumber', 'Number'),
            new DataTableColumnDefinition('givenName', 'First Name'),
            new DataTableColumnDefinition('nationality', 'Nationality'),
            new DataTableColumnDefinition('dateOfBirth', 'DateOfBirth', DataTableColumnFormat.Date),
            new DataTableColumnDefinition('code', 'Code'),
            new DataTableColumnDefinition('url', '', DataTableColumnFormat.Link, true, undefined, undefined, 'link'),
        ],
        propNameInApi: 'DriverTable.Drivers'
    },
    {
        name: 'constructors',
        columnDef: [
            new DataTableColumnDefinition('name', 'Name'),
            new DataTableColumnDefinition('nationality', 'Nationality'),
            new DataTableColumnDefinition('url', '', DataTableColumnFormat.Link, true, undefined, undefined, 'link'),
        ],
        propNameInApi: 'ConstructorTable.Constructors'
    },
    {
        name: 'circuits',
        columnDef: [
            new DataTableColumnDefinition('circuitName', 'Name'),
            new DataTableColumnDefinition('url', '', DataTableColumnFormat.Link, true, undefined, undefined, 'link'),
        ],
        propNameInApi: 'CircuitTable.Circuits'
    }]