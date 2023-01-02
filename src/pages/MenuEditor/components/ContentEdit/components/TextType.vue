<template>
  <div
    class="content-wrap"
    v-if="
      menuEditorStore.current.editMenuStatus !== Menu.Status.Not &&
      editMenuSrouce !== null &&
      editMenuSrouce.type === Menu.Type.Text
    "
  >
    <a-form layout="vertical">
      <a-form-item label="key事件">
        <a-input v-model:value="editMenuSrouceContent.key" />
      </a-form-item>
      <a-form-item label="文本内容">
        <a-textarea v-model:value="editMenuSrouceContent.text" />
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
  name: "TextType",
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(
      WeChatMenuEditorProvideKey
    )!;

    const editMenuSrouce = toRef(menuEditorStore.current, "editMenuSource");
    const editMenuSrouceContent = computed(() =>
      menuEditorStore.current.editMenuSource?.content as Menu.Content[Menu.Type.Text])

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
  