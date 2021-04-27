declare namespace electronProxy {
  interface ICallOption {
    name: string;
    params?: any;
    callBack?: Function;
  }

  interface IProxy<T> {
    invoke(callOption: ICallOption): Promise<any>;
    inject(callback: Function): void;
    content: T;
  }

  interface IBusinessProxy {
    platform: string;
  }

  class BusinessElectronProxy implements IBusinessProxy {
    platform: string;
  }

  class BusinessWebProxy implements IBusinessProxy {
    platform: string;
  }

  class ProxyBase<T> implements IProxy<T> {
    invoke(callOption: ICallOption): Promise<any>;
    inject(callback: Function): void;
    content: T;
  }

  class NativeProxy<T> extends ProxyBase<T> {}

  class WebProxy<T> extends ProxyBase<T> {}

  class Platform<T extends IBusinessProxy> {
    init (electronProxy?: IBusinessProxy, webProxy?: IBusinessProxy): Promise<void>;
    readonly isElectron: boolean;
    readonly isWeb: boolean;
    readonly Proxy: T;
  }
}

export = electronProxy;
