const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },

      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },

      { path: "/addproduct", component: () => import("pages/AddPage.vue") },

      { path: "/logbuch", component: () => import("pages/LogbuchPage.vue") },

      {
        path: "/produkteinpflegen",
        component: () => import("pages/ProduktEinpflegenPage.vue"),
      },

      {
        path: "/produkterstellen",
        component: () => import("pages/ProdukErstellenPage.vue"),
      },

      {
        path: "/essenerstellen",
        component: () => import("pages/EssenErstellenPage.vue"),
      },

      { path: "/profil", component: () => import("pages/ProfilPage.vue") },
    ],
  },

  // {
  //   path: "/newpage",
  //   component: NewPage,
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
