import { defineStore } from 'pinia';
import type { MenuItem } from '../model/menu';
//import Components 
import DashboardDashboard from '@/components/Dashboard/Index.vue';
export const useMenu = defineStore('Menu', {
  state: () => ({
    menu: [

      {
        icon: "fas fa-users",
        nameMenu: "Peserta",
        selected: false,
        value: "Peserta",
        component: DashboardDashboard,
      },
    
    ] as MenuItem[],
    routes: [] as MenuItem[],
    selected: {
      icon: "fas fa-users",
      nameMenu: "Peserta",
      selected: false,
      value: "Peserta",
      component: DashboardDashboard,
    } as MenuItem,

  }),
  getters: {
  },
  actions: {
    async setMenu(val: MenuItem) {
      if (val.component == null || !val.component) {
        const { NotFound } = await import('jalz-vue');
        val.component = NotFound
      }
      this.selected = val

    }
  }
})