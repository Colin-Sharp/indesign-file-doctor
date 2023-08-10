<template>
  <div class="item py-6">
    <h2 class="text-4xl">Logic ({{ data.length }})</h2>
    <div v-if="data.length">
      <div class="p-6 my-3" v-for="item in data" :key="item.id">
        <p class="text-3xl">Name: {{ item.name }}</p>
        <p>Description: {{ item.description }}</p>
        <p>Id: {{ item.id }}</p>
        <p>Invalid: {{ item.invalid }}</p>
        <h3 class="text-2xl">Rule Items</h3>
        <div v-for="rule in item.ruleItems" :key="rule.id">
          <h3 class="text-2xl">Actions</h3>
          <div v-for="action in rule.actions" :key="action.id">
            <p>Action: {{ action.action }}</p>
            <p>Id: {{ action.id }}</p>
            <p>Value: {{ action.value }}</p>
            <h3 class="text-2xl">Target</h3>
            <p>Id: {{ action.target.id }}</p>
            <p>Type: {{ action.target.type }}</p>
          </div>
          <h3 class="text-2xl">Conditions</h3>
          <p>Id: {{ rule.id }}</p>
          <p>Condition Mode: {{ rule.conditionMode }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "Logic",
  props: {
    type: String,
    data: Array | null,
  },
  setup(props) {
    onMounted(() => {
      console.log(props.data);
    });
  },
};
</script>

<style scoped>
.item {
  background: #4a4e69;
  color: #f87575;
}
</style>
