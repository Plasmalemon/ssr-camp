# ssr-camp

## 首页异步数据
add-store-to-client-server 中实现方法是 component中通过生命周期componentDidMount(useEffect)来做异步数据请求，通过store注入到client和server，通过props渲染；但是此时右键查看，页面中的list是空的。

* 仿照nuxt，在component设置静态方法loadData（11）

    * 加载路由，如何解决路由匹配组件问题
    * 如何解决， 多个数据如何同时加入到store中


* 服务器层面的性能优化之一

    * 负载均衡，把前端相同的代码部署在4个或者更多的机器上，经过哈希算法来保证该用户每次请求都去访问相同的服务器，
    * 另外在高峰期可以放弃SEO，使用CSR;通过路由参数、接口报错、当前机器的CUP、内存的占有率来开启CSR，通过node返回给浏览器，或者越过node直接通过NGINX来返回给浏览器

* 或者通过爬虫的方式返回用户访问的页面
