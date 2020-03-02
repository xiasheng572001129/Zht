<template>
  <div class='Addresslist'>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''" v-for="(item,index) in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}" :v-key="item.id">
        {{item.name}}
        <el-badge v-show='index==2 && $store.state.policyNumber>0' :value="$store.state.policyNumber" :max='99' class="item" >
        </el-badge>
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>邦保养会员-终端用户表</div>
      </div>
      <div>
         <table class='table'>
             <tr>
               <th>用户名称</th>
               <th>用户电话</th>
               <th>终端通讯费</th>
               <th>终端激活时间</th>
               <th>终端到期时间</th>
             </tr>

             <tr v-for="item of list" :key="item.id">
               <td>{{item.name}}</td>
               <td>{{item.phone}}</td>
               <td>{{item.price}}</td>
               <td>{{item.create_time}}</td>
               <td>{{item.end_time}}</td>
             </tr>
         </table>
      </div>
      <!--分页组件-->
      <div class="page_center">
        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        list: [],
        token: window.sessionStorage.getItem('bbytoken'),
        authList:'',
        seCurId:'',
        curId:'',
        page:1,
        pageCount:1
      }
    },
    methods:{
      paging(e){
         this.page=e;
         this.init()
      },
          init(){
            this.$axios.post('admin/MemList/list',{token:this.token,page:this.page}).then(res=>{
                if(res.data.code==1){
                  this.list=res.data.data.list;
                  this.pageCount=res.data.data.rows;
                }
            }).catch(err=>console.log(err))
          }
    },
    mounted() {
      this.init()
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      })
        .then(res => {
          
          if(res.data.code == 1) {
            var arr = res.data.data;
            for(var i = 0; i < arr.length; i++) {
            
//              if(arr[i].son) {
              if(arr[i].name == '终端用户列表') {
                this.seCurId = arr[i].id;
              }
            }
            this.authList = arr;
          } else {
            this.$alert(res.data.msg, '提示', {
              type: 'error'
            });
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  }
</script>
<style scoped>

</style>
