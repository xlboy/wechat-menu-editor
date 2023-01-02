
import { Menu } from "../typings";

const baseMenuModel: Menu.Content = {
    [Menu.Type.Text]: {
        key: '',
        text: ''
    },
    [Menu.Type.Image]: {
        key: '',
        imgSrc: ''
    },
    [Menu.Type.MiniProgram]: {
        key: '',
        imgSrc: '',
        miniProgramConfig: {
            title: '',
            appId: '',
            pagePath: '',
        }
    },
    [Menu.Type.WebLink]: {
        link: '',
    },
    [Menu.Type.MiniProgramPage]: {
        appId: '',
        pagePath: '',
    }
}

export default baseMenuModel