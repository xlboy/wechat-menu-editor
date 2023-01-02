<template>
  <div
    class="content-wrap"
    v-if="
      menuEditorStore.current.editMenuStatus !== Menu.Status.Not &&
      editMenuSrouce !== null &&
      editMenuSrouce.type === Menu.Type.MiniProgramPage
    "
  >
    <a-form layout="vertical">
      <a-form-item label="小程序appId">
        <a-input v-model:value="editMenuSrouceContent.appId" />
      </a-form-item>
      <a-form-item label="小程序页面路径">
        <a-input v-model:value="editMenuSrouceContent.pagePath" />
      </a-form-item>
    </a-form>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, inject, toRef } from "vue";
import {
  WeChatMenuEditorProvideKey,
  WeChatMenuEditorStore,
} from "../../../store";
import { Menu } from "../../../typings";
export default defineComponent({
  name: "MiniProgramPageType",
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(
      WeChatMenuEditorProvideKey
    )!;

    const editMenuSrouce = toRef(menuEditorStore.current, "editMenuSource");
    const editMenuSrouceContent = computed(() =>
      menuEditorStore.current.editMenuSource?.content as Menu.Content[Menu.Type.MiniProgramPage])

    return {
      menuEditorStore,
      editMenuSrouce,
      editMenuSrouceContent,
      Menu,
    };
  },
});
</script>
<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  height: 100%;
}
</style>
  