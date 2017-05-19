<template>
	<div v-if='isShow'>
	    <div class="dialog-cover" @click='closeMyself'></div>
		<div class="dialog-wrap">
			<div class="dialog-content">
			    <p class="dialog-close" @click='closeMyself'></p>
				<slot>empty</slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			closeMyself(){
				this.$emit('onclose')
			}
		}
	}
</script>
<style scoped>
	.dialog-cover{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		background-color: #000;
		opacity: .5;
		filter:alpha(opacity=50);
	}
	.dialog-wrap{
		position: absolute;
		left: 50%;
		top: 200px;
		z-index: 100;
		width: 1000px;
		height: 300px;
		margin-left: -400px;
		background-color: #fff;
		border: 2px #000 solid;
	}
	.dialog-close{
		position: relative;
		display: inline-block;
		width: 40px;
		height: 40px;
		overflow: hidden;
		cursor: pointer;
	}
	.dialog-close:before,.dialog-close:after{
		position: absolute;
		content: '';
		top: 50%;
		left: 0; 
		margin-top: -1px;
		background-color: #000;
		width: 100%;
		height: 3px;
	}
	.dialog-close:before{
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		-moz-transform:rotate(45deg);
		-o-transform:rotate(45deg);
		-ms-transform:rotate(45deg);
	}
	.dialog-close:after{
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);/* Safari 和 Chrome 内核webkit*/
		-moz-transform:rotate(-45deg);/* Firefox 内核gecko*/
		-o-transform:rotate(-45deg);/* Opera 内核presto*/
		-ms-transform:rotate(-45deg);/* IE 9 内核trident*/
	}
</style>