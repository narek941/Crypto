export interface IMenu {
  options: MenuOption[];
  callback: any;
}
export type MenuOption = { id: number; label: string };
