export interface DropdownMenu {
    id: string,
    name: string,
    path?: string,
    children?: DropdownMenu[];
}