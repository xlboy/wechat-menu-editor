import TextType from '../components/ContentEdit/components/TextType.vue'
import ImageType from '../components/ContentEdit/components/ImageType.vue'
import MiniProgramType from '../components/ContentEdit/components/MiniProgramType.vue'
import WebLinkType from '../components/ContentEdit/components/WebLinkType.vue'
import MiniProgramPageType from '../components/ContentEdit/components/MiniProgramPageType.vue'

import { Menu } from '../typings'
type ContentEditModel<T extends Menu.Type = Menu.Type> =
    {
        type: T,
        name: string;
        component: typeof TextType
    }


const contentEditModel: ContentEditModel[] = [
    {
        type: Menu.Type.Text,
        name: '事件文本',
        component: TextType
    },
    {
        type: Menu.Type.Image,
        name: '事件图片',
        component: ImageType
    },
    {
        type: Menu.Type.MiniProgram,
        name: '事件小程序',
        component: MiniProgramType
    },
    {
        type: Menu.Type.WebLink,
        name: '网站链接',
        component: WebLinkType
    },
    {
        type: Menu.Type.MiniProgramPage,
        name: '小程序页面',
        component: MiniProgramPageType
    },
] 

export default contentEditModel