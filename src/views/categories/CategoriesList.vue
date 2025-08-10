<template>
    <!-- محتوای اصلی -->
    <div class="">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">لیست دسته‌بندی‌ها</h1>
        <RouterLink
          to="/categories/create"
          class="btn text-sm bg-secondary-bg shadow-md text-secondary-text px-4 py-2 rounded hover:shadow-lg"
        >
          دسته جدید +
        </RouterLink>
      </div>

      <!-- جدول -->
      <table
        class="w-full table-auto border-collapse rounded-md overflow-hidden bg-primary-bg text-primary-text shadow-sm text-sm"
      >
        <thead>
          <tr
            class="bg-secondary-bg text-secondary-text select-none"
            style="min-height: 40px"
          >
            <th class="border border-gray-300 px-3 py-2 text-center">عکس</th>
            <th class="border border-gray-300 px-3 py-2 text-center">اسم</th>
            <th class="border border-gray-300 px-3 py-2 text-center w-28">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            class="transition-colors duration-150 cursor-pointer min-h-[40px]"
          >
            <td
              class="border border-gray-300 px-3 py-2 text-center align-middle"
            >
              <img
                v-if="category.image"
                :src="category.image"
                alt="Category Image"
                class="w-12 h-12 object-cover rounded-md mx-auto"
              />
              <span v-else class="text-gray-400 text-xs">بدون تصویر</span>
            </td>
            <td
              class="border border-gray-300 px-3 py-2 font-medium text-center align-middle"
            >
              {{ category.name }}
            </td>
            <td
              class="border border-gray-300 px-3 py-2 text-center align-middle"
            >
              <div class="flex justify-center items-center gap-3">
                <!-- ویرایش -->
                <RouterLink
                  :to="`/categories/${category.id}/edit`"
                  class="text-accent hover:text-accent/80"
                  aria-label="ویرایش"
                >
               <editIcon />
                </RouterLink>
                <!-- حذف -->
                <button
                  @click="confirmDelete(category.id)"
                  class="text-red-600 hover:text-red-700"
                  aria-label="حذف"
                >
                <deleteIcon />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td
              colspan="3"
              class="border border-gray-300 text-center py-4 text-gray-500 text-sm"
            >
              دسته‌بندی‌ای موجود نیست.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- مودال تایید حذف -->
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div
          class="bg-primary-bg p-6 rounded-lg shadow-lg max-w-sm w-full text-primary-text transform transition-all duration-200 scale-95 animate-fadeIn"
        >
          <p class="mb-6 text-sm">آیا از حذف این دسته‌بندی مطمئن هستید؟</p>

          <div class="flex justify-end gap-3">
            <button
              @click="showConfirm = false"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded"
            >
              لغو
            </button>
            <button
              @click="deleteCategory"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded shadow-sm"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import editIcon from "@/components/icons/edit.vue";
import deleteIcon from "@/components/icons/delete.vue";

// داده فیک دسته‌بندی‌ها
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

const showConfirm = ref(false);
const categoryToDeleteId = ref(null);

const confirmDelete = (id) => {
  categoryToDeleteId.value = id;
  showConfirm.value = true;
};

const deleteCategory = () => {
  categories.value = categories.value.filter(
    (c) => c.id !== categoryToDeleteId.value
  );
  showConfirm.value = false;
  categoryToDeleteId.value = null;
};
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>
