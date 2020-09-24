import home from '../components/home'
// 汽修厂列表
import shoplistCancel from '../components/shoplist/cancel'
import shoplistDetail from '../components/shoplist/listDetail'
import shoplistClose from '../components/shoplist/close'
import shoplistList from '../components/shoplist/list'
import servicerAudit from '@/pages/servicerAudit/notAudit.vue'  //服务车审核

// 汽修厂提现
import shopcashPass from '../components/shopcash/pass'
import shopcashReject from '../components/shopcash/reject'
import shopcashApply from '../components/shopcash/apply'
// 小程序
import articleUncheck from '../components/smallArticle/uncheck'
import articleHadcheck from '../components/smallArticle/hadcheck'
import billApply from '../components/smallBill/apply'
import billSend from '../components/smallBill/send'
import lunboManage from '../components/SmallInvoice/lunbo'
import lunboCreate from '../components/SmallInvoice/lunboCreate'
import smallshare from '../components/SmallInvoice/share'
import systemManage from '../components/SmallInvoice/system'
import WinningRecord from '@/pages/SmallProcedures/WinningRecord'  //中奖纪录

// 礼品兑换
import changeGift from '../components/duihuan/gift'
import changeOBD from '../components/duihuan/OBD'
import changeNeeds from '../components/duihuan/needs'
// 运营商  管理列表
import yManageList from '../components/yManage/list'
import yManageCheck from '../components/yManage/check'
import yMcheckDetail from '../components/yManage/checkDetail'
import yRationPass from '../components/yRation/pass'
import yRationReject from '@/components/yRation/reject'
import yRationApply from '@/components/yRation/apply'
import yRApplyDetail from '../components/yRation/applyDetail'
import yCancelApply from '../components/yCancel/apply'
import yCancelPass from '../components/yCancel/pass'
import yCancelreject from '../components/yCancel/reject'
import yMaterialApply from '../components/yMaterialApply/apply'
import yMApplyDetail from '@/components/yMaterialApply/applyDetail'
import yMaterialPass from '../components/yMaterialApply/pass'
import yMaterialReject from '../components/yMaterialApply/reject'
import yMateriaVia from '../components/yMaterialApply/viaList'
import ywithdrawPass from '../components/yWithdraw/pass'
import yWithdrawReject from '../components/yWithdraw/reject'
import yWithdrawApply from '../components/yWithdraw/apply'

// 资金管理-押金.收入.支出
import deposit from '../components/fundManage/deposit'
import incomeCard from '../components/fundIncome/card'
import incomeSystem from '../components/fundIncome/system'
import incomeTicket from '../components/fundIncome/ticket'
import payShare from '../components/fundPay/share'
import payshopDeposit from '../components/fundPay/shopDeposit'
import payyDeposit from '../components/fundPay/yDeposit'
import payTechnician from '../components/fundPay/technician'
import incomeshopFee from '../components/fundIncome/shopFee'
// 消息管理
import news from '../components/newManage/news'
import createNews from '../components/newManage/createNews'
// 主页
import login from '../components/login'
import findpwd from '../components/findpwd'
import entry from '../components/entry'
// import register from '../components/register'
//系统设置
import system_oil from '../components/systemSet/oillist'
import inc_oil from '../components/systemSet/inclist'
import save_oil from '../components/systemSet/saveoil'
import change_oil from '../components/systemSet/change_oil'
import rewardSetup from '@/pages/rewardSetup/index'
import activitySetup from '@/pages/activitySetup/index'  //线下活动奖品设置
//权限管理
import manager from '../components/authorityManagement/manager'
import manageGroup from '../components/authorityManagement/manageGroup'
import authorityList from '../components/authorityManagement/authorityList'

//反馈管理
import feedShoplist from '../components/feedback/shopList'
import feedAgentlist from '../components/feedback/agentList'

//数据分析
import AnalysisData from '@/components/analysisData/dataAn'
import allCityAgent from '@/components/analysisData/allCityAgent'
import company from '@/components/analysisData/company'
import alloperator from '@/components/analysisData/alloperator'
import operators from '@/components/analysisData/operators'
import repairShops from '@/components/analysisData/repairShops'
import allRepairShops from '@/components/analysisData/allRepairShops'
import owner from '@/components/analysisData/owner'
//消息管理中的操作日志
import operationlogMessage from '../components/operationlog/message'

// 有效区域管理
import effectareaAdd from '../components/effectarea/add'
import effectareaList from '../components/effectarea/list'

