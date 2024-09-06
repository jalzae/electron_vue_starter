<template>
  <!-- Breadcrumb -->
  <nav class="text-sm p-4 bg-white" aria-label="Breadcrumb">
    <ol class="list-none p-0 inline-flex">
      <li class="flex items-center">
        <a href="#" class="text-blue-500">Home</a>
        <svg class="h-4 w-4 mx-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M8.293 14.95a1 1 0 01-1.414-1.414L9.586 10 6.879 7.293a1 1 0 111.414-1.414l3.536 3.536a1 1 0 010 1.414l-3.536 3.536a1 1 0 01-1.414 0z" />
        </svg>
      </li>
      <li v-for="item, index in list" class="flex items-center">
        <a href="#" class="text-gray-500">{{ item }}</a>
        <svg v-if="index !== list.length - 1" class="h-4 w-4 mx-1 text-gray-500" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M8.293 14.95a1 1 0 01-1.414-1.414L9.586 10 6.879 7.293a1 1 0 111.414-1.414l3.536 3.536a1 1 0 010 1.414l-3.536 3.536a1 1 0 01-1.414 0z" />
        </svg>
      </li>
    </ol>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
 
  props: {
    selected: {
      type: String,
      default: ['Dashboard']
    }
  },
  methods: {
    separateUppercase(inputString: string): string[] {
      const resultArray: string[] = [];
      let currentWord: string = '';

      for (const char of inputString) {
        if (char === char.toUpperCase() && currentWord.length > 0) {
          resultArray.push(currentWord);
          currentWord = char;
        } else {
          currentWord += char;
        }
      }

      if (currentWord.length > 0) {
        resultArray.push(currentWord);
      }

      return resultArray;
    }
  },
  data() {
    return {};
  },
  mounted() { },
  computed: {
    list() {
      return this.separateUppercase(this.selected) ?? ''
    }
  },
  watch: {},
  created() { },
});
</script>