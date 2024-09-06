import { defineStore } from "pinia";
import { type Auth } from "@/model/auth";
const env = process.env.NODE_ENV;
export const useUsers = defineStore("Users", {
  state: () => ({
    baseurl: "",
    data: {} as Auth,
  }),
  getters: {},
  actions: {
    set(val: Auth) {
      localStorage.setItem("token", val.token);
      localStorage.setItem("role", val.role.toString());
      this.data = val;
    },
    setUrl(url: string) {
      this.baseurl = url
    }
  },

});