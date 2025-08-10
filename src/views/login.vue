<template>
  <main class="flex flex-col md:flex-row h-screen">

    <div
      class="w-full md:w-3/6 flex justify-center items-center p-6 md:p-0 h-full"
    >
      <div
        class="shadow-2xl rounded-2xl w-full max-w-md flex flex-col justify-center p-6"
      >
        <h2
          class="text-2xl font-semibold my-4 text-primary-text text-center"
        >
          به پنل ادمین منو کافه خوش آمدید
        </h2>
        <p class="text-gray-500 text-center mb-6 text-sm">
          نام کاربری و رمز عبور را وارد کنید
        </p>

        <form @submit.prevent="$emit('login')" class="flex flex-col gap-4">
          <input
            v-model="username"
            type="text"
            placeholder="نام کاربری"
            class="p-3 rounded-xl border outline-none focus:border-accent"
            style="border-color: var(--border-color)"
          />
          <input
            v-model="password"
            type="password"
            placeholder="رمز عبور"
            class="p-3 rounded-xl border outline-none focus:border-accent"
            style="border-color: var(--border-color)"
          />
          <button
            :disabled="disableButton"
            class="mt-5 py-3 rounded-2xl font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style="
              background-color: var(--color-secondary-bg);
              color: var(--color-secondary-text);
            "
          >
            ورود
          </button>
        </form>
      </div>
    </div>

    <div
      class="hidden md:block w-3/6 imgbox bg-cover bg-center"
    ></div>

  </main>
</template>



<script setup>
import { ref, computed } from "vue";

const username = ref("");
const password = ref("");

const disableButton = computed(() => {
  return !username.value || !password.value;
});
</script>

<style>
.bg-primary-bg {
  background-color: var(--primary-bg);
}
.text-primary-text {
  color: var(--primary-text);
}
.focus\:border-accent:focus {
  border-color: var(--accent);
}
.imgbox {
  background-image: url("@/assets/images/iskender-kebab-copper-serving-served-with-pickles-yogurt-ayran.jpg");
}
</style>



