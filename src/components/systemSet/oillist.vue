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
        <div class="quote-ele"><i></i>油品管理
          <a href="javascript:;"
             @click="addoil(),detailVisible=true">设置油品信息</a>
        </div>
        <table>
          <thead>
            <tr>
              <th>油品名称</th>
              <!-- <th>图片</th> -->
              <th>详情</th>
              <th>修改</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td class="sno">{{item.name}}</td>
              <!-- <td class="pic">
                <img :src="item.cover"
                     class="poimg">
              </td> -->
              <td>
                <a href="javascript:;"
                   @click="detail(item.id)">查看</a>
              </td>
              <td class="edit">
                <a href="javascript:;"
                   @click="reset(item.id)">修改</a>
              </td>
              <td class='del'>
                <a href="javascript:;"
                   @click="del(item.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-nav">
          <paging :page-count="pageCount"
                  v-show="list&&list.length>0"
                  :page="page"
                  @index="paging"></paging>
          <!--分页的组件-->
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="detailVisible"
               title="设置"
               center>
      <div class="titlename">
        <label>油品名称：</label>
        <select v-model="oilselect">
          <option disabled
                  value="">请选择</option>
          <option v-for="item in oilname"
                  :value="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="titlename">
        油品价格：
        <input type="text"
               v-model='price'>
      </div>
      <div class="lunbopic">
        <!--产品图片：<br>-->
        <el-upload :action="`${uploadUrl}admin/SystemSetup/uploadPic`"
                   list-type="picture-card"
                   name="image"
                   :data="obj"
                   :on-success="handleSuccess"
                   :on-preview="handlePictureCardPreview">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </el-dialog>
      </div>
      <div class="con">
        油品简介
        <UE :catchData="catchData"
            :content="content"></UE>
      </div>
      <div class="lay-btn">
        <button class="send red"
                @click="cancel">取消</button>
        <button @click="send"
                class="send">确认</button>
      </div>
    </el-dialog>
    <div class="laybox"
         ref="laybox"
         style="display:none">
      <ul>
        <li>油品名称：{{obj.name}}</li>
        <li>油品图片：<img :src="obj.cover"
               class="poimg"></li>
        <li>油品价格：{{obj.price}}</li>
        <li>油品简介：<br>{{obj.about}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
import UE from '@/components/common/wangEditor';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      obj: {},
      uploadUrl: this.baseURL,
      reason: '',
      reg_reason: '',
      aid: '',
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      seCurId: 0,
      detailVisible: false,
      dialogImageUrl: '', //upload
      dialogVisible: false,
      picaddr: '',
      obj: {
        token: window.sessionStorage.getItem('bbytoken')
      },
      editObj: {},
      oilname: [],
      oilselect: '',
      price: '',
      content: '',
      lunboaddr: '',
      picshow: true,
      indexNow: 1
    }
  },
  components: { UE },
  created () {
    this.init();
  },
  watch: {
    index () {
      this.init();
    }
  },
  methods: {

    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/SystemSetup/oillist', {
        token: this.token,
        page: this.page
      })
        .then(res => {
          this.list = res.data.data.list;

          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    del: function (id) {
      this.$axios.post('admin/SystemSetup/delOil', {
        token: this.token,
        id: id
      })
        .then(res => {

          layer.msg(res.data.msg);
          if (res.data.code == 1)
            this.init();
        }).catch(err => console.log(err))
    },
    detail: function (id) {
      var that = this
      this.$axios.post('admin/SystemSetup/detail', {
        token: this.token,
        id: id
      })
        .then(res => {

          this.obj = res.data.data;
          if (this.obj.about)
            this.obj.about = this.obj.about.replace(/<[^>]+>/g, "");
          layer.open({
            type: 1,
            area: ['50%', '60%'],
            title: ['油品信息详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
            shadeClose: true,
            shade: 0.8,
            content: $('.laybox')
          })
        }).catch(err => console.log(err))
    },
    reset: function (id) {
      var that = this;
      layer.open({
        type: 2,
        area: ['80%', '80%'],
        title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
        shadeClose: true,
        shade: 0.8,
        content: cartopiaURL + '/#/systemSet/saveoil?id=' + id,
        end: function () {
          that.$axios.post('admin/SystemSetup/oillist', {
            token: that.token,
            page: that.index
          })
            .then(res => {
              that.list = res.data.data.list;
              that.showpage(res.data.data);
            })
            .catch(err => console.log(err))
        }
      })
    },
    async addoil () {
      var that = this;
      try {
        const res = await this.$axios.post('admin/SystemSetup/oilName', { token: this.token })
        this.oilname = res.data.data || []
      } catch (err) {
        throw (err)
      }
      //   layer.open({
      //     type: 2,
      //     area: ['80%', '80%'],
      //     title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
      //     shadeClose: true,
      //     shade: 0.8,
      //     content: '172.17.37.111:8082/#/systemSet/inclist',

      //   })
    },
    catchData (e) {
      this.content = e.replace(/<[^>]+>/g, "");

    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;

      this.dialogVisible = true;

    },
    handleSuccess: function (response, file, fileList) {
      this.picaddr = response;

    },
    editpic: function (e) {
      this.picshow = false;

    },
    idtoname (id, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (id == arr[i].id) {
          return arr[i].name;
        }
      }
    },
    send () { //确定

      if (!this.oilselect) {
        layer.msg('请指定油品名称');
        return;
      }
      if (!this.price) {
        layer.msg('请输入油品价格');
        return;
      } else if (parseInt(this.price) != this.price) {
        layer.msg('油品价格应该是整数');
        return;
      }
      if (!this.picaddr) {
        layer.msg('您还没有上传图片');
        return;
      }
      var obj1 = {
        bc_id: this.oilselect,
        name: this.$options.methods.idtoname(this.oilselect, this.oilname),
        about: this.content,
        token: window.sessionStorage.getItem("bbytoken"),
        cover: this.picaddr,
        price: this.price
      }
      var that = this;
      this.$axios.post('admin/SystemSetup/setOil', obj1)
        .then(res => {
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.detailVisible = false
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => console.log(err))
    },
    cancel () { //取消直接关闭
      parent.layer.close(this.indexNow);
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
            if (arr[i].name == '油品管理') {
              this.seCurId = arr[i].id;
            }
            //              if (arr[i].son) {
            //                this.threeAuthList = arr[i].son;
            //                for (var j = 0; j < arr[i].son.length; j++) {
            //                  if (arr[i].action != arr[i].son[j].action) {
            //                    arr[i].action = arr[i].son[0].action;
            //                  }
            //                }
            //              }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', { type: 'error' });
        }
      })
      .catch(err => {
        alert(err);
      })
  }
}
</script>
<style scoped>
.head {
  z-index: 80;
}

