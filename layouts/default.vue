<template>
  <div
    class="
      w-full
      min-h-screen
      bg-warm-gray-100
      dark:bg-dark-800 dark:text-white
      flex flex-col
      items-center
      transition
    "
  >
    <Header></Header>
    <Nuxt></Nuxt>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@nuxtjs/composition-api";
import { useWindowSize, useResizeObserver } from "@vueuse/core";

export default defineComponent({
  setup() {
    const { width } = useWindowSize();

    onMounted(() => {
      useResizeObserver(document.documentElement, (entries) => {
        const entry = entries[0];
        const box = entry.contentRect;
        document.documentElement.style.setProperty(
          "--scrollbarWidth",
          width.value - box.width + "px"
        );
      });
    });

    return {};
  },
});
</script>
