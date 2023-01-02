<template>
  <div class="home-wrap">
    <div class="home-wrap__phone-model">
      <img class="model-img" src="~/assets/images/model_phone.png" />
      <LeftMenu />
    </div>
    <div class="home-wrap__editor">
      <RightEditor />
    </div>
    <a-button @click="saveMenu" class="home-wrap__save-btn">保存</a-button>
    <a-button @click="resetMenu" class="home-wrap__reset-btn">重置</a-button>
  </div>
</template>

<script lang="ts">
import { ApiGetMenu, ApiSaveMenu } from "@/apis/modules/menu";
import { message } from "ant-design-vue";
import { defineComponent, provide, reactive } from "vue";
import LeftMenu from "./components/LeftMenu.vue";
import RightEditor from "./components/RightEditor.vue";
import { WeChatMenuEditorProvideKey, weChatMenuEditorStore } from "./store";
import _ from "lodash";
export default defineComponent({
  name: "VXMenuEditor",
  components: {
    RightEditor,
    LeftMenu,
  },
  setup() {
    const store = reactive(weChatMenuEditorStore);
    provide(WeChatMenuEditorProvideKey, store);

    async function saveMenu() {
      const menus = _.cloneDeep(store.menus);
      await ApiSaveMenu({ buttons: menus });
      message.success("保存成功");
    }

    function resetMenu() {
      store.menus = [];
    }

    void (async function initFetchMenu() {
      const { result } = await ApiGetMenu();
      store.menus = result.buttons;
    })();

    return {
      resetMenu,
      saveMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-wrap {
  width: 1300px;
  height: 700px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  display: flex;
  justify-content: space-between;
  &__phone-model {
    height: 100%;
    width: auto;
    position: relative;
    .model-img {
      height: 100%;
    }
  }
  &__editor {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
  }

  &__save-btn {
    position: absolute;
    bottom: -30px;
    right: 50%;
  }
  &__reset-btn {
    position: absolute;
    bottom: -30px;
    right: 57%;
  }
}
</style>
