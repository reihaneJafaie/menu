<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "./components/shared/Sidebar.vue";
import TimeDisplay from "./components/shared/TimeDisplay.vue";
import modeIcon from './components/icons/mod.vue';
import logoutIcon from './components/icons/logout.vue';

const route = useRoute();
const router = useRouter();

const sidebarOpen = ref(false);
const sidebarRef = ref(null);
const showLogoutModal = ref(false); // وضعیت باز/بسته بودن مدال خروج

function handleClickOutside(e) {
  const sidebarEl = sidebarRef.value?.$el || sidebarRef.value;
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

function confirmLogout() {
  // اینجا می‌تونی لاجیک خروج رو بزاری (مثلا حذف توکن)
  router.push("/login");
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
    <!-- نوار بالا موبایل -->
    <div class="w-full flex justify-between lg:hidden p-2 mb-7">
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

      <div class="flex gap-4">
        <modeIcon />
        <logoutIcon @click="showLogoutModal = true" class="cursor-pointer" />
      </div>
    </div>

    <!-- بک‌دراپ موبایل -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>

    <!-- سایدبار -->
    <Sidebar
      v-if="route.name !== 'login'"
      ref="sidebarRef"
      :class="[
        'fixed lg:static top-0 right-0 h-full transform transition-transform duration-300 lg:translate-x-0 bg-white z-50',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
      @close="sidebarOpen = false"
    />

    <!-- محتوای اصلی -->
    <main class="flex-1 mx-8">
      <div class="py-3 border-b justify-between p-2 items-center hidden lg:flex mb-7">
        <TimeDisplay />

        <div class="flex gap-4">
          <modeIcon />
          <logoutIcon @click="showLogoutModal = true" class="cursor-pointer" />
        </div>
      </div>

      <RouterView />
    </main>

    <!-- مدال خروج -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-lg font-semibold mb-4">آیا مطمئنی میخوای خارج بشی؟</h2>
        <div class="flex justify-center gap-4">
          <button
            @click="confirmLogout"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            بله
          </button>
          <button
            @click="showLogoutModal = false"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
