<template lang="html">
  <div class="">
    <herderBar></herderBar>
    <div class="search">
      <el-select placeholder="请选择" v-model="selectData">
        <el-option label='全部' value="0"></el-option>
      </el-select>
      <el-input placeholder="请输入搜索的名称" class="input" v-model="name"></el-input>
      <el-button  type="primary" class="search_btn" @click="search">搜索</el-button>
    </div>
    <div class="">
      <table class="table">
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>服务区域</th>
          <th>收货地址</th>
          <th>需补充数量</th>
          <th>预警时间</th>
          <th>状态</th>
          <th>操作</th>    
        </tr>
        <tr v-for="item in dataList">
          <td class="name">{{item.name}}</td>
          <td>{{item.phone}}</td>
          <td>
                <a href="javascript:;" class="col-1EA" @click="regionDialogVisible=true,region(item.sm_area_id)">查看</a>
          </td>
          <td>
              <a href="javascript:;" class="col-1EA" @click="addressVisible=true,Address(item.sm_id)">查看</a>
          </td>
          <td>
             <span v-if='item.sm_area_id<1 || item.status'>
               {{item.number}}
             </span>
             <el-input style='width:100px' type='number' v-else v-model='item.number'></el-input>
          </td>
          <td>
             {{item.create_time}}
          </td>
          <td>
              <a href="javascript:;" :class="[item.status==0?'col-1EA': 'col-0ACD00']" class='adopt' >{{item.status==0?'未发货':'已发货'}}</a>
          </td>
          <td>
             <el-button v-show='item.status!=1' :type="item.status==1? 'success' :'primary'" size='small' @click='DeliverGoods(item)' >确定发货</el-button>
          </td>
        </tr>
      </table>
      <!--投诉人弹框-->
      <el-dialog title="投诉人" class="teamDialog" width="500px" :visible.sync="ComplaintVisible" center>
        <div>
          <table class="table ComplaintTable">
            <tr>
              <td>名称:</td>
              <td>{{Complaintlist.name}}</td>
            </tr>
            <tr>
              <td>类型:</td>
              <td >
                <div v-show="Complaintlist.type==1">运营商</div>
                <div v-show="Complaintlist.type==2">市级代理</div>
                <div v-show="Complaintlist.type==3">维修厂</div>
              </td>
            </tr>
            <tr>
              <td>负责人:</td>
              <td></td>
            </tr>
            <tr>
              <td>电话:</td>
              <td>{{Complaintlist.phone}}</td>
            </tr>
            <tr>
              <td>地址:</td>
              <td>{{Complaintlist.address}}</td>
            </tr>
          </table>
        </div>
      </el-dialog>

       <el-dialog title="地区" :visible.sync="regionDialogVisible" width="400px" center >
            <div >
                <div>
                    <strong style='font-size:16px'>省: </strong>
                    <span v-for='item in reasonData'>
                        {{item.name}}
                        <div>
                            <strong style='font-size:16px'>市: </strong>
                            <span v-for='it in item.son'>
                                {{it.name}}
                                <div>
                                    <strong style='font-size:16px'>区/县: </strong>
                                    <span v-for='i in it.son'>{{i.name}}、</span>
                                </div>
                            </span>
                        </div>
                      
                    </span> 
                </div>
                
            </div>
           
        </el-dialog>

      <!--投诉内容弹框-->
      <el-dialog title="详细地址" class="teamDialog" width="500px" :visible.sync="addressVisible" center>
        <div class="addressVisible">
             {{address}}
        </div>
      </el-dialog>
      <!--分页组件-->
      <div class="page_center">
        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem("bbytoken"),
      pageCount: 1,  //总页数,默认1
      page: 1,       //当前页
      name: '',//当前搜索名字
      selectData: "0",
      dataList: [],
      ComplaintVisible: false,//投诉弹框
      addressVisible: false, //投诉内容弹框
      Complaintlist: {},//投诉人数据
      Complaintdata: '', //投诉内容
      regionDialogVisible: false,
      reasonData: [],
      address: '',


    }
  },
  watch: {
    name (newVal) {
      if (!newVal) {
        this.init()
      }
    },
    selectData (newVal) { //监听select发生改变时,获取当前值,通过当前值,进去查询
      var data = {
        status: newVal
      }
      this.init(data)
    },
  },
  computed: {

  },
  filters: {
    DeliverGoodsText (status) {
      return this.loading
    }
  },
  methods: {
    //初始化数据
    init (data) {
      var Data = {
        token: this.token,
        page: this.page,
        search: data ? data.name : '',
        ms_type: data ? data.ms_type : '',
        status: data ? data.status : ''
      }
      this.$axios.post('admin/SmocRation/supplementList', Data).then(res => {
        if (res.data.code == 1) {
          this.dataList = res.data.data.list; //拿返回来的数据

          this.pageCount = res.data.data.rows  //拿取总页数
        } else {
          this.dataList = {}
          layer.msg(res.data.msg, { time: 1000 }) //如果code不等于一代表,没有数据，提示暂无数据
        }
      }).catch(err => console.log(err))
    },
    Address (sm_id) {
      this.$axios.post('admin/SmocRation/goodsArea', {
        token: this.token,
        sm_id: sm_id
      }).then(res => {
        if (res.data.code == 1) {
          this.address = res.data.data
        } else {
          this.address = ''
        }
      }).catch(err => console.log(err))
    },
    region (id) {
      this.$axios.post('admin/Smoc/areaNum', {
        token: this.token,
        id: id,
        type: 1
      }).then(res => {
        if (res.data.code == 1) {
          this.reasonData = res.data.data
        }
      }).catch(err => console.log(err))
    },
    /**发货 */
    DeliverGoods (data) {
      if (data.status == 0) {
        this.$confirm('你确定要发货吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.$axios.post('admin/SmocRation/deliverGoods', {
            token: this.token,
            sm_id: data.sm_id,
            ration: data.number,
            id: data.id,
            sm_area_id: data.sm_area_id
          }).then(res => {
            if (res.data.code == 1) {

              this.$store.commit('increment')
              this.$message({ message: res.data.msg, type: 'success' })
              this.init()
            }
          }).catch(err => {
            this.$message.error(res.data.msg)
          })
        }).catch(err => { })
      }
    },
    //搜索
    search () {
      var data = {
        name: this.name,
        ms_type: 2,
        status: this.selectData
      }
      this.init(data)
    },
    //点击查看投诉人详情
    ComplaintDialog (id) {
      this.ComplaintVisible = true
      this.$axios.post('Smoc/tsDetail', { token: this.token, id: id }).then(res => {
        if (res.data.code == 1) {
          this.Complaintlist = res.data.data
        }
      }).catch(err => console.log(err))
    },
    //投诉内容弹框
    ComplaintContent (id) {
      this.ComplaintContentVisible = true
      this.$axios.post('Smoc/xcl', { token: this.token, id: id }).then(res => {
        if (res.data.code == 1) {
          this.Complaintdata = res.data.data
        }
      }).catch(err => console.log(err))
    },
    //操作分页组件
    paging (e) {
      //把当前页赋值给page
      this.page = e;
      // 当前页发生改变时调取注册审核列表接口,重新渲染
      this.init()
    }
  },
  mounted () {
    this.init()
    this.$store.commit('increment')
  }
}
</script>

