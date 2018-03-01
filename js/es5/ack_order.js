"use strict";

new Vue({
	el: "#ack-order",
	data: function data() {
		return {
			express: [],
			logistics: false,
			num_express: 0
		};
	},
	filters: {
		formatMoney: function formatMoney(value) {
			//rmb符号
			return "￥" + value.toFixed(2);
		}
	},
	mounted: function mounted() {
		this.$nextTick(function () {
			this.expressView();
		});
	},
	methods: {
		expressView: function expressView() {
			//获取json数据
			var _this = this;
			axios({
				method: 'get',
				url: 'data/express.json',
				responseType: 'stream'
			}).then(function (res) {
				_this.express = res.data.data;
			});
		},
		choseLogistics: function choseLogistics(type) {
			this.logistics = type;
		},
		Express: function Express(type) {
			this.num_express = type;
			this.logistics = false;
		}
	}
});
//# sourceMappingURL=ack_order.js.map