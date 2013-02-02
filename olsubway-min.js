/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
 
 /*
 * ScaleRaphael 0.8 by Zevan Rosser 2010 
 * For use with Raphael library : www.raphaeljs.com
 * Licensed under the MIT license.
 *
 * www.shapevent.com/scaleraphael/
 */

 /*
 * OLsubwaymap
 * Licensed under the MIT License (MIT). (http://opensource.org/licenses/MIT)
 * Copyright © 2013 openlectures LLP (http://openlectures.org/).
 * 
 * https://github.com/openlectures/OLsubwaymap
 */
function Coordinate(e,t){this.x=e;this.y=t}function Island(e,t,n,r){this.name=e;this.color=t;this.fontSize=n;this.fontColor=r;this.edges=new Array}function Curve(e,t){Coordinate.call(this,e.x,e.y);this.pt=t}function Track(e,t){this.color=e;this.segments=new Array(sqrToPixel(t))}function Station(e,t,n,r,i){this.name=e;this.href=t;this.labelDir=n;this.labelTer=r;this.terminals=new Array;this.links=i;this.ID=stations.length;this.elements=[new Array,new Array,new Array];stations.push(this)}function sqrToPixel(e){return new Coordinate(e.x*BLOCKSIZE,e.y*BLOCKSIZE)}function reOrderStations(){for(var e=2;e>=0;e--){for(var t in stations)stations[t].elements[e].toFront()}}function coordTrans(e,t){var n=e.x,r=e.y;var i=0;if(e.x-t.x>0)n-=END_MOVE*BLOCKSIZE;else if(e.x-t.x<0){n+=END_MOVE*BLOCKSIZE;i=180}if(e.y-t.y>0){r-=END_MOVE*BLOCKSIZE;i=90}else if(e.y-t.y<0){r+=END_MOVE*BLOCKSIZE;i=270}return[new Coordinate(n,r),i]}function arrayToSet(e){var t=paper.set();for(var n in e)t.push(e[n]);return t}function canvasResize(){var e=$("#subway").parent();paper.changeSize(e.width(),e.width(),false,true)}function maxCoord(e){boundBox.x=Math.max(boundBox.x,Math.floor(e.x));boundBox.y=Math.max(boundBox.y,Math.floor(e.y))}(function(){window.ScaleRaphael=function(e,t,n){var r=document.getElementById(e);if(!r.style.position)r.style.position="relative";r.style.width=t+"px";r.style.height=n+"px";r.style.overflow="hidden";var i;if(Raphael.type=="VML"){r.innerHTML="<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup'></rvml:group>";i=document.getElementById("vmlgroup")}else{r.innerHTML="<div id='svggroup'></div>";i=document.getElementById("svggroup")}var s=new Raphael(i,t,n);var o;if(Raphael.type=="SVG"){s.canvas.setAttribute("viewBox","0 0 "+t+" "+n)}else{o=r.getElementsByTagName("div")[0]}s.changeSize=function(e,u,a,f){f=!f;var l=e/t;var c=u/n;var h=l<c?l:c;var p=parseInt(n*h);var d=parseInt(t*h);if(Raphael.type=="VML"){var v=document.getElementsByTagName("textpath");for(var m in v){var g=v[m];if(g.style){if(!g._fontSize){var y=g.style.font.split("px");g._fontSize=parseInt(y[0]);g._font=y[1]}g.style.font=g._fontSize*h+"px"+g._font}}var b;if(d<p){b=d*1e3/t}else{b=p*1e3/n}b=parseInt(b);i.style.width=b+"px";i.style.height=b+"px";if(f){i.style.left=parseInt((e-d)/2)+"px";i.style.top=parseInt((u-p)/2)+"px"}o.style.overflow="visible"}if(f){d=e;p=u}r.style.width=d+"px";r.style.height=p+"px";s.setSize(d,p);if(a){r.style.position="absolute";r.style.left=parseInt((e-d)/2)+"px";r.style.top=parseInt((u-p)/2)+"px"}};s.scaleAll=function(e){s.changeSize(t*e,n*e)};s.changeSize(t,n);s.w=t;s.h=n;return s}})();(function(e,t){var n=e.jQuery||e.Cowboy||(e.Cowboy={}),r;n.throttle=r=function(e,r,i,s){function a(){function p(){u=+(new Date);i.apply(n,l)}function v(){o=t}var n=this,a=+(new Date)-u,l=arguments;if(s&&!o){p()}o&&clearTimeout(o);if(s===t&&a>e){p()}else{if(r!==true){o=setTimeout(s?v:p,s===t?e-a:e)}}}var o,u=0;if(typeof r!=="boolean"){s=i;i=r;r=t}if(n.guid){a.guid=i.guid=i.guid||n.guid++}return a};n.debounce=function(e,n,i){return i===t?r(e,n,false):r(e,i,n!==false)}})(this);var BLOCKSIZE=20;var TRACK_THICKNESS=.45;var STATION_RADIUS=.4;var CONNECTOR_RATIO=.55;var STATION_LINE_THICKNESS=.1;var LABEL_FONT_SIZE=14;var GRID_COLOR="#bbb";var END_MOVE=.7;var DEBOUNCE_TIME=40;var station_colors=["#000","#eee"];var glow_colors=["#03f","#709"];var CONNECTOR_THICKNESS=2*STATION_RADIUS*CONNECTOR_RATIO;var INNER_RADIUS=STATION_RADIUS-STATION_LINE_THICKNESS;var INNER_CONECTOR=CONNECTOR_THICKNESS-STATION_LINE_THICKNESS*2.4;var stations=new Array;var islands=new Array;var arrow="M0,0 l0,0.5 0.6,-0.5 -0.6,-0.5z";if(typeof Object.create=="undefined"){Object.create=function(e){function t(){}t.prototype=e;return new t}}Coordinate.prototype.toString=function(){return this.x+","+this.y};Island.prototype.addEdge=function(e){e=sqrToPixel(e);this.edges.push(e)};Island.prototype.centroid=function(){try{if(this.edges.length<1)throw new Error("Polygon has no points!")}catch(e){console.error(e.name+": "+e.message)}this.edges.push(this.edges[0]);var t=0,n=0,r=0;for(var i=0;i<this.edges.length-1;i++){t+=(this.edges[i].x+this.edges[i+1].x)*(this.edges[i].x*this.edges[i+1].y-this.edges[i+1].x*this.edges[i].y);n+=(this.edges[i].y+this.edges[i+1].y)*(this.edges[i].x*this.edges[i+1].y-this.edges[i+1].x*this.edges[i].y);r+=this.edges[i].x*this.edges[i+1].y-this.edges[i+1].x*this.edges[i].y}this.edges.pop();return new Coordinate(1/(3*r)*t,1/(3*r)*n)};Island.prototype.paint=function(){if(this.edges.length>2){var e="M";for(i in this.edges){e+=this.edges[i].toString()+" "}islands.push(paper.path(e+"z").attr({fill:this.color,stroke:"none"}));var t=this.centroid();paper.text(t.x,t.y,this.name).attr({"font-size":this.fontSize,fill:this.fontColor})}};Curve.prototype=Object.create(Coordinate.prototype);Curve.prototype.toString=function(){return this.pt+" "+Coordinate.prototype.toString.call(this)};Track.prototype.addSegment=function(e,t){e=sqrToPixel(e);if(typeof t=="undefined")this.segments.push(e);else if(t.toUpperCase()=="N"||t.toUpperCase()=="S")this.segments.push(new Curve(e,new Coordinate(e.x,this.segments[this.segments.length-1].y)));else if(t=="E"||t=="W")this.segments.push(new Curve(e,new Coordinate(this.segments[this.segments.length-1].x,e.y)))};Track.prototype.paint=function(){this.arrowHead();var e="M"+this.segments[0]+" ";for(var t=1;t<this.segments.length;t++){if(this.segments[t]instanceof Curve)e+="Q"+this.segments[t]+" ";else e+="L"+this.segments[t]+" "}paper.path(e).attr({stroke:this.color,"stroke-width":TRACK_THICKNESS*BLOCKSIZE})};Track.prototype.arrowHead=function(){if(this.segments.length>1){var e=this.segments.pop();var t;if(e instanceof Curve){t=coordTrans(e,e.pt);e=new Curve(t[0],e.pt)}else{t=coordTrans(e,this.segments[this.segments.length-1]);e=new Coordinate(t[0].x,t[0].y)}this.segments.push(e);paper.path(arrow).attr({fill:this.color,stroke:"none"}).transform("T"+e.x+","+e.y+"S"+BLOCKSIZE+"R"+t[1])}};Station.prototype.addTerminal=function(e){this.terminals.push(sqrToPixel(e))};Station.prototype.paint=function(){var e=0;for(n in this.terminals){var t;t=paper.circle(this.terminals[n].x,this.terminals[n].y,STATION_RADIUS*BLOCKSIZE).attr("fill",station_colors[0]);this.elements[0].push(t);this.elements[1].push(t.glow({width:BLOCKSIZE/2,color:glow_colors[0]}));this.elements[2].push(t.glow({width:BLOCKSIZE/2,color:glow_colors[1]}));if(e!==0){t=paper.path("M"+e+" L"+this.terminals[n]).attr({stroke:station_colors[0],"stroke-width":BLOCKSIZE*CONNECTOR_THICKNESS});this.elements[0].push(t);this.elements[1].push(t.glow({width:BLOCKSIZE*CONNECTOR_THICKNESS/2*1.8,opacity:.8,color:glow_colors[0]}));this.elements[2].push(t.glow({width:BLOCKSIZE*CONNECTOR_THICKNESS/2*1.8,opacity:.8,color:glow_colors[1]}))}e=this.terminals[n]}e=0;for(n in this.terminals){t=paper.circle(this.terminals[n].x,this.terminals[n].y,BLOCKSIZE*INNER_RADIUS).attr("fill",station_colors[1]);this.elements[0].push(t);if(e!==0){t=paper.path("M"+e+" L"+this.terminals[n]).attr({stroke:station_colors[1],"stroke-width":BLOCKSIZE*INNER_CONECTOR});this.elements[0].push(t)}e=this.terminals[n]}for(var n in this.terminals){this.elements[0].push(paper.text(this.terminals[n].x,this.terminals[n].y,this.ID+1).attr({"font-size":INNER_RADIUS*BLOCKSIZE*1.8,"font-weight":"bolder"}))}var r=this.printLabel();this.elements[0].push(r);for(n in this.elements)this.elements[n]=arrayToSet(this.elements[n]);this.elements[1].hide();this.elements[2].hide();var i=this.elements[1];var s=this.links;this.elements[0].mouseover(function(e){i.show();r.attr("font-weight","bolder");for(var t in s){var n=s[t];if(n!=this.ID&&typeof stations[n]!="undefined")stations[n].elements[2].show()}}).mouseout(function(e){i.hide();r.attr("font-weight","normal");for(var t in s){var n=s[t];if(n!=this.ID&&typeof stations[n]!="undefined")stations[n].elements[2].hide()}});this.elements[0].attr("href",this.href)};Station.prototype.printLabel=function(){if(typeof this.labelTer=="undefined")this.labelTer=1;if(typeof this.labelDir=="undefined")this.labelDir="S";try{if(this.labelTer<0||this.terminals.length<this.labelTer)throw new Error("Invalid terminal number!")}catch(e){console.error(e.name+": "+e.message)}var t=this.terminals[this.labelTer-1].x,n=this.terminals[this.labelTer-1].y;var r="middle";switch(this.labelDir.toUpperCase()){case"N":n-=BLOCKSIZE;break;case"NW":case"WN":t-=BLOCKSIZE/2;n-=BLOCKSIZE/2;r="end";break;case"W":t-=BLOCKSIZE/2;r="end";break;case"SW":case"WS":t-=BLOCKSIZE/2;n+=BLOCKSIZE/2;r="end";break;case"S":n+=BLOCKSIZE;break;case"SE":case"ES":t+=BLOCKSIZE/2;n+=BLOCKSIZE/2;r="start";break;case"E":t+=BLOCKSIZE/2;r="start";break;case"NE":case"EN":t+=BLOCKSIZE/2;n-=BLOCKSIZE/2;r="start";break}var i=paper.text(t,n,this.name).attr({"text-anchor":r,"font-size":LABEL_FONT_SIZE});return i};var boundBox=new Coordinate(0,0);var paintQueue=new Array;$(".subway-islands").each(function(e,t){var n=new Island($(t).data("island-name"),$(t).data("background-color"),$(t).data("font-size"),$(t).data("font-color"));$(t).children().each(function(e,t){var r=$(t).data("edge").split(",");var s=new Coordinate(parseFloat(r[0]),parseFloat(r[1]));n.addEdge(s);maxCoord(s)});paintQueue.push(n)});$(".subway-tracks").each(function(e,t){var n=$(t).data("start-point").split(",");var r=new Coordinate(parseInt(n[0]),parseInt(n[1]));var i=new Track($(t).data("color"),r);maxCoord(r);$(t).children().each(function(e,t){var n=$(t).data("dest").split(",");r=new Coordinate(parseInt(n[0]),parseInt(n[1]));i.addSegment(r,$(t).data("turn"));maxCoord(r)});paintQueue.push(i)});$("#subway-stations").children().each(function(e,t){var n=$(t).text().replace(/\\n/g,"\n");var r=$(t).children("a").first().attr("href");var i=$(t).data("label-dir");var s=$(t).data("label-ter");var o=$(t).data("link");if(typeof o!="undefined"){o=o.toString().split(",");for(var u in o)o[u]=parseInt(o[u]-1)}var a=new Station(n,r,i,s,o);var f=$(t).data("pos").split(/[,;]/);for(u=1;u<=f.length;u+=2){var l=new Coordinate(parseInt(f[u-1]),parseInt(f[u]));a.addTerminal(l);maxCoord(l)}paintQueue.push(a)});var width=boundBox.x+1,height=boundBox.y+1;var paper=ScaleRaphael("subway",width*BLOCKSIZE,height*BLOCKSIZE);for(var i in paintQueue){paintQueue[i].paint()}reOrderStations();if($("#subway").data("debug")){for(i=0;i<=width;i++){paper.path("M"+i*BLOCKSIZE+", 0 L"+i*BLOCKSIZE+", "+height*BLOCKSIZE).attr({stroke:GRID_COLOR,"stroke-width":2}).toBack()}for(i=0;i<=height;i++){paper.path("M0, "+i*BLOCKSIZE+" L"+width*BLOCKSIZE+", "+i*BLOCKSIZE).attr({stroke:GRID_COLOR,"stroke-width":2}).toBack()}for(i in islands)islands[i].toBack()}canvasResize();window.onresize=$.debounce(DEBOUNCE_TIME,canvasResize)