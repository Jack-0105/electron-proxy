import { IBusinessProxy, ICallOption } from 'typings';
import NativeProxy from './Base/NativeProxy';

export default class BusinessElectronProxy implements IBusinessProxy {
  platform: string = 'ELECTRON';

  private _nativeProxy: NativeProxy<IBusinessProxy>;

  constructor(content?: IBusinessProxy) {
    this._nativeProxy = new NativeProxy<IBusinessProxy>(content);
  }

  protected invoke = async (callOption: ICallOption): Promise<any> => {
    const result = await this._nativeProxy.invoke(callOption);

    return result;
  }
}
