"use strict";

new Vue({
	el: "#index",
	data: function data() {
		return {
			totalmoney: 0,
			items: [],
			checkAllFlag: false,
			flag: 0,
			popup: false
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
			this.cartView();
		});
	},
	methods: {
		cartView: function cartView() {
			//获取json数据
			var _this = this;
			axios({
				method: 'get',
				url: 'data/cart.json',
				responseType: 'stream'
			}).then(function (res) {
				_this.items = res.data.result.list;
				_this.totalmoney = res.data.result.totalMoney;
			});
		},
		changSize: function changSize(item, type) {
			//物品数量
			if (type == -1) {
				item.productQuantity > 1 ? item.productQuantity-- : item.productQuantity = 1;
			} else {
				item.productQuantity++;
			}
			this.calcTotalOrice();
		},
		selectedProduct: function selectedProduct(item) {
			//单选
			var _this = this;
			if (typeof item.checked == 'undefined') {
				this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked;
			}
			this.items.forEach(function (item, index) {
				if (item.checked != true) {
					_this.flag += 0;
				} else {
					_this.flag += 1;
				}
				//console.log(_this.flag);
			});
			this.checkAllFlag = this.flag == this.items.length ? true : false;
			this.calcTotalOrice();
			_this.flag = 0;
		},
		calcTotalOrice: function calcTotalOrice() {
			//总价计算
			var _this = this;
			_this.totalmoney = 0;
			this.items.forEach(function (item, index) {
				if (item.checked) {
					_this.totalmoney += item.productPrice * item.productQuantity;
				}
			});
		},
		checkAll: function checkAll(flag) {
			//全选
			this.checkAllFlag = flag;
			var _this = this;
			this.items.forEach(function (item, index) {
				if (typeof item.checked == 'undefined') {
					_this.$set(item, "checked", _this.checkAllFlag);
					//this.$set(item,"checked",true);
				} else {
					item.checked = _this.checkAllFlag;
				}
			});
			this.calcTotalOrice();
		},
		floatWindow: function floatWindow(type, index) {
			this.popup = type;
			this.Confirm = index;
		},
		delShop: function delShop() {
			this.items.splice(this.Confirm, 1);
			this.popup = false;
			this.calcTotalOrice();
		}

	}
});
//# sourceMappingURL=cart.js.map