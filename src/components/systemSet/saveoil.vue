<template>
  <div class="lunbo">
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>油品管理
        </div>
      </div>
      <div class="content">
        <div class="titlename">
          油品名称：<br>{{title}}
          <!--<input type="text" v-model='title'>-->
        </div>
        <div class="titlename">
          油品价格：
          <input type="text"
                 v-model='price'>
        </div>
        <div class="lunbopic">
          产品图片 <br>
          <img v-if="id"
               :src="lunboaddr"
               class="upoimg"
               @click="editpic"
               v-show="picshow">
          <span v-if="id"
                class="warn">**双击图片重新上传**</span>
          <el-upload action="https://cc.ctbls.com/admin/SystemSetup/uploadPic"
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
          <textarea name=""
                    id=""
                    v-model="content"></textarea>
        </div>
        <div class="lay-btn">
          <button class="send red"
                  @click="cancel">取消</button>
          <button @click="send"
                  class="send">确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import UE from '../common/uedit.vue';
export default {
  // components: {UE},
  data: function () {
    return {
      title: '',
      dialogImageUrl: '', //upload
      dialogVisible: false,
      picaddr: '',
      obj: {
        token: window.sessionStorage.getItem('bbytoken')
      },
      id: this.$route.query.id,
      editObj: {},
      content: '',
      lunboaddr: '',
      picshow: true,
      price: 0,
      indexNow: 1
    }
  },
  created () { //初始化
    if (this.id) {
      this.$axios.post('admin/SystemSetup/setIndex', {
        token: this.obj.token,
        id: this.id
      })
        .then(res => {
          this.editObj = res.data.data;
          this.title = this.editObj.name;
          if (this.editObj.about)
            this.content = this.editObj.about.replace(new RegExp("<.+?>", "g"), '');
          this.lunboaddr = this.editObj.cover;
          this.price = this.editObj.price;
          this.indexNow = parent.layer.getFrameIndex(window.name)

        }).catch(err => this.indexNow = parent.layer.getFrameIndex(window.name))

    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess: function (response, file, fileList) {
      this.picaddr = response;
    },
    editpic: function () {
      this.picshow = false;
    },
    send () { //确定
      var that = this;
      var obj1 = {
        about: this.content,
        id: this.id,
        token: window.sessionStorage.getItem("bbytoken"),
        cover: this.picaddr ? this.picaddr : this.lunboaddr,
        price: this.price,
        name: this.title
      }
      this.$axios.post('admin/SystemSetup/setOper', obj1)
        .then(res => {
          layer.msg(res.data.msg, (() => {
            parent.layer.close(this.indexNow);
          }));
        }).catch(err => console.log(err))
    },
    cancel () { //取消直接关闭
      parent.layer.close(this.indexNow);
    }
  }
};
</script>
<style scoped>
.lunbo {
  background-color: #fff;
}

.quote-ele i {
  margin-left: 0;
}

.newscreate input {
  background-color: #fff;
}

.container {
  position: relative;
  width: 70%;
  margin: 0 auto;
  top: 20px;
}
.upoimg {
  height: 162px;
  border-radius: 8px;
}
.content {
  font-size: 18px;
}

.lay-btn {
  margin: 30px 0;
}

.lay-btn > button {
  margin: 0 8%;
}

.quote-ele span {
  font-size: 14px;
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
  margin: 20px 0;
  width: 300px;
  height: 190px;
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