<template>
  <div class="editor-wrap">
    <div v-if="current !== null && current.editMenuStatus !== MenuStatusTypes.Not">
      <a-row type="flex" justify="space-between">
        <a-col :span="6" :order="4" v-if="current.mainMenuSource !== null">
          所属一级菜单 ->
          <a-tag color="#2db7f5">{{ current.mainMenuSource.name }}</a-tag>
        </a-col>
        <a-col :span="4" :order="4">
          <a-button
            type="danger"
            @click="removeChildMenu"
            v-if="current.editMenuStatus === MenuStatusTypes.Child"
          >删除二级菜单</a-button>&nbsp;
          <a-button
            type="danger"
            @click="removeMainMenu"
            v-if="current.editMenuStatus === MenuStatusTypes.Main"
            style="float:right;"
          >删除一级菜单</a-button>
        </a-col>
      </a-row>
      <div v-if="current.editMenuSource !== null" style="margin-top: 30px;">
        <ContentEdit />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { WeChatMenuEditorProvideKey, WeChatMenuEditorStore } from "../store";
import { Menu } from "../typings";
import ContentEdit from './ContentEdit/index.vue'

export default defineComponent({
  name: "RightEditor",
  components: { PlusOutlined, ContentEdit },
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(WeChatMenuEditorProvideKey)!

    watch(
      () => menuEditorStore.menus,
      () => {
        if (menuEditorStore.menus.length === 0) {
          menuEditorStore.current.editMenuStatus = Menu.Status.Not
        }
      }, { deep: true })

    function removeChildMenu() {
      const { childIndex, mainIndex } = menuEditorStore.current
      menuEditorStore.menus[mainIndex].children?.splice(childIndex, 1)
      menuEditorStore.current.editMenuStatus = Menu.Status.Not
      message.success('删除二级菜单成功')
    }

    function removeMainMenu() {
      const { mainIndex } = menuEditorStore.current
      menuEditorStore.menus.splice(mainIndex, 1)
      menuEditorStore.current.editMenuStatus = Menu.Status.Not
      message.success('删除一级菜单成功')
    }

    return {
      ...toRefs(menuEditorStore),
      MenuStatusTypes: Menu.Status,
      removeChildMenu,
      removeMainMenu
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-wrap {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  &:hover {
    box-shadow: 0 2px 8px rgb(0 0 0 / 9%);
  }
}
</style>