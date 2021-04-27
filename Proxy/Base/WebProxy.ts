import { ICallOption } from "typings";
import ProxyBase from "./ProxyBase";

export default class WebProxy<T> extends ProxyBase<T>{
  invoke = (callOption: ICallOption): Promise<any> => {
    return null;
  }
}