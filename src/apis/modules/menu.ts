import { Menu } from '@/pages/MenuEditor/typings';
import { ajaxPost } from '../ajax';


export const ApiSaveMenu = (data: { buttons: Menu.Data[] }) => {
  return ajaxPost('/sys/adm/user/menu/save', data);
}

export const ApiGetMenu = () => {
  return ajaxPost('/sys/adm/user/menu/get');
}