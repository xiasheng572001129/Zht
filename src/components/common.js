import axios from 'axios'
var obj = {
    sendyzm: function () {
        var that = this;
        that.isdisabled = true;
        var interval = window.setInterval(function () {
            that.buttonVal = '(' + that.time + ')秒后';
            --that.time;
            if (that.time < 0) {
                that.buttonVal = '重新发送';
                that.isdisabled = false;
                that.time = 60;
                window.clearInterval(interval);
            }
        }, 1000);
    },
    //获取省
    getprovince: function (Callback) {
        axios.get('agent/reg/regPro')
            .then(res => {
                this.provincelist = res.data;
                Callback && Callback(this.provincelist[0].id)
            })
            .catch(error => console.log(error));
    },
    //获取市
    checkpro: function () {
        var proId;
        console.log(this.provincelist)
        for (var i = 0; i < this.provincelist.length; i++) {
            if (this.provincelist[i].name == this.reg.province)
                proId = this.provincelist[i].id;
        }
        console.log(proId)
        this.$axios.post('agent/reg/regCity', {
            id: proId
        })
            .then(res => {
                this.citylist = res.data;
            })
            .catch(error => console.log(error));
    },
    getCity (id) {  //获取市 
        return new Promise((resolve, reject) => {
            this.$axios.post('agent/reg/regCity', {
                id: id
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                });
        })


    },
    getCounty (id) {  //获取区/县
        return new Promise((resolve, reject) => {
            this.$axios.post('agent/reg/regCounty', {
                id: id
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                });
        })


    },

    //获取县
    checkcity: function () {
        var cityId;
        for (var i = 0; i < this.citylist.length; i++) {
            if (this.citylist[i].name == this.reg.city)
                cityId = this.citylist[i].id;
        }

        this.$axios.post('agent/reg/regCounty', {
            id: cityId
        })
            .then(res => {
                this.countylist = res.data;
            })
            .catch(error => console.log(error));
    },

    // 分页
    go: function (i, obj) {
        if (this.arr) {
            this.index = i;
            this.n = this.arr.indexOf(this.index); //当前点击的是第几个
        } else {
            obj.index = i;
            obj.n = obj.arr.indexOf(obj.index);
        }
    },
    first: function () {
        this.index = 1;
        this.arr = [1, 2, 3, 4, 5];
        this.go(1);
        this.endpage = 5;
    },
    end: function () {
        var temp = [];
        for (var j = this.totalpage - 4; j <= this.totalpage; j++) { //6 7 8 9 10
            temp.push(j); //[1,2,3 ... 10]
        }
        this.arr = temp;
        this.index = this.totalpage; // 10
        this.go(this.totalpage);
    },
    prev: function () {
        var temp = [];
        if (this.arr[0] > 1) { // 6,7,8,9,10
            this.endpage = this.arr[this.arr.length - 1]; //10
            this.endpage--; //9
            for (var j = this.endpage - 4; j <= this.endpage; j++) { //页码是 5,6,7,8,9
                temp.push(j);
            }
            this.arr = temp;
            this.index = this.arr[this.n];
        } else if (this.index > 1) //当前是第一页就不能在点了
            this.go(this.index - 1);
    },
    next: function () {
        var temp = [];
        if (this.index < this.totalpage)
            this.go(this.index + 1);
        else if (this.arr[this.arr.length - 1] < this.totalpage) { //1 2 3 4 5
            this.endpage++; // 6
            for (var j = this.endpage - 4; j <= this.endpage; j++) { // 2 3 4 5 6
                temp.push(j); //拿新数组去渲染
            }
            this.arr = temp;
            this.index = this.arr[this.n]; // 确定当前点击的位置
        }
    },
    // 页码的显示
    showpage: function (res) {
        var temp = [];
        this.page = res.rows >= 5 ? 5 : res.rows;
        this.totalpage = res.rows;
        this.endpage = res.rows >= 5 ? 5 : res.rows;
        for (var i = 1; i <= res.rows; i++) {
            temp.push(i);
        }
        this.arr = temp;
    },
    //时间戳转换
    formatTime: function (date) {
        var date = new Date(date * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }

}
export default obj;
