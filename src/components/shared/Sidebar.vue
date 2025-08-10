<template>
  <aside
    ref="asideRef"
    class="w-80 min-h-screen p-4 flex flex-col justify-between bg-secondary-bg text-secondary-text border-r"
  >
    <div>
      <div
        class="mb-6 text-center text-2xl font-bold pb-3 border-b border-accent select-none"
      >
        پنل ادمین

        <!-- دکمه X برای بستن سایدبار -->
        <button
          @click="$emit('close')"
          aria-label="بستن سایدبار"
          class="absolute top-4 left-4 text-secondary-text hover:text-accent focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav class="flex flex-col gap-4 text-base">
        <RouterLink
          to="/categories"
          class="flex items-center px-3 py-2 rounded transition-colors duration-200"
          active-class="sidebar-active"
        >
          <span class="w-5 h-5 ml-2 flex-shrink-0" v-html="categoryIcon" />
          دسته‌بندی‌ها
        </RouterLink>
        <RouterLink
          to="/products"
          class="flex items-center px-3 py-2 rounded transition-colors duration-200"
          active-class="sidebar-active"
        >
          <span class="w-5 h-5 ml-2 flex-shrink-0" v-html="productIcon" />
          محصولات
        </RouterLink>
      </nav>
    </div>

    <div
      class="rounded-xl flex flex-col items-center bg-primary-bg text-primary-text p-3"
    >
      <span class="font-bold"> خروج </span>
      <p class="text-xs my-2">لورم ایپسوم لورم لورم لورم ایپسوم</p>
      <button
        class="rounded-sm bg-secondary-bg px-3 py-1 text-xs text-secondary-text"
      >
        خروج
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const asideRef = ref(null); // این رفرنس رو اضافه کردیم برای دسترسی امن

const categoryIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />
  </svg>
`;

const productIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2h-6l-2 2H6a2 2 0 00-2 2v6" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17a4 4 0 01-8 0" />
  </svg>
`;
</script>

<style>
/* برای تنظیم رنگ آیکون با متن */
a svg {
  stroke: currentColor;
  width: 20px;
  height: 20px;
}
</style>
