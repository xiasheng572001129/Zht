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
        <div class="quote-ele"><i></i>邦保养会员-邦保养购卡表</div>
      </div>
      <div>
        <table class='table'>
          <tr>
            <th>售卡时间</th>
            <th>会员名称</th>
            <th>会员电话</th>
            <th>车辆类型</th>
            <th>原价</th>
            <th>折扣</th>
            <th>购卡金额（折扣后）</th>

          </tr>
          <tr v-for="item of list" :key="item.id">
            <td>{{item.sale_time}}</td>
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.cate_name}}</td>
            <td>{{item.original_price}}</td>
            <td>{{item.dis}}</td>
            <td>{{item.card_price}}</td>
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
<script >
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
        this.$axios.post('admin/MemList/memCard',{token:this.token,page:this.page}).then(res=>{
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
             let path=this.$route.path
            for(var i = 0; i < arr.length; i++) {
             
//              if(arr[i].son) {
              if(arr[i].action == path) {
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
