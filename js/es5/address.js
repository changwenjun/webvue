"use strict";

new Vue({
	el: "#add_ress",
	data: function data() {
		return {
			address: []
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
			this.addressView();
		});
	},
	methods: {
		addressView: function addressView() {
			//获取json数据
			var _this = this;
			axios({
				method: 'get',
				url: 'data/address.json',
				responseType: 'stream'
			}).then(function (res) {
				_this.address = res.data.result;
			});
		}
	}
});
//# sourceMappingURL=address.js.map