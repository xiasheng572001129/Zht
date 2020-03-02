<template lang="html">
   <div class="">
         <herderBar></herderBar>

          <div class="tab_bar">
            <ul>
              <li>
                <span v-show="newsTips.regMsg>0">
                  {{newsTips.regMsg}}
                  <div class="triangle"></div>
                </span>
              </li>
            
              <li>
                <span v-show="newsTips.addMsg>0">
                  {{newsTips.addMsg}}
                   <div class="triangle"></div>
                </span>
              </li>
              <li>
                <span v-show="newsTips.offMsg>0">
                  {{newsTips.offMsg}}
                   <div class="triangle"></div>
                </span>
              </li>
              <li>
                <span v-show="newsTips.putMsg>0">
                  {{newsTips.putMsg}}
                   <div class="triangle"></div>
                </span>
              </li>
            </ul>
              <router-link active-class="activeClass" :key='index' :to="{path:item.action}" v-for="(item,index) in dataList" >
                {{item.name}}
                <span class="newsTips" v-show="item.newsTips>0">{{item.newsTips}}</span>
              </router-link>
          </div>
          <div class="">
             <router-view></router-view>
          </div>
   </div>
</template>

<script>
import news from "@/components/news/news"
import {mapState} from 'vuex'
export default {
  data(){
    return{
      AddMsg:0,
        dataList:[
          {name:'注册审核',action:'/serviceManager/materielApply/register',newsTips:0},
          // {name:'确认加盟审核',action:'/serviceManager/materielApply/JoinIn',newsTips:0},
          {name:'增加地区审核',action:'/serviceManager/materielApply/increaseRegion',newsTips:0},
          {name:'取消地区审核',action:'/serviceManager/materielApply/cancelRegion',newsTips:0},
          {name:'提现',action:'/serviceManager/materielApply/Putforward',newsTips:0}
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
  },
}
</script>

<style lang="css" scoped="scoped">

  .triangle{
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: #FA644B transparent transparent transparent;
    position: absolute;
    top: 15px;
    right: 2px;
  }
/* tab高亮显示 */
.activeClass{
  background:rgba(30,160,255,1) !important;
  color: #fff !important;
}
/* tab切换 */
.tab_bar{
    margin-top: 15px;
    background-color: #fff;
    padding: 15px 0 15px 40px;
    position: relative;
}
.tab_bar>a{
  position: relative;
}


.newsTips{
  position: absolute;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #FA644B;
  color: #fff;
  text-align: center;
  line-height: 18px;
  right: 10px;
  top: -20px;
  font-size: 12px;
}
.tab_bar>ul{
  display: block;
  content: "";
  clear: both;
  position: absolute;
  z-index: 2;
  top: -7px;
}
.tab_bar>ul>li{
  float: left;
  width: 180px;
  height: 18px;
  position: relative;
}
.tab_bar>ul>li>span{
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #FA644B;
  color: #fff;
  text-align: center;
  line-height: 18px;
  position: absolute;
  font-size: 12px;
  right: 10px;
}
.tab_bar>a{

   width: 180px;
   height: 40px;
   line-height: 40px;
   text-align: center;
   display: inline-block;
   border:1px solid rgba(230,230,235,1);
   background:rgba(245,245,250,1);
   color: #383838;

}
</style>