table tr td {
  padding: 0;
  width: 20%;
}

table th {
  background-color: #fff;
}

td {
  height: 50px;
}
.poimg {
  max-width: 150px;
  max-height: 150px;
}
.edit a {
  color: #00b4ff;
}

.del a {
  color: #ff0000;
}

img {
  vertical-align: middle;
}

.quote-ele a {
  width: 116px;
  height: 36px;
  border-radius: 18px;
  color: white;
  background-color: #00b4ff;
  font-size: 16px;
  float: right;
  margin-right: 130px;
  line-height: 35px;
  text-align: center;
  margin-top: 20px;
}

a {
  cursor: pointer;
}

.laybox {
  padding: 40px 20px;
  font-size: 16px;
}

.laybox li {
  margin: 16px 0;
}
.lunbo {
  background-color: #fff;
}

.quote-ele i {
  margin-left: 0;
}

.newscreate input {
  background-color: #fff;
}

.quote-ele span {
  font-size: 14px;
}

.lay-btn {
  margin: 30px 0;
}

.lay-btn > button {
  margin: 0 8%;
}

.titlename input {
  width: 332px;
  margin: 4px 0 20px 0;
}

.titlename {
  margin: 20px 0;
}

.ue {
  width: 60%;
}

.lunbopic {
  margin-bottom: 20px;
  width: 300px;
  height: 178px;
  overflow: hidden;
}

.send {
  width: 110px;
  height: 36px;
  border-radius: 18px;
  border: none;
  color: #fff;
  background-color: #00b4ff;
}

.send.red {
  background: #ed5137;
}

textarea {
  resize: none;
  height: 300px;
  border-radius: 10px;
  padding: 8px 16px;
  border-color: #ccc;
}

span.warn {
  font-size: 12px;
  color: #f00;
}
</style>
