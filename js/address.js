new Vue({
	el:"#add_ress",
	data:function(){
		return{
			address: []
		}
	},
	filters:{
		formatMoney:function(value){//rmb符号
				return	"￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function () {
			this.addressView();
			console.log(this.address)
		})
	},
	methods:{
		addressView:function(){//获取json数据
		var  _this=this;
			axios({
			  method:'get',
			  url:'data/address.json',
			  responseType:'stream'
			}) .then(function(res) {
			 _this.address=res.data.result.list;
			});
		}
	}
})