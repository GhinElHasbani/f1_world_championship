import { MenuItem } from "../shared/components/sidenav-menu/menu-items.model";

export const homeMenuItems: MenuItem[] = [
    {
        label: "Seasons",
        link: "landing/:series"
    },
    {
        label: "Races",
        link: "/home/:series/:season/races"
    },
    {
        label: "Drivers",
        link: "/home/:series/:season/drivers"
    },
    {
        label: "Constructors",
        link: "/home/:series/:season/constructors"
    },
    {
        label: "Circiuts",
        link: "/home/:series/:season/circuits"
    }
];
