<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>配送中心-物料配给</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>配送中心</th>
            <th>联系电话</th>
            <th>负责人</th>
            <!-- <th>支付凭证</th> -->
            <!-- <th>区域个数</th> -->
            <th>申请时间</th>
            <th>驳回理由</th>
            <th>驳回时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <!-- <td>
              <img ref="usecost"
                   :src="item.usecost"
                   style="width:60px;height:60px;vertical-align:middle;margin:10px 0">
            </td> -->
            <!-- <td v-if="item.regions">
              <a href="javascript:;"
                 @click="regionsf(item.id)">{{item.regions}}</a>
            </td>
            <td v-else>0</td> -->
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="rejres(item.id)">查看</a>
            </td>
            <td>{{item.audit_time | datetime }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <div class="shuju laybox2"
         style="display:none">
      <ul>
        <li v-if="arealist.status==0">暂未设置供应地区</li>
        <li v-else
            v-for="item in arealist.data">
          {{item.name}}
          <ul v-if="item.son"
              class="son">
            <li v-for="sonitem in item.son">
              {{sonitem.name}}
              <ul v-if="sonitem.son"
                  class="grandson">
                <li v-for="grandson in sonitem.son">{{grandson.name}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
import Viewer from '@/utils/Viewer';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      arealist: {},
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0
    }
  },
  methods: {
    go: page.go,
    first: page.first,
    end: page.end,
    prev: page.prev,
    next: page.next,
    showpage: page.showpage,
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentIncRation/reject', {
        token: this.token,
        page: this.page
      })
        .then(res => {
          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.showpage(res.data.data);
            this.pageCount = res.data.data.rows
            this.$nextTick(() => {
              const ViewerDome = this.$refs.usecost;
              Viewer(ViewerDome)
            })
          } else {
            layer.msg(res.data.msg)
          }
        })
        .catch(err => console.log(err))
    },
    regionsf: function (aid) {
      this.$axios.post('admin/AgentIncRation/detailArea', {
        token: this.token,
        id: aid
      })
        .then(res => {
          this.arealist = res.data;
          if (typeof res.data.data == 'object')
            layer.open({
              type: 1,
              area: ['50%', '60%'],
              title: ['区域', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1, //怎么显示 ×
              content: $('.laybox2')
            })
          else layer.msg(res.data.data)

        }).catch(err => { })
    },
    rejres (id) {
      this.$axios.post('admin/AgentIncRation/showRea', {
        token: this.token,
        id: id
      })
        .then(res => {
          layer.open({
            type: 0,
            area: ['30%', '30%'],
            title: ['物料配给驳回理由', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            content: res.data.data
          })
        })
    }
  },
  created () {
    this.init();
  },
  mounted () {
    var id = this.$route.query.id;
    this.curId = id;
    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {

        if (res.data.code == 1) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].son) {
              if (arr[i].name == '增加地区') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '驳回列表' && arr[i].name == '增加地区') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
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
  },
  watch: {
    index () {
      this.init();
    }
  }
}
</script>
<style scoped>
.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}

.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}

.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.shuju .son li {
  display: block;
}

.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}

.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}
</style>
