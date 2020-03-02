<template lang="html">
  <div id="container">
      <div class="left">
           <div class="logo">
                <div class="">
                  <img src="static/images/logo_144.png">
                  <div>加盟管理</div>
                </div>
           </div>
           <div class="left_tabBar">
              <router-link v-for="(item,index) in dataList"  :key="index" active-class="activeClass"  :to="{path:item.action}">
                       <img :src="item.img" class="images">
                       <span>{{item.name}}</span>
                       <span class='newsTips' v-show="index==0&&newsTips.appMsg>0" >{{newsTips.appMsg}}</span>
                       <span class='newsTips' v-show="index==3&&newsTips.comMsg>0" >{{newsTips.comMsg}}</span>
                       <span class='newsTips' v-show="index==5&&newsTips.rationMsg>0" >{{newsTips.rationMsg}}</span>
                       <span class='newsTips' v-show="index==6&&newsTips.countGoods>0" >{{newsTips.countGoods}}</span>
              </router-link>
           </div>
      </div>
      <div class="right">
          <router-view></router-view>
      </div>
  </div>
</template>
<script>
export default {
   data(){
     return{
       dataList:[
         {name:'审核申请',img:'static/images/Group4.png',action:'/serviceManager/materielApply'},
         {name:'服务经理',img:'static/images/Group7.png',action:'/serviceManager/manager'},
        //  {name:'运营总监',img:'static/images/Group8.png',action:'/serviceManager/OperationDirector'},
         {name:'投诉记录',img:'static/images/Group5.png',action:'/serviceManager/ComplaintRecord'},
         {name:'设置',img:'static/images/Group6.png',action:'/serviceManager/rewardSetup'},
         {name:'取消记录',img:'static/images/Group5.png',action:'/serviceManager/cancelRecord'},
         {name:'物料配给',action:'/serviceManager/Physics'},
         {name:'发货信息',action:'/serviceManager/DeliverGoods'}
//         {name:'投诉期',img:'static/images/Complaint.png'}
       ],
     }
   },
  computed:{
    newsTips(){
      return this.$store.state.newsTips //从store中拿取消息提示条数
    }
  },

   mounted(){
      this.$store.commit('increment')
       var id=this.$route.query.id
       this.$axios.post('admin/Auth/erAuth',{token:window.sessionStorage.getItem('bbytoken'),id:id}).then(res=>{
          if(res.data.code==1){

          }
       })
   }
}
</script>

<style lang="css" scoped="scoped">
/* tab高亮显示 */
.activeClass{
  background:linear-gradient(270deg,rgba(52,86,107,1) 0%,rgba(50,67,79,1) 100%);
  border-left: 8px solid #6DFF67
}
  #container{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  #container:after{
     display: block;
     content: "";
     clear: both;
  }
  /* 左tab栏 */
  .left{
    width: 200px;
     height: 100%;
     background:rgba(50,67,79,1);
     color: #fff;

  }
 .newsTips{
    width: 17px;
    height: 17px;
    display: block;
    border-radius: 50%;
   background-color: #FA644B;
   position: absolute;
   right: 14px;
   top: 10px;
   color: #fff;
   line-height: 17px;
   font-size: 1px !important;
   text-align: center;
 }
  .logo{
    width: 100%;
    height: 188px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .left_tabBar{

  }
  .left_tabBar>a:first-child{
    border-top: 1px solid rgba(40,55,65,1)
  }
  .left_tabBar>a{
    display: block;
    color: #fff !important;
    height: 80px;
    line-height: 80px;
    font-size: 18px;
    padding-left: 30px;
    border-bottom: 1px solid rgba(40,55,65,1);
    position: relative;
  }

  .left_tabBar>a>span{
    display: inline-block;
    margin-left: 20px;

  }
  .images{
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  /* 右内容 */
  .right{
    position: relative;
    height: 100%;
    flex: 1
  }
</style>
<style>
  #container .el-dialog__header{
    background: none ;
    padding-bottom: 10px;
  }
  #container .el-dialog__title{
    color: #383838 ;
  }
</style>
