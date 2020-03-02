<template lang="html">
  <div class="">
    <herderBar></herderBar>
    <div class="Setup">
      <div class="manager">
        <div class="title">服务经理奖励设置</div>
        <div class="Small_Setup">
          <div class="">
            <div>供应奖励设置</div>
           
          </div>
          <div class="Setup_val">
            <input class="input" v-model="managerData.ubi_reward"/>
            <span >元</span>
          </div>
        </div>
        <div class="Small_Setup">
          <div class="">
            <div>开发奖励设置</div>
            <div class="col-FA644B">开发维修厂奖励金额</div>
          </div>
          <div class="Setup_val">
            <input class="input" v-model="managerData.devel_reward"/>
            <span >元</span>
          </div>
        </div>
         <div class="Small_Setup">
          <div class="">
            <div>开发运营商奖励设置</div>
          </div>
          <div class="Setup_val">
            <input class="input" v-model="managerData.team_reward"/>
            <span >元</span>
          </div>
        </div>
        <div class="Small_Setup">
          <div class="">
            <div>管理奖励分成</div>

          </div>
          <div class="Setup_val">
            <input class="input" v-model="managerData.maid"/>
            <span>%</span>
          </div>
        </div>
      
        <div class="Preservation">
          <button @click="Preservation(1)">保存</button>
        </div>
      </div>
     <div class="manager">
        <div class="title">期初配给设置</div>
        <div class="Small_Setup">
          <div class="">
            <div>物料</div>
           
          </div>
          <div class="Setup_val">
            <input class="input" v-model="Earlystage.ration"/>
            <span >台</span>
          </div>
        </div>
        <div class="Preservation">
          <button @click="Preservation(2)">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        token:window.sessionStorage.getItem('bbytoken'),
        managerData:{},  //存放服务经理里面的数据
        Earlystage:{}, //存放运营总监奖励里面的数据
      }
    },
    methods:{
      //初始化数据,奖励设置内容
      init(){
        this.$axios.post('admin/SmSet/setList',{token:this.token}).then(res=>{  //奖励设置内容接口
          if(res.data.code==1){
          let data=res.data.data
          this.managerData=data[0];
          this.managerData['token']=this.token;
        
          this.ChiefInspector=data[1]
          this.ChiefInspector['token']=this.token;
        }else{
          this.managerData['token']=this.token;
          this.ChiefInspector['token']=this.token;
        }
       }).catch(err=>console.log(err))
       /* 期初配给设置*/
       this.$axios.post("admin/SmSet/rationSm",{token:this.token}).then(res=>{
         if(res.data.code==1){
             this.Earlystage=res.data.data
         }
       })
      },
     // 点击保存
      Preservation(e){
          
          if(e==1)this.modify_increase(this.managerData);
          if(e==2)this.SetToConfigure(this.Earlystage)
      },
     //奖励设置修改、增加
      modify_increase(data){
        this.$axios.post('admin/SmSet/set',data).then(res=>{
             if(res.data.code==1){
                layer.msg(res.data.msg,{time:1000})
             }else{
                layer.msg(res.data.msg,{time:1000})
              }
        }).catch(err=>console.log(err))
      },
      /* 设置配给量 */
      SetToConfigure(data){
         this.$axios.post('admin/SmSet/joinLast',{token:this.token,ration:data.ration}).then(res=>{
                 layer.msg(res.data.msg)
                 if(res.data.code==1){
                    this.init()
                 }
         }).catch(er=>console.log(err))
      }
      
    },
    mounted(){
      this.init()
    }
  }
</script>

<style lang="css" scoped="scoped">
  .Setup{
    height: 1000px;
    background-color: #f5f5f5;
  }
  /* 服务经理奖励设置 */
  .manager{
    background-color: #fff;
    margin: 0 40px 10px 40px;
  }
  .manager>div{
    margin-left: 40px;
  }
  .title{
    padding: 20px 0;
    border-bottom: 1px solid #E6E6EB
  }
  .Small_Setup:after{
    display: block;
    content: "";
    clear: both;
  }
  .Small_Setup{
    margin-top: 23px;
  }
  .Small_Setup>div:first-child{
    width: 140px;
  }
  .Small_Setup>div{
    float: left;
    margin-right: 54px
  }
  .Setup_val{
    position: relative;

  }

  .abs{
    position:absolute;
    right: -30px;
    top: 10px
  }
  .input{
    width: 150px;
    height: 38px;
    margin-right: 10px;
    background:rgba(245,245,250,1);
    border: 1px solid rgba(230,230,235,1);
    text-align: center;
  }
  .taskNumber{
    display: inline-block;
    margin-right: 60px;
  }
  /* 保存 */
  .Preservation>button{
    width: 120px;
    height: 40px;
    background-color: #1EA0FF;
    color: #fff;
    line-height: 40px;
    margin: 50px 0 28px 0
  }
  /* 运营总监奖励设置 */
  .ChiefInspector{
    background-color: #fff;
    margin: 0 40px 10px 40px;

  }
  .ChiefInspector>div{
    margin-left: 40px;
  }
</style>
