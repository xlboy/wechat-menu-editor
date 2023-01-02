<template>
  <div
    class="content-wrap"
    v-if="
      menuEditorStore.current.editMenuStatus !== Menu.Status.Not &&
      editMenuSrouce !== null &&
      editMenuSrouce.type === Menu.Type.WebLink
    "
  >
    <a-form layout="vertical">
      <a-form-item label="网站链接">
        <a-input v-model:value="editMenuSrouceContent.link" />
      </a-form-item>
    </a-form>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, inject, Ref, toRef } from "vue";
import {
  WeChatMenuEditorProvideKey,
  WeChatMenuEditorStore,
} from "../../../store";
import { Menu } from "../../../typings";
export default defineComponent({
  name: "WebLinkType",
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(
      WeChatMenuEditorProvideKey
    )!;

    const editMenuSrouce = toRef(menuEditorStore.current, "editMenuSource");
    const editMenuSrouceContent = computed(() =>
      menuEditorStore.current.editMenuSource?.content as Menu.Content[Menu.Type.WebLink])

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
  