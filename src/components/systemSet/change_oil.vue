<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id"
                   :to="{path:item.action,query:{id:curId}}" :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="clear">
        <div class="az f-l" :class="letter==item? 'cur':''" @click="getLetter(item)" v-for="item in AZ">{{item}}</div>
      </div>
      <hr v-if="brand.length>0">
      <div v-if="brand.length>0" style="margin: 10px 0;">
        <el-button size="mini" @contextmenu.native.prevent="delBrand(item.id,item.name)" @click="getBid(item.id)"
                   v-for="item in brand" :key="item.id">{{item.name}}
        </el-button>
      </div>
      <hr v-if="letter||bid">
      <div style="padding: 10px 0;">
        <el-button @click="addBrand" v-if="letter" type="primary">车辆品牌添加</el-button>
        <el-button @click="addCarType" v-if="bid" type="primary">车辆型号添加</el-button>
        <el-button @click="changeBrand" v-if="bid" type="primary">品牌修改</el-button>
      </div>
      <hr v-if="carList.length>0">
      <table v-if="carList.length>0">
        <tr>
          <th>车型</th>
          <th>排量</th>
          <th>用油</th>
          <th>升数(L)</th>
          <th>保养周期(月)</th>
          <th>保养公里数(KM)</th>
          <th>价格(元)</th>
          <th>滤芯补助(元)</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in carList" :key="item.id">
          <td>{{item.type}}</td>
          <td>{{item.series}}</td>
          <td>{{item.oil}}</td>
          <td>{{item.litre}}</td>
          <td>{{item.month}}</td>
          <td>{{item.km}}</td>
          <td>{{item.price}}</td>
          <td>{{item.filter}}</td>
          <td>
            <el-button type="text" @click="changeCarType(item.id)">修改</el-button>
            <el-button style="color:#EC5F63" @click="delCarType(item.id)" type="text">删除</el-button>
          </td>
        </tr>
      </table>
      <div class="page-nav">
        <el-pagination
          background
          @prev-click="prev"
          @next-click="next"
          @current-change="current"
          layout="prev, pager, next,jumper,total,->" :page-count="totalPage" :current-page="page">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="车辆型号添加"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="add-car-type">
        <div>车辆品牌：{{bName}}</div>
        <div>
          车型：
          <el-input v-model="input1" placeholder="请输入车型"></el-input>
        </div>
        <div>
          排量：
          <el-input v-model="input2" placeholder="请输入排量"></el-input>
        </div>
        <div>
          用油：
          <el-input v-model="input3" placeholder="请输入用油"></el-input>
        </div>
        <div>
          升数(L)：
          <el-input v-model="input4" type="number" placeholder="请输入升数"></el-input>
        </div>
        <div>
          保养周期(月)：
          <el-input v-model="input5" type="number" placeholder="请输入保养周期"></el-input>
        </div>
        <div>
          保养公里数(KM)：
          <el-input v-model="input6" type="number" placeholder="请输入保养公里数"></el-input>
        </div>
        <div>
          价格(元)：
          <el-input v-model="input7" type="number" placeholder="请输入价格"></el-input>
        </div>
        <div>
          滤芯补助(元)：
          <el-input v-model="input8" type="number" placeholder="请输入滤芯补助"></el-input>
        </div>
      </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="confirmAddType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="车辆型号修改"
      :visible.sync="dialogVisible1"
      width="60%">
      <div class="add-car-type">
        <div>
          车型：
          <el-input v-model="input1" placeholder="请输入车型"></el-input>
        </div>
        <div>
          排量：
          <el-input v-model="input2" placeholder="请输入排量"></el-input>
        </div>
        <div>
          用油：
          <el-input v-model="input3" placeholder="请输入用油"></el-input>
        </div>
        <div>
          升数(L)：
          <el-input v-model="input4" type="number" placeholder="请输入升数"></el-input>
        </div>
        <div>
          保养周期(月)：
          <el-input v-model="input5" type="number" placeholder="请输入保养周期"></el-input>
        </div>
        <div>
          保养公里数(KM)：
          <el-input v-model="input6" type="number" placeholder="请输入保养公里数"></el-input>
        </div>
        <div>
          价格(元)：
          <el-input v-model="input7" type="number" placeholder="请输入价格"></el-input>
        </div>
        <div>
          滤芯补助(元)：
          <el-input v-model="input8" type="number" placeholder="请输入滤芯补助"></el-input>
        </div>
      </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible1 = false">取 消</el-button>
       <el-button type="primary" @click="subCarType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        AZ: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        letter: '',
        brand: [],    //车品牌数组
        carList: [],   //详细的车信息数组
        bid: 0,   //车品牌ID
        bName: '',  //修改车品牌的时候默认的品牌名称
        page: 1,
        totalPage: 1,
        dialogVisible: false,  //控制车辆型号添加模态窗 显示/隐藏
        dialogVisible1: false,  //控制车辆型号修改模态窗 显示/隐藏
        input1: '',  //用户输入(默认)的车型
        input2: '',  //用户输入(默认)的排量
        input3: '',  //用户输入(默认)的用油
        input4: '',  //用户输入(默认)的升数
        input5: '',  //用户输入(默认)的保养周期
        input6: '',  //用户输入(默认)的保养公里数
        input7: '',  //用户输入(默认)的价格
        input8: '',  //用户输入(默认)的滤芯补助
        carTypeId: 0, //车型ID
        authList: [],
        curId: 0,
        seCurId: 0,
      }
    },
    methods: {
      //分页
      prev(e){
        this.page = e;
        this.getBrandList();
      },
      next(e){
        this.page = e;
        this.getBrandList();
      },
      current(e){
        this.page = e;
        this.getBrandList();
      },
      //删除车型
      delCarType(id){
        this.$alert('您要删除此车型吗？','提示',{
          type:'warning',
          callback:action=>{
            if(action=='confirm'){
              this.$axios.post('Admin/Bangcar/de',{
                token:window.sessionStorage.getItem('bbytoken'),
                id:id
              })
                .then(res=>{
                  
                  if(res.data.code==1){
                    layer.msg(res.data.msg);
                    this.getBrandList();
                  }else{
                    tihs.$alert(res.data.msg,'提示',{type:'error'});
                  }
                })
                .catch(err=>{
                  alert(err);
                })
            }
          }
        })
      },
      //修改车型参数提交
      subCarType(){
        //1车型 2排量 3用油 4升数 5保养周期 6保养公里数 7价格 8滤芯补助
        var ipt1 = this.input1, ipt2 = this.input2, ipt3 = this.input3, ipt4 = this.input4, ipt5 = this.input5, ipt6 = this.input6, ipt7 = this.input7, ipt8 = this.input8;
        if (!ipt1 || !ipt2 || !ipt3 || !ipt4 || !ipt5 || !ipt6 || !ipt7 || !ipt8) {
          this.$alert('必要的参数不能为空', '提示', {type: 'warning'});
          return;
        }
        this.$axios.post('Admin/Bangcar/csave', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: this.carTypeId,
          type: ipt1,
          series: ipt2,
          oil: ipt3,
          litre: ipt4,
          month: ipt5,
          km: ipt6,
          price: ipt7,
          filter: ipt8
        })
          .then(res=>{
            
            if(res.data.code==1){
              layer.msg(res.data.msg);
              this.dialogVisible1=false;
              this.getBrandList();
            }else{
              this.$alert(res.data.msg,'提示',{type:'error'});
            }
          })
          .catch(err=>{alert(err);})
      },
      //修改车型参数
      changeCarType(id){
        this.carTypeId = id;
        this.$axios.post('Admin/Bangcar/csave_v', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: this.carTypeId
        })
          .then(res=> {
            
            if (res.data.code == 1) {
              var obj = res.data.data;
              this.input1 = obj.type;
              this.input2 = obj.series;
              this.input3 = obj.oil;
              this.input4 = obj.litre;
              this.input5 = obj.month;
              this.input6 = obj.km;
              this.input7 = obj.price;
              this.input8 = obj.filter;
              this.dialogVisible1 = true;
            } else {
              this.$alert(res.data.msg, '提示', {type: 'error'});
            }
          })
          .catch(err=> {
            alert(err);
          })
      },
      //删除车品牌
      delBrand(id, name){
        this.$alert('你要删除' + name + '吗？', '提示', {
          type: 'warning',
          callback: (action)=> {
            if (action == 'confirm') {
              this.$axios.post('Admin/Bangcar/brand_delete', {
                token: window.sessionStorage.getItem('bbytoken'),
                id: id
              })
                .then(res=> {
                  
                  if (res.data.code == 1) {
                    layer.msg(res.data.msg);
                    this.getLetter(this.letter);
                  } else {
                    this.$alert(res.data.msg, '提示', {type: 'error'});
                  }
                })
                .catch(err=> {
                  alert(err);
                })
            }
          }
        })
      },
      //获取车品牌列表
      getLetter(e){
        this.letter = e;
        this.carList = [];
        this.bid=0;
        this.$axios.post('Admin/Bangcar/CarBrand', {
          token: window.sessionStorage.getItem('bbytoken'),
          kt: this.letter
        })
          .then(res=> {
            
            if (res.data.code == 1) {
              this.brand = res.data.data;
            }
            if (res.data.data == '') {
              this.brand = [];
              this.$alert(res.data.msg, '提示', {type: 'warning'});
            }
          })
          .catch(err=> {
            alert(err);
          })
      },
      //获取车牌ID，并获取详细信息的列表数据
      getBid(id){
        this.bid = id;
        this.page=1;
        this.getBrandList();
      },
      //请求车型列表
      getBrandList(){
        this.$axios.post('Admin/Bangcar/CarPages', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: this.bid,
          page: this.page
        })
          .then(res=> {
//            
            if (res.data.code == 1) {
              if (res.data.data.list.length == 0) {
                layer.msg('暂无数据');
              }
              this.carList = res.data.data.list;
              this.totalPage = res.data.data.rows;
            } else {
              this.$alert(res.data.msg, '提示', {type: 'warning'});
            }
          }).catch(err=> {
          alert(err);
        })
      },
      //添加车品牌
      addBrand(){
        this.$prompt('请输入品牌名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '品牌名称不能为空！'
        })
          .then(({value})=> {
            //请求添加车品牌
            this.$axios.post('Admin/Bangcar/CarBrandAdd', {
              token: window.sessionStorage.getItem('bbytoken'),
              name: value
            })
              .then(res=> {
                
                if (res.data.code == 1) {
                  layer.msg(res.data.msg);
                  //请求成功后从新获取车型列表
                  this.getLetter(this.letter);
                } else {
                  this.$alert(res.data.msg, '提示', {type: 'error'});
                }
              })
              .catch(err=> {
                alert(err);
              })
          })
          .catch(()=> {
          })
      },
      //车品牌修改
      changeBrand(){
        //获取需要更改的车品牌的信息
        this.$axios.post('Admin/Bangcar/ddd', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: this.bid
        })
          .then(res=> {
            
            if (res.data.code == 1) {
              this.bName = res.data.data.name;
              this.$prompt('请输入品牌名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '品牌名称不能为空！',
                inputValue: this.bName
              })
                .then(({value})=> {
                  //车品牌修改操作
                  this.$axios.post('Admin/Bangcar/CarBrandSave', {
                    token: window.sessionStorage.getItem('bbytoken'),
                    id: this.bid,
                    name: value
                  })
                    .then(res=> {
                      
                      if (res.data.code == 1) {
                        layer.msg(res.data.msg);
                        this.getLetter(this.letter);
                      } else {
                        this.$alert(res.data.msg, '提示', {type: 'error'});
                      }
                    })
                    .catch(err=> {
                      alert(err);
                    });
                })
                .catch(()=> {
                })
            } else {
              this.$alert(res.data.msg, '提示', {type: 'error'});
            }
          })
          .catch(err=> {
            alert(err);
          })
      },
      //车型添加
      addCarType(){
        this.$axios.post('Admin/Bangcar/ddd', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: this.bid
        })
          .then(res=> {
            
            if (res.data.code == 1) {
              this.dialogVisible = true;
              this.bName = res.data.data.name;
              //清空数据
              this.input1 = '';
              this.input2 = '';
              this.input3 = '';
              this.input4 = '';
              this.input5 = '';
              this.input6 = '';
              this.input7 = '';
              this.input8 = '';
            } else {
              this.$alert(res.data.msg, '提示', {type: 'error'});
            }
          })
      },
      //提交添加车型的数据
      confirmAddType(){
        //1车型 2排量 3用油 4升数 5保养周期 6保养公里数 7价格 8滤芯补助
        var ipt1 = this.input1, ipt2 = this.input2, ipt3 = this.input3, ipt4 = this.input4, ipt5 = this.input5, ipt6 = this.input6, ipt7 = this.input7, ipt8 = this.input8;
        if (!ipt1 || !ipt2 || !ipt3 || !ipt4 || !ipt5 || !ipt6 || !ipt7 || !ipt8) {
          this.$alert('必要的参数不能为空', '提示', {type: 'warning'});
          return;
        }
        this.$axios.post('Admin/Bangcar/CarModel', {
          token: window.sessionStorage.getItem('bbytoken'),
          brand: this.bid,
          type: ipt1,
          series: ipt2,
          oil: ipt3,
          litre: ipt4,
          month: ipt5,
          km: ipt6,
          price: ipt7,
          filter: ipt8
        })
          .then(res=> {
            
            if (res.data.code == 1) {
              layer.msg(res.data.msg);
              this.dialogVisible = false;
              this.page = 1;

              this.getBrandList();
            } else {
              this.$alert(res.data.msg, '提示', {type: 'error'});
            }
          })
          .catch(err=> {
            alert(err);
          })
      }
    },
    mounted(){
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      })
        .then(res=> {
          
          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].name == '邦保养数据更改') {
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
            this.$alert(res.data.msg, '提示', {type: 'error'});
          }
        })
        .catch(err=> {
          alert(err);
        })
    }
  }
</script>
<style scoped>
  .container {
    padding: 40px 10px 0;
  }

  hr {
    height: 1px;
    border: none;
    background-color: #ccc;
  }

  .az {
    padding: 0 18px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #ddd;
    color: #666;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .container .cur {
    background: #3A3E42;
    color: #FFF;
  }

  table th {
    height: 50px;
    line-height: 50px;
  }

  table td {
    height: 40px;
    line-height: 40px;
  }

  .add-car-type > div {
    line-height: 30px;
  }
</style>
