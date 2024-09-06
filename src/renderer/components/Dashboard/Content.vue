<template>
  <div class="w-full flex flex-col h-screen overflow-y-hidden">
    <!-- Desktop Header -->
    <header class="w-full justify-between items-center bg-white py-4 px-6 flex flex-row">
      <div class="w-1/2">
        <div class="flex hidden">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-300"></i>
            </div>
            <input
              class="rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 border border-gray-300"
              type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <div class="w-1/2 justify-end flex">
        <button @click="selectMenu('Request'), changeMenu('Request')"
          class="mr-4 py-2 px-4 rounded-lg bg-blue-400 relative">
          <i class="fas fa-bell text-white"></i>
          <span v-if="count != 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-1 -mr-1">{{
            count
            }}</span>
        </button>

        <button @click="isOpenMenu = !isOpenMenu"
          class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
          <i class="fas fa-user"></i>
        </button>

        <div x-show="isOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16"
          :class="isOpenMenu ? '' : 'hidden'">
          <button @click="logout" class="block px-4 py-2 account-link hover:text-white">
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Header & Nav -->
    <header class="w-full py-5 px-6 md:hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="/vue.svg" style="max-height: 50px" alt="Logo Throphy" />
          <b class="ml-2 text-xl text-orange-400">League</b>
        </div>
        <button @click="isOpen = !isOpen" class="text-gray-800 text-3xl focus:outline-none">
          <i v-if="!isOpen" class="fas fa-bars"></i>
          <i v-if="isOpen" class="fas fa-times"></i>
        </button>
      </div>

      <NavMobile :isOpen="isOpen" :selected="selected" :menu="menu" @selectMenu="selectMenu" @changeMenu="changeMenu"
        @falseAll="falseAll" />
    </header>

    <div class="w-full overflow-x-hidden border-t flex flex-col">
      <!-- <Breadcrumb :selected="selected" /> -->

      <component :is="selected.component" />
    </div>
  </div>
</template>
<script lang="ts">
import NavMobile from "./NavMobile.vue";
import Breadcrumb from "./Breadcrumb.vue";
import { type MenuItem } from "@/model/menu";
import { defineComponent } from "vue";
//store
import * as store from '@/store/'
import Component from 'jalz-vue'
export default defineComponent({
  setup() {
    const menus = store.useMenu()
    return { menus }
  },
  mixins: [],
  components: {
    NavMobile,
    Breadcrumb,
    NotFound: Component.NotFound
  },
  methods: {
    changeMenu(val: string) {
      this.$emit('changeMenu', val)
    },
    selectMenu(val: string) {
      this.$emit('selectMenu', val)
    },
    falseAll(val: string) {
      this.$emit('falseAll', val)
    },
    logout() {
      localStorage.removeItem("token");
      return navigateTo('/')
    }
  },
  data() {
    return {
      isOpen: false,
      isOpenMenu: false,
      count: 0
    };
  },
  mounted() { },
  computed: {
    menu() {
      return this.menus.menu
    },
    selected() {
      return this.menus.selected
    }
  },
  watch: {},
  created() { },
});
</script>