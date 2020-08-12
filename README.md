# electron跨平台应用的本质是什么？
- 本质是把web页面，利用electron提供的webview容器，打包成桌面应用。【此处可能需要electon的node端能力，进行一些文件的读写操作】
# electron-proxy是什么？
- electron-proxy是为了解决不同平台，调用相同方法，得到预期结果的一个抽象封装。
# electron-proxy是为了解决什么问题？ 
- 如同一个功能的web页面，期望在浏览器和electron中都可以运行，但是内部都需要调用从本地获取用户信息【例子不一定合适】的方法，electron有electron的实现，浏览器有浏览器的实现，在代码里如何做呢？
```
if (electron){
  electron.getUserInfo()
} else {
  window.getUserInfo()
}
```
- 上述的代码确实可以解决问题，但是，如果后续还要求在其他平台，有不同的实现，怎么做呢？if (Android)， if (IOS)？？？都9102年了，不能用面向对象吗？electron-proxy就是帮你利用面向对象的设计模式----策略模式，帮你解决不同平台的问题，如何做？
# electron-proxy使用？
- 外部业务层可以定义不用平台，统一实现方法的接口：
```
interface ICustomBusinessProxy extends IBusinessProxy {
  getUserInfo: () => Promise<IUserInfo>;
}
```
- 分别实现electron和web的getUserInfo的方法：
```
class CustomBusinessElectronProxy extends BusinessElectronProxy implements ICustomBusinessProxy {
  constructor(content: ICustomBusinessProxy = window['electron']) {
    super(content);
  }
  getUserInfo = async (): Promise<IUserInfo> => {
    await this.invoke({
      name: 'getUserInfo',
    })
  }
}

class CustomBusinessWebProxy extends BusinessWebProxy implements ICustomBusinessProxy {
  getUserInfo = async (): Promise<IUserInfo> => {
    return Promise.resolve(new UserInfo());
  }
}
```
- 对外导出
```
import { Platform } from "electron-proxy";

export default new Platform<ICustomBusinessProxy>();

export {
  CustomBusinessElectronProxy,
  CustomBusinessWebProxy
}
```
- 在web页面启动的入口文件处，注入
```
platform
  .init(new CustomBusinessElectronProxy(), new CustomBusinessWebProxy())
  .finally(() => render(App));
```
- 在调用的地方，使用
```
const userInfo = await platform.Proxy.getUserInfo()
```
- 如果需要做平台扩展【新增安卓、ios平台】，如何做？继承Platform，添加新增的策略函数即可
```
import { Platform } from "electron-proxy";
class CustomerPlatform<T extends IBusinessProxy> extends Platform<T> {

}

export default CustomerPlatform;

```
