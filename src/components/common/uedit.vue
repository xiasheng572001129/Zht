<template>
  <div>
    <script id="editor"
            style="height:300px"
            type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {

    const _this = this;
    this.editor = UE.getEditor('editor', this.config); // 初始化UE

    this.editor.addListener("ready", function () {

      _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
    this.editor.addListener('selectionchange', function (editor) {
      _this.$emit("ueContent", _this.editor.getPlainTxt())
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    }
  },
  destroyed () {
    this.editor.destroy();
  }
}
</script>
