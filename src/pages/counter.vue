<template>
	<div class="counter">
	    <div class="form-group">
	       <button class="minus" @click='minus'>-</button>
	       <input type="text" v-model='number' @keyup='fixNumber'>
		   <button class="plus" @click='plus'>+</button>
	    </div>
	</div>
</template>
<script>
	export default{
		// 使用props的目的是组件在其他页面用的时候，各个页面根据自己的情况传入最大值和最小值来控制
		props:{
			max:{
				type:Number,
				default:5
			},
			min:{
				type:Number,
				default:1
			}
		},
		data(){
			return{
				number:this.min
			}
		},
		watch:{
			number(){
				// 需要发送给父组件，因为在父组件的页面需要计算总价，所以需要emit给父组件
				this.$emit('on-change',this.number)
			}
		},
	    methods:{
	    	  fixNumber(){
                 let fix
                 if(typeof this.number==='string'){
                 	fix=Number(this.number.replace(/\D/g,''))
                 }else{
                 	fix=this.number
                 }
                 if(fix>this.max||fix<this.min){
                 	fix=this.min
                 }
                 this.munber=fix
	    	  },
              minus(){
              	if(this.number<=this.min){
              		return
              	}
              	this.number--
              },
               plus(){
               	if(this.number>=this.max){
               		return
               	}
              	this.number++
              }
	    }
	}
</script>
<style scoped>
	.form-group input{
		width: 30px;
		text-align: center;
	}
</style>