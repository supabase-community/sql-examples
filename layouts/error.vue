<template>
  <div class="flex flex-col items-center pt-20 pb-8">
    <NotFound class="text-light-900 dark:text-dark-100"></NotFound>
    <NuxtLink class="text-2xl font-semibold" to="/">Home page</NuxtLink>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  layout: "error",
  props: ["error"],
  setup() {
    return {};
  },
});
</script>
