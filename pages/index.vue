<template>
  <div class="max-w-screen-lg w-full relative flex flex-col items-center">
    <div class="px-4">
      <input
        v-model="query"
        type="search"
        autocomplete="off"
        placeholder="Search..."
        class="
          w-80
          px-4
          py-3
          shadow-md shadow-warm-gray-600
          rounded-md
          transition
          focus:outline-transparent
          bg-white
          dark:bg-dark-400
        "
      />
    </div>
    <div>
      <transition-group
        class="grid grid-cols-3 gap-4 px-4 py-6 relative"
        name="list"
        tag="div"
      >
        <NuxtLink
          class="transition duration-300 max-w-500 block"
          v-for="item in data"
          :key="item.slug"
          :to="`/${item.slug}`"
        >
          <Card :item="item"></Card>
        </NuxtLink>
      </transition-group>
    </div>
    <NuxtChild></NuxtChild>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  ref,
  watch,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const { $content } = useContext();
    const query = ref("");

    const data = useAsync(() => {
      return $content("sql", { deep: true })
        .without(["body"])
        .sortBy("title")
        .fetch();
    });

    watch(query, async (n) => {
      if (!n) {
        data.value = await $content("sql", { deep: true })
          .without(["body"])
          .sortBy("title")
          .fetch();
        return;
      }
      data.value = await $content("sql")
        .only(["title", "slug", "description"])
        .limit(12)
        .search(n)
        .sortBy("title")
        .fetch();
    });
    return {
      data,
      query,
    };
  },
});
</script>
