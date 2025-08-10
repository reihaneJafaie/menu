<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const persianTime = ref("");

// تابع تبدیل تاریخ میلادی به شمسی
function toJalaali(gy, gm, gd) {
  let g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gy2 = gy - 1600;
  let gm2 = gm - 1;
  let gd2 = gd - 1;
  let g_day_no = 365 * gy2 + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400);
  for (let i = 0; i < gm2; ++i) g_day_no += g_d_m[i + 1];
  g_day_no += gd2;
  let j_day_no = g_day_no - 79;
  let j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;
  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;
  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }
  let jm, jd;
  const j_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  for (jm = 0; jm < 11 && j_day_no >= j_month_days[jm]; ++jm) {
    j_day_no -= j_month_days[jm];
  }
  jd = j_day_no + 1;
  return [jy, jm + 1, jd];
}

// آپدیت زمان شمسی
function updateTime() {
  const now = new Date();
  const [jy, jm, jd] = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");

  persianTime.value = `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")} ${hh}:${mm}:${ss}`;
}

let intervalId;

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div>{{ persianTime }}</div>
</template>
