<script lang="ts">
import { defineComponent } from 'vue'
import * as store from '../store'
export default defineComponent({
  setup() {
    const counter = store.useCounter()
    return {
      counter
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() { },
  computed: {
    count() {
      return this.counter.count
    }
  },
  watch: {},
  created() { },
})
</script>

<template>
  <div class="card">
    <h1>Counter App</h1>
    <button type="button" @click="counter.count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
