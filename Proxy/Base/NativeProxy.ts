import { ICallOption } from "typings";
import ProxyBase from "./ProxyBase";

export default class NativeProxy<T> extends ProxyBase<T>{
  invoke = async (callOption: ICallOption): Promise<any> => {
    const { name, params = {}, callBack } = callOption;

    const func = this.content[name];

    if (!func) {
      throw new Error("function not find!!!");
    }

    const result = await func.apply(null, Object.values(params));

    if (callBack) {
      return callBack(result);
    } else {
      return result;
    }
  }
}