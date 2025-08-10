<template>
  <div class="flex">
    <!-- محتوای اصلی -->
    <div class="w-[80%] mx-auto my-7">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">لیست محصولات</h1>
        <RouterLink
          to="/products/create"
          class="btn text-sm bg-secondary-bg shadow-md text-secondary-text px-4 py-2 rounded hover:shadow-lg"
        >
          محصول جدید +
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
            <th class="border border-gray-300 px-3 py-2 text-center">نام</th>
            <th class="border border-gray-300 px-3 py-2 text-center">
              دسته‌بندی
            </th>
            <th class="border border-gray-300 px-3 py-2 text-center">موجود؟</th>
            <th class="border border-gray-300 px-3 py-2 text-center w-28">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="transition-colors duration-150 cursor-pointer min-h-[40px]"
          >
            <td
              class="border border-gray-300 px-3 py-2 text-center align-middle"
            >
              <img
                v-if="product.image"
                :src="product.image"
                alt="Product Image"
                class="w-12 h-12 object-cover rounded-md mx-auto"
              />
              <span v-else class="text-gray-400 text-xs">بدون تصویر</span>
            </td>
            <td
              class="border border-gray-300 px-3 py-2 font-medium text-center align-middle"
            >
              {{ product.name }}
            </td>
            <td
              class="border border-gray-300 px-3 py-2 text-center align-middle"
            >
              {{ product.category }}
            </td>
            <td
              class="border border-gray-300 px-3 py-2 text-center align-middle"
            >
              <input type="checkbox" v-model="product.available" />
            </td>
            <td
              class="border border-gray-300 px-3 py-2 text-center align-middle"
            >
              <div class="flex justify-center items-center gap-3">
                <!-- ویرایش -->
                <RouterLink
                  :to="`/products/${product.id}/edit`"
                  class="text-accent hover:text-accent/80"
                  aria-label="ویرایش"
                >
              <editIcon />
                </RouterLink>
                <!-- حذف -->
                <button
                  @click="confirmDelete(product.id)"
                  class="text-red-600 hover:text-red-700"
                  aria-label="حذف"
                >
                <deleteIcon />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td
              colspan="5"
              class="border border-gray-300 text-center py-4 text-gray-500 text-sm"
            >
              محصولی موجود نیست.
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
          <p class="mb-6 text-sm">آیا از حذف این محصول مطمئن هستید؟</p>

          <div class="flex justify-end gap-3">
            <button
              @click="showConfirm = false"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded"
            >
              لغو
            </button>
            <button
              @click="deleteProduct"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded shadow-sm"
            >
              حذف
            </button>
          </div>
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


const products = ref([
  {
    id: 1,
    name: "کفش ورزشی نایک",
    image: "https://via.placeholder.com/64?text=Nike",
    category: "کفش ورزشی",
    stock: 12,
    available: true,
  },
  {
    id: 2,
    name: "تی‌شرت مردانه",
    image: "https://via.placeholder.com/64?text=Tshirt",
    category: "لباس مردانه",
    stock: 5,
    available: true,
  },
  {
    id: 3,
    name: "کیف دستی زنانه",
    image: "https://via.placeholder.com/64?text=Bag",
    category: "لباس زنانه",
    stock: 0,
    available: false,
  },
]);

const showConfirm = ref(false);
const productToDeleteId = ref(null);

const confirmDelete = (id) => {
  productToDeleteId.value = id;
  showConfirm.value = true;
};

const deleteProduct = () => {
  products.value = products.value.filter(
    (p) => p.id !== productToDeleteId.value
  );
  showConfirm.value = false;
  productToDeleteId.value = null;
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