webpackJsonp([116],{"JkW/":function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},JtcM:function(n,t,e){var r=e("JkW/");"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);e("rjj0")("7790384c",r,!1,{})},lNEm:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("Xxa5"),i=e.n(r),a=e("exGp"),s=e.n(a),o={data:function(){return{token:window.sessionStorage.getItem("bbytoken"),id:this.$route.query.id,threeAuthList:[]}},methods:{authority:function(){var n=this;return s()(i.a.mark(function t(){var e;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.$axios.post("admin/Auth/erAuth",{token:n.token,id:n.id});case 3:1==(e=t.sent).data.code&&e.data.data&&e.data.data.forEach(function(t){"取货信息"===t.name&&(n.threeAuthList=t.son)}),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,n,[[0,7]])}))()}},mounted:function(){this.authority()}},u=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"quote"},[n._m(0),n._v(" "),e("div",{staticClass:"quote-nav"},n._l(n.threeAuthList,function(t){return e("router-link",{key:t.id,attrs:{"active-class":"cur",to:{path:t.action,query:{id:n.id}}}},[n._v("\n\t\t\t\t\t\t"+n._s(t.name)+"\n\t\t\t\t\t")])}),1)]),n._v(" "),e("div",{},[e("router-view")],1)])};u._withStripped=!0;var c={render:u,staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"quote-ele"},[t("i"),this._v("分销商-拿货信息")])}]},d=c;var v=!1;var h=e("VU/8")(o,d,!1,function(n){v||e("JtcM")},null,null);h.options.__file="src/pages/distributor/takeGoods/index.vue";t.default=h.exports}});
//# sourceMappingURL=116.6fb1ca1ebbefa0cc0da7.js.map