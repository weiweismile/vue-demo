<template>
	<div class="index-wrap">
       <div class="index-left">
       	  <div class="index-left-block">
       	  	<h2>旅游指南</h2>
       	  	<!-- 这里的template作为内部组件，相当于div -->
       	  	<template v-for="product in touristRoutes">
       	  	    <h3>{{product.title}}</h3>
	       	  	<ul>
	       	  		<li  v-for="item in product.list">
	       	  		<!-- 利用v-bind进行属性的定义,v-bind可以缩写为： -->
	       	  			<a v-bind:href='item.url'>{{item.name}}</a>
	       	  			<span v-if='item.hot' class="hot-tag">HOT</span>
	       	  		</li>
	       	  	</ul>
	       	  	<div class="hr" v-if='product.last'></div>
       	  	</template>
       	  </div>
       <div class="index-left-block lastest-news">
       	  <h2>最新消息</h2>
       	  <ul>
       	  	<li v-for='news in newsList' class="new-item">{{news.name}}</li>
       	  </ul>
       </div>  
       </div>	
       <div class="index-right">
          <slide-show v-bind:slides='slides' :inv='invTime' @onchange='doSomethingOnSlideChange()'></slide-show>
       	  <div class="index-board-list">
       	  <!-- 在class定义时使用数组，表示数组中的每一个类只要符合要求都会被定义,但是类名都要带引号，判断就不用加引号 -->
       	  	 <div class="index-board-item" v-for='(item,index) in boardList' :class="[{'line-last':index%2!==0},'index-board-'+item.id]">
       	  	 	<div class="index-board-item-inner">
       	  	 		<h2>{{item.title}}</h2>
       	  	 		<p>{{item.description}}</p>
       	  	 		<div class="index-board-button">
       	  	 			<router-link :to="{path:'detail/'+item.toKey}" class='button'>点击购买</router-link>
       	  	 		</div>
       	  	 	</div>
       	  	 </div>
       	  </div>
       </div>	
	</div>
</template>
<script>
 import slideShow from '../components/slideShow'
	export default{
		 components: {
		    slideShow
		  },
		// 写在data中的对象，都可以获取到
		data() {
			return{
                productList:[],
                touristRoutes:[],
                domestic:[],
                newsList:[],
                boardList:[],
                invTime: 2000,
			      slides: [
			        {
			          src: require('../assets/slideShow/pic1.jpg'),
			          title: 'xxx1',
			          href: 'detail/analysis'
			        },
			        {
			          src: require('../assets/slideShow/pic2.jpg'),
			          title: 'xxx2',
			          href: 'detail/count'
			        },
			        {
			          src: require('../assets/slideShow/pic3.jpg'),
			          title: 'xxx3',
			          href: 'http://xxx.xxx.com'
			        },
			        {
			          src: require('../assets/slideShow/pic4.jpg'),
			          title: 'xxx4',
			          href: 'detail/forecast'
			        }
			      ]
			}
		},
		created:function(){
			let _this=this
			this.$http.get('api/getProductList')
			// 后面是post的参数
			// this.$http.post('getProductList',{'useId':123})
			.then(function(res){
				var data=res.data
                _this.productList=data.data
                _this.touristRoutes.push(data.overseas,data.domestic)
                _this.newsList=data.newsList
                _this.boardList=data.boardList
				// console.log(res.data)
				// console.log(_this.touristRoutes)
			},function(err){
				console.log(err)
			})
		},
		methods:{
			doSomethingOnSlideChange(){
				// console.log('doSomethingOnSlideChange run!')
				// console.log(this.$on(onchange))
			}
		}
	}
</script>
<style scoped>
    .index-wrap{
    	width: 95%;
    	margin: 0 auto;
    	overflow: hidden;
    }
	.index-left{
		width: 20%;
		height: 100%;
		float: left;
	}
	.index-left-block{
		width: 100%;
		background-color: #fff;
		box-shadow: 0 0 1px #ddd;
		margin-top: 10px;
	}
	.index-left h2{
		background-color: #4fc08d;
		color: #fff;
		padding: 10px 15px;
		margin-bottom: 10px;
	}
	.index-left h3{
        padding: 0 15px 5px;
        font-weight: bold;
	}
	.index-left ul{
		padding: 10px 15px;
	}
	.index-left ul li{
		padding: 5px;
		cursor: pointer;
	}
	.index-left .hot-tag{
		background-color: red;
		color: #fff;
	}
	.hr{
		height: 1px;
		width: 100%;
		background-color: #ddd;
		margin-bottom: 20px;
	}
	.index-right{
		width: 80%;
		float: left;
	}
	.index-board-item{
		width: 48%;
		background-color: #fff;
		box-shadow: 0 0 1px #ddd;
		padding: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
        display: inline-block;
        box-sizing:border-box;
	}
	.index-board-item-inner{
		padding-left: 30%;
	}
	.index-board-item h2{
		font-size: 18px;
		font-weight: bold;
		color: #000;
		margin-bottom: 15px;
	}
	.line-last{
		margin-right: 0;
	}
	.index-board-button{
		margin-top: 20px;
	}
	.index-board-button .button{
		background-color: #4fc08d;
		color: #fff;
		display: inline-block;
		padding: 10px 20px;
		cursor: pointer;
	}
	.index-board-car .index-board-item-inner{
		background: url(../assets/images/1.png) no-repeat;
	}
	.index-board-loud .index-board-item-inner{
		background: url(../assets/images/2.png) no-repeat;
	}
	.index-board-earth .index-board-item-inner{
		background: url(../assets/images/3.png) no-repeat;
	}
	.index-board-hill .index-board-item-inner{
		background: url(../assets/images/4.png) no-repeat;
	}
	/*最新消息的最后一个消息内容很长，下面的代码是将它的样式进行设置*/
	.new-item{
		display: inline-block;
		width:170px;
		/*超出80部分进行隐藏*/
		overflow: hidden;
		/*text-overflow 属性规定当文本溢出包含元素时发生的事情。ellipsis显示省略符号来代表被修剪的文本。*/
		text-overflow: ellipsis;
		/*规定段落中的文本不进行换行*/
		white-space: nowrap;
	}
</style>