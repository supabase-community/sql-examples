<template>
  <div
    class="
      w-screen
      h-screen
      fixed
      top-0
      left-0
      bg-white bg-opacity-50
      flex
      justify-center
      items-center
      backdrop-filter backdrop-blur-sm
    "
    @click.self="$router.back()"
  >
    <div
      class="
        w-full
        max-w-screen-md
        overflow-y-auto
        bg-white
        p-6
        rounded-xl
        shadow-lg
      "
      style="max-height: calc(100vh - 210px)"
    >
      <NuxtContent v-if="data" :document="data[0]"></NuxtContent>
    </div>
  </div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import {
  useAsync,
  useContext,
  defineComponent,
  useRoute,
  Ref,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const route = useRoute();
    const { $content, params } = useContext();

    const data = useAsync(() => {
      return $content("sql").where({ slug: route.value.params.slug }).fetch();
    }) as Ref<IContentDocument[]>;

    return {
      data,
    };
  },
});
</script>
