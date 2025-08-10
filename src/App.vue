<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/shared/Sidebar.vue";
import TimeDisplay from './components/shared/TimeDisplay.vue'
const route = useRoute();
const sidebarOpen = ref(false);
const sidebarRef = ref(null); // 1. تعریف ref برای سایدبار

// ... (توابع تبدیل تاریخ و آپدیت زمان که قبلاً بود)

function handleClickOutside(e) {
  const sidebarEl = sidebarRef.value?.$el || sidebarRef.value; // استفاده از ref به جای document.querySelector
  const buttonEl = e.target.closest("button");

  if (
    sidebarOpen.value &&
    sidebarEl &&
    !sidebarEl.contains(e.target) &&
    !buttonEl
  ) {
    sidebarOpen.value = false;
  }
}

watch(route, () => {
  sidebarOpen.value = false;
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
    <div class="w-full flex justify-between lg:hidden p-2">
     

      <button
        v-if="route.name !== 'login'"
        @click.stop="sidebarOpen = !sidebarOpen"
        class="bg-white p-2 rounded shadow-md"
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

       <TimeDisplay />
    </div>

    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>

    <Sidebar
      v-if="route.name !== 'login'"
      ref="sidebarRef"
      :class="[
        'fixed lg:static top-0 right-0 h-full transform transition-transform duration-300 lg:translate-x-0 bg-white z-50',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
      @close="sidebarOpen = false"
    />

    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
