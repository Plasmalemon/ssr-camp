# ssr-camp

## 首页异步数据
add-store-to-client-server 中实现方法是 component中通过生命周期componentDidMount(useEffect)来做异步数据请求，通过store注入到client和server，通过props渲染；但是此时右键查看，页面中的list是空的。

* 仿照nuxt，在component设置静态方法loadData（11）

    * 加载路由，如何解决路由匹配组件问题
    * 如何解决， 多个数据如何同时加入到store中