<template>
  <button
    ref="target"
    class="
      copy
      hidden
      absolute
      right-0
      bottom-0
      shadow-none
      hover:shadow-sm
      px-2
      py-2
      transition
      text-white
      bg-warm-gray-300
      hover:bg-warm-gray-400
      dark:bg-warm-gray-800
      text-sm
      rounded-md
      font-semibold
      mr-2
      mb-2
      w-10
      h-10
      focus:outline-none
    "
  >
    <IconCopy class="w-6 h-6" v-if="state == 'init'"></IconCopy>
    <IconCopied class="w-6 h-6" v-else></IconCopied>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@nuxtjs/composition-api";
import Clipboard from "clipboard";

export default defineComponent({
  setup() {
    const state = ref("init");
    const target = ref();
    onMounted(() => {
      const copyCode = new Clipboard(target.value, {
        target(trigger) {
          return trigger.previousElementSibling as Element;
        },
      });

      copyCode.on("success", (event) => {
        event.clearSelection();
        state.value = "copied";
        window.setTimeout(() => {
          state.value = "init";
        }, 2000);
      });
    });

    return {
      state,
      target,
    };
  },
});
</script>
