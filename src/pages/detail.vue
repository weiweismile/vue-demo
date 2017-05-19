<template>
	<div class="detail">
		<div class="leftsidebar">
			<div class="imageLogo">
				<img :src="productIcon">
			</div>
			<div class="nav">
				<ul>
					<li v-for='(product,index) in products'><router-link :to="{ path: product.path }" :class='{active:product.active}'>{{product.name}}</router-link></li>
				</ul>
			</div>
		</div>
		<div class="content">
		  <keep-alive>
			<router-view></router-view>
		  </keep-alive>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				products: [
			        {
			          name: '数据统计',
			          path: 'count',
			          icon: require('../assets/images/1.png'),
			          active: false
			        },
			        {
			          name: '数据预测',
			          path: 'forecast',
			          active: false
			        },
			        {
			          name: '流量分析',
			          path: 'analysis',
			          active: false
			        },
			        {
			          name: '广告发布',
			          path: 'publish',
			          active: false
			        }
			      ],
			      imgMap: {
				        '/detail/count': require("../assets/images/1.png"),
				        '/detail/forecast': require("../assets/images/2.png"),
				        '/detail/analysis': require("../assets/images/3.png"),
				        '/detail/publish': require("../assets/images/4.png")
				   }
			}
		},
		computed:{
			productIcon(){
				return this.imgMap[this.$route.path]
			}
		}
	}
</script>
<style scoped>
    .detail{
    	width: 1400px;
    	height: 100%;
    	margin: 0 auto;
    }
	.leftsidebar{
		float: left;
        width: 200px;
        height: 400px;
        margin-right: 10px;
        background-color: #fff;
        text-align: center;
	}
	.nav ul{
        width: 100%;
        font-size: 20px;
	}
	.nav ul li{
		padding: 5px 0;
	}
	.nav ul li:hover{
		background-color: #4fc08d;
		color: #fff;
	}
	.active{
		background-color: #4fc08d;
		color: #fff;
	}
	.content{
        display: inline-block;
		width: 1000px;
		background-color: #fff;
	}
</style>