const routes = [

    // { path:'/',component:home,name:'主功能页' },

    { path: "/", redirect: "/login" },
    { path: '/login', component: login, name: 'login' },
    // { path:'/register',component:register,name:'register' },
    { path: '/findpwd', component: findpwd, name: 'findpwd' },

    { path: '/entry', component: entry, name: 'entry', meta: { auth: true } },

    { path: '/manager', component: manager, name: 'manager', meta: { auth: true } },
    { path: '/manageGroup', component: manageGroup, name: 'manageGroup', meta: { auth: true } },
    { path: '/authorityList', component: authorityList, name: 'authorityList', meta: { auth: true } },

    // { path:'/shoplist/pass',component:shopcashPass,name:'shopcash_pass',meta:{auth:true}},
    { path: '/shoplist/cancel', component: shoplistCancel, name: 'shoplist_cancel', meta: { auth: true } },
    { path: '/shoplist/Audited', component: () => import('@/components/shoplist/Audited'), name: 'shoplist_cancel', meta: { auth: true } },

    { path: '/shoplist/close', component: shoplistClose, name: 'shoplist_close', meta: { auth: true } },
    { path: '/shoplist/list', component: shoplistList, name: 'shoplist_list', meta: { auth: true } },
    { path: '/shoplist/listDetail', component: shoplistDetail, name: 'shoplist_listDetail', meta: { auth: true } },
    { path: '/shoplist/examine', component: () => import('@/components/shoplist/examine'), name: 'examine', meta: { auth: true } },
    { path: '/shoplist/adopt', component: () => import('@/components/shoplist/adopt'), name: 'adopt', meta: { auth: true } },
    { path: '/shoplist/Reject', component: () => import('@/components/shoplist/Reject'), name: 'Reject', meta: { auth: true } },
    { path: '/shoplist/OrderClose', component: () => import('@/components/shoplist/OrderClose'), name: 'OrderClose', meta: { auth: true } },
    { path: '/shoplist/region', component: () => import('@/components/shoplist/region'), name: 'Region', meta: { auth: true } },
    { path: '/shoplist/veteran', component: () => import('@/components/shoplist/veteranAdopt'), name: 'veteranAdopt', meta: { auth: true } },
    { path: '/shoplist/veteranReject', component: () => import('@/components/shoplist/veteranReject'), name: 'veteranReject', meta: { auth: true } },
    { path: '/shoplist/veteranOrderClose', component: () => import('@/components/shoplist/veteranOrderClose'), name: 'veteranOrderClose', meta: { auth: true } },
    { path: '/shoplist/registerAudit', component: () => import('@/components/shoplist/registerAudit'), name: 'registerAudit', meta: { auth: true } },
    { path: '/shoplist/servicerAudit', component: servicerAudit, meta: { auth: true } }, //服务车审核-未审核
    { path: '/shoplist/hasAudit', component: () => import('@/pages/servicerAudit/hasAudit'), meta: { auth: true } },

    { path: '/shopcash/pass', component: shopcashPass, name: 'shopcash_pass', meta: { auth: true } },
    { path: '/shopcash/reject', component: shopcashReject, name: 'shopcash_reject', meta: { auth: true } },
    { path: '/shopcash/apply', component: shopcashApply, name: 'shopcash_apply', meta: { auth: true } },

    //小程序n
    { path: '/art/uncheck', component: articleUncheck, name: 'art_uncheck', meta: { auth: true } },
    { path: '/art/hadcheck', component: articleHadcheck, name: 'art_hadcheck', meta: { auth: true } },
    { path: '/bill/apply', component: billApply, name: 'bill_apply', meta: { auth: true } },
    { path: '/bill/send', component: billSend, name: 'bill_send', meta: { auth: true } },
    { path: '/SmallInvoice/lunbo', component: lunboManage, name: 'lunbo_manage', meta: { auth: true } },
    { path: '/SmallInvoice/share', component: smallshare, name: 'small_share', meta: { auth: true } },
    { path: '/SmallInvoice/card_recomm', component: () => import('@/components/SmallInvoice/card_recomm'), meta: { auth: true } },
    { path: '/SmallInvoice/system', component: systemManage, name: 'small_system', meta: { auth: true } },
    { path: '/SmallInvoice/lunboCreate', component: lunboCreate, name: 'lunbo_create', meta: { auth: true } },
    { path: '/SmallProcedures/WinningRecord', component: WinningRecord, meta: { auth: true } },
    {  //救援项目
        path: '/SmallInvoice/rescue',
        component: () => import("@/pages/rescue"),
        meta: {
            auth: true
        }
    },
    {  //小程序-用户信息列表
        path: '/SmallInvoice/userInfoList',
        redirect: '/SmallInvoice/userInfoList/insuranceUser'
    },
    {  //小程序-用户信息列表-保险用户
        path: '/SmallInvoice/userInfoList/insuranceUser',
        component: () => import("@/pages/userInfoList/insuranceUser"),
        meta: {
            auth: true
        }
    },
    {  //小程序-用户信息列表-仲达会员
        path: '/SmallInvoice/userInfoList/membersList',
        component: () => import("@/pages/userInfoList/membersList"),
        meta: {
            auth: true
        }
    },
    {  //小程序-用户信息列表-老兵
        path: '/SmallInvoice/userInfoList/veteranList',
        component: () => import("@/pages/userInfoList/veteranList"),
        meta: {
            auth: true
        }
    },
    {  //小程序-服务工号列表
        path: '/SmallInvoice/severCode',
        component: () => import("@/pages/smallProgram/severCode"),
        meta: {
            auth: true
        }
    },

    { path: "/turntable/upload", component: resolve => require(["@/components/turntable/upload"], resolve), meta: { auth: true } },
    { path: "/turntable/GiftList", component: resolve => require(["@/components/turntable/GiftList"], resolve), meta: { auth: true } },
    {
        path: "/turntable/intakeList", component: resolve => require(["@/components/turntable/intakeList"], resolve), meta: { auth: true },
        children: [
            { path: "/turntable/intakeList", redirect: "Unissued" },
            { path: "Unissued", component: resolve => require(["@/components/turntable/List/Unissued"], resolve), meta: { auth: true } },
            { path: "Already", component: resolve => require(["@/components/turntable/List/Already"], resolve), meta: { auth: true } }
        ]
    },

    { path: '/change/gift', component: changeGift, name: 'change_gift', meta: { auth: true } },
    { path: '/change/OBD', component: changeOBD, name: 'change_OBD', meta: { auth: true } },
    { path: '/change/needs', component: changeNeeds, name: 'change_needs', meta: { auth: true } },
    {
        path: '/change/intakeList', component: resolve => require(["@/components/duihuan/intakeList"], resolve), meta: { auth: true },
        children: [
            { path: "/change/intakeList", redirect: "Unissued" },
            { path: "Unissued", component: resolve => require(["@/components/duihuan/List/Unissued"], resolve), meta: { auth: true } },
            { path: "Already", component: resolve => require(["@/components/duihuan/List/Already"], resolve), meta: { auth: true } }
        ]
    },

    { path: '/yManage/list', component: yManageList, name: 'yManage_list', meta: { auth: true } },
    { path: '/yManage/check', component: yManageCheck, name: 'yManage_check', meta: { auth: true } },
    { path: '/yManage/checkDetail', component: yMcheckDetail, name: 'yManage_checkdetail', meta: { auth: true } },
    { path: '/yRation/pass', component: yRationPass, name: 'yRation_pass', meta: { auth: true } },
    { path: '/yRation/reject', component: yRationReject, name: 'yRation_reject', meta: { auth: true } },
    { path: '/yRation/Apply', component: yRationApply, name: 'yRation_apply', meta: { auth: true } },
    { path: '/yRation/ApplyDetail', component: yRApplyDetail, name: 'yRation_aDetail', meta: { auth: true } },
    { path: '/yCancel/Apply', component: yCancelApply, name: 'yCancel_apply', meta: { auth: true } },
    { path: '/yCancel/Pass', component: yCancelPass, name: 'yCancel_pass', meta: { auth: true } },
    { path: '/yCancel/reject', component: yCancelreject, name: 'yCancel_reject', meta: { auth: true } },
    { path: '/yManageApply/Pass', component: yMaterialPass, name: 'yManageApply_pass', meta: { auth: true } },
    { path: '/yManageApply/Apply', component: yMaterialApply, name: 'yManageApply_apply', meta: { auth: true } },
    { path: '/yManageApply/ApplyDetail', component: yMApplyDetail, name: 'yMapply_detail', meta: { auth: true } },
    { path: '/yManageApply/Reject', component: yMaterialReject, name: 'yManageApply_reject', meta: { auth: true } },
    { path: '/yManageApply/viaList', component: yMateriaVia, name: 'yManageApply_via', meta: { auth: true } },
    { path: '/yWithdraw/Reject', component: yWithdrawReject, name: 'yWithdraw_reject', meta: { auth: true } },
    { path: '/yWithdraw/Pass', component: ywithdrawPass, name: 'yWithdraw_pass', meta: { auth: true } },
    { path: '/yWithdraw/Apply', component: yWithdrawApply, name: 'yWithdraw_apply', meta: { auth: true } },
    { path: '/yDelayedFines/fine', component: resolve => require(["@/components/yDelayedFines/fine"], resolve), meta: { auth: true } },
    //注册审核
    {
        path: '/registerAudit',
        redirect: '/registerAudit/apply'
    },
    {
        path: '/registerAudit/apply',
        component: () => import('@/components/registerAudit/apply'),
        meta: {
            auth: true
        }

    },
    {
        path: '/registerAudit/pass',
        component: () => import('@/components/registerAudit/pass'),
        meta: {
            auth: true
        }

    },
    {
        path: '/registerAudit/reject',
        component: () => import('@/components/registerAudit/reject'),
        meta: {
            auth: true
        }

    },
    //继续合作
    {
        path: '/continueCooperation',
        redirect: '/continueCooperation/apply'
    },
    { //继续合作-未审核
        path: '/continueCooperation/apply',
        component: () => import('@/pages/continueCooperation/apply'),
        meta: {
            auth: true
        }

    },
    { //继续合作-已审核
        path: '/continueCooperation/pass',
        component: () => import('@/pages/continueCooperation/pass'),
        meta: {
            auth: true
        }

    },
    {  //继续合作-已驳回
        path: '/continueCooperation/reject',
        component: () => import('@/pages/continueCooperation/reject'),
        meta: {
            auth: true
        }

    },

    //提现复核
    {
        path: '/withdrawalReview',
        redirect: '/withdrawalReview/apply'
    },
    { //提现复核-未审核
        path: '/withdrawalReview/apply',
        component: () => import('@/pages/withdrawalReview/apply'),
        meta: {
            auth: true
        }

    },
    { //提现复核-已审核
        path: '/withdrawalReview/pass',
        component: () => import('@/pages/withdrawalReview/pass'),
        meta: {
            auth: true
        }

    },
    {  //提现复核-已驳回    
        path: '/withdrawalReview/reject',
        component: () => import('@/pages/withdrawalReview/reject'),
        meta: {
            auth: true
        }

    },
    {  //滤芯收入
        path: "/filterIncome",
        component: () => import('@/pages/filterIncome'),
        meta: {
            auth: true
        }
    },



    { path: '/fundManage/deposit', component: deposit, name: 'deposit', meta: { auth: true } },
    { path: '/fundIncome/card', component: incomeCard, name: 'income_card', meta: { auth: true } },
    { path: '/fundIncome/ticket', component: incomeTicket, name: 'income_ticket', meta: { auth: true } },
    { path: '/fundIncome/system', component: incomeSystem, name: 'income_system', meta: { auth: true } },
    { path: '/fundPay/share', component: payShare, name: 'pay_share', meta: { auth: true } },
    { path: '/fundPay/shopdeposit', component: payshopDeposit, name: 'pay_shopdeposit', meta: { auth: true } },
    { path: '/fundPay/ydeposit', component: payyDeposit, name: 'pay_ydeposit', meta: { auth: true } },
    { path: '/fundPay/technician', component: payTechnician, name: 'pay_technician', meta: { auth: true } },
    { path: '/fundPay/shopFee', component: incomeshopFee, name: 'income_shopFee', meta: { auth: true } },

    { path: '/newsManage/news', component: news, name: 'newsManage_news', meta: { auth: true } },
    { path: '/newsManage/createNews', component: createNews, name: 'newsManage_create', meta: { auth: true } },
    { path: '/systemSet/oilList', component: system_oil, name: 'system_oil', meta: { auth: true } },
    { path: '/systemSet/inclist', component: inc_oil, name: 'inc_oil', meta: { auth: true } },
    { path: '/systemSet/saveoil', component: save_oil, name: 'save_oil', meta: { auth: true } },
    { path: '/ststemSet/changeOil', component: change_oil, name: 'change_oil', meta: { auth: true } },
    //  系统设置-奖品设置
    { path: '/ststemSet/rewardSetup', component: rewardSetup, meta: { auth: true } },
    { path: '/ststemSet/activitySetup', component: activitySetup, meta: { auth: true } }, //线下活动奖品设置
    { path: '/ststemSet/servicerSetup', component: () => import('@/pages/servicerSetup/index'), meta: { auth: true } }, //服务车系统设置
    //能量值
    { path: '/ststemSet/EnergyValue', component: resolve => require(['@/components/systemSet/EnergyValue/EnergyValue'], resolve), meta: { auth: true } },
    { path: '/ststemSet/fbList', component: resolve => require(['@/components/systemSet/fbList'], resolve), meta: { auth: true } },
    //邦保养         
    { path: "/systemSet/maintain/maintain", component: resolve => require(["@/components/systemSet/maintain/maintain"], resolve), meta: { auth: true } },
    { path: "/systemSet/maintain/oillist", component: resolve => require(["@/components/systemSet/maintain/oillist"], resolve), meta: { auth: true } },
    { path: "/systemSet/maintain/Datachange", component: resolve => require(["@/components/systemSet/maintain/Datachange"], resolve), meta: { auth: true } },
    { path: "/systemSet/maintain/upload", component: resolve => require(["@/components/systemSet/maintain/upload"], resolve), meta: { auth: true } },
    //保险公司列表
    { path: '/Insurance', component: resove => require(["@/components/Insurance/Insurance"], resove), meta: { auth: true } },
    //投保种类
    { path: '/InsureType', component: resolve => require(["@/components/InsureType/InsureType"], resolve), meta: { auth: true } },
    //会员特权服务项列表
    { path: '/Serviceitem', component: resolve => require(["@/components/Serviceitem/Serviceitem"], resolve), meta: { auth: true } },
    { path: '/productList', component: resolve => require(["@/components/Serviceitem/productList"], resolve), meta: { auth: true } },
    //OBD设备
    { path: '/equipmentList', component: resolve => require(['@/components/OBD_equipment/equipmentList'], resolve), meta: { auth: true } },
    { path: '/distributionList', component: resolve => require(['@/components/OBD_equipment/distributionList'], resolve), meta: { auth: true } },

    // 新添加
    { path: '/feedback/shoplist', component: feedShoplist, name: 'feed_shoplist', meta: { auth: true } },


    { path: '/operationlog/message', component: operationlogMessage, name: 'operationlog_message;', meta: { auth: true } },
    // 有效区域管理
    { path: '/effectarea/add', component: effectareaAdd, name: 'effectarea_add;', meta: { auth: true } },
    { path: '/effectarea/list', component: effectareaList, name: 'effectarea_list;', meta: { auth: true } },

    //市级代理
    // 市级代理列表
    { path: "/MunicipalAgent/cityList", name: "MunicipalAgent/cityList", component: resolve => require(["@/components/MunicipalAgent/cityList"], resolve), meta: { auth: true } },
    // 增加区域
    {
        path: "/MunicipalAgent/increaseRegion", name: "MunicipalAgent/increaseRegion", component: resolve => require(["@/components/MunicipalAgent/increaseRegion"], resolve), meta: { auth: true },
        children: [
            { path: "/MunicipalAgent/increaseRegion", redirect: "Apply" },
            //申请
            { path: "Apply", component: resolve => require(["@/components/MunicipalAgent/Apply"], resolve), meta: { auth: true } },

            //通过
            { path: "Adopt", component: resolve => require(["@/components/MunicipalAgent/Adopt"], resolve), meta: { auth: true } },
            //驳回
            { path: "Reject", component: resolve => require(["@/components/MunicipalAgent/Reject"], resolve), meta: { auth: true } },

            //查看详情页
            { path: "detailsPage", component: resolve => require(["@/components/MunicipalAgent/detailsPage"], resolve), meta: { auth: true } }
        ]
    },
    //物料申请  
    {
        path: "/MunicipalAgent/materiel/materiel", component: resolve => require(["@/components/MunicipalAgent/materiel/materiel"], resolve), meta: { auth: true },
        children: [
            { path: "/MunicipalAgent/materiel/materiel", redirect: "Apply" },
            //申请
            { path: "Apply", component: resolve => require(["@/components/MunicipalAgent/materiel/Apply"], resolve), meta: { auth: true } },
            //申请物料详情页
            { path: "DetailsPage", component: resolve => require(["@/components/MunicipalAgent/materiel/DetailsPage"], resolve), meta: { auth: true } },
            //通过
            { path: "adopt", component: resolve => require(["@/components/MunicipalAgent/materiel/adopt"], resolve), meta: { auth: true } },
            //通过物料详请
            { path: "Throughdetails", component: resolve => require(["@/components/MunicipalAgent/materiel/Throughdetails"], resolve), meta: { auth: true } },
            //驳回
            { path: "Reject", component: resolve => require(["@/components/MunicipalAgent/materiel/Reject"], resolve), meta: { auth: true } },
            //驳回物料详请
            { path: "Rejectdetails", component: resolve => require(["@/components/MunicipalAgent/materiel/Rejectdetails"], resolve), meta: { auth: true } }
        ]
    },
    //取消合作
    {
        path: "/MunicipalAgent/cancel/cancel", component: resolve => require(["@/components/MunicipalAgent/cancel/cancel"], resolve), meta: { auth: true },
        children: [
            { path: "/MunicipalAgent/cancel/cancel", redirect: "Apply" },
            //申请
            { path: "Apply", component: resolve => require(["@/components/MunicipalAgent/cancel/Apply"], resolve), meta: { auth: true } },
            //通过
            { path: "adopt", component: resolve => require(["@/components/MunicipalAgent/cancel/adopt"], resolve), meta: { auth: true } },
            //驳回
            { path: "Reject", component: resolve => require(["@/components/MunicipalAgent/cancel/Reject"], resolve), meta: { auth: true } },
        ]
    },
    //资金提现
    {
        path: "/MunicipalAgent/capital/capital", component: resolve => require(["@/components/MunicipalAgent/capital/capital"], resolve), meta: { auth: true },
        children: [
            { path: "/MunicipalAgent/capital/capital", redirect: "Apply" },
            //申请
            { path: "Apply", component: resolve => require(["@/components/MunicipalAgent/capital/Apply"], resolve), meta: { auth: true } },
            //通过
            { path: "adopt", component: resolve => require(["@/components/MunicipalAgent/capital/adopt"], resolve), meta: { auth: true } },
            //驳回
            { path: "Reject", component: resolve => require(["@/components/MunicipalAgent/capital/Reject"], resolve), meta: { auth: true } },
        ]

    },
    //数据分析
    {
        path: "/analysisData/dataAn", component: AnalysisData, name: 'yAnalysisData', meta: { auth: true },
    },
    {
        path: "/analysisData/allCityAgent", component: allCityAgent, name: 'allCityAgent', meta: { auth: true },
    },
    {
        path: "/analysisData/company", component: company, name: 'company', meta: { auth: true },
    },

    {
        path: "/analysisData/alloperator", component: alloperator, name: 'alloperator', meta: { auth: true },
    },
    {
        path: "/analysisData/operators", component: operators, name: 'operators', meta: { auth: true },
    },
    {
        path: "/analysisData/repairShops", component: repairShops, name: 'repairShops', meta: { auth: true },
    },
    {
        path: "/analysisData/allRepairShops", component: allRepairShops, name: 'allRepairShops', meta: { auth: true },
    },
    {
        path: "/analysisData/owner", component: owner, name: 'owner', meta: { auth: true },
    },

    //服务经理
    {
        path: '/serviceManager', name: 'serviceManager', component: resolve => require(['@/pages/serviceManager/serviceManager'], resolve), meta: { auth: true },
        children: [
            { path: '/serviceManager', redirect: 'materielApply' },
            //审核申请页
            {
                path: 'materielApply', component: resolve => require(['@/pages/serviceManager/materielApply/materielApply'], resolve), meta: { auth: true },
                children: [
                    { path: '/serviceManager/materielApply', redirect: 'register' },
                    //注册审核
                    { path: 'register', component: resolve => require(["@/pages/serviceManager/materielApply/register/register"], resolve), meta: { auth: true } },
                    // 确认加盟审核
                    { path: 'JoinIn', component: resolve => require(["@/pages/serviceManager/materielApply/JoinIn/JoinIn"], resolve), meta: { auth: true } },
                    //增加地区审核
                    { path: 'increaseRegion', component: resolve => require(["@/pages/serviceManager/materielApply/increaseRegion/increaseRegion"], resolve), meta: { auth: true } },
                    //取消地区审核
                    { path: 'cancelRegion', component: resolve => require(["@/pages/serviceManager/materielApply/cancelRegion/cancelRegion"], resolve), meta: { auth: true } },
                    //提现
                    { path: 'Putforward', component: resolve => require(["@/pages/serviceManager/materielApply/Putforward/Putforward"], resolve), meta: { auth: true } },
                ]
            },
            //服务经理页
            { path: 'manager', component: resolve => require(['@/pages/serviceManager/manager/manager'], resolve), meta: { auth: true } },
            //运营总监页
            { path: 'OperationDirector', component: resolve => require(['@/pages/serviceManager/OperationDirector/OperationDirector'], resolve), meta: { auth: true } },
            // 投诉记录页
            { path: 'ComplaintRecord', component: resolve => require(['@/pages/serviceManager/ComplaintRecord/ComplaintRecord'], resolve), meta: { auth: true } },
            // 奖励设置页
            { path: 'rewardSetup', component: resolve => require(['@/pages/serviceManager/rewardSetup/rewardSetup'], resolve), meta: { auth: true } },
            //取消记录
            { path: 'cancelRecord', component: resolve => require(['@/pages/serviceManager/cancelRecord/cancelRecord'], resolve), meta: { auth: true } },
            { path: 'Complaint', component: resolve => require(['@/pages/serviceManager/cancelRecord/cancelRecord'], resolve), meta: { auth: true } },
            {
                path: 'Physics', component: () => import('@/pages/serviceManager/Physics/index'), meta: { auth: true }
            },
            {
                path: 'DeliverGoods', component: () => import('@/pages/serviceManager/DeliverGoods/index'), meta: { auth: true }
            }
        ]

    },
    //邦保养会员

    {
        path: '/Policy', name: 'Policy', component: resolve => require(['@/pages/maintainVip/Policy/Policy'], resolve), meta: { auth: true },
        children: [
            { path: '/Policy', redirect: 'Unaudited' },
            //未审核列表
            { path: 'Unaudited', component: resolve => require(['@/pages/maintainVip/Policy/Unaudited/Unaudited'], resolve), meta: { auth: true } },
            // 通过列表
            { path: 'adopt', component: resolve => require(['@/pages/maintainVip/Policy/adopt/adopt'], resolve), meta: { auth: true } },
            //驳回列表
            { path: 'Reject', component: resolve => require(['@/pages/maintainVip/Policy/Reject/Reject'], resolve), meta: { auth: true } },
            //保单过期列表
            { path: 'pastdue', component: resolve => require(['@/pages/maintainVip/Policy/pastdue/pastdue'], resolve), meta: { auth: true } }
        ]
    },
    //会员地址列表
    {
        path: '/Addresslist', name: 'Addresslist', component: resolve => require(['@/pages/maintainVip/Addresslist/Addresslist'], resolve), meta: { auth: true },
        children: [
            { path: '/Addresslist', redirect: 'notDeliverGoods' },
            { path: 'notDeliverGoods', name: 'notDeliverGoods', component: resolve => require(['@/pages/maintainVip/Addresslist/notDeliverGoods/notDeliverGoods'], resolve), meta: { auth: true } },
            { path: 'DeliverGoods', name: 'DeliverGoods', component: resolve => require(['@/pages/maintainVip/Addresslist/DeliverGoods/DeliverGoods'], resolve), meta: { auth: true } }
        ]
    },

    { path: '/Ubi', redirect: '/Insurance' },

    { path: '/MemberTab', name: 'MemberTab', component: resolve => require(['@/pages/maintainVip/MemberTab/MemberTab'], resolve), meta: { auth: true } },
    { path: '/maintainVip/remind', name: 'MemberTab', component: resolve => require(['@/pages/maintainVip/remind/index'], resolve), meta: { auth: true } },
    {
        path: '/MailList', name: 'MailList', redirect: '/MailList/delivered', component: resolve => require(['@/pages/maintainVip/mailList/main'], resolve), meta: { auth: true },
        children: [


            // 已发货
            { path: 'delivered', component: resolve => require(['@/pages/maintainVip/mailList/delivered/delivered'], resolve), meta: { auth: true } },
            //未发货
            { path: 'unshipped', component: resolve => require(['@/pages/maintainVip/mailList/unshipped/unshipped'], resolve), meta: { auth: true } }
        ]
    },
    //邦保养购卡表
    { path: '/cardTab', name: 'cardTab', component: resolve => require(['@/pages/maintainVip/cardTab/cardTab'], resolve), meta: { auth: true } },
    //退费预警
    { path: '/RefundWarn', name: 'RefundWarn', component: resolve => require(['@/pages/maintainVip/RefundWarn/RefundWarn'], resolve), meta: { auth: true } },
    { path: '/RefundWarn', name: 'RefundWarn', component: resolve => require(['@/pages/maintainVip/RefundWarn/RefundWarn'], resolve), meta: { auth: true } },

    { path: '/maintainVip/balance', name: 'cardTab', component: resolve => require(['@/pages/maintainVip/balance/list'], resolve), meta: { auth: true } },

    //邦保养车管家
    // {
    //     path: '/CarButler/Policy', name: 'Policy', component: resolve => require(['@/pages/CarButler/Policy/Policy'], resolve), meta: { auth: true },
    //     children: [
    //         { path: '/CarButler/Policy', redirect: 'Unaudited' },
    //         //未审核列表
    //         { path: 'Unaudited', component: resolve => require(['@/pages/CarButler/Policy/Unaudited/Unaudited'], resolve), meta: { auth: true } },
    //         // 通过列表
    //         { path: 'adopt', component: resolve => require(['@/pages/CarButler/Policy/adopt/adopt'], resolve), meta: { auth: true } },
    //         //驳回列表
    //         { path: 'Reject', component: resolve => require(['@/pages/CarButler/Policy/Reject/Reject'], resolve), meta: { auth: true } },
    //         //保单过期列表
    //         { path: 'pastdue', component: resolve => require(['@/pages/CarButler/Policy/pastdue/pastdue'], resolve), meta: { auth: true } }
    //     ]
    // },
    {
        path: "/CarButler/Policy",
        redirect: '/CarButler/Cash_withdrawal/apply'
    },
    { path: '/balance', redirect: '/CarButler/Cash_withdrawal/apply' },
    { path: '/CarButler/Cash_withdrawal/apply', component: () => import('@/pages/CarButler/CashWithdrawal/apply'), meta: { auth: true } },

    { path: '/CarButler/Cash_withdrawal/pass', component: () => import('@/pages/CarButler/CashWithdrawal/pass'), meta: { auth: true } },
    { path: '/CarButler/Cash_withdrawal/reject', component: () => import('@/pages/CarButler/CashWithdrawal/reject'), meta: { auth: true } },

    {
        path: '/CarButler/userManag',
        component: () => import('@/pages/CarButler/userManag'),
        meta: {
            auth: true
        }
    },


    //首次上传保单审核列表
    {
        path: '/CarButler/firstPolicy',
        component: () => import('@/pages/CarButler/firstPolicy'),
        meta: {
            auth: true
        }
    },


    { path: '/Cash_withdrawal', redirect: '/Cash_withdrawal/apply' },
    { path: '/Cash_withdrawal/apply', component: () => import('@/pages/maintainVip/CashWithdrawal/apply'), meta: { auth: true } },

    { path: '/Cash_withdrawal/pass', component: () => import('@/pages/maintainVip/CashWithdrawal/pass'), meta: { auth: true } },
    { path: '/Cash_withdrawal/reject', component: () => import('@/pages/maintainVip/CashWithdrawal/reject'), meta: { auth: true } },
    {
        path: '/mail', name: 'mail', component: resolve => require(['@/pages/CarButler/mailList/main'], resolve), meta: { auth: true },
        children: [
            { path: '/mail', redirect: 'delivered' },

            // 已发货
            { path: 'delivered', component: resolve => require(['@/pages/CarButler/mailList/delivered/delivered'], resolve), meta: { auth: true } },
            //未发货
            { path: 'unshipped', component: resolve => require(['@/pages/CarButler/mailList/unshipped/unshipped'], resolve), meta: { auth: true } }
        ]
    },
    /** 发票管理 **/
    {
        path: '/invoice', component: () => import('@/pages/CarButler/invoice/index'), meta: { auth: true },
        children: [
            { path: '/invoice', redirect: 'Toexamine' },
            { path: 'Toexamine', component: () => import('@/pages/CarButler/invoice/Toexamine/Toexamine') },
            { path: 'adopt', component: () => import('@/pages/CarButler/invoice/adopt/adopt') },
        ]

    },
    { path: '/remind', component: () => import('@/pages/CarButler/remind/index'), meta: { auth: true } },

    /* 油站 */
    {
        path: '/OilStation',
        component: () => import('@/pages/OilStation'),
        redirect: '/OilStation/list',
        meta: {
            auth: true
        },
        children: [
            {
                path: 'Toexamine', component: () => import('@/pages/OilStation/Toexamine'),
                redirect: "/OilStation/Toexamine/unaudited",
                children: [
                    {
                        path: 'unaudited',
                        component: () => import('@/pages/OilStation/Toexamine/unaudited'),
                    },
                    {
                        path: 'rejected',
                        component: () => import('@/pages/OilStation/Toexamine/rejected'),
                    },
                    {
                        path: 'audited',
                        component: () => import('@/pages/OilStation/Toexamine/audited'),
                    }
                ]
            },
            {
                path: 'list',
                component: () => import('@/pages/OilStation/list')
            },
            {
                path: 'cancelList',
                component: () => import('@/pages/OilStation/cancelList')
            },

            {
                path: 'Owner',
                component: () => import('@/pages/OilStation/Owner'),
                redirect: '/OilStation/Owner/Recharge',
                children: [
                    {
                        path: 'Recharge',
                        component: () => import('@/pages/OilStation/Owner/Recharge'),
                    },
                    {
                        path: 'consumption',
                        component: () => import('@/pages/OilStation/Owner/consumption'),
                    }
                ]
            },
            {
                path: 'install',
                component: () => import('@/pages/OilStation/install')
            },
            {   //推广审核
                path: 'promote',
                component: () => import('@/pages/OilStation/promote'),
                redirect: "/OilStation/promote/unaudited",
                children: [
                    {
                        path: 'unaudited',
                        component: () => import('@/pages/OilStation/promote/unaudited'),
                    },
                    {
                        path: 'rejected',
                        component: () => import('@/pages/OilStation/promote/rejected'),
                    },
                    {
                        path: 'passed',
                        component: () => import('@/pages/OilStation/promote/passed'),
                    }
                ]
            }
        ]
    },
    /* 分销商 */
    {
        path: '/distributor',
        component: () => import('@/pages/distributor'),
        redirect: '/distributor/register',
        children: [
            {
                path: 'register',
                component: () => import('@/pages/distributor/register')
            },
            {
                path: 'list',
                component: () => import('@/pages/distributor/list')
            },
            {
                path: 'takeGoods',
                component: () => import('@/pages/distributor/takeGoods'),
                redirect: '/distributor/takeGoods/GoodsSingle',
                children: [
                    {
                        path: 'GoodsSingle',
                        component: () => import('@/pages/distributor/takeGoods/GoodsSingle')
                    },
                    {
                        path: 'Shipped',
                        component: () => import('@/pages/distributor/takeGoods/Shipped')
                    }
                ]
            },

            {
                path: 'hairGoods',
                component: () => import('@/pages/distributor/hairGoods'),
                redirect: '/distributor/hairGoods/needhair',
                children: [
                    {
                        path: 'needhair',
                        component: () => import('@/pages/distributor/hairGoods/needhair')
                    },
                    {
                        path: 'Shipped',
                        component: () => import('@/pages/distributor/hairGoods/Shipped')
                    }
                ]
            },
            {
                path: 'capital',
                component: () => import('@/pages/distributor/capital')
            },
            {
                path: 'SetUp',
                component: () => import('@/pages/distributor/SetUp')
            },
        ]
    },

    //供应商
    {
        path: '/supplier',
        redirect: '/supplier/list'
    },

    { //供应商列表
        path: '/supplier/list',
        component: () => import('@/pages/supplier/supplierList/index'),
        meta: { auth: true }
    },
    {  //供应商-油品审核
        path: '/supplier/oilAudit',
        redirect: '/supplier/oilAudit/unaudited'
    },
    {  //供应商-油品审核-未审核
        path: '/supplier/oilAudit/unaudited',
        component: () => import('@/pages/supplier/oilAudit/unaudited'),
        meta: { auth: true }

    },
    {  //供应商-油品审核-已审核
        path: '/supplier/oilAudit/audited',
        component: () => import('@/pages/supplier/oilAudit/audited'),
        meta: { auth: true }

    },
    {  //供应商-油品审核-已驳回
        path: '/supplier/oilAudit/rejected',
        component: () => import('@/pages/supplier/oilAudit/rejected'),
        meta: { auth: true }

    },

    {  //供应商-滤芯审核
        path: "/supplier/filterElement",
        redirect: '/supplier/filterElement/unaudited'
    },

    {  //供应商-滤芯审核-未审核
        path: "/supplier/filterElement/unaudited",
        component: () => import('@/pages/supplier/filterElement/unaudited'),
        meta: { auth: true }
    },
    {  //供应商-滤芯审核-已审核
        path: "/supplier/filterElement/audited",
        component: () => import('@/pages/supplier/filterElement/audited'),
        meta: { auth: true }
    },
    {  //供应商-滤芯审核-已驳回
        path: "/supplier/filterElement/rejected",
        component: () => import('@/pages/supplier/filterElement/rejected'),
        meta: { auth: true }
    },


    {  //供应商-活动产品审核
        path: "/supplier/activitiesProducts",
        redirect: '/supplier/activitiesProducts/unaudited'
    },

    {  //供应商-活动产品审核-未审核
        path: "/supplier/activitiesProducts/unaudited",
        component: () => import('@/pages/supplier/activitiesProducts/unaudited'),
        meta: { auth: true }
    },
    {  //供应商-活动产品审核-已审核
        path: "/supplier/activitiesProducts/audited",
        component: () => import('@/pages/supplier/activitiesProducts/audited'),
        meta: { auth: true }
    },
    {  //供应商-活动产品审核-已驳回
        path: "/supplier/activitiesProducts/rejected",
        component: () => import('@/pages/supplier/activitiesProducts/rejected'),
        meta: { auth: true }
    },


    {  //供应商油品信息列表
        path: '/supplier/oilInformation',
        component: () => import('@/pages/supplier/oilInformation'),
        meta: { auth: true }
    },
    {  //供应商油品发货信息列表
        path: '/supplier/oilDelivery',
        component: () => import('@/pages/supplier/oilDelivery'),
        meta: { auth: true }
    },


    

    {
        path: "/supplier/applySettlement",
        redirect: '/supplier/applySettlement/unaudited'
    },
    {  //供应商 提现-未审核
        path: '/supplier/applySettlement/unaudited',
        component: () => import('@/pages/supplier/applySettlement'),
        meta: { auth: true }
    },
    {  //提现--已审核
        path: "/supplier/applySettlement/approved",
        component: () => import('@/pages/supplier/applySettlement/approved'),
        meta: { auth: true }
    },
    {  //提现--已驳回
        path: "/supplier/applySettlement/rejected",
        component: () => import('@/pages/supplier/applySettlement/rejected'),
        meta: { auth: true }
    },
    {  //供应商养护品信息列表
        path: '/supplier/productInfo',
        component: () => import('@/pages/supplier/productInfo'),
        meta: { auth: true }
    },
    {  //供应商养护品发货信息列表
        path: '/supplier/productDelivery',
        component: () => import('@/pages/supplier/productDelivery'),
        meta: { auth: true }
    },
    {  //供应商会员专属审核列表
        path: '/supplier/membership',
        component: () => import('@/pages/supplier/membership'),
        meta: { auth: true }
    },
    {  //供应商礼品审核列表
        path: '/supplier/gift',
        component: () => import('@/pages/supplier/gift'),
        meta: { auth: true }
    },
    {  //供应商礼品发货信息列表
        path: '/supplier/giftDelivery',
        component: () => import('@/pages/supplier/giftDelivery'),
        meta: { auth: true }
    },
    {  //供应商取消合作列表
        path: '/supplier/cancel',
        component: () => import('@/pages/supplier/cancel'),
        meta: { auth: true }
    },
    {  //供应商赠品列表
        path: '/supplier/complimentary',
        component: () => import('@/pages/supplier/complimentary'),
        meta: { auth: true }
    },
    {  //供应商会员专属列表
        path: '/supplier/vipList',
        component: () => import('@/pages/supplier/vipList'),
        meta: { auth: true }
    },





    //油品发货信息
    {
        path: '/oilDelivery',
        redirect: '/oilDelivery/list',
        meta: { auth: true }
    },
    {
        path: '/oilDelivery/list',
        component: () => import('@/pages/oilDelivery'),
        meta: { auth: true }
    },




    // 审核
    {
        path: '/audit',
        redirect: '/audit/RepairShops',

    },
    {
        path: '/audit/RepairShops',
        component: () => import('@/pages/audit/RepairShops'),
        meta: { auth: true }
    },
    {
        path: '/audit/materiel',
        component: () => import('@/pages/audit/materiel'),
        meta: { auth: true }
    },
    {
        path: '/audit/servicer',
        redirect: '/audit/servicer/Toaudit',

    },
    {  //审核-车补审核-已审核
        path: '/audit/servicer/Toaudit',
        component: () => import('@/pages/audit/servicer/Toaudit'),
        meta: { auth: true }

    },
    { //审核-车补审核-待审核
        path: '/audit/servicer/audited',
        component: () => import('@/pages/audit/servicer/audited'),
        meta: { auth: true }

    },
    {  //公益金管理 
        path: "/audit/welfareFund",
        redirect: '/audit/welfareFund/unaudited',

        meta: { auth: true }

    },
    //公益金管理-未审核
    {
        path: '/audit/welfareFund/unaudited',
        component: () => import('@/pages/audit/welfareFund/unaudited'),
        meta: { auth: true }

    },
    //公益金管理-已通过
    {
        path: '/audit/welfareFund/passed',
        component: () => import('@/pages/audit/welfareFund/passed'),
        meta: { auth: true }

    },
    //公益金管理-已驳回
    {
        path: '/audit/welfareFund/rejected',
        component: () => import('@/pages/audit/welfareFund/rejected'),
        meta: { auth: true }

    },
    {  //开发奖励发放 
        path: "/audit/reward",
        redirect: '/audit/reward/unaudited',

        meta: { auth: true }

    },
    {  //开发奖励发放-未审核
        path: '/audit/reward/unaudited',
        component: () => import('@/pages/audit/reward/unaudited'),
        meta: { auth: true }

    },

    {  //开发奖励发放-已审核
        path: '/audit/reward/audited',
        component: () => import('@/pages/audit/reward/audited'),
        meta: { auth: true }

    },

    //免费保养-已驳回
    {
        path: '/audit/channel/rejected',
        component: () => import('@/pages/audit/channel/rejected'),
        meta: { auth: true }

    },
    {  //免费保养
        path: "/audit/channel",
        redirect: '/audit/channel/unaudited',

        meta: { auth: true }

    },
    {  //免费保养-未审核
        path: '/audit/channel/unaudited',
        component: () => import('@/pages/audit/channel/unaudited'),
        meta: { auth: true }

    },

    {  //免费保养-已审核
        path: '/audit/channel/passed',
        component: () => import('@/pages/audit/channel/passed'),
        meta: { auth: true }

    },
    {  //免费保养-二次复核
        path: '/audit/channel/twiceReview',
        component: () => import('@/pages/audit/channel/twiceReview'),
        meta: { auth: true }

    },
    {  //渠道发卡
        path: "/audit/channelIssuing",
        component: () => import('@/pages/audit/channelIssuing'),
        meta: { auth: true }
    },

    {  //审核-服务工号审核
        path: '/audit/serviceCode',
        redirect: '/audit/serviceCode/unaudited'
    },
    {  //审核-服务工号审核-未审核
        path: '/audit/serviceCode/unaudited',
        component: () => import('@/pages/audit/serviceCode/unaudited'),
        meta: {
            auth: true
        }

    },
    {  //审核-服务工号审核-已审核
        path: '/audit/serviceCode/audited',
        component: () => import('@/pages/audit/serviceCode/audited'),
        meta: {
            auth: true
        }

    },
    {  //审核-服务工号审核-已驳回
        path: '/audit/serviceCode/rejected',
        component: () => import('@/pages/audit/serviceCode/rejected'),
        meta: {
            auth: true
        }

    },





    // 邦保养VIP
    {   //待审核列表
        path: '/maintenance/auditTeam',
        component: () => import('@/pages/maintenanceVip/ToauditList'),
        meta: {
            auth: true
        }
    },
    {  //团队列表
        path: '/maintenance/team',
        component: () => import('@/pages/maintenanceVip/teamList'),
        meta: {
            auth: true
        }
    },
    { //支付记录
        path: '/maintenance/payRecord',
        component: () => import('@/pages/maintenanceVip/paymentRecords'),
        meta: {
            auth: true
        }
    },
    { //收入记录
        path: '/maintenance/IncomeRecord',
        component: () => import('@/pages/maintenanceVip/IncomeRecord'),
        meta: {
            auth: true
        }
    },


    //系统设置
    {
        path: '/ststemSet/channel',
        redirect: '/ststemSet/channel/Receipt'
    },
    {  //保险公司
        path: '/ststemSet/channel/insurance',
        component: () => import('@/pages/Setup/channel/insurance'),
        meta: {
            auth: true
        }
    },
    {  //主机厂
        path: '/ststemSet/channel/Hosts',
        component: () => import('@/pages/Setup/channel/Hosts'),
        meta: {
            auth: true
        }
    },
    {  //其他类型
        path: '/ststemSet/channel/other',
        component: () => import('@/pages/Setup/channel/other'),
        meta: {
            auth: true
        }
    },
    {  //领卡渠道
        path: '/ststemSet/channel/Receipt',
        component: () => import('@/pages/Setup/channel/Receipt'),
        meta: {
            auth: true
        }
    },
    {  //系统设置-市运营中心设置
        path: "/ststemSet/operatingSetup",
        component: () => import('@/pages/operatingSetup'),
        meta: {
            auth: true
        }
    },

    {  //系统设置-滤芯设置
        path: '/ststemSet/filterSetup',
        component: () => import('@/pages/filterSetup'),
        meta: {
            auth: true
        }
    },
    { //系统设置-保险公司设置
        path: '/ststemSet/freeMaintenance',
        redirect: '/ststemSet/freeMaintenance/issueCamilo'

    },
    { //系统设置-保险公司设置-发放卡密
        path: '/ststemSet/freeMaintenance/issueCamilo',
        component: () => import('@/pages/freeMaintenance/issueCamilo'),
        meta: {
            auth: true
        }
    },
    { //系统设置-保险公司设置-线下领取
        path: '/ststemSet/freeMaintenance/offlineGet',
        component: () => import('@/pages/freeMaintenance/offlineGet'),
        meta: {
            auth: true
        }
    },


    //兑换码
    {
        path: '/Conversioncode',
        redirect: '/Conversioncode/notVerification'
    },
    { //兑换码-未核销
        path: '/Conversioncode/notVerification',
        component: () => import('@/pages/Conversioncode/notVerification'),
        meta: {
            auth: true
        }
    },
    { //兑换码-已核销
        path: '/Conversioncode/hasVerification',
        component: () => import('@/pages/Conversioncode/hasVerification'),
        meta: {
            auth: true
        }
    },



    //地区设置
    {
        path: '/regionSetup',
        component: () => import('@/pages/regionSetup'),
        meta: {
            auth: true
        }
    },



    //德州旅行
    {
        path: '/TexasTravel',
        redirect: "/TexasTravel/shuffling"
    },
    { //德州旅行-出游
        path: '/TexasTravel/travel',
        component: () => import('@/pages/TexasTravel/travel'),
        meta: {
            auth: true
        }
    },
    {  //德州旅行-轮播列表
        path: '/TexasTravel/shuffling',
        redirect: "/TexasTravel/shuffling/unaudited"
    },
    { //德州旅行-轮播列表-未审核
        path: '/TexasTravel/shuffling/unaudited',
        component: () => import('@/pages/TexasTravel/shuffling/unaudited'),
        meta: {
            auth: true
        }
    },
    { //德州旅行-轮播列表-已审核
        path: '/TexasTravel/shuffling/audited',
        component: () => import('@/pages/TexasTravel/shuffling/audited'),
        meta: {
            auth: true
        }
    },
    { //德州旅行-轮播列表-已驳回
        path: '/TexasTravel/shuffling/rejected',
        component: () => import('@/pages/TexasTravel/shuffling/rejected'),
        meta: {
            auth: true
        }
    },
    {  //德州旅行-德州旅行列表
        path: '/TexasTravel/travelList',
        redirect: "/TexasTravel/travelList/unaudited"
    },
    { //德州旅行-德州旅行列表-未审核
        path: '/TexasTravel/travelList/unaudited',
        component: () => import('@/pages/TexasTravel/travelList/unaudited'),
        meta: {
            auth: true
        }
    },
    { //德州旅行-德州旅行列表-已审核
        path: '/TexasTravel/travelList/audited',
        component: () => import('@/pages/TexasTravel/travelList/audited'),
        meta: {
            auth: true
        }
    },
    { //德州旅行-德州旅行列表-已驳回
        path: '/TexasTravel/travelList/rejected',
        component: () => import('@/pages/TexasTravel/travelList/rejected'),
        meta: {
            auth: true
        }
    },


    {  //德州旅行-注册审核
        path: '/TexasTravel/enrollAudit',
        redirect: "/TexasTravel/enrollAudit/unaudited"
    },
    { //德州旅行-注册审核-未审核
        path: '/TexasTravel/enrollAudit/unaudited',
        component: () => import('@/pages/TexasTravel/enrollAudit/unaudited'),
        meta: {
            auth: true
        }
    },
    { //德州旅行-注册审核-已审核
        path: '/TexasTravel/enrollAudit/audited',
        component: () => import('@/pages/TexasTravel/enrollAudit/audited'),
        meta: {
            auth: true
        }
    },
    { //德州旅行-注册审核-已驳回
        path: '/TexasTravel/enrollAudit/rejected',
        component: () => import('@/pages/TexasTravel/enrollAudit/rejected'),
        meta: {
            auth: true
        }
    },

    {  //人车生活
        path: "/mancarLife",
        name: 'mancarLife',
        component: () => import('@/pages/mancarLife'),
        redirect: '/mancarLife/SaveTrouble',
        children: [
            {   //省事儿
                path: 'SaveTrouble',
                name: 'SaveTrouble',
                component: () => import('@/pages/mancarLife/SaveTrouble'),
                redirect: '/mancarLife/SaveTrouble/unaudited',
                children: [
                    {  //未审核
                        path: 'unaudited',
                        name: 'unaudited',
                        component: () => import('@/pages/mancarLife/SaveTrouble/unaudited'),
                        meta: {
                            auth: true
                        }
                    },
                    {  //已审核
                        path: 'audited',
                        name: 'audited',
                        component: () => import('@/pages/mancarLife/SaveTrouble/audited'),
                        meta: {
                            auth: true
                        }
                    },
                    {  //已驳回
                        path: 'rejected',
                        name: 'rejected',
                        component: () => import('@/pages/mancarLife/SaveTrouble/rejected'),
                        meta: {
                            auth: true
                        }
                    }
                ]
            },
            {   //惠生活-邦友特惠
                path: 'HoyoTech',
                name: 'HoyoTech',
                component: () => import('@/pages/mancarLife/HoyoTech'),
                redirect: '/mancarLife/HoyoTech/unaudited',
                children: [
                    {  //未审核
                        path: 'unaudited',
                        name: 'unaudited',
                        component: () => import('@/pages/mancarLife/HoyoTech/unaudited'),
                        meta: {
                            auth: true
                        }
                    },
                    {  //已审核
                        path: 'audited',
                        name: 'audited',
                        component: () => import('@/pages/mancarLife/HoyoTech/audited'),
                        meta: {
                            auth: true
                        }
                    },
                    {  //已驳回
                        path: 'rejected',
                        name: 'rejected',
                        component: () => import('@/pages/mancarLife/HoyoTech/rejected'),
                        meta: {
                            auth: true
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/channelIssuing', //渠道发卡
        redirect: '/channelIssuing/list'
    },
    {
        path: '/channelIssuing/list', //渠道发卡-发卡列表
        component: () => import('@/pages/channelIssuing/list'),
        meta: {
            auth: true
        }
    }

]

export default routes
