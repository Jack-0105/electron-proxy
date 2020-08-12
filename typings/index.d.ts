interface ICallOption {
  name: string;
  params?: any;
  callBack?: Function;
}

interface IProxy<T> {
  invoke(callOption: ICallOption): Promise<any>;
  inject(callback: Function): void;
  content: T
}

interface IBusinessProxy {
  platform: string;
}