<template>
  <footer class="py-6 flex flex-col items-center">
    <div class="text-sm text-center flex space-x-1">
      <LinkPreview
        target="_blank"
        :image="'./assets/supabase-schema.png'"
        href="https://supabase-schema.vercel.app/"
        >Supabase Schema</LinkPreview
      >
      <span> | </span>
      <LinkPreview
        target="_blank"
        :image="'./assets/supabase-realtime.png'"
        href="http://supabase-realtime-nextconf-clone.vercel.app/"
        >Supabase Realtime Playground</LinkPreview
      >
      <span> | </span>
      <LinkPreview
        href="https://www.madewithsupabase.com/"
        :image="'./assets/made-with-supabase.png'"
        >Made With Supabase</LinkPreview
      >
    </div>
    <div class="mt-1">
      built by
      <a target="_blank" href="https://twitter.com/zernonia">@zernonia</a>
    </div>
  </footer>
</template>
