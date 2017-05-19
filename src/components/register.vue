<template>
	<div>
		<form>
			<div class="form-group">
				<label for="userName">用户名：</label>
				<input type="text" id="userName" placeholder="请输入用户名" v-model='username'/>
				<span>{{userErrors.errorText}}</span>
			</div> 
			<div class="form-group">
				<label for="setPossWord">设置密码：</label>
				<input type="password" id="setPossWord" placeholder="请输入密码" v-model='setPossWord'/>
				<span>{{setPossWordErrors.errorText}}</span>
			</div>
			<div class="form-group">
				<label for="confirmPassword">确认密码：</label>
			    <input type="password" id="confirmPassword" placeholder="请再次输入密码" v-model='confirmPassword'/>
			    <span>{{confirmPasswordErrors.errorText}}</span>
			</div>
			<button type="button" class="btn" @click='onRegister'>注册</button>
		</form>
		<p>{{errorText}}</p>
	</div>
</template>
<script>
	export default{
        data(){
        	return{
               username:'',
               setPossWord:'',
               confirmPassword:'',
               errorText:''
        	}
        },
        computed:{
        	userErrors(){
        		let status,errorText
        		if (/@/g.test(this.username)) {
        			errorText=''
        			status=true
        		}else{
        			errorText='不包含@'
        			status=false
        		}
        		if (!this.userFlag) {
                    errorText=''
                    this.userFlag=true
        		}
        		return{status,errorText}
        	},
        	setPossWordErrors(){
        		let status,errorText
        		if (!/^\w{1,6}$/g.test(this.setPossWord)) {
        			errorText='请输入六位密码'
        			status=false
        		}else{
        			errorText=''
        			status=true
        		}
        		if (!this.passwordFlag) {
                    errorText=''
                    this.passwordFlag=true
        		}
        		return{status,errorText}
        	},
        	confirmPasswordErrors(){
        		let status,errorText
        		if (this.setPossWord===this.confirmPassword) {
        			errorText=''
        			status=true
        		}else{
        			errorText='两次输入的密码不一致'
        			status=false
        		}
        		if (!this.confirmFlag) {
                    errorText=''
                    this.confirmFlag=true
        		}
        		return{status,errorText}
        	}
        },
        methods:{
        	onRegister(){
        		if(!this.userErrors.status||!this.setPossWordErrors.status||!this.confirmPasswordErrors.status){
        			this.errorText='还存在一些错误。。。。。。。'
        		}else{
        			this.errorText=''
	        		this.$http.get('api/login')
	        		.then((data)=>{
	        			this.$emit('hasRegister',data.data)
	        		},(error)=>{
                        console.log(error)
	        		})
        	}
        }
	}
}
</script>
<style scoped>
	form{
		margin: 20px 50px;
		font-size: 20px;
	}
	.form-group{
		margin-bottom: 10px;
	}
	.form-group label{
		width: 100px;
		display: inline-block;
	}
	.form-group input{
		width: 300px;
		padding: 5px;
	}
    .btn{
		padding: 15px 20px;
		color: #fff;
		background-color: #4fc08d;
		border: none;
	}
</style>