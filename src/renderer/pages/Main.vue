<template>
  <div class="bg-gray-100 font-family-karla flex">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <DashboardSidebar
      :menu="menu"
      :selected="menus.selected"
      @falseAll="falseAll"
      @selecMenu="selecMenu"
      @changeMenu="changeMenu"
    />
    <DashboardContent @falseAll="falseAll" />
    <Loading />
    <Modal />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Component from "jalz-vue";
import { type MenuItem } from "@/model/menu";
//store
import * as store from "@/store/";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import DashboardSidebar from '@/components/Dashboard/Sidebar.vue'
import DashboardContent from '@/components/Dashboard/Content.vue'
export default defineComponent({
  name: "",
  setup() {
    const loading = store.useLoading();
    const users = store.useUsers();
    const menus = store.useMenu();
    const router = useRouter();
    return { users, loading, menus, router };
  },
  mixins: [],
  components: {
    Loading: Component.Loading,
    DashboardSidebar,
    DashboardContent
  },
  props: {},
  data() {
    return { isOpen: false };
  },
  methods: {
    changeMenu(menu: string) {
      this.menuSelected = menu;
      //clear when exist sub
      const filtered = this.menu.find(
        (e: MenuItem) => e.sub_menu && e.value == menu
      );
      if (!filtered) {
      }
    },
    selecMenu(menu: MenuItem) {
      this.menus.setMenu(menu);
    },
    falseAll(value: string) {
      for (let i of this.menu) {
        i.selected = false;
        if (i.sub_menu) {
          i.isOpen = false;
        }
      }
      const index = this.menu.findIndex((e: MenuItem) => e.value == value);

      if (this.menu[index].sub_menu) {
        if (this.menu[index].isOpen == true) {
          this.menu[index].isOpen = false;
          this.menu[index].selected = false;
        } else {
          this.menu[index].isOpen = !this.menu[index].isOpen;
        }
      } else {
        this.menu[index].selected = !this.menu[index].selected;
        this.selecMenu(this.menu[index]);
      }
    },
    searchMenu(searchValue: string) {
      for (const item of this.menu) {
        if (item.value === searchValue) {
          return item;
        } else if (Array.isArray(item.sub_menu)) {
          const subItem = item.sub_menu.find(
            (subItem: MenuItem) => subItem.value === searchValue
          );
          if (subItem) {
            return subItem;
          }
        }
      }
      return null;
    },
  },
  mounted() {},
  computed: {
    menu() {
      return this.menus.menu;
    },
  },
  watch: {},
  async created() {
    //cek login
  },
});
</script>
