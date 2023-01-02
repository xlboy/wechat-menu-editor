<template>
  <div
    class="content-wrap"
    v-if="
      menuEditorStore.current.editMenuStatus !== Menu.Status.Not &&
      editMenuSrouce !== null &&
      editMenuSrouce.type === Menu.Type.MiniProgram
    "
  >
    <a-form layout="vertical">
      <a-form-item label="key事件">
        <a-input v-model:value="editMenuSrouceContent.key" />
      </a-form-item>
      <UploadFile
        uploadFileUrl="https://api.weixindun.com/api/sys/adm/user/upload/temp"
        v-model:fileUrl="editMenuSrouceContent.imgSrc"
      />
      <a-form-item label="小程序标题">
        <a-input v-model:value="editMenuSrouceContent.miniProgramConfig.title" />
      </a-form-item>
      <a-form-item label="小程序appId">
        <a-input v-model:value="editMenuSrouceContent.miniProgramConfig.appId" />
      </a-form-item>
      <a-form-item label="小程序页面路径">
        <a-input v-model:value="editMenuSrouceContent.miniProgramConfig.pagePath" />
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
import UploadFile from '../../UploadFile.vue'
export default defineComponent({
  name: "MiniProgramType",
  components: { UploadFile },
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(
      WeChatMenuEditorProvideKey
    )!;

    const editMenuSrouce = toRef(menuEditorStore.current, "editMenuSource");
    const editMenuSrouceContent = computed(() =>
      menuEditorStore.current.editMenuSource?.content as Menu.Content[Menu.Type.MiniProgram])

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
  