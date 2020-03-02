<template>
   <div>
      <div class='newsTips'>{{msgALl.appMsg }}</div>
   </div>
</template>
<script>
  export default{
    data(){
      return{
        msgALl:{}
      }
    },
    methods:{
      init(){
        this.$axios.post('Smoc/msgALl',{token:window.sessionStorage.getItem('bbytoken')}).then(res=>{
            if(res.data.code==1){
                 this.msgALl=res.data.data
             }
        }).catch(err=>console.log(err))
      }
    },
    mounted(){
      this.init()
    }
  }
</script>
<style>
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
</style>
