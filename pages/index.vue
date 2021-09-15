<template>
  <div class="max-w-screen-lg w-full relative">
    <div class="px-4">
      <Search></Search>
    </div>
    <div class="grid grid-cols-3 gap-4 px-4 py-6">
      <NuxtLink v-for="item in data" :key="item.slug" :to="`/${item.slug}`">
        <Card :item="item"></Card>
      </NuxtLink>
    </div>
    <NuxtChild></NuxtChild>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const { $content } = useContext();
    const data = useAsync(() => {
      return $content("sql", { deep: true })
        .without(["body"])
        .sortBy("title")
        .fetch();
    });

    return {
      data,
    };
  },
});
</script>
