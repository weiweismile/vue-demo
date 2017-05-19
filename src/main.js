// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/layout'
//1 使用cnpm install vue-router 将vue-router引入进来，并放置在node_modules里面
// 引入的时候就直接像下面这样写，不用写路径
import vueRouter from 'vue-router'
// 引入组件
import IndexPage from './pages/index'
import VueResource from 'vue-resource'
import detail from './pages/detail'
import analysis from './components/analysis'
// 2 之后只有use来注册这个vue.router
Vue.use(vueRouter)
Vue.use(VueResource)
// 3 实例化一个vueRouter
let router=new vueRouter({
	mode:'history',
	// 然后定义路由(routes)
	routes:[{
        path:'/',
        component: IndexPage
	},
  {
    path:'/detail',
    component: detail,
    children:[
      {
        path:'analysis',
        component:analysis
      }
    ]
  }
  ]
})
// 一般我们将路由模块放在main.js入口文件中，但是如果路由模块过大，我们也可以将路有单独抽离出来
// 一般插件都是从这个入口文件引入,r然后通过use()进行声明要使用改插件
// 
// 当引入Vue-Resource后，可以基于全局的Vue对象使用http（Vue.http）,也可以基于某个vue实例使用http(this.$http)。因为返回的是promise
// 对象，因此后续可以使用then方法。




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 上面实例化的vue-router,将它挂载到vue上
  router,
  template: '<layout/>',
  components: { layout }
})
