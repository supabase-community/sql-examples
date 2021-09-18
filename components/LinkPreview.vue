<template>
  <div
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
    class="relative cursor-pointer"
  >
    <a
      @focus="isOpen = true"
      @blur="isOpen = false"
      :target="target"
      :href="href"
    >
      <slot></slot>
    </a>
    <transition name="fade" mode="out-in">
      <div
        v-if="isOpen"
        class="pb-4 absolute bottom-full left-1/2"
        :style="{
          marginLeft: -width / 2 + 'px',
        }"
      >
        <div
          class="overflow-hidden rounded-md shadow-md"
          :style="{
            width: width + 'px',
            height: height + 'px',
          }"
        >
          <a :target="target" :href="href">
            <img class="object-cover" :src="image" alt="" />
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: "_blank",
    },
    image: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 150,
    },
  },
  setup(prop) {
    const isOpen = ref(false);

    return {
      isOpen,
    };
  },
});
</script>
