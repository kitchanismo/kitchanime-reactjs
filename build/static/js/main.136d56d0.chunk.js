(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{111:function(e,t,a){},119:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(16),c=a.n(s),o=a(123),l=(a(63),a(9)),u=r.a.createContext({}),i=a(17),m=a(27),d=a.n(m);function p(e,t){return d.a.orderBy(e,[t.path],[t.order])}var f=function(e){return e?new Date(e).toLocaleDateString():null},b=function(e){var t=e.id,a=e.name;return{id:t,label:E(a),value:a}},E=function(e){return d.a.startCase(e)},v=a(19),g=a.n(v);g.a.interceptors.response.use(function(e){return e},function(e){return function(e){e.config;if(e.response&&"ExpiredJwtToken"===e.response.data.status.name)return l.toast.error("jwt is expired"),Promise.reject(e);e.response&&e.response.status>=400&&e.response.status<500||l.toast.error("An unexpected error occurrred.");return Promise.reject(e)}(e)}),g.a.interceptors.request.use(function(e){return e.baseURL=i.a,e});var h={get:g.a.get,post:g.a.post,put:g.a.put,delete:g.a.delete,axios:g.a,setJwt:function(e){var t=e.token;g.a.interceptors.request.use(function(e){return e.headers.Authorization="Bearer ".concat(t),e})}};var y=a(6),S=a.n(y),j=a(3),N=a(12),O=a(48),w=a.n(O);function k(e){var t=e.token,a=e.refreshToken;localStorage.setItem("access-token",t),localStorage.setItem("refresh-token",a)}function x(){return(x=Object(N.a)(S.a.mark(function e(t){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.post("/auth/login",t).then(function(e){k(e.data.jwt)});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function T(){return(T=Object(N.a)(S.a.mark(function e(t){var a,n;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.post("/auth/register",t).then(function(e){return e.data});case 2:if(a=e.sent,n=a.jwt){e.next=6;break}return e.abrupt("return",!1);case 6:return k(n),e.abrupt("return",!0);case 8:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function C(){try{var e=localStorage.getItem("access-token");return Object(j.a)({},w()(e))}catch(t){return null}}var A=function(){return{token:localStorage.getItem("access-token"),refreshToken:localStorage.getItem("refresh-token")}},I={login:function(e){return x.apply(this,arguments)},register:function(e){return T.apply(this,arguments)},logout:function(){h.setJwt(A()),localStorage.removeItem("refresh-token"),localStorage.removeItem("access-token"),h.post("/token/revoke",{refreshToken:A().refreshToken}).then(function(e){})},getCurrentUser:function(){return C()?Object(j.a)({},C().data):null},isUsernameTaken:function(e){return h.get("/auth/is-taken?username="+e).then(function(e){return e.data})},isEmailTaken:function(e){return h.get("/auth/is-taken?email="+e).then(function(e){return e.data})},jwt:A,isValidUser:function(){return!!C()},isAdmin:function(){return C()?C().data.isAdmin:null}};function _(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return h.get("/api/animes/page/".concat(e,"?limit=").concat(t,"&title=").concat(a)).then(function(e){return e.data.data})}function D(){return h.get("/api/genres").then(function(e){return e.data})}function P(e){return h.get("/api/animes/".concat(e)).then(function(e){return e.data})}var U=[{label:"Winter",value:"winter"},{label:"Spring",value:"spring"},{label:"Summer",value:"summer"},{label:"Fall",value:"fall"}],F=[{label:"TV",value:"tv"},{label:"Movie",value:"movie"},{label:"OVA",value:"ova"},{label:"ONA",value:"ona"},{label:"Other",value:"other"}];function M(e){return h.setJwt(I.jwt()),h.post("/api/animes",e).then(function(e){return e.data})}function R(e,t){return h.setJwt(I.jwt()),h.put("/api/animes/"+e,t).then(function(e){return e.data})}var G=a(21),L=a(5),q=function(e,t){var a=t.payload;switch(t.type){case"SET_PAGENUM":return Object(j.a)({},e,{pageNum:a});case"SET_ITEMS":return Object(j.a)({},e,{items:a});case"SET_PAGES":return Object(j.a)({},e,{pages:a});case"SET_TOTAL":return Object(j.a)({},e,{total:a});case"SET_REFRESH":return Object(j.a)({},e,{refresh:a});case"SEARCH_ITEMS":return Object(j.a)({},e,{title:a});default:return e}},B=function(e){var t=e.request,a=e.data,r=void 0===a?"data":a,s=e.pages,c=void 0===s?"lastPage":s,o=e.total,u=void 0===o?"total":o,i=e.take,m=void 0===i?15:i,d={items:[],pageNum:1,pages:0,total:0,take:m,refresh:!1},p=Object(n.useReducer)(q,d),f=Object(L.a)(p,2),b=f[0],E=b.refresh,v=b.title,g=b.pageNum,h=Object(G.a)(b,["refresh","title","pageNum"]),y=f[1];return Object(n.useEffect)(function(){t(g,m,v).then(function(e){y({type:"SET_ITEMS",payload:e[r]}),y({type:"SET_PAGES",payload:e[c]}),y({type:"SET_TOTAL",payload:e[u]})}).catch(function(e){var t=e.response;t&&404===t.status&&(y({type:"SET_ITEMS",payload:[]}),y({type:"SET_PAGES",payload:0}),y({type:"SET_TOTAL",payload:0}),y({type:"SET_PAGENUM",payload:1}),l.toast.error("No result/s found"))})},[E,v,g]),{state:Object(j.a)({refresh:E,pageNum:g,take:m},h),dispatch:y}},J=Object(n.memo)(function(e){var t=B({request:_,take:i.b.perPage}),a=t.state,n=a.pageNum,s=a.items,c=a.pages,o=a.total,l=t.dispatch;return r.a.createElement(u.Provider,{value:{state:{animes:s,pages:c,pageNum:n,total:o},dispatch:l}},e.children)}),H=a(96),V=a(121),W=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("div",{className:"container"},r.a.createElement(H.a,{className:"navbar-brand",to:"/"},"KITCHANIME"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse d-flex justify-content-end",id:"navbarNav"},r.a.createElement("ul",{className:"navbar-nav"},I.isValidUser()&&r.a.createElement(r.a.Fragment,null,r.a.createElement("i",{className:"fa fa-user  text-warning"}),r.a.createElement("li",{className:"nav-item"},r.a.createElement(V.a,{className:"nav-link active",to:"/home"},E(I.getCurrentUser().username))),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/login",onClick:function(){I.logout()}},"Logout"))),!I.isValidUser()&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"nav-item"},r.a.createElement(V.a,{className:"nav-link",to:"/login"},"Login")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(V.a,{className:"nav-link",to:"/register"},"Register")))))),r.a.createElement("style",{jsx:!0},"\n          .navbar {\n            margin-bottom: 20px;\n          }\n          .fa-user {\n            margin-top: 12px !important;\n          }\n        ")))},z=a(124),Y=a(120),K=a(122),$=a(56),Q=function(e){return r.a.createElement("thead",{className:"thead-dark"},r.a.createElement("tr",null,e.columns.map(function(t,a){return r.a.createElement("th",{className:"clickable",key:a,onClick:function(){return function(t){var a=Object(j.a)({},e.sortColumn);a.path===t?a.order="asc"===a.order?"desc":"asc":(a.path=t,a.order="asc"),e.onSort(a)}(t.path)}},t.label," ",function(t){var a=e.sortColumn;return t.path?t.path!==a.path?null:"asc"===a.order?r.a.createElement("i",{className:"fa fa-sort-asc"}):r.a.createElement("i",{className:"fa fa-sort-desc"}):null}(t))})))},X=function(e){var t=e.data,a=e.columns;return r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.id},a.map(function(t,a){return r.a.createElement("td",{key:a},function(e,t){return t.content?t.content(e):d.a.get(e,t.path)}(e,t))}))}))},Z=function(e){var t=e.columns,a=e.sortColumn,n=e.onSort,s=e.data;return r.a.createElement("table",{className:"table table-bordered table-hover "},r.a.createElement(Q,{columns:t,sortColumn:a,onSort:n}),r.a.createElement(X,{columns:t,data:s}))},ee=function(e){var t=e.start,a=e.end,s=e.setStart,c=e.setEnd,o=i.b.pageNumbers,l=Object(n.useContext)(u),m=l.dispatch,d=l.state,p=d.pageNum,f=d.pages;Object(n.useEffect)(function(){a>f&&1!==t&&(s(t-1),c(a-1))},[p]);var b=function(e){p!==e&&m({type:"SET_PAGENUM",payload:e})},E=function(){return f>o},v=function(){return 1===p?"disabled":""},g=function(){return f===p?"disabled":""};return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col d-flex justify-content-start px-0"},r.a.createElement("nav",null,r.a.createElement("ul",{className:"pagination"},E()&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"page-item ".concat(v())},r.a.createElement("button",{className:"page-link",onClick:function(){1!==p&&(b(1),s(1),c(o))}},"first")),r.a.createElement("li",{className:"page-item ".concat(v())},r.a.createElement("button",{className:"page-link","aria-label":"Previous",onClick:function(){return b(p-1),void(1!==t&&(s(t-1),c(a-1)))}},"\xab"))),f>1&&function(e,t){for(var a=[],n=e;n<=t;n++)a.push(n);return a}(t,f<o?f:a).map(function(e){return r.a.createElement("li",{key:e,className:p===e?"page-item active":"page-item"},r.a.createElement("button",{className:"page-link",onClick:function(){return b(e)}},e))}),E()&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"page-item ".concat(g())},r.a.createElement("button",{className:"page-link","aria-label":"Next",onClick:function(){return function(e){b(e+1),a!==f&&(s(t+1),c(a+1))}(p)}},"\xbb")),r.a.createElement("li",{className:"page-item ".concat(g())},r.a.createElement("button",{className:"page-link",onClick:function(){b(f),s(f-(o-1)),c(f)}},"last")))))),r.a.createElement("div",{className:"pages px-0 col d-flex justify-content-end"},r.a.createElement("p",{className:"page-of"},"".concat(p," of ").concat(f))),r.a.createElement("style",{jsx:!0},"\n            .pages {\n              text-align: right;\n            }\n            .page-of {\n              margin-top: 10px;\n            }\n          ")))},te=function(e){var t=Object(n.useContext)(u),a=t.state,s=a.animes,c=a.pageNum,o=t.dispatch,i=Object(n.useState)({path:"name",order:"asc"}),m=Object(L.a)(i,2),d=m[0],b=m[1],E=[{path:"title",label:"Title",content:function(e){return r.a.createElement(H.a,{to:"/animes/".concat(e.id)},e.title)}},{path:"season",label:"Season"},{path:"releaseDate",label:"Release"},{path:"type",label:"Type"},{label:"Genres",content:function(e){return g(e.genres)}},{label:"Studios",content:function(e){return g(e.studios)}},{key:"actions",label:"Actions",content:function(e){return r.a.createElement("div",{className:""},r.a.createElement(H.a,{to:"/animes/".concat(e.id)},r.a.createElement("button",{className:"btn btn-warning btn-sm mr-1 fa fa-pencil text-white"})),r.a.createElement("button",{onClick:Object(N.a)(S.a.mark(function t(){return S.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)})),className:"btn btn-danger btn-sm fa fa-trash text-white"}))}}],v=function(){var t=Object(N.a)(S.a.mark(function t(a){var n,r,u,i,m;return S.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(I.isAdmin()){t.next=3;break}return l.toast.error("Unauthorized user"),t.abrupt("return");case 3:return n=(n=Object($.a)(s)).filter(function(e){return e.id!==a.id}),o({type:"SET_ITEMS",payload:n}),t.next=8,d=a.id,h.setJwt(I.jwt()),h.delete("/api/animes/"+d).then(function(e){return e.data});case 8:if(0!==n.length){t.next=14;break}return r=e.start,u=e.end,i=e.setStart,m=e.setEnd,o({type:"SET_PAGENUM",payload:c-1}),i(r-1),m(u-1),t.abrupt("return");case 14:o({type:"SET_REFRESH",payload:new Date});case 15:case"end":return t.stop()}var d},t,this)}));return function(e){return t.apply(this,arguments)}}(),g=function(e){return e.map(function(e,t){return r.a.createElement("span",{key:t,className:"badge ml-1  badge-secondary"},e.name)})};return r.a.createElement(r.a.Fragment,null,r.a.createElement(Z,{columns:I.isAdmin()?E:[].concat(E).filter(function(e){return"actions"!==e.key}),data:s.map(function(e){return e.releaseDate=f(e.releaseDate),e}),sortColumn:d,onSort:function(e){o({type:"SET_ITEMS",payload:p(s,e)}),b(e)}}),r.a.createElement(ee,e))},ae=function(e){var t=e.isLoaded,a=e.children;return r.a.createElement(r.a.Fragment,null,!t&&r.a.createElement("div",{className:"spin d-flex justify-content-center justify-items-center"},r.a.createElement("div",{className:"spinner spinner-grow",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading..."))),t&&a,r.a.createElement("style",{jsx:!0},"\n        .spin {\n          position: fixed;\n          z-index: 1031;\n          top: 40%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n        }\n      "))},ne=function(e){var t=Object(n.useContext)(u).dispatch,a=Object(n.useState)(""),s=Object(L.a)(a,2),c=s[0],o=s[1],l=function(){var a=Object(N.a)(S.a.mark(function a(n){return S.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(n.preventDefault(),c){a.next=3;break}return a.abrupt("return");case 3:e.setStart(1),e.setEnd(i.b.pageNumbers),t({type:"SET_PAGENUM",payload:1}),t({type:"SEARCH_ITEMS",payload:c});case 7:case"end":return a.stop()}},a,this)}));return function(e){return a.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:l},r.a.createElement("input",{type:"text",name:c,value:c,onChange:function(e){return o(e.target.value)},className:"form-control",placeholder:"Search title"}),r.a.createElement("button",{className:"btn btn-primary ml-2 mb-2"},"Search")),r.a.createElement("style",{jxs:!0},"\n      form {\n        display:flex;\n      }\n     \n     "))},re=function(e){var t=e.total,a=e.title;return r.a.createElement("div",{className:"row no-gutters align-items-center"},r.a.createElement("div",{className:"col  d-flex justify-content-start align-items-center"},r.a.createElement("span",null,r.a.createElement("h1",{className:"mb-3"},a)),r.a.createElement("h5",null,r.a.createElement("span",{className:"badge badge-pill badge-primary ml-2"},t))))},se=Object(n.memo)(function(e){var t=Object(n.useContext)(u),a=t.state,s=t.dispatch,c=i.b.pageNumbers,o=Object(n.useState)(1),l=Object(L.a)(o,2),m=l[0],d=l[1],p=Object(n.useState)(c),f=Object(L.a)(p,2),b=f[0],E=f[1],v=function(){s({type:"SEARCH_ITEMS",payload:""})},g={start:m,end:b,setStart:d,setEnd:E};return r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(re,{total:a.total,title:"Animes"}),r.a.createElement("div",{className:"row no-gutters "},r.a.createElement("div",{className:"col-7 d-flex justify-content-start "},I.isAdmin()&&r.a.createElement(H.a,{to:"/animes/new"},r.a.createElement("button",{className:"btn fa fa-plus btn-success btn-lg mr-2 mt-1"})),r.a.createElement("div",null,r.a.createElement(H.a,{to:"/"},r.a.createElement("button",{onClick:v,className:"btn fa fa-refresh btn-secondary btn-lg mt-1"})))),r.a.createElement("div",{className:"col-5 mb-2  "},r.a.createElement(ne,g)))),r.a.createElement(ae,{isLoaded:a.total>0},r.a.createElement(te,g)))}),ce=function(){return r.a.createElement("h1",null,"Not Found")},oe=a(7),le=a.n(oe),ue=function(){var e=Object(n.useReducer)(function(e,t){var a=t.payload;switch(t.type){case"SET_GENRES":return Object(j.a)({},e,{genres:a});case"SET_STUDIOS":return Object(j.a)({},e,{studios:a});case"SET_SEASONS":return Object(j.a)({},e,{seasons:a});case"SET_TYPES":return Object(j.a)({},e,{types:a});default:return e}},{genres:[],studios:[],types:[],seasons:[]}),t=Object(L.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)(function(){D().then(function(e){r({type:"SET_GENRES",payload:e.genres.map(function(e){return b(e)})})}),h.get("/api/studios").then(function(e){return e.data}).then(function(e){r({type:"SET_STUDIOS",payload:e.studios.map(function(e){return b(e)})})}),r({type:"SET_SEASONS",payload:U}),r({type:"SET_TYPES",payload:F})},[]),{state:a,dispatch:r}},ie=a(22),me=function(e){var t=e.name,a=e.label,n=e.error,s=Object(G.a)(e,["name","label","error"]);return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:t},a),r.a.createElement("input",Object.assign({},s,{name:t,id:t,className:"form-control"})),n&&r.a.createElement("p",{className:"text-danger p-2 "},n))},de=a(54),pe=a(57),fe=(a(102),function(e){var t=e.data||{},a=t.data,n=t.setData,s=e.errors||{},c=s.errors,o=s.setErrors,l=Object(j.a)({},e.schema),u=function(){var e=le.a.validate(a,l,{abortEarly:!1}).error;if(!e)return null;var t={},n=!0,r=!1,s=void 0;try{for(var c,o=e.details[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var u=c.value;t[u.path[0]]=u.message}}catch(i){r=!0,s=i}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return t},i=function(e){var t=e.currentTarget,r=Object(j.a)({},c),s=function(e){var t=e.name,a=e.value,n=Object(ie.a)({},t,a),r=Object(ie.a)({},t,l[t]),s=le.a.validate(n,r).error;return s?s.details[0].message:null}(t);s?r[t.name]=s:delete r[t.name];var u=m(t,r,a.password),i=Object(j.a)({},a);i[t.name]=t.value,n(i),o(u)},m=function(e,t,a){var n=Object(j.a)({},t);return"confirmPassword"===e.name&&e.value===a&&delete n[e.name],n};return r.a.createElement("form",{onSubmit:function(t){return function(e,t){e.preventDefault();var n=u();o(n||{}),n||t(e,a)}(t,e.onSubmit)}},e.children({renderButton:function(e){return r.a.createElement("button",{disabled:u()||Object.keys(c).length>0,className:"btn btn-primary mt-3"},e)},renderInput:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"text",s=arguments.length>3?arguments[3]:void 0;return r.a.createElement(me,Object.assign({type:n,name:e,value:a[e],label:t,onChange:i,error:c[e]},s))},renderTextArea:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:e},t),r.a.createElement("textarea",{value:a[e],onChange:i,className:"form-control",id:e,rows:n,name:e}),c[e]&&r.a.createElement("div",{className:"alert p-2 mt-2 alert-danger"},c[e]))},renderDatePicker:function(e,t,n){return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:e},t),r.a.createElement("div",null,r.a.createElement(de.a,Object.assign({peekNextMonth:!0,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select",placeholderText:"Select a date",className:"form-control",value:a[e]},n))),c[e]&&r.a.createElement("div",{className:"alert p-2 mt-2 alert-danger"},c[e]))},renderSelect:function(e,t,a,n,s,c){return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:e},t),r.a.createElement(pe.a,Object.assign({},c,{isSearchable:!0,isClearable:!0,value:a,onChange:n,options:s})))}}))}),be=Object(n.memo)(function(e){var t=Object(n.useContext)(u),a=e.match.params.id,s=ue().state,c=s.genres,o=s.studios,i=s.seasons,m=s.types,d=Object(n.useState)({id:0,title:"",description:"",season:null,type:null,genres:[],studios:[],releaseDate:""}),p=Object(L.a)(d,2),E=p[0],v=p[1],g=Object(n.useState)({}),h=Object(L.a)(g,2),y=h[0],O=h[1],w=Object(n.useState)([]),k=Object(L.a)(w,2),x=k[0],T=k[1],C=Object(n.useState)([]),A=Object(L.a)(C,2),_=A[0],D=A[1],U=Object(n.useState)(null),F=Object(L.a)(U,2),G=F[0],q=F[1],B=Object(n.useState)(null),J=Object(L.a)(B,2),V=J[0],W=J[1],z={id:le.a.number().integer(),title:le.a.string().min(3).required().label("Title"),description:le.a.optional(),season:le.a.optional(),type:le.a.optional(),releaseDate:le.a.optional(),imageUrl:le.a.optional(),genres:le.a.array().optional(),studios:le.a.array().optional()};Object(n.useEffect)(function(){Y()},[]);var Y=function(){var t=Object(N.a)(S.a.mark(function t(){var n,r,s,c,o,l,u;return S.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,"new"!==a){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,P(a);case 5:n=t.sent,r=n.anime,s=K(r),c=s.selectedGenres,o=s.selectedStudios,l=s.selectedSeason,u=s.selectedType,r.releaseDate=f(r.releaseDate),v(r),T(c),D(o),q(l),W(u),t.next=19;break;case 16:t.prev=16,t.t0=t.catch(0),t.t0.response&&404===t.t0.response.status&&e.history.replace("/not-found");case 19:case"end":return t.stop()}},t,this,[[0,16]])}));return function(){return t.apply(this,arguments)}}(),K=function(e){return{selectedGenres:e.genres.map(function(e){return b(e)}),selectedStudios:e.studios.map(function(e){return b(e)}),selectedSeason:b({id:null,name:e.season}),selectedType:b({id:null,name:e.type})}},$=function(){var a=Object(N.a)(S.a.mark(function a(){var n;return S.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(I.isAdmin()){a.next=3;break}return l.toast.error("Unauthorized user"),a.abrupt("return");case 3:if((n=Object(j.a)({},E)).genreIds=x.map(function(e){return e.id})||[],n.studioIds=_.map(function(e){return e.id})||[],n.season=G?G.value:"",n.type=V?V.value:"",n.releaseDate?n.releaseDate=new Date(n.releaseDate).toISOString():delete n.releaseDate,!n.id){a.next=14;break}return a.next=12,R(n.id,n);case 12:a.next=16;break;case 14:return a.next=16,M(n);case 16:n.id?l.toast.success("Updated"):l.toast.success("Added"),e.history.push("/"),t.dispatch({type:"SET_REFRESH",payload:new Date});case 19:case"end":return a.stop()}},a,this)}));return function(){return a.apply(this,arguments)}}(),Q=function(e){return T(e)},X=function(e){return q(e)},Z=function(e){return W(e)},ee=function(e){return D(e)},te=function(e){var t=Object(j.a)({},E);t.releaseDate=f(e),v(t)};return r.a.createElement(ae,{isLoaded:o.length>0||"new"===a},r.a.createElement("div",{className:"col-8 offset-2"},r.a.createElement("h1",null,"new"!==a?"Edit Form":"Add Form"),r.a.createElement("span",{className:" d-flex justify-content-end"},r.a.createElement(H.a,{to:"/"},r.a.createElement("button",{className:"btn fa fa-arrow-left btn-secondary btn-lg "}))),r.a.createElement(fe,{data:{data:E,setData:v},errors:{errors:y,setErrors:O},onSubmit:$,schema:z},function(e){var t=e.renderButton,n=e.renderInput,s=e.renderSelect,l=e.renderTextArea,u=e.renderDatePicker;return r.a.createElement(r.a.Fragment,null,n("title","Title"),l("description","Description"),s("type","Type",V,Z,m),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6"},s("season","Season",G,X,i)),r.a.createElement("div",{className:"col-6"},u("releaseDate","Release",{onChange:te}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6"},s("genreIds","Genres",x,Q,c,{isMulti:!0})),r.a.createElement("div",{className:"col-6"},s("studioIds","Studios",_,ee,o,{isMulti:!0}))),n("imageUrl","Image Url"),t("new"!==a?"Update":"Save"))})))}),Ee=function(e){var t=Object(n.useState)({username:"",password:""}),a=Object(L.a)(t,2),s=a[0],c=a[1],o=Object(n.useState)({}),u=Object(L.a)(o,2),i=u[0],m=u[1],d={username:le.a.string().required().label("Username"),password:le.a.string().required().label("Password")},p=function(){var t=Object(N.a)(S.a.mark(function t(a,n){var r;return S.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,I.login(n);case 3:l.toast.success("Welcome, ".concat(E(n.username))),e.history.replace("/home"),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),(r=t.t0.response)&&401===r.status&&l.toast.error(r.data.status.errors);case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,a){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"col-6 offset-3 mt-5"},r.a.createElement("h1",null,"Login"),r.a.createElement(fe,{data:{data:s,setData:c},errors:{errors:i,setErrors:m},onSubmit:p,schema:d},function(e){var t=e.renderButton,a=e.renderInput;return r.a.createElement(r.a.Fragment,null,a("username","Username"),a("password","Password","password"),t("Login"))}))},ve=function(e){var t=Object(n.useState)({username:"",password:"",email:"",confirmPassword:""}),a=Object(L.a)(t,2),s=a[0],c=a[1],o=Object(n.useState)({}),u=Object(L.a)(o,2),i=u[0],m=u[1],d={username:le.a.string().required().min(6).label("Username"),email:le.a.string().required().email().label("Email"),password:le.a.string().required().min(6).label("Password"),confirmPassword:le.a.string().required().valid(le.a.ref("password")).options({language:{any:{allowOnly:"not match"}}}).label("Password")},p=function(){var e=Object(N.a)(S.a.mark(function e(t){var a,n,r,s;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("username"!==(a=t.currentTarget).name){e.next=7;break}return e.next=4,I.isUsernameTaken(a.value);case 4:e.t0=e.sent,e.next=10;break;case 7:return e.next=9,I.isEmailTaken(a.value);case 9:e.t0=e.sent;case 10:return n=e.t0,r=n.isTaken,s=Object(j.a)({},i),r?s[a.name]='"'.concat(E(a.name),'" is taken'):delete s[a.name],m(s),e.abrupt("return",s);case 16:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),f=function(){var t=Object(N.a)(S.a.mark(function t(a){var n,r,o;return S.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p(a);case 2:if(n=t.sent,!(Object.keys(n).length>0)){t.next=5;break}return t.abrupt("return");case 5:return r=Object(j.a)({},s),t.prev=6,t.next=9,I.register(r);case 9:l.toast.success("Welcome, "+E(s.username)),c({username:"",password:"",email:"",confirmPassword:""}),m(n),e.history.replace("/"),t.next=19;break;case 15:t.prev=15,t.t0=t.catch(6),(o=t.t0.response)&&400===o.status&&l.toast.error(o.data.status.errors);case 19:case"end":return t.stop()}},t,this,[[6,15]])}));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"col-6 offset-3 mt-5"},r.a.createElement("h1",null,"Register"),r.a.createElement(fe,{data:{data:s,setData:c},errors:{errors:i,setErrors:m},onSubmit:f,schema:d},function(e){var t=e.renderButton,a=e.renderInput;return r.a.createElement(r.a.Fragment,null,a("username","Username","text",{onBlur:p}),a("email","Email","email",{onBlur:p}),a("password","Password","password"),a("confirmPassword","Confirm Password","password"),t("Register"))}))},ge=function(e){e.path;var t=e.component,a=e.render,n=Object(G.a)(e,["path","component","render"]);return r.a.createElement(Y.a,Object.assign({},n,{render:function(e){return I.isValidUser()?t?r.a.createElement(t,e):a(e):r.a.createElement(K.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},he=function(e){e.path;var t=e.component,a=e.render,n=Object(G.a)(e,["path","component","render"]);return r.a.createElement(Y.a,Object.assign({},n,{render:function(e){return I.isValidUser()?r.a.createElement(K.a,{to:{pathname:"/",state:{from:e.location}}}):t?r.a.createElement(t,e):a(e)}}))},ye=function(e,t){var a=Object(ie.a)({},t,[]),r=Object(n.useReducer)(function(e,a){var n=a.payload;switch(a.type){case"SET_ITEMS":return Object(j.a)({},e,Object(ie.a)({},t,n));default:return e}},a),s=Object(L.a)(r,2),c=s[0],o=s[1];return Object(n.useEffect)(function(){e().then(function(e){o({type:"SET_ITEMS",payload:e[t]})})},[]),{state:c,dispatch:o}},Se=function(){var e=ye(D,"genres"),t=e.state.genres,a=e.dispatch,s=Object(n.useState)({path:"name",order:"asc"}),c=Object(L.a)(s,2),o=c[0],l=c[1],u=[{path:"name",label:"Name",content:function(e){return r.a.createElement(H.a,{to:"/genres/".concat(e.id)},e.name)}},{key:"actions",label:"Actions",content:function(e){return r.a.createElement("div",{className:"d-flex"},r.a.createElement(H.a,{to:"/genres/".concat(e.id)},r.a.createElement("button",{className:"btn btn-warning btn-sm mr-1 fa fa-pencil text-white"})),r.a.createElement("button",{className:"btn btn-danger btn-sm fa fa-trash text-white"}))}}];return r.a.createElement("div",{className:"col-6 offset-3 "},r.a.createElement(re,{total:t.length,title:"Genres"}),r.a.createElement(Z,{columns:u,data:t,sortColumn:o,onSort:function(e){a({type:"SET_ITEMS",payload:p(t,e)}),l(e)}}))},je=function(){return r.a.createElement(z.a,null,r.a.createElement(ge,{path:"/home",component:se}),r.a.createElement(he,{path:"/login",component:Ee}),r.a.createElement(he,{path:"/register",component:ve}),r.a.createElement(ge,{path:"/animes/:id",component:be}),r.a.createElement(ge,{path:"/genres/",component:Se}),r.a.createElement(Y.a,{path:"/not-found",component:ce}),">",r.a.createElement(K.a,{from:"/",exact:!0,to:"/home"}),r.a.createElement(K.a,{to:"/not-found"}))},Ne=(a(111),a(113),function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(J,null,r.a.createElement(W,null),r.a.createElement(l.ToastContainer,{autoClose:3e3}),r.a.createElement("main",{className:"container"},r.a.createElement(je,null))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(115),a(117);c.a.render(r.a.createElement(o.a,null,r.a.createElement(Ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},17:function(e){e.exports={a:"https://kitchanime-node.herokuapp.com",b:{perPage:5,pageNumbers:3}}},58:function(e,t,a){e.exports=a(119)},63:function(e,t,a){}},[[58,2,1]]]);
//# sourceMappingURL=main.136d56d0.chunk.js.map