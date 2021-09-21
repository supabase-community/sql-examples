<template>
  <div
    class="
      relative
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
    <!-- <div
      class="bottom-0 right-0 absolute"
      v-if="checkNew(item.createdAt, item.updatedAt)"
    >
      new
    </div> -->
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
  setup() {
    const checkNew = (createdAt: string, updatedAt: string) => {
      const localeCreatedAt = new Date(createdAt).toLocaleDateString();
      const localeUpdatedAt = new Date(updatedAt).toLocaleDateString();

      if (localeCreatedAt == localeUpdatedAt) {
        return true;
      } else {
        false;
      }
    };

    return {
      checkNew,
    };
  },
});
</script>