<style lang="css" scoped="scoped">
.addressVisible {
  min-height: 200px;
  padding-top: 20px;
}
.Head_portrait {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 5px 0;
  border-radius: 50%;
}
.search {
  margin: 15px 0 15px 40px;
  display: flex;
  align-items: center;
}
.search .input {
  width: 25.9%;
}
.Conduct > a {
  margin-left: 20px;
}
.name {
  width: 10%;
}
.table th {
  height: 50px !important;
  line-height: 50px !important;
}
.content {
  width: 150px;
  margin: 0 auto;
}
.Reason {
  width: 50px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  float: left;
  margin-left: 40px;
}
.rel {
  position: relative;
}
.See {
  float: left;
}
/*投诉人弹框*/
.ComplaintTable {
  margin-bottom: 20px;
}
.ComplaintTable > tr > td {
  width: 50% !important;
  text-align: left;
  padding: 0 10px;
}
.ComplaintTable > tr > td:last-child {
  text-align: right;
}
/*投诉内容弹框*/
.ComplaintContent {
  margin-top: 20px;
  padding-bottom: 40px;
}
.reason {
  min-height: 100px;
}
</style>
<style >
.el-select .el-input {
  width: 130px;
  margin-right: 20px;
}

.search_btn {
  border-radius: 0;
  height: 38px;
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-dialog__header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6eb;
}
.el-dialog__body {
  padding-top: 0 !important;
}
</style>
