"use strict";(self.webpackChunkmovies=self.webpackChunkmovies||[]).push([[604],{9686:function(e,t,n){n(2791);var s=n(4585),r=n(184);t.Z=function(e){var t=e.page,n=e.setPage,i=e.totalPages;return(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",color:"white"},children:(0,r.jsx)("div",{style:{position:"fixed",bottom:0,zIndex:200,background:"green",padding:"10px 80px",color:"white",width:"100%"},children:(0,r.jsx)(s.Z,{style:{display:"flex",justifyContent:"center"},variant:"outlined",page:t,onChange:function(e,t){n(t)},count:i})})})}},604:function(e,t,n){n.r(t);var s=n(885),r=n(2791),i=n(3030),a=n(4076),o=n(1933),u=n(9515),l=n(610),c=n(9686),d=n(184);t.default=function(){var e=(0,r.useState)(1),t=(0,s.Z)(e,2),n=t[0],p=t[1],g=(0,o.useQuery)(["topRated",{page:n}],i.pp),f=g.data,x=g.error,v=g.isLoading,h=g.isError;if(v)return(0,d.jsx)(u.Z,{});if(h)return(0,d.jsx)("h1",{children:x.message});var j=f.total_pages,m=f.results;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a.Z,{title:"Top Rated Movies",movies:m,action:function(e){return(0,d.jsx)(l.Z,{movie:e})}}),(0,d.jsx)(c.Z,{page:Number(n),setPage:p,totalPages:Number(j-30)})]})}}}]);
//# sourceMappingURL=604.9eb774d6.chunk.js.map