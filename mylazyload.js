/*
 * MyLazyload.js 
 * Version: 0.0.1
 * Creator: Santiago Chen
 * Email: santiago1209@foxmail.com
 * Create Date: 2014/01/20
 *
 * Instruction:
 * You could use it with Iframe and Image;
 * When IFRAME, leave Iframe src blank; set class equal to lazy, 
 * and set the resource path in data-load attribute;
 * When IMG, leave Image src blank/substitute; set class equal to lazy, 
 * and set the resource path in data-load attribute;
 * Then declear the function now: $.mylazyload();
 *
*/

(function($){

$.mylazyload = function(options){
	var defaults = {}
		
    var opts = $.extend({},defaults,options);

    var viewport, targetport;
	function getCurClient(){
		var l, t, w, h; 
		l = $(window).scrollLeft(); 
		t = $(window).scrollTop(); 
		w = $(window).width(); 
		h = $(window).height(); 
		return { "left": l, "top": t, "width": w, "height": h };
	}

	function getTargetClient(p){
		var l, t, w, h; 
		l = $(p).offset().left;
		t = $(p).offset().top;
		w = $(p).width();
		h = $(p).height();
		return { "left": l, "top": t, "width": w, "height": h }; 
	}

	function tellIntsection(p1, p2){
		var rect = {
			"ltx":Math.max(p1.left,p2.left),
			"lty":Math.max(p1.top,p2.top),
			"rbx":Math.min((p1.left+p1.width),(p2.left+p2.width)),
			"rby":Math.min((p1.top+p1.height),(p2.top+p2.height)),
		}
		if(rect.ltx>rect.rbx||rect.lty>rect.rby){
			return false;
		}
		else{
			return true;
		}
	}

	(function checkdisplay(){
		var _targetarr = $(".lazy");
		loopcheck(_targetarr);
		$(window).scroll(function(){
			loopcheck(_targetarr);
		});

		$(window).resize(function(){
			loopcheck(_targetarr);
		});

	})()

	function loopcheck(targetarr){
		viewport = getCurClient();
		for(var m=0; m<targetarr.length; m++){
			targetport = getTargetClient(targetarr[m]);
			if(tellIntsection(viewport, targetport)==true){
				$(targetarr[m]).attr("src",$(targetarr[m]).attr("data-load"));
				targetarr.splice(m,1);
			}
		}
	}


}


})(jQuery)