webpackJsonp([87],{Kr0H:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},WiI6:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{list:[],authList:"",seCurId:"",curId:""}},methods:{},mounted:function(){var n=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){var e=t.data.data;n.authList=e}else n.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(n){alert(n)})}},s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"Addresslist"},[e("ctbHead",n._l(n.authList,function(t,a){return e("router-link",{key:t.id,attrs:{"active-class":"cur",to:{path:t.action,query:{id:n.curId}},"v-key":t.id}},[n._v("\n      "+n._s(t.name)+"\n      "),e("el-badge",{directives:[{name:"show",rawName:"v-show",value:2==a&&n.$store.state.policyNumber>0,expression:"index==2 && $store.state.policyNumber>0"}],staticClass:"item",attrs:{value:n.$store.state.policyNumber,max:99}})],1)}),1),n._v(" "),e("div",{staticClass:"container"},[e("router-view")],1)],1)};s._withStripped=!0;var i={render:s,staticRenderFns:[]},r=i;var o=!1;var u=e("VU/8")(a,r,!1,function(n){o||e("afZD")},"data-v-68ae7cae",null);u.options.__file="src/pages/OilStation/index.vue";t.default=u.exports},afZD:function(n,t,e){var a=e("Kr0H");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("249832de",a,!1,{})}});
//# sourceMappingURL=87.67cf43217a9509c71a3c.js.map