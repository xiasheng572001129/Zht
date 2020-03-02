<template>
  <div class='adopt'
       ref='adopt'>
    <table class='table'>
      <tr>

        <th>收件人姓名</th>
        <th>收件人电话</th>
        <th>服务费</th>
        <th>票务费</th>
        <th>申请时间</th>
        <th>详情</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in list"
          :key="index">
        <td>{{item.man}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.total}}</td>
        <td>
          {{item.price}}
        </td>
        <td>{{item.create_time}}</td>
        <td>
          <a href="javascript:;"
             @click="details(item.id)">查看</a>
        </td>
        <td>
          <a href="javascript:;"
             @click='adopt(item.id)'>通过</a>
        </td>
      </tr>
    </table>
    <!--详情弹框-->
    <el-dialog title="详情"
               :visible.sync="detailsVisible"
               v-drag=''
               width="700px"
               center>
      <div class='details'>
        <table>
          <tr>
            <td>发票税号 :</td>
            <td>{{detailsList.tax_number}}</td>
          </tr>
          <tr>
            <td>收件人姓名 : </td>
            <td>{{detailsList.recipient}}</td>
          </tr>
          <tr>
            <td>收件人电话 :</td>
            <td>{{detailsList.telphone}}</td>
          </tr>
          <tr>
            <td>公司名称 :</td>
            <td>{{detailsList.company}}</td>
          </tr>
          <tr>
            <td>送达地址 :</td>
            <td>{{detailsList.site}}</td>
          </tr>
        </table>
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
import { Message } from 'element-ui';
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
      detailsList: [],
      transform: {
        transform: ''
      },
      ImgList: '',
      rotateData: 0,
      iconfont: false,
      positionX: 0,
      positionY: 0
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
      this.$axios.post('admin/MemberTax/taxList', { token: this.token, page: this.page, status: 0 }).then(res => {
        if (res.data.code == 1) {
         
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1500 })
          this.list = []
        }
      }).catch(err => console.log(err))
    },
    //查看未审核列表详情
    details (id) {

      this.detailsVisible = true
      this.$axios.post('admin/MemberTax/detail', { token: this.token, id: id }).then(res => {
        if (res.data.code == 1) {
          this.detailsList = res.data.data
        }
      }).catch(err => console.log(err))
    },
    /** 通过 **/
    adopt (id) {
      this.$confirm('您确定要通过吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('admin/MemberTax/adopt', { token: this.token, id: id }).then(res => {
          if (res.data.code == 1) {
            layer.msg(res.data.msg)
            this.init()
          } else {
            layer.msg(res.data.msg)
          }
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    },
    enlarge () {

      const ViewerDom = this.$refs.adopt
      const viewer = new Viewer(ViewerDom, {});

    }

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
.details table td:first-child {
  width: 17%;
  text-align: right;
  padding-right: 10px;
}
.details table td {
  text-align: left;
  font-size: 16px;
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
  width: 100px;
  height: 100px;
  padding-left: 10px;
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
