import { Menu } from "../typings"
import { UnwrapNestedRefs } from '@vue/reactivity/'
export const WeChatMenuEditorProvideKey = Symbol('WeChat_Menu_Editor')

export type WeChatMenuEditorStore<T extends Menu.Status = Menu.Status> = UnwrapNestedRefs<{
    menus: Menu.Data[];
    current: {
        mainMenuSource: null | Menu.Data;
        editMenuSource: T extends Menu.Status.Not ? null : Menu.Data;
        editMenuStatus: T;
        childIndex: number;
        mainIndex: number;
    };
}>

export const weChatMenuEditorStore: WeChatMenuEditorStore = {
    menus: [],
    current: {
        mainMenuSource: null,
        childIndex: 0,
        editMenuSource: null,
        mainIndex: 0,
        editMenuStatus: Menu.Status.Not
    }
}
