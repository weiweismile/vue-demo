<template>
<!-- 一定要用一个div包裹着 -->
	<div>
		<div class="app-header">
		<!-- app-header-inne用来给内部内容设置宽度，使得内容居中放置 -->
		  <div class="app-header-inner">
			  <div class="header-logo">
			    <router-link :to="{path: '/'}">
			    	<img src="../assets/logo.png">
			    </router-link>
			  </div>	  
			  <div class="header-nav">
			  	<ul class="nav-list">
			  	    <li>{{userName}}</li>
			  	    <li v-if="userName!==''"class="nav-pile">|</li>
			  	    <li v-if="userName!==''" @click='quit'>退出</li>
			  		<li v-if="userName===''" @click='loginClick'>登录</li>
			  		<li class="nav-pile">|</li>
			  		<li v-if="userName===''" @click='registerClick'>注册</li>
			  		<li v-if="userName===''" class="nav-pile">|</li>
			  		<li @click='aboutClick'>关于</li>
			  	</ul>
			  </div>
		   </div>
		</div>
		<!-- content 使用router来做 -->
		<div class="app-content">
		    <keep-alive>
		    <!-- router-view是路由的出口，因此content里面之间显示出了index.vue的内容 -->
			  <router-view></router-view>
		    </keep-alive>	 
		</div>
		<div class="app-footer">
			<p>@ 2017 vue-project demo</p>
		</div>
		<My-Dialog v-bind:isShow='isShowLogin' @onclose='closeDialog("isShowLogin")'>
			<login @haslog='onSuccessLog'></login>
		</My-Dialog>
		<My-Dialog v-bind:isShow='isShowRegister' @onclose='closeDialog("isShowRegister")'>
			<register @hasRegister='onSuccessRegister'></register>
		</My-Dialog>
		<My-Dialog v-bind:isShow='isShowAbout' @onclose='closeDialog("isShowAbout")'>
			<p>author is FWW。。。。。。。。。。。haha</p>
		</My-Dialog>
	</div>
</template>
<script>
import dialog from './dialog'
import login from './login'
import register from './register'
	export default{
		components:{
			MyDialog:dialog,
			login,
			register
		},
		data(){
			return{
				msg:'hahah',
				price:1,
				isShowLogin:false,
				isShowRegister:false,
				userName:'',
				isShowAbout:false
			}
		},
		methods:{
			loginClick(){
                this.isShowLogin=true
			},
			closeDialog(attr){
				this[attr]=false
			},
			registerClick(){
				this.isShowRegister=true
			},
			onSuccessLog(data){
                 console.log(data)
                 this.closeDialog('isShowLogin')
                 this.userName=data.username
			},
			quit(){
				this.userName=''
			},
			aboutClick(){
				this.isShowAbout=true
			},
			// 直接在这里接收子组件传来的数据
			onSuccessRegister(data){
				 console.log(data)
				 this.closeDialog('isShowRegister')
                 this.userName=data.username
			}
		}
	}
</script>
<!-- 因为layout放入了全局的样式，所以最好不要放入scoped，将局限性放大 -->
	<style>
		html, body, div, span, applet, object, iframe,
		 p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
	  margin: 0;
	  padding: 0;
	  border: 0;
	  font-size: 100%;
	  font: inherit;
	  vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
	  display: block;
	}
	body {
	  line-height: 1;
	}
	ol, ul {
	  list-style: none;
	}
	blockquote, q {
	  quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
	  content: '';
	  content: none;
	}
	table {
	  border-collapse: collapse;
	  border-spacing: 0;
	}
	a {
	  color: inherit;
	  text-decoration: none;
	}
	body {
	  background: #f0f2f5;
	  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
	  font-size: 14px;
	  color: #444;
	}
	.app-header{
		width: 100%;
		height: 90px;
		line-height: 90px;
		background-color: #363636;
		color: #fff;
	}
	.app-header-inner{
		width: 95%;
		margin: 0 auto;
	}
	.header-logo,.header-nav{
		display: inline-block;
	}
	.header-logo img{
        width: 50px;
        margin-top: 20px;
	}
	/*清除浮动使用overflow时，应该是子元素进行了浮动，父元素中使用overflow进行浮动清除*/
	.header-nav{
		float: right;
	}
	.nav-list{
		list-style: none;
	}
	.nav-list li{
		display: inline-block;
		cursor: pointer;
	}
	.app-footer{
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		background-color: #ccc;
	}
</style>