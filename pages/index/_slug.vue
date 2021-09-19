<template>
  <div
    class="
      w-screen
      h-screen
      fixed
      top-0
      left-0
      z-10
      bg-warm-gray-100 bg-opacity-50
      dark:bg-dark-900 dark:bg-opacity-50
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
        max-w-screen-lg
        overflow-y-auto
        bg-white
        dark:bg-dark-400
        p-6
        mx-4
        rounded-xl
        shadow-lg
      "
      style="max-height: calc(100vh - 210px)"
    >
      <div v-if="data">
        <div>
          <div
            class="
              flex
              <sm:flex-col
              justify-between
              <sm:items-baseline
              sm:items-center
              w-full
            "
          >
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
          <p class="text-sm text-warm-gray-700 dark:text-light-900">
            {{ data[0].description }}
          </p>
          <div
            class="h-2px my-3 bg-warm-gray-100 dark:bg-dark-200 w-full"
          ></div>
        </div>
        <NuxtContent :document="data[0]" class="prose"></NuxtContent>
        <div v-if="data[0].reference">
          <div
            class="h-2px my-3 bg-warm-gray-100 dark:bg-dark-200 w-full"
          ></div>
          <h5 class="text-sm">Reference:</h5>
          <ul class="text-xs text-warm-gray-400">
            <li v-for="link in data[0].reference">
              <a :href="link" target="_blank" class="inline-flex items-center">
                <IconLink class="mr-1"></IconLink>
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
        <div
          class="
            text-warm-gray-400 text-sm
            mt-4
            flex
            items-center
            justify-between
          "
        >
          <a
            :href="`https://github.com/zernonia/supabase-sql/edit/master/content/sql/${$route.params.slug}.md`"
            target="_blank"
            class="inline-flex items-center text-warm-gray-400"
          >
            <IconEdit class="mr-2"></IconEdit>
            <span class=""> Edit this script </span>
          </a>
          <span>
            Updated at
            {{
              new Date(data[0].updatedAt).toLocaleString("en-us", {
                weekday: "short",
              })
            }},
            {{
              new Date(data[0].updatedAt).toLocaleString("en-us", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            }}
          </span>
        </div>
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
  Ref,
  onMounted,
  onUnmounted,
  useRouter,
  useMeta,
  computed,
} from "@nuxtjs/composition-api";
import { onKeyStroke } from "@vueuse/core";
import Vue from "vue";
import CopyButton from "~/components/CopyButton.vue";

export default defineComponent({
  head: {},
  setup() {
    const router = useRouter();
    const { $content, params, error, route } = useContext();

    const data = useAsync(() => {
      return $content("sql")
        .where({ slug: route.value.params.slug })
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: "Page not found" });
        });
    }, route.value.params.slug) as Ref<IContentDocument[]>;

    onMounted(() => {
      document.documentElement.classList.add("modal-open");
      setTimeout(() => {
        const blocks = document.getElementsByClassName(
          "nuxt-content-highlight"
        ) as any;
        for (const block of blocks) {
          const copy = Vue.extend(CopyButton as any);
          const component = new copy().$mount();
          block.appendChild(component.$el);
        }
      }, 500);
    });

    onUnmounted(() => {
      document.documentElement.classList.remove("modal-open");
    });

    onKeyStroke("Escape", (event) => {
      event.preventDefault();
      router.back();
    });

    // Meta tags
    const d = computed(() => data.value?.[0]);
    useMeta(() => ({
      title: "Supabase SQL | " + d.value?.title,
      bodyAttrs: {
        itemtype: `http://schema.org/WebPage`,
      },
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: d.value?.title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: d.value?.title,
        },
      ],
    }));

    return {
      data,
      d,
    };
  },
});
</script>
