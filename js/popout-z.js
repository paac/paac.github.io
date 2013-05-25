function getCornerVals(c,b,g,f){var e=new Array(4);for(i=0;i<4;i++){e[i]=new Array(2)}e[0][0]=g;e[0][1]=f;e[1][0]=g+c;e[1][1]=f;e[2][0]=g+c;e[2][1]=f+b;e[3][0]=g;e[3][1]=f+b;return e}function getElemProperties(b,c){this.width=Math.round($(b).outerWidth());this.height=Math.round($(b).outerHeight());offset=$(b).offset();this.left=offset.left;this.top=offset.top;this.coord=getCornerVals(this.width,this.height,this.left,this.top);this.popColor=$(b).css("background-color");if(this.coord[0][1]>c[1]){this.topFace=true}if(this.coord[3][1]<=c[1]){this.bottomFace=true}this.distance=99999999;for(a=0;a<3;a++){distBuff=Math.sqrt(Math.pow(c[0]-this.coord[a][0],2)+Math.pow(c[1]-this.coord[a][1],2));if(distBuff<this.distance){this.distance=distBuff}}}function drawFace(h,k,j,g,e,b){var f=document.getElementById("depth");var m;if(m!=undefined){m.initElement(f)}if(f.getContext){var l=f.getContext("2d");var c=l.createLinearGradient(h[0][0],h[2][1]+g,h[0][0],k[1]);c.addColorStop(0,j);c.addColorStop(1,"black");l.fillStyle=c;l.beginPath();l.moveTo(h[e][0],h[e][1]);l.lineTo(k[0],k[1]);l.lineTo(h[b][0],h[b][1]);l.stroke();l.fill()}}function clearCanvas(){var e=document.getElementById("depth");var c;if(c!=undefined){c.initElement(e)}if(e.getContext){var b=e.getContext("2d");b.clearRect(0,0,$(document).width(),$(document).height())}}function sortByDistance(f,e){var c=f.distance;var g=e.distance;return((c<g)?1:((c>g)?-1:0))}function draw(b){setTimeout(function(){var c=new Array();var f=0;var e=new Array(2);var g=0;$(".pop").each(function(){e[0]=Math.round($(document).width()/2);e[1]=900;c[c.length++]=new getElemProperties(this,e);f++;g=1});c.sort(sortByDistance);clearCanvas();for(a=0;a<f;a++){if(c[a].bottomFace){drawFace(c[a].coord,e,c[a].popColor,-180,3,2)}if(c[a].topFace){drawFace(c[a].coord,e,c[a].popColor,180,0,1)}}},0)}function getWidth(){if(typeof(window.innerWidth)=="number"){this.width=window.innerWidth}else{if(document.documentElement&&(document.documentElement.clientWidth)){this.width=document.documentElement.clientWidth}}}$(document).ready(function(){d=document;var b=d.getElementById("wrapper");var e=d.createElement("div");var f=d.createElement("canvas");var c=new getWidth();f.setAttribute("width",c.width);f.setAttribute("height",225);f.setAttribute("id","depth");e.setAttribute("id","background");e.appendChild(f);b.parentNode.insertBefore(e,b);$("a.pop").click(function(){$(".active").removeClass("active");$(this).addClass("active");var g=$(".active").attr("id");draw()});$("a.pop").live("mouseenter mouseleave focusin focusout",draw);$(window).resize(function(){var g=new getWidth();var h=document.getElementById("depth");h.setAttribute("width",g.width);draw()});draw()});