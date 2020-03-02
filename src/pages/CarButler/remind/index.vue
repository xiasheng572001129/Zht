<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>UBI-保单到期提醒</div>

      </div>
      <table class="table">
        <thead>
          <tr>
            <th>用户名称</th>
            <th>联系电话</th>
            <th>车牌号</th>
            <th>投保公司</th>
            <th>保单号</th>
            <th>保单结束日期</th>
            <th>退费总额</th>
            <th>保单总金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td class="t-l">{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.plate}}</td>
            <td>{{item.company}}</td>
            <td>{{item.eq_num}}</td>
            <td>{{item.end_time}}</td>
            <td>{{item.refund}}</td>
            <td>{{item.total}}</td>
            <td>
              <a href="javascript:;"
                 @click="remind(item)"
                 :class="{'col-0ACD00':item.remind_status}">{{item.remind_status ==1 ?'已提醒' :'未提醒' }}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '@/components/common.js';
export default {
  data () {
    return {
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      list: [],
      authList: [],
      token: window.sessionStorage.getItem('bbytoken')
    }
  },
  methods: {

    paging (e) {
      this.page = e;
      this.init()
    },
    init: function () {
      this.$axios.post('admin/SupplyTime/policyAudit', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;

            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
            this.list = []
          }
        })
        .catch(err => { })
    },
    async remind (row) {  //保单提醒
      if (row.remind_status == 1) {
        return;
      }
      const res = await this.$axios.post('admin/SupplyTime/remind', { token: this.token, pid: row.pid })
      if (res.data.code == 1) {
        this.$message({ message: res.data.msg, type: 'success' })
        this.init()
      } else {
        this.$message.error(res.data.msg)
      }
    }

  },
  mounted () {
    var id = this.$route.query.id;
    this.curId = id;
    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {

        if (res.data.code == 1) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].son) {
              if (arr[i].name == '保单到期提醒') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }

            }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
      .catch(err => {
        alert(err);
      })
  },
  created () {
    this.init();
  },

}
</script>
<style scoped>
.laybox2 ul {
  margin: 33px auto 33px auto;
  border-bottom: 1px dashed #04bbfc;
}

.laybox2 {
  padding: 0 35px;
  font-size: 16px;
}

.laybox2 li {
  width: 300px;
  text-align: left;
  margin: 33px auto;
}

div.bot {
  margin: 45px auto 35px auto;
}

div.bot input {
  display: inline-block;
  width: 85%;
  outline: none;
  border: none;
  border-bottom: 1px solid #aaa;
  margin-left: 11px;
}

div.bot button {
  margin-top: 38px;
  width: 110px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
  border: none;
  color: white;
}

button.reject {
  background: rgba(237, 81, 55, 1);
  margin-right: 30%;
}

button.pass {
  background-color: #20a0ff;
}
</style>