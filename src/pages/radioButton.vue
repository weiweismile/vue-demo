<template>
	<div class="radioButton">
		<button type='button' v-for='(item,index) in period' @click='chosenSelection(index)' :class='{active:index===nowIndex}'>{{item.label}}</button>
	</div>
</template>
<script>
	export default{
		props:{
			period:{
				type:Array,
				default:[
                    {
                      value:0,
                      label:'test'
                    }
				]
			}
		},
		data(){
			return{
				nowIndex:0
			}
		},
		methods:{
			chosenSelection(index){
                this.nowIndex=index
                this.$emit('on-change',this.period[index])
			}
		}
	}
</script>
<style scoped>
	button{
		padding: 5px 10px;
		margin-right: 10px;
		background-color: #fff;
		border: 1px #ccc solid;
		border-radius: 5px;
	}
	.active{
		color: #fff;
		background-color: #4fc08d;
	}
</style>
/*这里只能单选是因为我用的nowindex来展现被选中的状态，因为nowindex一次只能记录一个value，即只能选中一个按钮，所以展现出来的样式是单选框*/