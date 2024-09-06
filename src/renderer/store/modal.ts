interface modalComponents {
  title: string
  value: string
  component: any
  footer: any
}
import { defineStore } from "pinia";
//components 
export const useModal = defineStore("Modal", {
  state: () => ({
    show: false as boolean,
    title: "" as string,
    selected: {} as modalComponents,
    component: [
      {
        title: "contoh",
        value: "contoh",
        component: null,
        footer: null,
      },
    ] as modalComponents[],
    data: [] as any,
  }),
  getters: {},
  actions: {
    async set(val: string) {
      this.show = true;
      const selected = this.component.find((e: modalComponents) => e.value == val)

      this.selected = selected;
    },
    setTitle(val: string) {
      this.title = val;
    },
    hide() {
      this.show = false;
    },
    setData(val: any) {
      this.data = val;
    },
  },
});
