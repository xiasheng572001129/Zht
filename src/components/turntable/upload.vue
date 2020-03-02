<template>
  <div>
    <ctbHead>
      <router-link active-class="activeClass"
                   :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>轮盘抽奖管理</div>
      </div>
      <div style="width: 50%;margin: 40px auto;">
        <el-form label-width="80px">
          <el-form-item label="产品名称">
            <el-input placeholder="请输入产品名称"
                      v-model="product"></el-input>
          </el-form-item>
          <el-form-item label="产品价值">
            <el-input placeholder="请输入产品价值"
                      v-model="price"
                      class="Product_value"></el-input>
          </el-form-item>
          <el-form-item label="中奖概率">
            <el-input placeholder="请输入中奖概率"
                      v-model="prob"
                      class="probability"></el-input>
          </el-form-item>
          <el-form-item label="领取方式">
            <el-radio label="1"
                      v-model="redio">到店领取</el-radio>
            <el-radio label="0"
                      v-model="redio">邮寄到家</el-radio>
          </el-form-item>
          <el-form-item label="产品图片">
            <!--	<img :src="dialogImageUrl" v-show="defaultImg" class="defaultImg" @click="modifyUp" />-->
            <el-upload action="https://ceshi.ctbls.com/Gift/file"
                       :file-list="fileList2"
                       :limit="limit"
                       :on-success="success"
                       :data="obj"
                       name="image"
                       list-type="picture-card"
                       :on-preview="handlePictureCardPreview">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item label="产品描述">
            <div class="editor-container">
              <!-- <UE class='ue'></UE> -->

              <wangEditor class="ue"
                          :catchData="catchData"
                          @img="img"
                          :content="str"></wangEditor>
            </div>
          </el-form-item>
          <div style="width: 100%; text-align: center;">
            <el-button type="primary"
                       @click="upload">{{index?"修改":"上传"}}</el-button>
          </div>

        </el-form>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
import wangEditor from '../common/wangEditor.vue';
export default {
  data () {
    return {
      list: [],
      product: "", //产品名称
      price: "", //产品价值
      prob: "", //产品概率
      redio: "0", //领取方式
      dialogImageUrl: '', //产品图片
      content: "", //产品描述
      dialogVisible: false,
      Btnupload: "上传",
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      authList: [],
      curId: 0,
      seCurId: 0,
      imgUrl: "",
      index: "",
      url: "Gift/add",
      up: true,
      defaultImg: false,
      limit: 1,
      obj: {
        token: window.sessionStorage.getItem('bbytoken')
      },
      str: "",
      fileList2: [],
    }
  },
  components: {
    wangEditor
  },
  created () {

  },
  methods: {
    img (url) {

    },
    catchData (value) {

      this.content = value

    },
    change () {

    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

    },
    success (res, file) {
      this.imgUrl = res;

    },
    upload () {
      var that = this

      var obj = {
        token: this.token,
        name: this.product,
        price: this.price,
        prob: this.prob,
        draw: this.redio,
        image: this.imgUrl,
        content: this.content.replace(/<[^>]+>/g, ""),
        id: this.index
      }
      this.$axios.post(this.url, obj).then(res => { //点击上传请求的接口
        if (res.data.code == 0) {
          layer.msg(res.data.msg)
        } else {

          if (res.data.msg == "上传成功") {
            layer.msg(res.data.msg, {
              time: 3000
            }, function () {
              that.$router.go(0)
            })
          } else {
            layer.msg(res.data.msg, {
              time: 3000
            }, function () {
              that.$router.go("-1")
            })
          }

        }

      }).catch((err) => {

      })
    },


  },
  mounted () {

    var id = this.$route.query.id
    this.index = this.$route.query.index
    if (this.index) {

      this.up = false
      this.defaultImg = true
      this.url = "Gift/update"
      this.$axios.post("Gift/Check", { //点击修改请求的接口
        token: this.token,
        id: this.index
      }).then(res => {
        var data = res.data.data;
        this.product = data.name
        this.price = data.price
        this.prob = data.prob
        this.redio = data.draw
        this.dialogImageUrl = data.image
        this.content = data.content
        this.imgUrl = res.data.data.image
        this.str = this.content.replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi, '')
        this.fileList2.push({ url: res.data.data.image })
      }).catch(err => {

      })
    }
    this.curId = id
    this.$axios.post("admin/Auth/erAuth", {
      token: this.token,
      id: id
    }).then(res => {
      var arr = res.data.data;
      for (var i = 0; i < arr.length; i++) {
        if (arr.name == "上传赠品") {
          this.seCurId = arr[i].id;
        }
      }
      this.authList = arr;
    }).catch(err => {

    })
  }
}
</script>
<style>
.Product_value {
  width: 40%;
}

.probability {
  width: 40%;
}

.activeClass {
  color: #04bbfc !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.ue {
  height: 20% !important;
}

.w-e-text-container {
  height: 120px !important;
}

.defaultImg {
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  width: 148px;
  height: 148px;
  line-height: 148px;
  border-radius: 5px;
  padding: 10px;
}
</style>
