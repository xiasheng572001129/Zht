<template>
  <div class="newscreate">
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
        <div class="quote-ele"><i></i>有效区域管理</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <div class="addform">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="小程序">
            <el-radio-group v-model="form.type">
              <el-radio label="1">约驾出行</el-radio>
              <!--      <el-radio label="2" disabled >惠养车</el-radio>
				      <el-radio label="3" disabled >邦保养VIP</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择省份">
            <el-select v-model="form.province"
                       placeholder="请选择省份"
                       @change="changepro">
              <el-option v-for="item in province"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择市">
            <el-select v-model="form.city"
                       placeholder="请选择市">
              <el-option v-for="item in city"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">添加</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      curId: 0,
      setCurId: [],
      messagelist: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      threeAuthList: [],
      thCurId: 0,
      province: "[]",
      city: [],
      form: {
        type: '1',
        province: "",
        city: "",
      }
    }
  },
  methods: {
    changepro (pro) {

      let msgdata = { token: this.token, id: pro, cid: this.curId };
      this.$axios.post('admin/Program/driving', msgdata).then(res => {
        this.city = res.data.data;

      }).catch(err => {
        alert(err);
      })

    },
    onSubmit () {

      if (this.form.city == "") {
        this.$confirm('请将信息填写完整', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$axios.post('admin/Program/RegionAdd', {
          token: this.token,
          city: this.form.city,
          gid: this.curId

        }).then(res => {

          if (res.data.code == 1) {

            this.$router.push({ path: `/effectarea/list?id=${this.curId}` });
          } else {

            this.$confirm(res.data.msg, '提示', {
              confirmButtonText: '确定',
              // cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        }).catch(err => {
          alert(err);
        })
      }

    },
    addpro () {

      this.$axios.post('admin/Program/Pcity', {
        token: this.token
      }).then(res => {
        this.province = res.data.data;

      }).catch(err => {
        alert(err);
      })
    }
  },
  created () {
    // 加载省份
    this.addpro();

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
            if (arr[i].son) {
              if (arr[i].name == '有效区域管理') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }

              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '添加有效区域' && arr[i].name == '有效区域管理') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
            }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', { type: 'error' });
        }
      })
      .catch(err => {
        alert(err);
      })
  },
}
</script>
<style>
.addform {
  padding-left: 30%;
  padding-top: 50px;
  border-top: 5px solid #f7f7fa;
}
</style>