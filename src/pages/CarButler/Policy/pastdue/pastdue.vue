<template>
  <div class='adopt'
       ref='adopt'>
    <table class='table'>
      <tr>
        <th>用户名称</th>
        <th>电话</th>
        <th>车型</th>
        <th>车牌</th>
        <th>设备号</th>
        <th>保单号</th>
        <th>过期时间</th>
        <th>详情</th>
      </tr>
      <tr v-for="(item,index) in list"
          :key="index">
        <td>{{item.name}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.type}}</td>
        <td>{{item.plate}}</td>
        <td>{{item.eq_num}}</td>
        <td>{{item.policy_num}}</td>
        <td>{{item.end_time}}</td>
        <td>
          <a href="javascript:;"
             @click='details(item.pid,item.u_id)'>详情</a>
        </td>
      </tr>
    </table>
    <!--详情弹框-->
    <el-dialog title="详情"
               v-drag
               :visible.sync="detailsVisible"
               width="700px"
               center>
      <div class='details'>
        <div class='content'>
          <!--保单信息-->
          <dl class='information'>
            <dt>保单信息:</dt>
            <dd class='left'>
              <table class='table'>
                <tr>
                  <td>保险公司 : {{information.company}}</td>
                  <td>保单号 : {{information.policy_num}}</td>
                  <td>VIN码 : {{information.vin}}</td>
                </tr>
                <tr>
                  <td>开始 : {{information.start_time}}</td>
                  <td>结束 : {{information.end_time}}</td>
                </tr>
              </table>
            </dd>
          </dl>
          <!--险种详情-->
          <div class='Insurancetype'>
            <table>
              <tr>
                <th>险种名称</th>
                <th>金额</th>
              </tr>
              <tr v-for="(item,index) in information.name_price"
                  :key="index">
                <td>{{item.type}}</td>
                <td>{{item.value}}</td>
              </tr>
            </table>
          </div>
          <div class='total'>
            <span class='right'>保单总金额:{{information.total}}</span>
          </div>
          <!--保单照片-->
          <div class='Photo'>
            <ul>
              <li v-for='(item,key) in information.pc_img'
                  :key="key"><img :src="item"
                     @click="ImgDialogVisible=true,ImgList=item,enlarge()"></li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--分页组件-->
    <div class="page_center">
      <paging :page-count="pageCount"
              :page="page"
              @index="paging"></paging>
    </div>
  </div>
</template>
<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      list: {},
      page: 1, //当前页
      pageCount: 1,//总页数
      detailsVisible: false, //详情弹框状态
      ReasonVisible: false, //驳回理由状态
      ImgDialogVisible: false,
      information: {}, //保单信息
      ImgList: '',
      transform: {
        transform: ''
      },
      rotateData: 0,
      iconfont: false
    }
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        //获取当前元素
        var odiv = el.querySelector('.el-dialog')
        odiv.onmousedown = (e) => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;

          document.onmousemove = (e) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            //绑定元素位置到positionX和positionY上面
            //              this.positionX = top;
            //              this.positionY = left;
            //移动当前元素
            odiv.style.marginLeft = left + "px"
            odiv.style.marginTop = top + 'px';
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/PolicyAudit/overLists', { token: this.token, page: this.page }).then(res => {
        if (res.data.code == 1) {
        
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },
    //查看未审核列表详情
    details (pid, uid) {
     
      this.UnauditedID = {
        token: this.token,
        pid: pid,
        uid: uid
      }
      this.detailsVisible = true
      this.$axios.post('admin/PolicyAudit/details', { token: this.token, pid: pid }).then(res => {
        if (res.data.code == 1) {
          this.information = res.data.data
        }
      }).catch(err => console.log(err))
    },
    enlarge () { //点击放大
      const ViewerDom = this.$refs.adopt
      const viewer = new Viewer(ViewerDom, {});
    },
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
>>> .viewer-canvas {
  z-index: 9999;
}
>>> .el-dialog__wrapper {
  overflow: hidden;
}

.table a {
  color: #04bbfc;
}
.details {
  font-size: 12px;
}
.information td {
  text-align: left;
}
.details table td {
  font-size: 12px;
  border: none;
}
.Insurancetype {
  margin-top: 20px;
}
.Insurancetype table {
  border: 1px solid #dbdbdb;
}
.Insurancetype table th {
  background: none;
  width: 50%;
  border: 1px solid #dbdbdb;
  font-size: 16px;
}
.Insurancetype table td {
  border: 1px solid #dbdbdb;
}
.Photo {
  text-align: center;
  margin-top: 20px;
  overflow-x: auto;
}

.Photo > ul {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.Photo > ul > li {
}
.Photo img {
  text-align: center;
  max-height: 100px;
  max-height: 100px;
  padding-left: 10px;
  width: 100px;
  height: 100px;
}
.content > textarea {
  border: none;
  width: 100% !important;
  resize: none;
  height: 100px;
  max-height: 300px !important;
}
.total:after {
  display: block;
  content: "";
  clear: both;
}

.right {
  float: right;
  margin: 20px 0;
  font-size: 18px;
  color: #04bbfc;
}
</style>
<style>
.adopt .el-dialog__header {
  background: none;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6eb;
}
.adopt .el-dialog__footer {
  border-top: 1px solid #e6e6eb;
  padding-bottom: 10px;
}
.Reason .el-dialog__header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6eb;
}
.Reason .el-dialog__footer {
  border-top: 1px solid #e6e6eb;
  padding-bottom: 10px;
}
</style>
