<template>
	<div class="checkbox">
		<button type='button' v-for='(item,index) in version' @click='toggleSelection(item)' :class='{active:checkActive(item)}'>{{item.label}}</button>
	</div>
</template>
<script>
	export default{
		props:{
			version:{
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
				newArr:[]
			}
		},
		methods:{
			toggleSelection(item){
                if(this.newArr.indexOf(item)==-1){
                	this.newArr.push(item)
                	// console.log(this.newArr)
                }else{
                	let i=this.newArr.indexOf(item)
                	this.newArr.splice(i,1)
                }
                // console.log(this.newArr)
                this.$emit('on-change',this.newArr)
			},
			checkActive(item){
				return this.newArr.indexOf(item)!==-1
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