export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Supabase SQL | Curated list",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "0fHjXCYubdueQI63delbgFoqfSf_90OQdhwJBW5NxpQ",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Curated list of Supabase SQL script to find Supabase users find the update & relevant script at ease. Fully open-source and free",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Supabase SQL | Curated list",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Curated list of Supabase SQL script to find Supabase users find the update & relevant script at ease. Fully open-source and free",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://supabase-sql.vercel.app/og.png",
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: "Supabase SQL | Curated list",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Supabase SQL | Curated list",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Curated list of Supabase SQL script to find Supabase users find the update & relevant script at ease. Fully open-source and free",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://supabase-sql.vercel.app/og.png",
      },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: "https://supabase-sql.vercel.app/og.png",
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "Supabase SQL | Curated list",
      },
    ],
    link: [{ rel: "icon", type: "image/svg+xml", href: "/icon.svg" }],
    script: [
      process.env.NODE_ENV === "production"
        ? {
            src: "https://umami-zernonia.vercel.app/umami.js",
            async: true,
            defer: true,
            "data-website-id": "3616ea01-95e5-4770-b4ee-7c15911e941a",
          }
        : {},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "nuxt-windicss",
    ["unplugin-icons/nuxt"],
    "@nuxtjs/composition-api/module",
    "@nuxtjs/google-fonts",
    "nuxt-vite",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxtjs/sitemap",
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
    icon: false,
  },

  generate: { fallback: "404.html" },

  sitemap: {
    hostname: "https://supabase-sql.vercel.app",
    gzip: true,
    routes: async () => {
      let routes = [];
      let sqls = [];
      const { $content } = require("@nuxt/content");
      if (sqls === null || sqls.length === 0)
        sqls = await $content("sql").fetch();
      for (const sql of sqls) {
        routes.push(`/${sql.slug}`);
      }
      return routes;
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: () => ["title", "description"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
    },
  },

  googleFonts: {
    display: 'swap',
    families: {
      Inter: [400, 600, 700],
      "DM Mono": true,
    },
  },
};
