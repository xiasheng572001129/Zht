<template>
  <div class="lunbo">
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>设置油品信息
        </div>
      </div>
      <div class="content">
        <div class="titlename">
          <label>油品名称：</label>
          <select v-model="oilselect">
            <option disabled
                    value="">请选择</option>
            <option v-for="(item,index) in oilname"
                    :value="item.id"
                    :key="index">{{item.name}}</option>
          </select>
        </div>
        <div class="titlename">
          油品价格：
          <input type="text"
                 v-model='price'>
        </div>
        <div class="lunbopic">
          <!--产品图片：<br>-->
          <el-upload action="https://ceshi.ctbls.com/admin/SystemSetup/uploadPic"
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
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import UE from '@/components/common/wangEditor';
export default {
  components: {
    UE
  },
  data: function () {
    return {
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
  created () { //初始化

    this.$axios.post('admin/SystemSetup/oilName', {
      token: this.obj.token
    })
      .then(res => {
        this.oilname = res.data.data;
      }).catch(err => this.indexNow = parent.layer.getFrameIndex(window.name))
  },
  methods: {

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
          layer.msg(res.data.msg, function () {
            if (res.data.code == 1)
              parent.layer.close(that.indexNow);
          }, (() => {
            this.$router.go(0)
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

.content {
  font-size: 18px;
}

.container {
  position: relative;
  width: 70%;
  margin: 0 auto;
  top: 20px;
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
