<template>
  <aside class="relative h-screen w-64 sm:block shadow-xl p-4">
    <div
      class="flex items-center w-full justify-center mx-2 p-2 bg-white rounded-lg shadow-md"
    >
      <img src="/vue.svg" style="max-height: 50px" alt="Logo Throphy" />
      <b class="ml-2 text-xl text-blue-400">League</b>
    </div>
    <nav class="pointer pt-3">
      <ul>
        <li
          v-for="item in menu"
          :key="item.nameMenu"
          href="#"
          class="pointer nav-item w-full mt-2"
        >
          <div
            @click="
              selectMenu(item.value),
                !item.sub_menu ? $emit('changeMenu', item.value) : ''
            "
            class="flex items-center justify-between py-3 px-4"
            :class="
              item.value == selected.value
                ? 'font-bold bg-white rounded-lg shadow-sm gradient-border text-blue-500 active-nav'
                : 'text-gray-600'
            "
          >
            <div>
              <div class="icon-container">
                <i
                  class="mr-2"
                  :class="[
                    item.icon,
                    'mr-2',
                    item.selected ? 'gradient-icon' : '',
                  ]"
                ></i>
              </div>
              <span>{{ item.nameMenu }}</span>
            </div>

            <div v-if="item.sub_menu" class="icon-container">
              <i
                :class="
                  item.sub_menu && item.selected
                    ? 'fas fa-chevron-up'
                    : 'fas fa-chevron-down'
                "
              ></i>
            </div>
          </div>

          <ul v-if="item.sub_menu && item.isOpen" class="ml-2">
            <li v-for="items in item.sub_menu">
              <a
                href="#"
                @click="
                  selectMenu(item.value),
                    $emit('selecMenu', item.value),
                    $emit('changeMenu', items.value)
                "
                class="py-2 px-4 block hover:bg-gray-200"
                ><i :class="items.icon" class="mr-2"></i>
                {{ items.nameMenu }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { type MenuItem } from "../model/menu";
export default defineComponent({
  mixins: [],
  components: {},
  props: {
    menu: {
      type: Array as () => MenuItem[],
      required: true,
    },
    selected: {
      type: Object as () => MenuItem,
      required: true,
    },
  },
  methods: {
    selectMenu(value: string) {
      this.$emit("falseAll", value);
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

@media (max-width: 600px) {
  aside {
    display: none !important;
    /* Remove the background image */
  }
}

.gradient-border {
  border-width: 0 5px 0 0px;
  border-style: solid;
  border-image: linear-gradient(to bottom, cyan, blue) 1;
}

.icon-container {
  display: inline-block;
  background-image: linear-gradient(to right, blue, cyan);
  -webkit-background-clip: text;
  background-clip: text;
}

.gradient-icon {
  color: transparent;
}
</style>
