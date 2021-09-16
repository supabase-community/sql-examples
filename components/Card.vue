<template>
  <div
    class="
      bg-white
      dark:bg-dark-400
      shadow-md shadow-warm-gray-600
      transition
      p-4
      h-full
      rounded-md
      flex flex-col
      justify-between
      hover:shadow-lg
    "
  >
    <div class="flex flex-col">
      <h2 class="font-semibold text-xl text-dark-900 dark:text-white">
        {{ item.title }}
      </h2>
      <p class="py-3 text-warm-gray-700 dark:text-light-900">
        {{ item.description }}
      </p>
    </div>
    <!-- <Badge>{{ item.author }}</Badge> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(p) {
    return {
      p,
    };
  },
});
</script>
