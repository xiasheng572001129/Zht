<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}" :v-key="item.id">{{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>注册审核</div>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>公司名称</th>
          <th>负责人</th>
          <th>联系方式</th>
          <th>申请时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td class="t-l">{{item.company}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.create_time}}</td>
          <td>
            <a href="javascript:;" @click="eachData=item,detailsDialogVisible=true,sid=item.id,adopt(item.id)">查看</a>
          </td>
        </tr>
        </tbody>
      </table>
      <el-dialog
        title="详情"
        :visible.sync="detailsDialogVisible"
        center
        @close="operatorId = ''"
      >
        <div
          class="mybox"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.9)"
          style="width: 100%"
        >
          <div class="myboxLeft">
            <el-form label-position="right" label-width="90px">
              <el-form-item label="营业执照:">
                <img :src="registerDetail.license" />
              </el-form-item>
              <el-form-item label="维修厂图片:">
                <img :src="handleImage(registerDetail.photo)" />
              </el-form-item>
            </el-form>
          </div>
          <div class="myboxRight">
            <el-form label-position="right" label-width="90px">
              <el-form-item label="维修厂简介:">
                <p class="noWrap">{{registerDetail.about}}</p>
              </el-form-item>
              <el-form-item label="维修厂主修:">
                <p>{{registerDetail.major}}</p>
              </el-form-item>
              <el-form-item label="开户行:">
                <p>{{registerDetail.bank}}</p>
              </el-form-item>
              <el-form-item label="开户分行:">
                <p>{{registerDetail.branch}}</p>
              </el-form-item>
              <el-form-item label="开户名:">
                <p>{{registerDetail.account_name}}</p>
              </el-form-item>
              <el-form-item label="银行卡号:">
                <p>{{registerDetail.account}}</p>
              </el-form-item>
              <el-form-item label="地址:">
                <p>{{registerDetail.province}}{{registerDetail.city}}{{registerDetail.county}}</p>
              </el-form-item>
              <el-form-item label="详细地址:">
                <p>{{registerDetail.address}}</p>
              </el-form-item>
              <el-form-item label="绑定运营商:">
                <el-select v-model="operatorId" clearable placeholder="请选择运营商">
                  <el-option
                    v-for="item in options"
                    :key="item.aid"
                    :label="item.leader"
                    :value="item.aid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div style="text-align:center;padding-top:10px;box-sizing:border-box;">
          <el-button type="primary" @click="handlePass">通过</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <div class="page_center" v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount" :page="page" @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import page from '../common.js';
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  export default {
    data() {
      return {
        list: [],
        token: window.sessionStorage.getItem('bbytoken'),
        //分页数据
        page: 1, //显示的页码数
        totalpage: 1, //总页数
        index: 1, //点击的当前页，
        endpage: 1, //当前一组页码的最大值
        arr: [], //默认显示 1 2 3 4 5页
        n: 1, //当前点击的页码的位置
        pageCount: 1,
        authList: [],
        curId: 0,
        seCurId: 0,
        detailsDialogVisible:false,
        eachData:{},
        registerDetail:{},
        operatorId:'',
        options: [],
        sid: '',
        loading: true
      }
    },
    methods: {
      go: page.go,
      first: page.first,
      end: page.end,
      prev: page.prev,
      next: page.next,
      showpage: page.showpage,
      paging(e) {
        this.page = e;
        this.init()
      },
      init() {
        this.$axios.post('admin/ShopAudit/shopAuditList', {
          token: this.token,
          page: this.page
        })
          .then(res => {
          
            if(res.data.code == 1) {
             
              this.list = res.data.data.list;
              this.showpage(res.data.data);
              this.pageCount = res.data.data.rows
            }else{
              this.list=[]
              layer.msg(res.data.msg)
            }
          })
          .catch(err => console.log(err))
      },
      async adopt(id) {
        this.loading = true;
        try{
          const res = await this.$axios.post('admin/ShopAudit/getShopDetail',{token:this.token,sid:id});
          const res1 = await this.$axios.post('admin/ShopAudit/agentList', {token: this.token});
          if(res.data.code==1 && res1.data.code==1){
            this.registerDetail=res.data.data;
            this.options = res1.data.data;
            this.loading = false
          }else{
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }catch(err){
          throw(err)
        }
        //图片查看器
        const ViewerDom = document.querySelector('.mybox');
        const viewer = new Viewer(ViewerDom, {

          })
      },
      handleImage(images) {
        if(images == undefined) {
          return false
        }
        return images[0]
      },
      async handlePass() {
        try {
          let flag = false,self=this
          let res = await this.$axios.post('admin/ShopAudit/passShop', {token: this.token, aid: this.operatorId, sid: this.sid})
          if(res.data.code == 2) {
            flag = true;
            this.$message({
              type: "success",
              message: res.data.msg,
              duration: 2000
            });
            setTimeout(() => {
              self.$router.push({
                path: '/shoplist/examine',
                query: {
                  id: this.curId
                }
              });
            },2000)

          }else if(res.data.code == 0) {
            flag = true;
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          if(!flag) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.init();
            this.detailsDialogVisible = false;
          }
        }catch (err){

        }

      }
    },
    created() {
      this.init();
    },
    mounted() {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      })
        .then(res => {
          if(res.data.code == 1) {
            var arr = res.data.data;
            for(var i = 0; i < arr.length; i++) {
              if(arr[i].son) {
                if(arr[i].name == '注册审核') {
                  this.seCurId = arr[i].id;
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
    watch: {
      index() {
        this.init();
      }
    }
  }
</script>
<style scoped>
  .container{
    /*margin-top: 50px;*/
  }
  .laybox {
    text-align: center;
    padding: 50px 68px 50px 36px;
    font-size: 16px;
    overflow: hidden;
  }

  .laybox textarea {
    outline: none;
    resize: none;
    width: 80%;
    flex-flow: 1;
    height: 250px;
    border: 1px dashed #04BBFC;
    margin-bottom: 60px;

    border-radius: 15px;
  }
  .laybox>p{
    display: flex;
    flex-flow: 1;

  }

  div.bot button {
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
    .details{
    padding: 10px 0;
  }
  .details>p>span:first-child{
    width: 75px;
    text-align: right;
    display: inline-block;
    font-size:16px;
  }

  .mybox {
    height:400px;
    border:solid 1px #eee;
    display:flex;
    border-radius:5px;
  }
  .mybox>div {
    height:inherit;
    flex:0.5;
    border-right:solid 1px #eee;
    padding:10px 20px;
    box-sizing:border-box;
  }
  .myboxLeft img {
    width:150px;
    cursor:pointer;
  }
  .myboxRight .el-form-item{
    margin-bottom:0px;
  }
  .myboxRight p {
    font-size: 13px;
    color: #aaa;
  }
  .myboxRight {
    overflow:auto;
  }
</style>
