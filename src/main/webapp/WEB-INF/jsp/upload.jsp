<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Insert title here</title>
</head>
<body>

<h1>springMVC包装类上传文件</h1>
<form id="form1" name="userForm1" action="<c:url value="/file/upload"/>" enctype="multipart/form-data" method="post">
  <div id="newUpload1">
    <input type="file" name="qwe">
  </div>

  <input type="button" id="btn_add" value="增加一行" >
  <input type="button" onclick="upload()" value="上传" >
  <input type="submit" value="upload">
</form>
<script type="text/javascript" src="<c:url value="/js/jquery-1.8.0.min.js"/>"></script>
<script type="text/javascript" src="../../js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../../js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
  i = 1;
  $(function(){
    $("#btn_add").click(function(){
      $("#newUpload1").append('<div id="div_'+i+'"><input   type="file"/><input type="button" value="删除"  onclick="del('+i+')"/></div>');
      //document.getElementById("newUpload1")  name="file'+i+'"
      //.innerHTML+='<div id="div_'+i+'"><input  name="file'+i+'" type="file"  /><input type="button" value="删除"  onclick="del('+i+')"/></div>';
      i = i + 1;
    });
  });

  function del(o){
    document.getElementById("newUpload1").removeChild(document.getElementById("div_"+o));
  }

  function upload(){
    $("#form1").form('submit',{
      url:"<c:url value="/file/upload"/>",
      onSubmit: function(){
      },
      success:function(data){
        alert(data)
      }
    });
  }
</script>
</body>
</html>