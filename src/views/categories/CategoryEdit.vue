<template>
  <div class="">
    <h1 class="text-xl font-bold mb-6">ویرایش دسته‌بندی</h1>

    <form
      @submit.prevent="updateCategory"
      class="space-y-4 bg-primary-bg p-6 rounded-md shadow-sm text-primary-text"
    >
      <!-- نام دسته‌بندی -->
      <div>
        <label class="block mb-1 font-medium text-sm">نام دسته‌بندی</label>
        <input
          v-model="category.name"
          type="text"
          class="border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
        />
      </div>

      <!-- لینک تصویر -->
      <div>
        <label class="block mb-1 font-medium text-sm">لینک تصویر (اختیاری)</label>
        <input
          v-model="category.image"
          type="text"
          class="border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
        />
      </div>

      <!-- پیش‌نمایش تصویر -->
      <div v-if="category.image" class="mt-3">
        <img
          :src="category.image"
          alt="Preview"
          class="w-24 h-24 object-cover rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <!-- دکمه‌ها -->
      <div class="flex items-center gap-3 mt-6">
        <button
          type="submit"
          class="btn text-sm bg-secondary-bg shadow-md text-secondary-text px-4 py-2 rounded hover:shadow-lg"
        >
          ذخیره تغییرات
        </button>
        <RouterLink
          to="/categories"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800 text-sm"
        >
          انصراف
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

// داده‌های فیک
const categories = ref([
  {
    id: 1,
    name: "لباس مردانه",
    image: "https://via.placeholder.com/64?text=Men",
  },
  {
    id: 2,
    name: "لباس زنانه",
    image: "https://via.placeholder.com/64?text=Women",
  },
  {
    id: 3,
    name: "کفش ورزشی",
    image: "https://via.placeholder.com/64?text=Shoes",
  },
]);

const route = useRoute();
const router = useRouter();

const categoryId = Number(route.params.id);
const category = ref({ name: "", image: "" });

// لود داده بر اساس id
const foundCategory = categories.value.find((c) => c.id === categoryId);
if (foundCategory) {
  category.value = { ...foundCategory };
} else {
  alert("دسته‌بندی پیدا نشد");
  router.push("/categories");
}

const updateCategory = () => {
  if (!category.value.name.trim()) {
    alert("لطفاً نام دسته‌بندی را وارد کنید");
    return;
  }

  const index = categories.value.findIndex((c) => c.id === categoryId);
  if (index !== -1) {
    categories.value[index] = { ...category.value, id: categoryId };
  }

  router.push("/categories");
};
</script>
