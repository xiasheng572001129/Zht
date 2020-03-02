<template>
	<div>
		<ctbHead>
			<router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}" :v-key="item.id">
				{{item.name}}
			</router-link>
		</ctbHead>
		<div class="container">
			<div class="quote">
				<div class="quote-ele"><i></i>能量值
            <span class="Tips">*填写免费体验数之后,按Enter进行修改</span>
        </div>
				<table>
					<thead>
						<tr>
							<th>运营商名称</th>
              <th>负责人</th>
							<th>地区个数</th>
							<th>免费体验数</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list">
               <td>{{item.company}}</td>
               <td>{{item.leader}}</td>
               <td>
                  <a href="javascript:;" @click="region(item.aid)">{{item.regions}}</a>
               </td>
               <td style=""><input type="number"  style="width:100px;margin:0 auto;"  v-model="item.free_times" @keyup.enter="modify($event,item.aid)"/></td>
						</tr>
					</tbody>
				</table>
				<div class="page_center" v-show="pageCount&&pageCount>1">
          <!--分页的组件-->
					<paging :page-count="pageCount" :page="page" @index="paging"></paging>
				</div>
        <!-- 地区弹框组件 -->
          <RegionDialog :regionVisible="regionVisible" :Province="Province" @regionClose='regionClose'></RegionDialog>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import page from '../../common.js';
  import RegionDialog from '@/components/Dialog/RegionDialog'
	export default {
		data() {
				return {
					list: [],
					token: window.sessionStorage.getItem('bbytoken'),
					page: 1,           //显示的页码数
					pageCount: 1,     //总页数
					authList: [],
					curId: 0,
					seCurId: 0,
					threeAuthList: "",
          regionVisible:false, //地区对话框默认不显示
          Province:[],          //省的数据
          frequency:0           //免费体验次数
				}
			},
      //注册地区组件
     components:{
       RegionDialog
     },
			methods: {
        //监听分页组件传过来的值
				paging(e) {
					this.page = e;
					this.init()
				},
        init(){
          //请求 运营商列表接口
          this.$axios.post('admin/SystemSetup/agentDetail',{page:this.page,token:this.token}).then(res=>{
                  if(res.data.code==1){
                    
                    this.list=res.data.data.list;
                    this.pageCount=res.data.data.rows;
                  }
          }).catch(err=>console.log(err))
        },
        //点击地区个数查看详情地区
        region(aid){ //aid 每个地区的aid

            //获取区域详情的数据
            this.$axios.post('admin/AgentList/regionList',{token:this.token,aid:aid}).then(res=>{
               if(res.data.code==1){
                 if(res.data.data instanceof Array||res.data.data instanceof Object){ //检测后台给我数据是否是数组形式或者是对象
                     this.regionVisible=true; //点击的时候显示,地区对话框
                     this.Province=res.data.data; //如果是数组,那就代表里面有数据,可以渲染
                 }else{
                   layer.msg(res.data.data,{time:1000}) //如果不是数组,那就代表后台传过来的是字符串提示里面没有数据,然后提示暂未设置地区
                 }
               }
            }).catch(err=>console.log(err))
        },
        //在父组件中改变子组件对话框的状态,通过$emit发过来的regionClose事件进行监听子组件进行改变
        regionClose(){ //这是子组件发过来的事件,在父组件中进行关闭操作的事件
           this.regionVisible=false
        },
        //失去焦点时修改免费体验次数
        modify(e,aid){
           
             var NumberVal=e.target.valueAsNumber; //获取当前的改变的value
             //调取修改次数的接口
             this.$axios.post('admin/SystemSetup/setFree',{token:this.token,aid:aid,free_times:NumberVal}).then(res=>{
                if(res.data.code==1){
                   layer.msg(res.data.msg)
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
								if(arr[i].name == '能量值') {
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
	.head {
		z-index: 80;

	}

	table tr td {
		padding: 0;
		width: 20%;
	}

	table th {
		background-color: #fff;
	}

	td {
		height: 50px;
	}

	.poimg {
		max-width: 150px;
		max-height: 150px;
	}

	.edit a {
		color: #00b4ff;
	}

	.del a {
		color: #FF0000;
	}

	img {
		vertical-align: middle;
	}

	.quote-ele a {
		width: 116px;
		height: 36px;
		border-radius: 18px;
		color: white;
		background-color: #00b4ff;
		font-size: 16px;
		float: right;
		margin-right: 130px;
		line-height: 35px;
		text-align: center;
		margin-top: 20px;
	}

	a {
		cursor: pointer;
	}

	.laybox {
		padding: 40px 20px;
		font-size: 16px;
	}

	.laybox li {
		margin: 16px 0;
	}
  /* 提示 */
  .Tips{
    font-size: 16px;
    color: red;
    margin-left: 30px
  }
</style>
