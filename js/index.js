$(document).ready(function(){
ddLoad();
//jz_ajax();
get_height();
index_scroll();	
nav_fixed();
get_top();
get_url_c();
//centerLoader();	
getZxUrl();
GetQqUrl();
})

/*index 滚轮滑动监听*/
function index_scroll(){
$(".server_main_lb_js").css("transform","scale(1)");
$(".server_main_bottom_main").css({
marginLeft:"0px",
opacity:"1"	
})

$(".banner_w_d_1").css({
marginLeft:"0px",
opacity:"1"	
});

$(".banner_w_d_2").css({
marginLeft:"0px",
opacity:"1"	
});

$(".banner_bottom_ts p").css({
opacity:"1",	
marginLeft:"0px"
})

var the_h = $(".jf_main_ys_1").offset().top; 	
//alert(the_h);
var i=1;
$(window).scroll(function(){
var the_scroll = $(window).scrollTop()+$(window).height()/2;	
if(the_scroll>= ($(".jf").offset().top-500)){
$(".jf_main_lb_wen_nr").css({
top:"0px",
opacity:"1"		
})

$(".jf_main_lb_ylb").css({
bottom:"20px",
opacity:"1"		
})

$(".jf_main_lb_tu_thetu").css({
marginLeft:"20px",
opacity:"1"			
})

$(".jf_main_jfxq_h").css(
	"transform","scale(1)"
		)		
}

for(var i=1;i<7;i++){
if(the_scroll>=$(".jf_main_ys_"+i).offset().top){
$(".jf_main_ys_f_tu"+i).css({
marginLeft:"0px",	
opacity:"1"	
});	

$(".jf_main_ys_f_wen"+i).css({
marginLeft:"0px",	
opacity:"1"	
});	
}
}

/*
if(the_scroll>=$(".jf_main_ys_2").offset().top){
$(".jf_main_ys_f_tu2").css({
marginLeft:"0px",	
opacity:"1"	
});	

$(".jf_main_ys_f_wen2").css({
marginLeft:"0px",	
opacity:"1"	
});	
}

*/

if(the_scroll > $(".fw").offset().top){
$(".fw_main_tlb").css({
transform:"scale(1)",	
opacity:"1"			
})		
}



if(the_scroll > $(".zy").offset().top){
$(".zy_wen").css({
opacity:"1"			
})		
}

})	
	
}


/*index nav菜单栏冻结*/
function nav_fixed(){
var nav_h = $("nav").height();
$(window).scroll(function(){
var nav_scroll = $(window).scrollTop();
if(nav_scroll>nav_h){
$("nav").addClass("the_fixed");	
}
else{
$("nav").removeClass("the_fixed");		
}
//alert(nav_scroll);
})
		
}


//这个是点击滚动回顶部
function get_top(){
$(".get_top").click(function(){
$('body,html').animate({
    scrollTop: 0
  }, 500);		
		
}
)}



/*页面加载*/
 function centerLoader() {

            var winW = $(window).width();
            var winH = $(window).height();

            var spinnerW = $('.fl').outerWidth();
            var spinnerH = $('.fl').outerHeight();

            $('.fl').css({
                'position':'absolute',
                'left':(winW/2)-(spinnerW/2),
                'top':(winH/2)-(spinnerH/2)
            });

        }
		
/*页面等待加载*/
function ddLoad(){
$(".fakeloader").css("display","none"); 
}

/*页面加载等待	
function jz_ajax(){
var the_url = window.location.href;
//alert(the_url);
	$.ajax({
    url:the_url,
    type:"post",
    beforeSend:function(){
  //centerLoader();
    },
    complete:function(){
        //方法执行完毕，效果自己可以关闭，或者隐藏效果
    },
    success:function(){
       $(".fakeloader").css("display","none") //数据加载成功
    },
    error:function(){
      //数据加载失败
   }
});
	
}
*/			

function get_url_c(){
var url = window.location.href;
if( url.indexOf('from') != -1 ) { //判断是否有参数
	//截取字符串
	var index = url.indexOf('from');
	var sub = url.substr(index,url.length);
    $('a').each(function(){  //绑定其他a标签链接参数跟踪
            var ul = $(this).attr('href');
            if( ul != '' && ul != null && ul != 'undefined' && (ul.indexOf('.php') != -1 || ul.indexOf('.html') != -1 )) {
                    if( ul.indexOf('?') != -1 ) {
                            ul += '&';
                    } else {
                            ul += '?';
                    }
                    $(this).attr('href' ,ul + sub);
            }
    });

    $('[onclick]').each(function(){ //绑定带有onclick js的链接参数跟踪
            var str = this.getAttributeNode("onclick").nodeValue;
            if( str != '' && str != null && str != 'undefined' && str.indexOf('.php') != -1) {
                    str = str.substring(0,str.length - 1);
                    if( str.indexOf('?') != -1 ) {
                            str += '&';
                    } else {
                            str += '?';
                    }
                    this.getAttributeNode("onclick").nodeValue =  str + sub + "'";
            }
    });
}
		
}


/*商桥咨询点击*/
function getZxUrl(){
	$(".the-zx-url").click(function(){
		window.open('http://p.qiao.baidu.com//im/index?siteid=9305951&ucid=20648771','','height=520,width=780,scrollbars=yes,status =yes')
		
	})	
}


/*qq咨询切换效果*/
function GetQqUrl(){
	var qqUrl = window.location.href;
	var qqNuma = qqUrl.indexOf("qq=");
	if(qqNuma>-1){
		var qqUrlNum = window.location.href.length;
		var qqNum = qqUrl.indexOf("qq=")+3;
		var lastQqNum = qqUrl.lastIndexOf("&");
		var theQq = qqUrl.substring(qqNum,lastQqNum)
		//alert(theQq);
		$("#showbtn").attr({
			"href":"http://wpa.qq.com/msgrd?v=3&uin="+theQq+"&Site=www.hostspaces.net&menu=yes",
			"target":"_blank",
		})
	}
	else {
		$("#showbtn").click(function(){showid('smallLay');});
		$("#showbtn").attr("target","_self");
	}
}

/*等高启用*/
function get_height(){
	$(".jf_main_jfxq_js").matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});
}
