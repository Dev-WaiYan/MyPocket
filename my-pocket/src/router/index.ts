import TodoViewVue from "@/views/TodoView.vue";
import NoteViewVue from "@/views/NoteView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodoViewVue,
    },
    {
      path: "/todo",
      name: "todo",
      component: TodoViewVue,
    },
    {
      path: "/note",
      name: "note",
      component: NoteViewVue,
    },
  ],
});

export default router;
