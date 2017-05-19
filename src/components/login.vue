<template>
	<div class="login">
		<form>
			<div class="form-group">
				<label for='exampleInputText1'>用户名:</label>
				<input type="text" class="form-control" id="exampleInputText1" placeholder="请输入用户名" v-model='useName'> 
				<span class="errorMessage">{{useErrors.errorText}}</span>
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">密码:</label>
				<input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入密码" v-model='password'>
				<span class="errorMessage">{{passwordErrors.errorText}}</span>
			</div> 
			<button type="button" class="btn" @click='onLogin'>登录</button>
		</form>
		<p class="errorMessage">{{errorText}}</p>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				useName:'',
				password:'',
				errorText:''
				
			}
		},
		computed:{
			useErrors(){
				let errorText,status
				if(!/@/g.test(this.useName)){
					status=false
					errorText='不包含@'
				}else{
					status=true
					errorText=''
				}
				// 用来记录是否是第一次进入登录，如果是第一次则errorText为空，之后this.userFlag为TRUE便不再影响errorText
				// this.userFlag没有在data上定义则为undefined
				if (!this.userFlag) {
			        errorText = ''
			        this.userFlag = true
			      }
				// 必须要返回，否则不能获取到status,errorText
				return {status,errorText}
			},
			passwordErrors(){
				let errorText,status
				if(!/^\w{1,6}$/g.test(this.password)){
					status=false
					errorText='密码不是1-6位'
				}else{
					status=true
					errorText=''
				}
				if (!this.passwordFlag) {
			        errorText = ''
			        this.passwordFlag = true
			      }
				// 返回给passwordErrors对象
				return {status,errorText}
			}
		},
		methods:{
			onLogin(){
				if(!this.useErrors.status||!this.passwordErrors.status){
					this.errorText='还有一些错误存在。。。。。。'
				}else{
					this.errorText=''
					this.$http.get('api/login')
					.then((res)=>{
						this.$emit('haslog',res.data)
					},(error)=>{
                         console.log(error)
					})
				}
			}
		}
	}
</script>
<style scoped>
	.login{
		width: 100%;
		height: 100%;
	}
    form{
    	display: block;
    	margin-top: 50px;
    	margin-left: 100px;
    }
	.form-group{
		margin-bottom: 15px;
	}
	.form-group label{
		width: 100px;
		display: inline-block;
		margin-bottom: 5px;
		font-size: 20px;
	}
	.form-group input{
		width: 300px;
		padding:5px;
	}
	.btn{
		padding: 15px 20px;
		color: #fff;
		background-color: #4fc08d;
		border: none;
	}
	.errorMessage{
		color: red;
	}
</style>