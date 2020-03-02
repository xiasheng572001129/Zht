<template lang="html">
  <div class="register">
     <table class="table">
         <tr>
           <th>加盟类型</th>
           <th>加盟地区</th>
           <th>姓名</th>
           <th>电话</th>
           <th>头像</th>
           <th>详情</th>
           <th>端口费(元)</th>
           <th>申请时间</th>
           <th>操作</th>
         </tr>
         <tr v-for="item in dataList">
            <td>{{item.type}}</td>
            <td>{{item.region}}</td>
            <td>{{item.name}}</td>
            <td>{{item.Telephone}}</td>
            <td>{{item.Head_portrait}}</td>
            <td>
                <a href="javascript:;" class="col-1EA">查看</a>
            </td>
            <td>{{item.Portfee}}</td>
            <td>
                <span>{{item.date}}</span>
                <span>{{item.time}}</span>
            </td>
            <td>
               <a href="javascript:;" class="col-0ACD00 adopt">通过</a>
               <a href="javascript:;" class="col-FA644B">驳回</a>
            </td>
         </tr>
     </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataList:[]
    }
  },

}
</script>

<style lang="css" scoped="scoped">

  .table>tr>th{
     height: 50px !important;
     line-height: 50px
  }
  .table>tr>td{
    font-size: 14px;

  }
  .adopt{
    margin-right: 29px
  }
</style>
