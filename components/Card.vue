<template>
  <div
    class="
      bg-white
      shadow-none
      transition
      hover:shadow-warm-gray-600 hover:shadow-md
      p-4
      h-full
      rounded-md
      flex flex-col
      justify-between
    "
  >
    <div class="flex flex-col">
      <h2 class="font-semibold text-xl">
        {{ item.title }}
      </h2>
      <p class="py-3 text-warm-gray-700">{{ item.description }}</p>
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
