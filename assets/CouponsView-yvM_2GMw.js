import{_ as y,o as a,c as d,a as e,f as u,v as r,l as w,t as f,m as L,r as m,b as _,F as C,k as D}from"./index-ogWOfh8p.js";import{a as g,u as P}from"./axios-mkH_dabD.js";import{m as V,D as T,P as E}from"./PagePagination-RC0z4CNJ.js";import{L as N}from"./LoadingComponent-SGC4biUL.js";const U={props:["coupon","isNew"],mixins:[V],data(){return{tempCoupon:{},due_date:""}},emits:["update-coupon"],watch:{coupon(){this.tempCoupon=this.coupon;const s=new Date(this.tempCoupon.due_date*1e3).toISOString().split("T");[this.due_date]=s},due_date(){}}},R={class:"modal fade",id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},S={class:"modal-dialog",role:"document"},A={class:"modal-content"},I={class:"modal-header"},B={class:"modal-title",id:"exampleModalLabel"},O={key:0},F={key:1},H=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),j={class:"modal-body"},q={class:"mb-3"},z=e("label",{for:"title"},"標題",-1),G={class:"mb-3"},J=e("label",{for:"coupon_code"},"優惠碼",-1),K={class:"mb-3"},Q=e("label",{for:"due_date"},"到期日",-1),W={class:"mb-3"},X=e("label",{for:"price"},"折扣百分比",-1),Y={class:"mb-3"},Z={class:"form-check"},ee=e("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),te={class:"modal-footer"},oe=e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"關閉",-1);function se(s,t,n,c,o,i){return a(),d("div",R,[e("div",S,[e("div",A,[e("div",I,[e("h5",B,[n.isNew?(a(),d("span",O,"新增優惠卷")):(a(),d("span",F,"編輯優惠卷"))]),H]),e("div",j,[e("div",q,[z,u(e("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[0]||(t[0]=l=>o.tempCoupon.title=l),placeholder:"請輸入標題"},null,512),[[r,o.tempCoupon.title]])]),e("div",G,[J,u(e("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":t[1]||(t[1]=l=>o.tempCoupon.code=l),placeholder:"請輸入優惠碼"},null,512),[[r,o.tempCoupon.code]])]),e("div",K,[Q,u(e("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[2]||(t[2]=l=>o.due_date=l)},null,512),[[r,o.due_date]])]),e("div",W,[X,u(e("input",{type:"number",class:"form-control",id:"price",min:"0","onUpdate:modelValue":t[3]||(t[3]=l=>o.tempCoupon.percent=l),placeholder:"請輸入折扣百分比"},null,512),[[r,o.tempCoupon.percent,void 0,{number:!0}]])]),e("div",Y,[e("div",Z,[u(e("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":t[4]||(t[4]=l=>o.tempCoupon.is_enabled=l),id:"is_enabled"},null,512),[[w,o.tempCoupon.is_enabled]]),ee])])]),e("div",te,[oe,e("button",{type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=l=>s.$emit("update-coupon",o.tempCoupon))},f(n.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)}const ne=y(U,[["render",se]]);var le={VITE_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"wei_rio",BASE_URL:"/question0304/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:h,VITE_PATH:b}=le,ie={components:{CouponModal:ne,DelModal:T,Pagination:E,LoadingComponent:N},data(){return{isLoading:!1,coupons:{},isNew:!1,tempCoupon:{title:"",is_enabled:0,percent:100,code:""},currentPage:1,pagination:{}}},created(){this.getCoupons()},methods:{...L(P,["pushMessage"]),getCoupons(s=1){this.currentPage=s,this.isLoading=!0;const t=`${h}/api/${b}/admin/coupons?page=${s}`;g.get(t).then(n=>{this.coupons=n.data.coupons,this.pagination=n.data.pagination,this.pushMessage({style:"success",title:"取得優惠卷資料",content:n.data.message})}).catch(n=>{this.pushMessage({style:"danger",title:"優惠卷資料取得失敗",content:n.response.data.message})}).finally(()=>{this.isLoading=!1})},openModal(s,t){s==="add"?(this.isNew=!0,this.tempCoupon={due_date:new Date().getTime()/1e3},this.$refs.couponModal.openModal()):s==="edit"?(this.isNew=!1,this.tempCoupon={...t},this.$refs.couponModal.openModal()):s==="del"&&(this.tempCoupon={...t},this.$refs.delCoupon.openModal())},updateCoupon(s){this.isLoading=!0,this.tempCoupon=s;let t=`${h}api/${b}/admin/coupon`,n="post",c=s,o="新增優惠卷";this.isNew||(t=`${h}api/${b}/admin/coupon/${this.tempCoupon.id}`,n="put",c=this.tempCoupon,o="更新優惠卷"),g[n](t,{data:c}).then(i=>{this.pushMessage({style:"success",title:`${o}`,content:i.data.message}),this.getCoupons(this.currentPage),this.$refs.couponModal.hideModal()}).catch(i=>{this.pushMessage({style:"danger",title:"優惠卷刪除失敗",content:i.response.data.message})}).finally(()=>{this.isLoading=!1})},delCoupon(){this.isLoading=!0;const s=`${h}/api/${b}/admin/coupon/${this.tempCoupon.id}`;g.delete(s).then(t=>{this.pushMessage({style:"success",title:"成功刪除優惠卷",content:t.data.message}),this.getCoupons(this.currentPage),this.$refs.delCoupon.hideModal()}).catch(t=>{this.pushMessage({style:"danger",title:"優惠卷刪除失敗",content:t.response.data.message})}).finally(()=>{this.isLoading=!1})}}},ae={class:"container"},de={class:"d-flex justify-content-between align-items-center"},pe=e("h2",{class:"my-4 fw-bold"},"優惠卷",-1),ue={class:"table mt-4"},ce=e("thead",null,[e("tr",null,[e("th",null,"名稱"),e("th",null,"折扣百分比"),e("th",null,"到期日"),e("th",{class:"text-center"},"是否啟用"),e("th",null,"編輯")])],-1),re={class:"text-center"},me={key:0,class:"text-success"},_e=e("i",{class:"bi bi-check-circle-fill h5"},null,-1),he=[_e],be={key:1,class:"text-danger"},fe=e("i",{class:"bi bi-x-circle-fill h5"},null,-1),ge=[fe],Ce={class:"btn-group flex-sm-row flex-column"},ye=["onClick"],Me=["onClick"];function ve(s,t,n,c,o,i){const l=m("LoadingComponent"),M=m("Pagination"),v=m("CouponModal"),$=m("DelModal");return a(),d(C,null,[_(l,{loadingStatus:o.isLoading},null,8,["loadingStatus"]),e("div",ae,[e("div",de,[pe,e("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=p=>i.openModal("add",s.item))}," 建立新的優惠券 ")]),e("table",ue,[ce,e("tbody",null,[(a(!0),d(C,null,D(o.coupons,(p,x)=>(a(),d("tr",{key:x},[e("td",null,f(p.title),1),e("td",null,f(p.percent)+" %",1),e("td",null,f(s.$filters.date(p.due_date)),1),e("td",re,[p.is_enabled?(a(),d("span",me,he)):(a(),d("span",be,ge))]),e("td",null,[e("div",Ce,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm mb-sm-0 mb-2",onClick:k=>i.openModal("edit",p)}," 編輯 ",8,ye),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:k=>i.openModal("del",p)}," 刪除 ",8,Me)])])]))),128))])]),_(M,{pages:o.pagination,onEmitPages:i.getCoupons},null,8,["pages","onEmitPages"])]),_(v,{coupon:o.tempCoupon,"is-new":o.isNew,onUpdateCoupon:i.updateCoupon,ref:"couponModal"},null,8,["coupon","is-new","onUpdateCoupon"]),_($,{"out-item":o.tempCoupon,onRemoveData:i.delCoupon,ref:"delCoupon"},null,8,["out-item","onRemoveData"])],64)}const Le=y(ie,[["render",ve]]);export{Le as default};