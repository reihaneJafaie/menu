import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("../views/categories/CategoriesList.vue"),
    },
    {
      path: "/categories/create",
      name: "categories-create",
      component: () => import("../views/categories/CategoryCreate.vue"),
    },
    {
      path: "/categories/:id/edit",
      name: "categories-edit",
      component: () => import("../views/categories/CategoryEdit.vue"),
      props: true,
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/products/ProductsList.vue"),
    },
    {
      path: "/products/create",
      name: "products-create",
      component: () => import("../views/products/ProductCreate.vue"),
    },
    {
      path: "/products/:id/edit",
      name: "products-edit",
      component: () => import("../views/products/ProductEdit.vue"),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ],
});

export default router;
