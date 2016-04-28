/* 关闭ajax缓存，解决IE浏览器下问题 */
$.ajaxSetup ({  
    cache: false ,//close AJAX cache  
    contentType:"application/x-www-form-urlencoded;charset=utf-8",   
    complete:function(XMLHttpRequest,textStatus){   
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
        if(sessionstatus=="timeout"){   
            //如果超时就处理 ，指定要跳转的页面  
        	top.location.href = "../WEB-INF/jsp/login.jsp";
        }   
    }   
}); 

function showIsDoingMsg(){
	$.messager.alert('提示', "服务器正在处理,请耐心等待", "info");
}