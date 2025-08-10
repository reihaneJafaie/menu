<template>
  <div class="w-[80%] mx-auto my-7">
    <h1 class="text-xl font-bold mb-6">افزودن محصول جدید</h1>

    <form
      @submit.prevent="addProduct"
      class="space-y-4 bg-primary-bg p-6 rounded-md shadow-sm text-primary-text"
    >
      <!-- نام محصول -->
      <div>
        <label class="block mb-1 font-medium text-sm">نام محصول</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
        />
      </div>

      <!-- آدرس تصویر -->
      <div>
        <label class="block mb-1 font-medium text-sm">آدرس تصویر</label>
        <input
          v-model="form.image"
          type="text"
          placeholder="https://example.com/image.jpg"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
        />
      </div>

      <!-- دسته‌بندی -->
      <div>
        <label class="block mb-1 font-medium text-sm">دسته‌بندی</label>
        <select
          v-model="form.category"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-bg"
        >
          <option value="" disabled>انتخاب دسته‌بندی</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <!-- وضعیت -->
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="form.available" id="available" />
        <label for="available" class="text-sm">موجود</label>
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
          to="/products"
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

const categories = ["کفش ورزشی", "لباس مردانه", "لباس زنانه"];

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
]);

const form = ref({
  name: "",
  image: "",
  category: "",
  stock: 0,
  available: true,
});

const addProduct = () => {
  const newProduct = { id: Date.now(), ...form.value };
  products.value.push(newProduct);
  alert("محصول با موفقیت اضافه شد!");
  router.push("/products");
};
</script>
