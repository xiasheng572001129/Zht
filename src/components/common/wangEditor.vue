<template>
  <div id="myWangEditor"
       ref="myWangEditor">
    <!-- <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p> -->
  </div>
</template>

<script type="text/ecmascript-6">
import wangEditor from 'wangeditor'; //引入刚npm安装的wangeditor插件

export default ({
  name: "MyWangEditor",
  data () {
    return {
      // editorContent : "" //内容

    }
  },
  props: ['catchData', "content"], //接受父元素的方法
  watch: {
    content (e) {
      this.content = e;
      this.up()
    }
  },
  mounted () {
    this.up()
  },
  methods: {
    removeWordXml (text) {
      var html = text;
      html = html.replace(/<\/?SPANYES[^>]*>/gi, "");//  Remove  all  SPAN  tags
      html = html.replace(/<(\w[^>]*)  lang=([^|>]*)([^>]*)/gi, "<$1$3");//  Remove  Lang  attributes
      html = html.replace(/<\\?\?xml[^>]*>/gi, "");//  Remove  XML  elements  and  declarations
      html = html.replace(/<\/?\w+:[^>]*>/gi, "");//  Remove  Tags  with  XML  namespace  declarations:  <o:p></o:p>
      html = html.replace(/\n(\n)*( )*(\n)*\n/gi, '\n');
      return html;
    },
    up () {
      var _this = this;
      var editor = new wangEditor(this.$refs.myWangEditor); //实例化wangeditor
      editor.customConfig.onchange = (html) => {
        editor.config.hideLinkImg = true;
        let content = this.removeWordXml(html)
        this.catchData(html) //把这个html通过catchData的方法传入父组件
      }
      this.toListenUp(editor)
      editor.create();
      if (this.content) {
        editor.txt.html(this.content);
      } else {
        editor.txt.clear()
      }


    },
    toListenUp: function (editor) {
      // 插入网络图片
      var that = this;
      editor.customConfig.linkImgCallback = function (url) {
        console.log(url)

        that.$emit("img", url)
        return true // 返回 true 表示校验成功
      },
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    },


  }

})
</script>

<style>
</style>
