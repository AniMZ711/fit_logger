const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DashboardPage.vue") },

      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },

      { path: "/addproduct", component: () => import("pages/AddPage.vue") },

      { path: "/logbuch", component: () => import("pages/LogbuchPage.vue") },
    ],
  },

  //Layout ohne den Plus-Button
  {
    path: "/",
    component: () => import("layouts/LayoutWithoutPlussButton.vue"),
    children: [
      { path: "/profil", component: () => import("pages/ProfilPage.vue") },
      {
        path: "/produkteinpflegen",
        component: () => import("pages/ProduktEinpflegenPage.vue"),
      },

      {
        path: "/essenkomponieren",
        component: () => import("pages/EssenKomponierenPage.vue"),
      },

      {
        path: "/produkterstellen",
        component: () => import("pages/ProdukErstellenPage.vue"),
      },

      {
        path: "/produktsuchen",
        component: () => import("src/pages/ProduktSuchenPage.vue"),
      },

      {
        path: "/ziele",
        component: () => import("pages/ZielePage.vue"),
      },

      {
        path: "/statistik",
        component: () => import("pages/StatistikPage.vue"),
      },

      {
        path: "/ProduktBearbeiten",
        component: () => import("pages/ProduktBearbeiten.vue"),
      },

      {
        path: "/ProduktLöschen",
        component: () => import("pages/ProduktLöschen.vue"),
      },
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
