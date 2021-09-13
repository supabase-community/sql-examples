<template>
  <div
    class="border border-2 border-warm-gray-200 p-4 rounded-lg flex flex-col"
  >
    <h2 class="font-semibold text-xl">
      {{ item.title }}
    </h2>
    <p class="py-3 text-warm-gray-700">{{ item.description }}</p>
    <a :href="item.github" target="_blank">
      <Badge>{{ item.author }}</Badge>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useAsync, useContext } from "@nuxtjs/composition-api";

const p = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
