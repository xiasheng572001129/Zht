<template>
<div class="newscreate">
	<ctbHead>

	</ctbHead>
	<div class="container">
		<div class="quote">
		<div class="quote-ele"><i></i>发布系统消息</div>
		</div>
		<div class="content">
		<div class="subnav">
		    <span v-for="item in sendto" :key="item.value">
			<input type="checkbox" v-model="perarr" :value="item.value">{{item.per}}
			</span>
		</div>
		<div class="titlename">
			消息名称
			<input type="text" v-model='title'>
		</div>
		<div class="con">
		    消息内容
            <div class="editor-container">
              <!-- <UE class='ue'></UE> -->
              <!-- <textarea name="" id="" v-model="content"></textarea> -->
              <wangEditor class="ue" :content='defaultContent'  :catchData="catchData"></wangEditor>
            </div>
		</div>
		<button @click="send" class="send">{{sendText}}</button>
		</div>
	</div>
</div>
</template>
<script type="text/ecmascript-6">
 // import UE from '../common/uedit.vue';
 import wangEditor from '../common/wangEditor.vue';
 import qs from 'qs';
 // window.UEDITOR_HOME_URL = "../../../static/images/";
 export default {
  // components: {UE},
  components:{wangEditor},
  data() {
   return {
   	title:'',
   	perarr:[],
   	content:'',
   	sendto:[
		{value:'1',per:'乘用车主'},
		{value:'2',per:'乘用维修厂'},
		{value:'3',per:'乘用运营商'},
		{value:'4',per:'商用车主'},
		{value:'5',per:'商用维修厂'},
		{value:'6',per:'商用运营商'},
		{value:'7',per:'技师'},
		{value:'9',per:'约驾出行'},
		{value:'13',per:'服务经理'},
		{value:'12',per:'运营总监'},
		{value:'14',per:'ubi用户'},
		{value:'15',per:'油站'},
	],
	id:this.$route.query.id,
	defaultList:[],
	defaultContent:''
    // defaultMsg: '',
    // config: {
    //  initialFrameWidth: null,
    //  initialFrameHeight: 350,
    // }
   }
  },
  computed:{
	  sendText(){
		  return this.id ? '修改' : '发送'
	  },
	  sendUrl(){
		  return this.id ? 'admin/MessageManage/modify' :'admin/messageManage/addMessage'
	  },
	  sendData(){
		  let data={
			  content:this.content,
	   		  sendto:this.perarr,
	   		  title:this.title,
	   		  token:window.sessionStorage.getItem("bbytoken")
		  }
		  return this.id ? Object.assign({id:this.id},{...data}) : data
	  }
  },
  methods: {
  	catchData(value){
  		
  	     this.content=value  
  		// 
  		// 
  	},
   	send(){
   		// var msg=this.content.replace(new RegExp("<.+?>","g"),'');
   		// 
	   	var obj1={
	   		content:this.content,
	   		sendto:this.perarr,
	   		title:this.title,
	   		token:window.sessionStorage.getItem("bbytoken")
	   	}
		   
		  
	    this.$axios.post(this.sendUrl,this.sendData)
	     .then(res=>{
	     	// 
	     	layer.msg(res.data.msg);
	     	if(res.data.code==1)
	     		this.$router.push({name:'newsManage_news'})
	     }).catch(err=>console.log(err))
	   },
	   /** 获取修改默认数据 **/
	   defaultData(){
		   if(this.id){
			   this.$axios.post('admin/messageManage/msg',{token:window.sessionStorage.getItem("bbytoken"),id:this.id}).then(res=>{
				   
                    if(res.data.code==1){
					   ({ title: this.title,sendto:this.perarr,content:this.defaultContent } = {...res.data.data});
					  
					}
			   }).catch(err=>console.log(err))
		   }
	   }
  },
  mounted(){
	  this.defaultData()
  }
 };
</script>
<style scoped>
	.newscreate input{
		background-color: #fff;
	}
	.content{
	   margin-left:100px;font-size: 18px;
	}
	.subnav {
		margin-left: -5%;

		border-bottom:2px solid #00b4ff;
		line-height: 60px;
		margin-bottom: 20px;
	}
	.subnav input{
		margin-left: 4%;
    display: inline-block;
	}
	.titlename input{
		width: 90%;
		margin:4px 0 20px 0;
	}
	.ue{
		width: 90%;
    min-height: 500px;
	}
  .ue >>> .w-e-text-container{
     min-height: 500px !important;
     height: 500px !important;
  }

	.send{
		width:110px;
        height:36px;
        border-radius:18px;
        border: none;
        color:white;
        background-color: #00b4ff;
        display: block;
        margin:35px auto;
	}
	textarea{
		width: 80%;

	}
</style>

