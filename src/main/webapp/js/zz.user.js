//登录

	/*var param = {};
	param.email = "admin@oem.com";
	param.password = "zhiziyun-0628";
	$.ajax({
		url:"adminuser/doLogin.action",
		data:param,
		dataType:"json",
		success:function(r){
			if(r.success){
				window.location.href = "index.jsp";
        	}else{
        		showProcess(false);
        		$.messager.alert('提示信息',r.msg);
        	}
		}
	});*/
//}

//清除登录表单数据
function clearForm(){  
    $('#loginForm').form('clear');  
} 

//验证邮箱是否可用
function checkEmail(){
	var email = $("#email").val();
	var emailFormat = /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(email != ""){
		if(!emailFormat.test(email)){
			$("#emailError").html("邮箱格式不合法");
			$("#emailError").css('color','red');
			$("#email").focus();
		}else{
			//验证邮箱是否已被用
			 $.ajax({
		         url: "/main-site/adminuser/doCheckEmail.action?email="+email,
		         dataType:"json",
		         success : function(data) {
		        	 if(data){
		        		 $("#emailError").html("邮箱可用");
		        		 $("#emailError").css('color','green');
		        	 }else{
		        		 $("#emailError").html("邮箱已被注册");
		        		 $("#emailError").css('color','red');
		        		 $("#email").focus();
		        	 }
		         }
			 }); 
		}
	}else{
		$("#emailError").html("邮箱不能为空");
		$("#emailError").css('color','red');
		$("#email").focus();
	}
}