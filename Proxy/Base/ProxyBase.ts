export default abstract class ProxyBase<T> implements IProxy<T> {
  content: T;

  constructor(content?: T) {
    if (content) {
      this.content = content;
    } else {
      this.content = window['electron']
    }
  }

  invoke = (callOption: ICallOption): Promise<any> => {
    return null;
  }

  inject = (callback: Function): void => {

  }
}