<template>
	<div class="selection">
		<div class="content">
		<!-- 这里的$event就是js事件中的event，存储了很多关于事件的信息 -->
			<select  @change="chooseSelection($event.target.value)">
			<!-- 在option上面绑定点击事件没有反应 -->
				<option v-for='(item,index) in list' :value='item.value'>{{item.label}}</option>
			</select>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			list:{
				type:Array,
				default:[{
					value:0,
					label:'test'
				}]
			}
		},
		data(){
			return{
			  selected:null
			}
		},
		methods:{
			chooseSelection(item){
               this.$emit('on-change',item)
			}
		}
	}
</script>
<style scoped>
	.content{
		display: inline-block;
	}
</style>