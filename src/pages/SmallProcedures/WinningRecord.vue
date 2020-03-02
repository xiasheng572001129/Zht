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
        <div class="quote-ele"
             style="float:left"><i></i>小程序-中奖纪录</div>
        <div class="export">
          <el-button type="primary"
                     @click="ExportReceive">导出净水机领取用户</el-button>
          <el-button type="primary"
                     @click="Export">导出</el-button>
        </div>

      </div>
      <!-- 用户姓名 用户手机号  商品名称 商品图片 领取方式 收货地址  中奖时间  提醒 -->
      <el-table :data="list">

        <el-table-column label="用户姓名"
                         align="center"
                         prop="man"></el-table-column>
        <el-table-column label="用户手机号"
                         align="center"
                         prop="phone"></el-table-column>
        <el-table-column label="商品名称"
                         align="center"
                         prop="goods_name"></el-table-column>
        <el-table-column label="商品图片"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.goods_photo"
                 class="goods_photo" />
          </template>
        </el-table-column>
        <el-table-column label="领取方式"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.goods_mail == 0 ? '联系公司' : '邮寄到家'}}
          </template>
        </el-table-column>
        <el-table-column label="收货地址"
                         align="center">
          <template slot-scope="scope">
            <el-popover title='地址详情'
                        trigger="hover"
                        :content='`${scope.row.address}${scope.row.details}`'>
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{`${scope.row.address}${scope.row.details}`}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="中奖时间"
                         align="center"
                         prop="create_time">

        </el-table-column>
        <el-table-column label="是否导出"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.if_dor==1 ? '已导出' : '未导出'}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       :disabled="scope.row.if_alert == 1"
                       size="small "
                       @click="remind(scope.row)">{{scope.row.if_alert == 0 ? '未提醒' : '已提醒'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin: 20px 0">
        <paging :page-count="total"
                :page="page"
                @index="init"></paging>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      authList: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      list: [],
      total: 0,  //总页数
      page: 1
    }
  },

  methods: {
    async init (page) {

      try {
        const res = await this.$axios.post('admin/Prize/prizeLog', { token: this.token, page: page })
        this.list = res.data.data.data

        this.total = res.data.data.rows + 1
      } catch (err) {
        throw (err)
      }
    },
    //提醒
    async remind (row) {    
      try {
        const res = await this.$axios.post('admin/Prize/caution', { token: this.token, id: row.id })
        if (res.data.code == 1) {
          this.init()
          this.$message({ message: res.data.msg, type: "success" })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    },
    //导出
    async Export () {
      window.location.href = `${this.baseURL}admin/Login/Exports?type=1`    

    },

    ExportReceive () {  //导出净水机领取用户
      window.location.href = `${this.baseURL}admin/Login/cardExports?type=1`
    },
    // 权限列表,当前所在权限页  
    erAuthList () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: this.token,
        id: id
      })
        .then(res => {
          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].son) {
                if (arr[i].name == '中奖纪录') {
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
    }
  },
  mounted () {
    this.init() //初始化数据  
    this.erAuthList()
  },
}
</script>
<style scoped>
.goods_photo {
  width: 70px;
  height: 70px;
}
.export {
  float: right;
  margin-top: 30px;
  margin-right: 20px;
}
.ellipsis {
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
>>> .el-dialog__header {
  text-align: center;
}
>>> .w-e-toolbar {
  overflow: auto;
}
</style>