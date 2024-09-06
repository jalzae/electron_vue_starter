type MenuItem = {
  nameMenu: string;
  icon: string;
  selected: boolean;
  value?: string;
  sub_menu?: MenuItem[]
  isOpen?: boolean
  component?: any
}

export type { MenuItem };