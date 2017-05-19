<template>
	<div class="analysis">
		<div class="contentTop">
			<h2>流量分析</h2>
			<p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
			<div class="sale-board-form">
				<div class="form-group">
					<label>购买数量：</label>
					<div class="form-group-line">
					  <v-counter @on-change='onParamChange("buyNum",$event)'></v-counter>
					</div>
				</div>
				<div class="form-group">
					<label>产品类型：</label>
					<div class="form-group-line">
					  <v-selection :list='productType' @on-change='onParamChange("buyType",$event)'></v-selection>
					</div>
				</div>
				<div class="form-group">
					<label>有效时间：</label>
					<div class="form-group-line">
					   <radio-b :period='periodList' @on-change='onParamChange("period",$event)'></radio-b>
					</div>
				</div>
				<div class="form-group">
					<label>产品版本：</label>
					<div class="form-group-line">
					   <check-box :version='versionList' @on-change='onParamChange("versions",$event)'></check-box>
					</div>
				</div>
				<div class="form-group">
					<label>总价：</label>
					<span>678元</span>
				</div>
			</div>
			<button type="button" class="purchase" @click='onPurchase'>立即购买</button>
		</div>
		<div class="contentBottom"></div>
		<v-dialog :is-show='isShowDialog' @onclose='closeMyself'>
		    <div class="wrap">
			  <table class="dialog-table">
				<tr>
					<th>购买数量</th>
		            <th>产品类型</th>
		            <th>有效时间</th>
		            <th>产品版本</th>
		            <th>总价</th>
				</tr>
				<tr>
					<td>{{ buyNum }}</td>
		            <td>{{ buyType.label }}</td>
		            <td>{{ period.label }}</td>
		            <td>
		              <span v-for="item in versions">{{ item.label }}</span>
		            </td>
		            <td>{{ price }}</td>
				</tr>
			</table>
			<h3>请选择银行</h3>
            <v-bank @on-change=''></v-bank>
			<button class="confirmBuy">确认购买</button>
			</div>
		</v-dialog>
	</div>
</template>
<script>
	import counter from '../pages/counter'
	import selection from '../pages/selection'
	import radioB from '../pages/radioButton'
	import checkbox from '../pages/checkbox'
	import dialog from '../components/dialog'
	import bank from '../pages/bank'
	export default{
		components:{
			VCounter:counter,
			VSelection:selection,
			RadioB:radioB,
			CheckBox:checkbox,
			VDialog:dialog,
			VBank:bank
		},
		data(){
			return{
				buyNum: 0,
			    buyType: {},
			    versions: [],
			    period: {},
			    price: 687,
			    isShowDialog:false,
				productType:[
                   {
                   	value:0,
                   	label:'入门版'
                   },
                   {
                   	value:1,
                   	label:'中级版'
                   },
                   {
                   	value:2,
                   	label:'高级版'
                   }
				],
				 periodList: [
			        {
			          label: '半年',
			          value: 0
			        },
			        {
			          label: '一年',
			          value: 1
			        },
			        {
			          label: '三年',
			          value: 2
			        }
			    ],
			     versionList: [
			        {
			          label: '客户版',
			          value: 0
			        },
			        {
			          label: '代理商版',
			          value: 1
			        },
			        {
			          label: '专家版',
			          value: 2
			        }
			    ]
			}
		},
		methods:{
			onParamChange(attr,val){
				if(attr=='buyType'){
					// 因为buyType这边传输的是index进来
					this[attr]=this.productType[val]
				}else{
                   this[attr]=val
				}
				// console.log(val)
			},
			onPurchase(){
				this.isShowDialog=true
			},
			closeMyself(){
				this.isShowDialog=false
			}
		},
		mounted(){
			this.buyNum=1
			this.buyType=this.productType[0]
			this.versions = [this.versionList[0]]
            this.period = this.periodList[0]
		}
	}
	// this[attr]=val
	// 上面传入的$event就是子组件传入的对象
</script>
<style scoped>
    .analysis{
    	padding: 10px;
    }
	.contentTop p{
		margin-bottom: 20px;
	}
	.form-group{
		margin-bottom: 20px;
	}
	.form-group-line{
		display: inline-block;
	}
	.purchase{
		padding: 10px 15px;
		color: #fff;
		background-color: #4fc08d;
		border: 1px #ccc solid;
		border-radius: 5px;
	}
	.wrap{
		width: 90%;
		margin: 0 auto;
	}
	.dialog-table{
		width: 100%;
		margin: 0 auto;
		text-align: center;
	}
	.dialog-table tr:first-child{
        color: #fff;
		background-color: #4fc08d;
	}
	.dialog-table tr th,td{
		padding: 10px 15px;
		border: 1px solid #ccc;
	}
	.confirmBuy{
		padding: 10px 15px;
		color: #fff;
		background-color: #4fc08d;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
</style>