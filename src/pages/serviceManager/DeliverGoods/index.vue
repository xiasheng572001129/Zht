<template lang="html">
  <div class="">
    <herderBar></herderBar>
    <div class='tabs'>
        <div  v-for='(item,index) in tabs' :class="{'col-1EA':tabsIndex==index}"  @click='tabsIndex=index'>{{item}}</div>
    </div>
    <component :is='_is' />
  </div>
</template> 

<script>

    export default{
        components:{
            Unshipped:()=>import('./components/Unshipped'),
            Shipped:()=>import('./components/Shipped')
        },
        data(){
            return{
                activeName2:'first',
                tabs:['需发货','已发货'],
                tabsIndex:0
            }
        },
        computed:{
            _is(){
                return this.tabsIndex ? 'Shipped' : 'Unshipped'
            }
        }
    }
</script>

<style lang="css" scoped="scoped">
    .tabs:after{
        display: block;
        content: '';
        clear: both;
    }
    .tabs>div{
       width: 100px;
       height: 50px;
       line-height: 50px;
       float: left;
       text-align: center;
       cursor: pointer;
    }
    .tabs>div:focus {
        border: 1px solid red;
    }
    .activeClass{

    }
</style>
