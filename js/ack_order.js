new Vue({
	el:"#ack-order",
	data:function(){
		return{
			express:[],
			logistics:false,
			num_express:0
		}
	},
	filters:{
		formatMoney:function(value){//rmb符号
				return	"￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function () {
			this.expressView();
		})
	},
	methods:{
		expressView:function(){//获取json数据
		var  _this=this;
			axios({
			  method:'get',
			  url:'data/express.json',
			  responseType:'stream'
			}) .then(function(res) {
			 _this.express=res.data.data;
			});
		},
		choseLogistics:function(type){
			this.logistics=type;
		},
		Express:function(type){
			this.num_express=type;
			this.logistics=false;
		}
	}
})