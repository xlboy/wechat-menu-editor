

export namespace Menu {
    export enum Type {
        Text = 'Text',
        Image = 'Image',
        MiniProgram = 'MiniProgram',
        WebLink = 'WebLink',
        MiniProgramPage = 'MiniProgramPage',
    }

    export interface Content {
        [Type.Text]: {
            key: string;
            text: string;
        },
        [Type.Image]: {
            key: string;
            imgSrc: string;
        },
        [Type.MiniProgram]: {
            key: string;
            imgSrc: string;
            miniProgramConfig: {
                title: string;
                appId: string;
                pagePath: string;
            }
        },
        [Type.WebLink]: {
            link: string;
        },
        [Type.MiniProgramPage]: {
            appId: string;
            pagePath: string;
        }
    }

    export enum Status {
        Main = 'Main',
        Child = 'Child',
        Not = 'Not'
    }

    export interface Data<T extends Type = Type> {
        name: string;
        type: T;
        content: Content[T];
        children?: Data<T>[];
    }
}

