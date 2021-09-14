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
      <div v-if="data">
        <div>
          <div class="flex justify-between items-center w-full">
            <h2 class="font-semibold text-xl">
              {{ data[0].title }}
            </h2>
            <div class="flex items-center">
              <span class="text-sm mr-2">by:</span>
              <a :href="data[0].github" target="_blank">
                <Badge>{{ data[0].author }}</Badge>
              </a>
            </div>
          </div>
          <p class="text-sm text-warm-gray-700">{{ data[0].description }}</p>
          <div class="h-2px my-3 bg-warm-gray-100 w-full"></div>
        </div>
        <NuxtContent :document="data[0]"></NuxtContent>
        <a
          :href="`https://github.com/zernonia/supabase-sql/edit/master/content/sql/${$route.params.slug}.md`"
          target="_blank"
          class="inline-flex items-center text-warm-gray-400 mt-2"
        >
          <IconEdit class="mr-2"></IconEdit>
          <span class="text-sm"> Edit this script </span>
        </a>
      </div>
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
  onMounted,
} from "@nuxtjs/composition-api";
import Vue from "vue";
import CopyButton from "~/components/CopyButton.vue";
import IconEdit from "~icons/mdi/database-edit-outline";

export default defineComponent({
  components: {
    IconEdit,
  },
  setup() {
    const route = useRoute();
    const { $content, params } = useContext();

    const data = useAsync(() => {
      return $content("sql").where({ slug: route.value.params.slug }).fetch();
    }, route.value.params.slug) as Ref<IContentDocument[]>;

    onMounted(() => {
      setTimeout(() => {
        const blocks = document.getElementsByClassName(
          "nuxt-content-highlight"
        ) as any;
        for (const block of blocks) {
          const copy = Vue.extend(CopyButton as any);
          const component = new copy().$mount();
          block.appendChild(component.$el);
        }
      }, 100);
    });

    return {
      data,
    };
  },
});
</script>
