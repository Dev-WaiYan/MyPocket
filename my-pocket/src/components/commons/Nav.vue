<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container-fluid">
    <div class="row nav-container p-2 py-3">
      <div class="col-2"><RouterLink to="/">MyNote</RouterLink></div>
      <div class="col-10 d-flex justify-content-end">
        <nav>
          <RouterLink to="/"><i class="ri-add-box-fill"></i>ToDo</RouterLink>
          <RouterLink to="/note"
            ><i class="ri-add-box-fill"></i>Note</RouterLink
          >
          <RouterLink class="help" to="/note">Help</RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-container {
  background-image: var(--light-primaryColor);
  box-shadow: 0.1px 0.1px 1px var(--softWhite);
}

.nav-container nav {
  display: flex;
  align-items: center;
}

.nav-container nav a {
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.help {
  text-decoration: underline;
}
</style>
