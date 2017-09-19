jQuery(document).ready(function($) {
	x= 0;
	$('#background-1').css('background-position-y',0+'px');
	$(window).scroll(function() {
		src = $(window).scrollTop()/-11;
		$('#background-1').css('background-position-y',src+'px');
	});//background 1
	$('#2').focus(function() {
		$('#la-1').css('transform','translate3d(-100%,0,0');
		$('#la-2').css('transform','translate3d(-100%,0,0');
		$('.slo').css('overflow','visible');
	});
	$('#1').focus(function() {
		$('#la-1').css('transform','translate3d(0,0,0');
		$('#la-2').css('transform','translate3d(0,0,0');
		$('.slo').css('overflow','hidden');
	});
	c = null;
	a = null;
	// slide
	$('#sli').css('width',$('body').width()*6+'px');
	$('.images').css('width',$('body').width()+'px');
	widTH=$('body').width();
	$('body').resize(function(){
		widTH=$('body').width();
		$('#btn-contai').css('top',-(widTH)/2.9+'px');
		$('.images').css('width',$('body').width()+'px');
		$('#sli').css('width',$('body').width()*6+'px');
		$('#sli').css('transform','translate3d('+-(widTH)*2+'px,0,0)');
		c = null;
		a = widTH*2;
	});
	a = widTH*2;
	b =0;
	$('#prev').click(function prev(){
		b++;
		c  = a-widTH*b;
		px = -c;
			$('#sli').css('transition','0.25s');
		$('#sli').css('transform','translate3d('+-c+'px,0,0)');
		setTimeout(function(){
				if(b>=2){
				b-=2;
				c = a-widTH*b;
				px = -c;
				$('#sli').css('transition','0s');
				$('#sli').css('transform','translate3d('+-c+'px,0,0)');
			}
		},250);
	});
	$('#next').click(function next(){
		b--;
		c = a-widTH*b;
		px = -c;
		$('#sli').css('transition','.25s');
		$('#sli').css('transform','translate3d('+-c+'px,0,0)');
		setTimeout(function(){
				if(b<=-2){
				b+=2;
				c = a-widTH*b;
				px = -c;
				$('#sli').css('transition','0s');
				$('#sli').css('transform','translate3d('+-c+'px,0,0)');
			}
		},250);
	});
	px = null;
	cLick =null;
	localimg =null;
	$('#sli').mousedown(function(b){
		px = -(widTH)*2;
		this.cLick = b.pageX;
		localimg = widTH;
		$('#sli').mousemove(function(m){
			xkloc = px+m.pageX;
			$('#sli').css('transform','translate3d('+xkloc+'px,0,0)');
		});
	});	
	$('#sli').mouseup(function(x){
		$('#sli').stop(true, true);
		$('#sli').unbind('mousemove');
		if(this.cLick<x.pageX){
			$('#prev').click();
		}else if(this.cLick>x.pageX){
			$('#next').click();
		}
		xkloc = null;
		this.cLick = null;
		this.localimg =null;
	});
	$('#sli').css('transform','translate3d('+-(widTH)*2+'px,0,0)');
	$('#btn-contai').css('top',-(widTH)/2.9+'px');
	//slide
	$('.ipdate').val(null);
	$('.ipdate').attr('placeholder','Check in');
	$('app-ajax-search').click(function(event) {
		$('body').scrollTop(0);
	});
});
