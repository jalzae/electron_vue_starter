<template>
  <nav :class="isOpen ? 'flex' : 'hidden'" class="flex flex-col pt-4">
    <ul>
      <li v-for="item in menu" :key="item.nameMenu">
        <div @click="selectMenu(item.value), !item.sub_menu ? $emit('changeMenu', item.value) : ''"
          class="flex flex-row justify-between items-center py-2 pl-4 nav-item cursor-pointer" :class="item.value == selected.value
            ? 'font-bold bg-white rounded-lg shadow-sm gradient-border text-orange-500 active-nav'
            : 'text-gray-600'
            ">

          <div>
            <div class="icon-container">
              <i class="mr-2" :class="[item.icon, 'mr-2', item.selected ? 'gradient-icon' : '']"></i>
            </div>
            {{ item.nameMenu }}
          </div>

          <div v-if="item.sub_menu" class="icon-container">
            <i :class="item.sub_menu && item.selected ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
          </div>
        </div>


        <ul v-if="item.sub_menu && item.isOpen" class="ml-2">
          <li v-for="items in item.sub_menu">
            <a href="#"
              @click="selectMenu(item.value), $emit('selecMenu', item.value), $emit('changeMenu', items.value)"
              class="py-2 px-4 block hover:bg-gray-200"><i :class="items.icon" class="mr-2"></i> {{ items.nameMenu
              }}</a>
          </li>
        </ul>

      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { type MenuItem } from '@/model/menu'
export default defineComponent({
  name: "",
  mixins: [],
  components: {},
  props: {
    isOpen: Boolean,
    menu: {
      type: Array as () => MenuItem[],
      default: []
    },
    selected: {
      type: Object as () => MenuItem,
      default: {}
    }
  },
  methods: {
    selectMenu(value: string) {
      this.$emit('falseAll', value)
    },
  },
  data() {
    return {};
  },
  mounted() { },
  computed: {

  },
  watch: {},
  created() { },
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.icon-container {
  display: inline-block;
  background-image: linear-gradient(to right, orange, gold);
  -webkit-background-clip: text;
  background-clip: text;
}

.gradient-icon {
  color: transparent;
}

.gradient-border {
  border-width: 0 5px 0 0px;
  border-style: solid;
  border-image: linear-gradient(to bottom, gold, orange) 1;
}
</style>