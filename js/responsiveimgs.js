/*!
 * Responsive Images: Mobile-First images that scale responsively and responsibly
 * Copyright 2011, Scott Jehl, Filament Group, Inc
 * Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(g){var k=g.rwd_images||{},d=k.widthBreakPoint||480,h="rwd-imgs-lrg",f=g.screen.availWidth>d,e=location.href,l=e.substring(0,e.lastIndexOf("/"))+"/",m=g.document,j=m.getElementsByTagName("head")[0],c=new Date();c.setTime(c.getTime()+(5*1000));m.cookie="rwd-resolution="+screen.width+";expires="+c.toGMTString()+"; path=/";if(!f){return}m.documentElement.className+=" "+h;var b=(function(){var r,q=false,p=m.createElement("a"),o=false,s=j.getElementsByTagName("base")[0]||(function(){q=true;return j.insertBefore(m.createElement("base"),j.firstChild)})();r=!q&&s.href;s.href=location.protocol+"//x/";p.href="y";if(p.href.indexOf("x/y")<0){if(r){s.href=r}else{j.removeChild(s)}s=null}else{s.href=l+"rwd-router/"}return s})(),n=function(){for(var r=0,t=m.getElementsByTagName("img"),p=t.length;r<p;r++){var o=t[r],s=o.getAttribute("src"),q=s.match(/(\?|&)full=(.*)&?/)&&RegExp.$2;if(q){o.src=q}}},a=false,i=function(){if(a){return}a=true;if(!b){n()}else{j.removeChild(b)}};if(m.addEventListener){g.addEventListener("load",i,false)}else{if(m.attachEvent){g.attachEvent("onload",i)}}})(this);