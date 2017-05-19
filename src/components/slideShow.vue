<template>
	<div class="slideShow" @mouseover='clearInv' @mouseout='runInv'>
		<div class="slide-img">
			<a :href='slides[nowIndex].href'>
			  <transition name='slide-trans'>
				 <img v-if='show' :src='slides[nowIndex].src'>
			  </transition>
			  <transition name='slide-trans-old'>
				 <img v-if='!show' :src='slides[nowIndex].src'>
			  </transition>
			</a>
		</div>
		<div class="slide-bottom">
		    <h2>{{slides[nowIndex].title}}</h2>
		    <ul class="slide-pages">
		    	<li @click='goto(prevIndex)'>&lt;</li>
		    	<li v-for='(item,index) in slides' @click='goto(index)'>
		    		<a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
		    	</li>
		    	<li @click='goto(nextIndex)'>&gt;</li>
		    </ul>
		</div>
	</div>
</template>
<script>
	export default {
       props:{
       	 slides:{
       	 	type:Array,
       	 	default:[]
       	 },
       	 inv:{
       	 	type:Number,
       	 	default:1000
       	 }
       },
       data(){
       	  return{
       	  	 nowIndex: 0,
       	  	 show:true
       	  }
       },
       // 使用computed时，要使用return返回值，才能调用你定义的计算属性
       computed:{
       	  prevIndex(){
       	  	if(this.nowIndex===0){
               return this.slides.length-1;
       	  	}
       	  	return this.nowIndex-1;
       	  },
       	  nextIndex(){
       	  	if (this.nowIndex===3) {
       	  		return 0
       	  	}else{
                return this.nowIndex+1
       	  	}
       	  }
       },
       methods:{
       	 goto(index){
       	 	 this.show = false
             setTimeout(() => {
		         this.show = true
		         this.nowIndex = index
		         // 用emit来触发父组件，从而子组件向父组件进行通讯
		         this.$emit('onchange',1)
		       }, 10)
       	 },
       	 runInv(){
       	 	this.invId=setInterval(()=>{this.goto(this.nextIndex)},this.inv)
       	 },
       	 clearInv(){
       	 	clearInterval(this.invId)
       	 }
       },
       mounted(){
       	 this.runInv()
       }
	}
</script>
<style scoped>
    .slide-trans-enter-active{
    	transition: all .5s;
    }
    /*从900px到0的一个过程，我理解的slide-trans-enter就是元素一按开始的位置，而slide-trans-enter-active就是从开始到动画完成这中间的动画效果*/
    /*transition 最好是配合transform来使用，对于position中的left之类的是不支持的*/
    .slide-trans-enter{
    	transform: translateX(900px);
    }
    .slide-trans-old-leave-active{
    	transition: all .5s;
    	transform: translateX(-900px);
    }
	.slideShow{
		width: 98%;
		height: 400px;
		position: relative;
		margin:10px 15px 10px 0;
		overflow: hidden;
	}
	.slide-img img{
		width: 100%;
		height: 400px;
	}
	.slide-bottom{
		width: 100%;
		height: 20px;
		line-height: 20px;
		background: #000;
		opacity: .5;
		position: absolute;
		bottom: 0;
		left: 0;
		color: #fff;
	}
	.slide-bottom ul{
		list-style: none;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.slide-bottom ul li{
		float: left;
		padding-left: 10px;
		cursor: pointer;
	}
	.slide-pages li .on {
		text-decoration: underline;
	}
</style>