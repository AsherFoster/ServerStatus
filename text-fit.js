/**
 * ng-FitText.js v4.1.1
 * https://github.com/patrickmarabeas/ng-FitText.js
 *
 * Original jQuery project: https://github.com/davatron5000/FitText.js
 *
 * Copyright 2015, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 23/01/2016
 */
!function(t,e,i,n){"use strict";i.module("ngFitText",[]).value("fitTextDefaultConfig",{debounce:!1,delay:250,loadDelay:10,compressor:1,min:0,max:Number.POSITIVE_INFINITY}).directive("fittext",["$timeout","fitTextDefaultConfig","fitTextConfig",function(e,n,o){return{restrict:"A",scope:!0,link:function(f,a,l){function r(){var t=v*h/s.offsetWidth/h;return Math.max(Math.min((c[0].offsetWidth-6)*t*p,parseFloat(y)),parseFloat(m))}function u(){s.offsetHeight*s.offsetWidth!==0&&(d.fontSize=v+"px",d.lineHeight=v+"px",d.display="inline-block",d.fontSize=r()+"px",d.lineHeight=d.fontSize,d.display=b)}i.extend(n,o.config);var c=a.parent(),s=a[0],d=s.style,x=t.getComputedStyle(a[0],null),h=a.children().length||1,g=l.fittextLoadDelay||n.loadDelay,p=l.fittext||n.compressor,m=("inherit"===l.fittextMin?x["font-size"]:l.fittextMin)||n.min,y=("inherit"===l.fittextMax?x["font-size"]:l.fittextMax)||n.max,b=(x["line-height"],x.display),v=10;e(function(){u()},g),f.$watch(l.ngBind,function(){u()}),n.debounce?i.element(t).bind("resize",n.debounce(function(){f.$apply(u)},n.delay)):i.element(t).bind("resize",function(){f.$apply(u)})}}}]).provider("fitTextConfig",function(){var t=this;return this.config={},this.$get=function(){var e={};return e.config=t.config,e},this})}(window,document,angular);