<template>
  <div class="home-container">
    <router-view />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeLayout",
  components: {},
});
</script>
  
  <style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>
  