<template>
  <header
    class="px-4 py-6 max-w-screen-lg w-full flex items-center justify-between"
  >
    <h1 class="text-4xl font-bold">Supabase SQL</h1>
    <div class="flex items-center">
      <a
        href="https://github.com/zernonia/supabase-sql"
        target="_blank"
        class="
          inline-flex
          items-center
          text-warm-gray-700
          bg-warm-gray-200
          rounded-md
          px-4
          py-2
          mr-2
        "
      >
        <IconStar class="w-5 h-5 mr-2"></IconStar>
        Star on Github
      </a>

      <label for="toggleB" class="flex items-center cursor-pointer">
        <div class="relative">
          <input type="checkbox" id="toggleB" class="sr-only" />
          <div
            class="
              checkbox-bg
              block
              bg-warm-gray-200
              transition
              w-12
              h-7
              rounded-full
            "
          ></div>
          <div
            class="
              checkbox-dot
              absolute
              left-1
              top-1
              bg-white
              w-5
              h-5
              rounded-full
              transition
            "
          ></div>
        </div>
      </label>
    </div>
  </header>
</template>

<style lang="postcss">
input:checked ~ .checkbox-dot {
  transform: translateX(100%);
}
input:checked ~ .checkbox-bg {
  @apply bg-warm-gray-600;
}
</style>
