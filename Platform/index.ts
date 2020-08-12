import BusinessElectronProxy from '../Proxy/BusinessElectronProxy';
import BusinessWebProxy from '../Proxy/BusinessWebProxy';

export default class Platform<T extends IBusinessProxy> {
  private _proxy: T;

  public init = async (electronProxy: IBusinessProxy = new BusinessElectronProxy(), webProxy: IBusinessProxy = new BusinessWebProxy()) => {
    if (window['electron']) {
      this._proxy = electronProxy as T;
    } else {
      this._proxy = webProxy as T;
    }

    return Promise.resolve();
  };

  get isElectron() {
    return this._proxy.platform === 'ELECTRON';
  }

  get isWeb() {
    return this._proxy.platform === 'WEB';
  }

  get Proxy(){
      return this._proxy;
  }
}
