<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}" :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>转盘抽奖管理</div>
        
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>产品图片</th>
          <th>产品名称</th>
          <th>产品价值</th>
          <th>中奖概率</th>
          <th>领取方式</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list" style="height: 90px;">
              <td ><img :src="item.image" style="width: 70px;height: 70px;vertical-align: middle;"></td>
              <td>{{item.name}}</td>
              <td>{{item.price}}</td>
              <td>{{item.prob}}</td>
              <td>{{item.draw==0?"到店领取":"邮寄到家"}}</td>
              <td>
              	  <a href="javascript:;" style="color: #0FCFBB;padding-right:10px;" @click="modify(item.id)">修改</a>
              	  <a href="javascript:;" @click="del(item.id)">删除</a>
              </td>
        </tr>
        </tbody>
      </table>	
      <!-- 分页 -->
      <div class="page_center"  v-show="pageCount&&pageCount>1">
     	      <paging :page-count="pageCount" v-show="list&&list.length>0"  :page="page" @index="paging" ></paging>  <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import page from '../common.js';
  export default{
    data(){
      return {
        list: [],
        token: window.sessionStorage.getItem('bbytoken'),
        //分页数据
        page: 1, //显示的页码数
        totalpage: 1, //总页数
        pageCount:1,
        index: 1, //点击的当前页，
        endpage: 1,//当前一组页码的最大值
        arr: [], //默认显示 1 2 3 4 5页
        n: 1, //当前点击的页码的位置
        authList: [],
        curId: 0,
        seCurId:0,
      }
    },
    created(){
      this.init();
    },
   
    methods: {
      go: page.go,
      first: page.first,
      end: page.end,
      prev: page.prev,
      next: page.next,
      showpage: page.showpage,
      paging(e){
      	
      	this.page=e;
      	this.init()
      },
      init(){
         this.$axios.post("Gift/list",{token:this.token,page:this.page}).then(res=>{ //获取赠品列表的接口
         	 if(res.data.code==1){
         	 	
         	 	this.list=res.data.data.list;
         	
         	 	this.pageCount=res.data.data.rows;
         	 }
         })
      },
      del(id){
      
      	var that=this
      	  this.$axios.post("Gift/delete",{token:this.token,id:id}).then(res=>{ //赠品删除的接口
      	  
      	  	   if(res.data.code==1){
      	  	   	 	
      	  	   	  layer.msg(res.data.msg,{time:1000},function(){
      	  	   	      
      	  	   	      if(that.list.length==1){
      	  	   	      	that.$router.go(0)
      	  	   	      }else{
      	  	   	      	that.init()
      	  	   	      }
      	  	   	  })
      	  	   	  
      	  	   }
      	  })
      },
      modify(id){
      	  this.$router.push({path:'upload/?id=3',query:{index:id}})
      }
     
    },
    mounted(){
    	   var id=this.$route.query.id
    	   this.curId=id;
          this.$axios.post("admin/Auth/erAuth",{token:this.token,id:id}).then(res=>{
          	  var arr=res.data.data;
          	  for(var i=0;i<arr.length;i++){
          	  	if(arr[i].name=="赠品列表"){
          	  		this.seCurId=arr[i].id
          	  	}
          	  }
          	  this.authList=arr;
          })
    }
  }
</script>
