<template>
  <div>
    <div class="quote">
      <div class="quote-ele"><i></i>油站-系统设置</div>
    </div>
    <div class="Setup">
      <el-form ref="form"
               :model="form"
               label-width="200px">
        <el-form-item label="设置默认的平台补贴百分比 : ">
          <el-input style="width:150px"
                    v-model="form.subsidy"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="Setup">设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      form: {
        subsidy: ''
      }
    }
  },
  methods: {
    async init () {
      try {
        let res = await this.$axios.post('admin/OilSet/subsidyList', {
          token: this.token
        })
        if (res.data.code == 1) {
          this.form = res.data.data

        }
      } catch (err) {
        throw (err)
      }
    },
    async Setup () {
      try {
        let res = await this.$axios.post('admin/OilSet/oilSet', {
          token: this.token,
          subsidy: this.form.subsidy,
          id: this.form.id
        })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.Setup {
  width: 40%;
  margin: 0 auto;
}
</style>
