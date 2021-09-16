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
      @keydown.down="keyDown"
      @keydown.up="keyUp"
      @keydown.enter="keyEnter"
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
        rounded-md
        shadow-md
      "
      v-if="openDropdown && list && list.length"
    >
      <div
        v-for="(item, index) of list"
        :key="item.slug"
        class="flex bg-white"
        :class="[focusTarget == index ? 'bg-warm-gray-100' : '']"
        @mouseover="focusTarget = index"
        @click="openDropdown = false"
      >
        <NuxtLink
          ref="listTarget"
          class="px-4 py-2 w-full"
          :to="`/${item.slug}`"
        >
          <li class="w-full">
            {{ item.title }}
          </li>
        </NuxtLink>
      </div>
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
  useRouter,
  useRoute,
} from "@nuxtjs/composition-api";
import { onClickOutside, onKeyStroke } from "@vueuse/core";

export default defineComponent({
  setup() {
    const { $content } = useContext();
    const route = useRoute();
    const router = useRouter();
    const target = ref();
    const openDropdown = ref(false);
    const focusTarget = ref(0);

    const query = ref("");
    const list = ref<IContentDocument[]>([]);

    onClickOutside(target, (event) => (openDropdown.value = false));

    const keyDown = (event: Event) => {
      event.preventDefault();
      if (list.value.length > focusTarget.value + 1) {
        focusTarget.value++;
      } else {
        focusTarget.value = 0;
      }
    };

    const keyUp = (event: Event) => {
      event.preventDefault();
      if (0 < focusTarget.value) {
        focusTarget.value--;
      } else {
        focusTarget.value = list.value.length - 1;
      }
    };

    const keyEnter = (event: Event) => {
      router.push(`/${list.value[focusTarget.value].slug}`);
      openDropdown.value = false;
    };

    watch(query, async (n) => {
      if (!n) {
        list.value = [];
        focusTarget.value = 0;
        return;
      }
      openDropdown.value = true;
      list.value = (await $content("sql")
        .only(["title", "slug", "description"])
        .limit(12)
        .search(n)
        .sortBy("title")
        .fetch()) as IContentDocument[];

      focusTarget.value = 0;
    });

    watch(route, (n) => {
      if (n.name == "index" && query.value) {
        target.value.firstChild.focus();
      } else {
        target.value.firstChild.blur();
      }
    });

    return {
      target,
      openDropdown,
      focusTarget,
      query,
      list,

      keyUp,
      keyDown,
      keyEnter,
    };
  },
});
</script>
