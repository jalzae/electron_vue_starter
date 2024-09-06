import { defineStore } from "pinia";
export const useStatus = defineStore("status", {
  state: () => ({
    open: false,
    name: '',
    src: ''
  }),
  getters: {
  },
  actions: {
    assign(val: boolean) {
      this.open = val
    },
  },
});
