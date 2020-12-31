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
        <div class="quote-ele">
          <i></i>每日一题
          <el-button type="primary"
                     class="addTitle"
                     @click="addTitleVisible=true">添加题目</el-button>
        </div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <el-table :data="list">
        <el-table-column label="题目"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="right"
                        width="200"
                        trigger="hover"
                        :content="scope.row.title">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{scope.row.title}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="选项"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="optionVisible=true,optionList=scope.row.option">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="答案"
                         prop="answer"
                         align="center">
        </el-table-column>
        <el-table-column label="正确数量"
                         prop="correct_num"
                         align="center">
        </el-table-column>
        <el-table-column label="错误数量"
                         prop="error"
                         align="center">
        </el-table-column>
        <el-table-column label="系统上传时间"
                         prop="time"
                         align="center">
        </el-table-column>
      </el-table>

      <!-- 选项详情 -->
      <el-dialog title="选项详情"
                 center
                 :visible.sync='optionVisible'
                 width="40%">
        <div>
          <div v-for="(item,index) in optionList"
               class="option-item"
               :key="index">
            <p><b>{{item.letter}}</b></p>
            <p>{{item.option}}</p>
          </div>
        </div>
      </el-dialog>

      <!-- 添加题目 -->
      <el-dialog title="添加题目"
                 :visible.sync='addTitleVisible'
                 center
                 width="30%"
                 @close='()=>{
                     $refs.form.resetFields(),
                     addData = $options.data().addData
                 }'>
        <el-form label-width="110px"
                 :rules="rules"
                 :model="addData"
                 ref="form">
          <el-form-item label="提问"
                        prop="title">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入提问的问题"
                      v-model="addData.title">
            </el-input>
          </el-form-item>
          <el-form-item label="选项">
            <div v-for="(item,index) in addData.option"
                 :key="index">
              <el-form-item :prop="'option.'+index+'.option'"
                            :rules="rules.option">
                <div class="Addoption-item">
                  <p><b>{{fromCharCode(index)}}</b></p>
                  <p>
                    <el-input v-model="item.option"
                              placeholder="请输入选项内容" />
                  </p>
                </div>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button class="addOption"
                       type="primary"
                       @click="addOption()"
                       :disabled='addData.option.length>=3'>添加选项</el-button>
          </el-form-item>
          <el-form-item label="答案"
                        prop="answer">
            <el-input v-model="addData.answer"
                      placeholder="请输入答案" />
          </el-form-item>
          <el-form-item label="系统上传时间"
                        prop="time">
            <el-date-picker v-model="addData.time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            style="width:100%">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">

          <el-button type="primary"
                     @click="add()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      thCurId: '',
      seCurId: '',
      authList: [],
      threeAuthList: [],
      optionVisible: false, //选项详情弹框显示状态
      optionList: [], //选项详情列表
      addTitleVisible: false, //添加题目弹框显示状态
      addData: {  //添加题目 
        title: '', //题目
        option: [ //选项
          {
            option: ''
          }
        ],
        answer: '', //答案
        time: '', //系统上传时间
      },
      rules: { //添加题目规则验证
        title: { required: true, message: '请输入提问的问题', trigger: 'blur' },
        option: { required: true, message: '请输入选项', trigger: 'blur' },
        answer: { required: true, message: '请输入答案', trigger: 'blur' },
        time: { required: true, message: '请选择上传的时间', trigger: 'blur' }
      }
    }
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {  //暂存库列表
      try {
        const res = await this.$axios.post('admin/ShopQuestion/questionList', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 1
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
    },
    addOption () {  //添加选项
      this.addData.option.push({ option: '' })
    },
    add () {  //提交添加的内容
      this.$nextTick(() => {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            try {
              this.addData.option.forEach((item, index) => {  //把下标 0 1 2  转换成 A B C
                item = Object.assign(item, { letter: this.fromCharCode(index) })
              })
              const res = await this.$axios.post('admin/ShopQuestion/addAnswer', Object.assign(this.addData, { token: this.token }))
              if (res.data.code == 1) {
                this.$message({ message: res.data.msg, type: 'success' })
                this.addTitleVisible = false
                this.init()
              } else {
                this.$message.error(res.data.msg)
              }
            } catch (error) {
              this.$message.error('接口报错,请检查')
              throw (error)
            }
          } else {
            return false;
          }
        });
      })

    },
    fromCharCode (index) {  //把 1 2 3  转换成 A B C  
      return String.fromCharCode(97 + index).toLocaleUpperCase()
    },
    Auth () { //权限列表
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      })
        .then(res => {
          if (res.data.code == 1) {
            var arr = res.data.data;
            this.authList = arr;

          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  },
  mounted () {
    this.init()
    this.Auth()
  },
}
</script>
<style scoped>
.ellipsis {
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
}
.option-item {
  margin: 20px 0;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.option-item p {
  margin: 5px 5px;
}
.addTitle {
  float: right;
  margin: 20px 60px 0 0;
}

.Addoption-item {
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  padding: 10px 10px;
  text-align: center;
}
.Addoption-item p {
}
.addOption {
  width: 100%;
}
</style>
