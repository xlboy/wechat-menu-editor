<script lang="tsx">
import { computed, defineComponent, inject, reactive, ref, toRef } from "vue";
import baseMenuModel from "../../model/baseMenuModel";
import contentEditModel from "../../model/contentEditModel";
import { WeChatMenuEditorProvideKey, WeChatMenuEditorStore } from "../../store";
import { Menu } from "../../typings";
import _ from "lodash";
import { RuleObject } from "ant-design-vue/lib/form/interface";
interface State {
  tabType: Menu.Type;
}
export default defineComponent({
  name: "ContentEdit",
  setup() {
    const menuEditorStore = inject<WeChatMenuEditorStore>(
      WeChatMenuEditorProvideKey
    )!;
    const state = reactive<State>({
      tabType: Menu.Type.Text,
    });

    const editMenuSource = toRef(menuEditorStore.current, "editMenuSource");
    const editMenuStatus = toRef(menuEditorStore.current, "editMenuStatus");

    (window as any).initTab = () => {
      if (editMenuSource.value !== null) {
        state.tabType = editMenuSource.value.type;
      }
    };

    function tabChange() {
      if (editMenuSource.value !== null) {
        editMenuSource.value.type = state.tabType;
        editMenuSource.value.content = _.cloneDeep(
          baseMenuModel[state.tabType]
        );
      }
    }

    (window as any).initTab();

    const isShowEditorContent = computed(() => {
      return (
        (editMenuStatus.value === Menu.Status.Main &&
          editMenuSource.value?.children?.length === 0) ||
        editMenuStatus.value === Menu.Status.Child
      );
    });

    type FormNameRuleStatus = { [k in keyof typeof Menu.Status]?: string };
    const formNameRuleStatus: FormNameRuleStatus = {
      [Menu.Status.Main]: "仅支持中英文和数字，字数不超过4个汉字或8个字母",
      [Menu.Status.Child]: "仅支持中英文和数字，字数不超过8个汉字或16个字母",
    };
    const formRules = {
      name: [
        {
          async validator() {
            const value = editMenuSource.value?.name!;
            if (!/^[\u4e00-\u9fa5\da-zA-z]+$/.test(value)) {
              return Promise.reject("不可输入中文/英文/数字以外的字符");
            }
            const valMaxLength =
              editMenuStatus.value === Menu.Status.Main ? 8 : 16;
            const result = verifNameRule(valMaxLength);
            if (result) {
              return Promise.reject(formNameRuleStatus[editMenuStatus.value]);
            }

            function verifNameRule(maxLength: number): boolean {
              const [
                chineseLength,
                otherCharLength,
              ] = getStrChineseAndOtherCharLength(value);
              return chineseLength * 2 + otherCharLength > maxLength;
            }

            function getStrChineseAndOtherCharLength(
              str: string
            ): [number, number] {
              const chineseLength = str.match(/[\u4e00-\u9fa5]/g)?.length ?? 0;
              const otherCharLength =
                str.match(/[^\u4e00-\u9fa5]/g)?.length ?? 0;
              return [chineseLength, otherCharLength];
            }
          },
          trigger: "change",
        },
      ],
    };

    return () => (
      <>
        {editMenuSource.value !== null && (
          <a-form rules={formRules}>
            <a-form-item label="菜单名称" name="name">
              <a-input v-model={[editMenuSource.value.name, "value"]} />
              <span>{formNameRuleStatus[editMenuStatus.value]}</span>
            </a-form-item>
          </a-form>
        )}
        {isShowEditorContent.value && (
          <a-tabs v-model={[state.tabType, "activeKey"]} onChange={tabChange}>
            {contentEditModel.map((m) => (
              <a-tab-pane tab={m.name} key={m.type}>
                <m.component />
              </a-tab-pane>
            ))}
          </a-tabs>
        )}
      </>
    );
  },
});
</script>
<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  height: 100%;
}
</style>