<template>
  <div class="max-w-screen-lg w-full relative flex flex-col items-center">
    <div class="px-4">
      <input
        ref="target"
        v-model="query"
        type="search"
        autocomplete="off"
        placeholder="Ctrl + K to search..."
        class="
          w-80
          px-4
          py-3
          shadow-md shadow-warm-gray-600
          rounded-md
          transition
          focus:outline-transparent focus:ring focus:ring-light-900
          bg-white
          dark:bg-dark-400
        "
      />
    </div>

    <transition name="fade" mode="out-in">
      <transition-group
        v-if="data && data.length"
        class="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
          px-4
          py-6
          relative
        "
        name="list"
        tag="div"
      >
        <NuxtLink
          class="
            transition
            duration-300
            max-w-500
            block
            rounded-md
            focus:outline-transparent focus:ring focus:ring-light-900
          "
          v-for="item in data"
          :key="item.slug"
          :to="`/${item.slug}`"
        >
          <Card :item="item"></Card>
        </NuxtLink>
      </transition-group>
      <div v-else class="pt-16 pb-8 flex flex-col items-center">
        <NotFound class="text-light-900 dark:text-dark-100"></NotFound>
        <a
          class="inline-flex flex-col items-center"
          href="https://github.com/zernonia/supabase-sql/issues/new?assignees=&labels=&template=feature_request.md&title="
          target="_blank"
        >
          <p class="text-2xl font-semibold">No result found</p>
          <p class="text-lg font-semibold">Submit a request</p>
        </a>
      </div>
    </transition>

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
import { useMagicKeys, whenever } from "@vueuse/core";

export default defineComponent({
  setup() {
    const { $content } = useContext();
    const query = ref("");

    const target = ref();
    const { Ctrl_K } = useMagicKeys({
      passive: false,
      onEventFired(e) {
        if (e.ctrlKey && e.key === "k" && e.type === "keydown") {
          e.preventDefault();
        }
      },
    });

    whenever(Ctrl_K, () => {
      target.value.focus();
    });

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
      target,
    };
  },
});
</script>
