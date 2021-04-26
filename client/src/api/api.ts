import { history } from '../index';
import { RoutePath } from "../components/routes";

export const loadRoom = ( id: string ) => {
  history.push ( `${RoutePath.INVITE}/${id}` );
};

