<template>
  <header
    class="px-4 py-6 max-w-screen-lg w-full flex items-center justify-between"
  >
    <h1 class="text-4xl font-bold">Supabase SQL</h1>
    <div class="flex items-center">
      <a
        href="https://github.com/zernonia/supabase-sql"
        target="_blank"
        class="
          inline-flex
          text-xs
          items-center
          text-warm-gray-700
          font-semibold
          bg-warm-gray-200
          dark:text-light-900 dark:bg-dark-300
          rounded-md
          px-4
          py-2
          mr-2
          transition
          focus:outline-transparent focus:ring focus:ring-light-900
        "
      >
        <IconStar class="w-5 h-5 mr-1"></IconStar>
        Star on Github
      </a>

      <label for="toggleB" class="flex items-center cursor-pointer">
        <div class="relative w-full">
          <span class="absolute top-1 left-1">🌙</span>
          <span class="absolute top-1 right-1">☀️</span>
          <input
            v-model="darkMode"
            type="checkbox"
            id="toggleB"
            class="sr-only"
          />
          <div
            class="
              checkbox-bg
              block
              bg-warm-gray-200
              transition
              w-14
              h-8
              rounded-full
            "
          ></div>
          <div
            class="
              checkbox-dot
              absolute
              left-1
              top-1
              bg-white
              w-6
              h-6
              rounded-full
              transition
            "
          ></div>
        </div>
      </label>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from "@nuxtjs/composition-api";
import { useStorage } from "@vueuse/core";

export default defineComponent({
  setup() {
    const darkMode = useStorage("dark", false);

    watch(
      darkMode,
      (n) => {
        if (process.client) {
          if (n) {
            document.documentElement.className = "dark";
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },
      {
        immediate: true,
      }
    );

    return {
      darkMode,
    };
  },
});
</script>

<style lang="postcss">
input:checked ~ .checkbox-dot {
  transform: translateX(100%);
}
input:checked ~ .checkbox-bg {
  @apply bg-dark-300;
}
</style>
