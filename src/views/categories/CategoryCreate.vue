<template>
  <div class="">
    <h1 class="text-xl font-bold mb-6">افزودن دسته‌بندی جدید</h1>

    <form
      @submit.prevent="addCategory"
      class="space-y-4 bg-primary-bg p-6 rounded-md shadow-sm text-primary-text"
    >
      <!-- نام دسته‌بندی -->
      <div>
        <label class="block mb-1 font-medium text-sm">نام دسته‌بندی</label>
        <input
          v-model="newCategory.name"
          type="text"
          class="border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
          placeholder="مثلاً لباس مردانه"
        />
      </div>

      <!-- لینک عکس -->
      <div>
        <label class="block mb-1 font-medium text-sm">لینک تصویر (اختیاری)</label>
        <input
          v-model="newCategory.image"
          type="text"
          class="border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <!-- پیش‌نمایش تصویر -->
      <div v-if="newCategory.image" class="mt-3">
        <img
          :src="newCategory.image"
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
          ذخیره
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
import { RouterLink, useRouter } from "vue-router";


const router = useRouter();

const newCategory = ref({
  name: "",
  image: ""
});

const addCategory = () => {
  if (!newCategory.value.name.trim()) {
    alert("لطفاً نام دسته‌بندی را وارد کنید");
    return;
  }

  // ساخت id جدید
  const newId = categories.value.length
    ? Math.max(...categories.value.map(c => c.id)) + 1
    : 1;

  categories.value.push({
    id: newId,
    name: newCategory.value.name.trim(),
    image: newCategory.value.image || null
  });

  // پاک کردن فرم
  newCategory.value = { name: "", image: "" };

  // انتقال به صفحه لیست
  router.push("/categories");
};
</script>
