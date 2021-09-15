<template>
  <div class="relative w-min" ref="target">
    <input
      v-model="query"
      type="search"
      autocomplete="off"
      placeholder="Search..."
      class="
        w-80
        px-4
        py-2
        border-2 border-warm-gray-200
        rounded-md
        transition
        focus:outline-transparent
      "
      @focus="openDropdown = true"
    />
    <ul
      class="
        absolute
        top-full
        left-0
        w-80
        bg-white
        mt-1
        py-2
        border-2 border-warm-gray-200
        rounded-md
      "
      v-if="openDropdown && list && list.length"
    >
      <NuxtLink
        v-for="item of list"
        :key="item.slug"
        class="px-4 py-1 flex bg-white hover:bg-warm-gray-100"
        :to="`/${item.slug}`"
      >
        <li>
          {{ item.title }}
        </li>
      </NuxtLink>
    </ul>
  </div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import {
  ref,
  useContext,
  defineComponent,
  watch,
} from "@nuxtjs/composition-api";
// import { onClickOutside } from "@vueuse/core";

export default defineComponent({
  setup() {
    const { $content } = useContext();
    const target = ref();
    const openDropdown = ref(false);
    const query = ref("");
    const list = ref<IContentDocument | IContentDocument[]>();

    // onClickOutside(target, (event) => (openDropdown.value = false));

    watch(query, async (n) => {
      if (!n) {
        list.value = [];
        return;
      }

      list.value = await $content("sql")
        .only(["title", "slug", "description"])
        .limit(12)
        .search(n)
        .sortBy("title")
        .fetch();
    });

    return {
      target,
      openDropdown,
      query,
      list,
    };
  },
});
</script>
