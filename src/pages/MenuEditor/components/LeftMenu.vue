<template>
  <a-menu class="menu-wrap" mode="horizontal">
    <a-menu-item
      class="menu-main-item"
      v-for="(menu, menuIndex) in menus"
      :key="menuIndex"
    >
      <div class="menu-child" v-if="menuVisibles[menuIndex].value">
        <a-menu mode="inline">
          <a-menu-item
            class="menu-child-item"
            v-for="(child, childIndex) in menu.children"
            :key="childIndex"
            @click="switchCurrentEdit(child, false, undefined, childIndex)"
            >{{ child.name }}</a-menu-item
          >
          <a-menu-divider v-if="menu.children?.length !== 0" />
          <a-menu-item class="menu-child-item" @click="addChildMenu(menuIndex)"
            >add</a-menu-item
          >
        </a-menu>
      </div>
      <div class="menu-main-item__btn" @click="mainClick(menu, menuIndex)">
        {{ menu.name }}
      </div>
    </a-menu-item>
    <a-button
      class="menu-add-btn"
      @click="addMainMenu"
      v-if="menus.length !== maxMainMenuNum"
      >add</a-button
    >
  </a-menu>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  Ref,
  ref,
  toRef,
  toRefs,
} from "vue";
import { message } from "ant-design-vue";
import { Menu } from "../typings/";
import { WeChatMenuEditorProvideKey, WeChatMenuEditorStore } from "../store";
import baseMenuModel from "../model/baseMenuModel";
import _ from "lodash";
interface State {
  maxMainMenuNum: number;
  maxChildMenuNum: number;
  menuVisibles: Ref<boolean>[];
}
export default defineComponent({
  name: "LeftMenu",
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(
      WeChatMenuEditorProvideKey
    )!;
    const state: State = reactive({
      maxMainMenuNum: 3,
      maxChildMenuNum: 5,
      menuVisibles: [],
    });
    state.menuVisibles = " "
      .repeat(state.maxMainMenuNum)
      .split("")
      .map((_) => ref(false));

    function addMainMenu() {
      const menus = toRef(menuEditorStore, "menus");
      if (menus.value.length === 3) {
        message.warning("一级菜单长度已上限，不可再按啦");
      } else {
        menus.value.push({
          name: `一级菜单${menus.value.length + 1}`,
          type: Menu.Type.Text,
          children: [],
          content: _.cloneDeep(baseMenuModel[Menu.Type.Text]),
        });
      }
    }

    function addChildMenu(mainMenuIndex: number) {
      const childMenus = toRef(
        menuEditorStore.menus[mainMenuIndex],
        "children"
      );
      if (childMenus.value) {
        if (childMenus.value.length === state.maxChildMenuNum) {
          message.warning(`二级菜单长度不可超过${state.maxChildMenuNum}哦`);
        } else {
          childMenus.value.push({
            name: `二级菜单${childMenus.value.length + 1}`,
            type: Menu.Type.Text,
            content: _.cloneDeep(baseMenuModel[Menu.Type.Text]),
          });
        }
      }
    }

    function switchCurrentEdit(
      menu: Menu.Data,
      isMainMenu: boolean,
      menuIndex?: number,
      childIndex?: number
    ) {
      if (isMainMenu) {
        menuEditorStore.current.mainMenuSource = menu;
      }

      menuEditorStore.current.editMenuStatus = isMainMenu
        ? Menu.Status.Main
        : Menu.Status.Child;
      menuEditorStore.current.editMenuSource = menu;

      if (menuIndex !== undefined)
        menuEditorStore.current.mainIndex = menuIndex;
      if (childIndex !== undefined)
        menuEditorStore.current.childIndex = childIndex;
      (window as any).initTab?.();
    }

    function mainClick(menu: Menu.Data, menuIndex: number) {
      switchCurrentEdit(menu, true, menuIndex);
      state.menuVisibles.forEach((e) => (e.value = false));
      state.menuVisibles[menuIndex].value = true;
    }

    return {
      ...toRefs(state),
      menus: toRef(menuEditorStore, "menus"),
      addMainMenu,
      addChildMenu,
      switchCurrentEdit,
      mainClick,
    };
  },
});
</script>

<style lang="scss">
.menu-wrap {
  width: 290px;
  height: auto;
  position: absolute;
  left: 24px;
  bottom: 92px;
  display: flex;
  justify-content: flex-start;
  .menu-main-item,
  .menu-add-btn {
    flex-basis: calc(295px / 3);
    max-width: calc(295px / 3);
  }
  .menu-add-btn {
    float: left;
  }
  .menu-main-item {
    position: relative;
    line-height: 31px;
    padding: 0px;
    border-right: 1px solid #d9d9d9;
    padding-left: 3px;
    &:nth-of-type(6) {
      border-right: 0px;
    }

    &__btn {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
    }
    .menu-child {
      width: 96px;
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 37px;
      left: 0px;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0px 0px 4px rgb(0 0 0 / 30%);
      .menu-child-item {
        padding: 0px !important;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
