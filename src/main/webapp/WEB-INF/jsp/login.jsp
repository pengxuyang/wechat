<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
  <meta name="renderer" content="webkit|ie-comp|ie-stand" />
  <title>电信dpi、运营商大数据、专注于提升收益的精准营销【上海镶赢信息科技有限公司官网】</title>
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/easyui.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/default_easyui.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/icon.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/default.css"/>">
  <script type="text/javascript" src="<c:url value="/js/jquery-1.8.0.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/jquery.easyui.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/util.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/zz.user.js"/>"></script>
  <link href="<c:url value="/css/login.css"/>" type="text/css" rel="stylesheet" />
  <link rel="shortcut icon" href="<c:url value="/favicon.ico"/>" type="image/x-icon" />
</head>

<body>
<div class="bg">
  <div class="dl_main">
    <form id="loginForm" method="post">
      <dl>
        <dt></dt>
        <dd>
          <input id="loginName" name="mobilephone" type="text" class=""  data-options="required:true" value="" placeholder="手机" />
          <%--<input type="hidden" name="zzId" id="zzId" value="F8D2i04v5DO">--%>
        </dd>
      </dl>
      <dl>
        <dt class="psw_icon"></dt>
        <dd><input id="loginPwd" name="password" type="password" class="" data-options="required:true" value="" placeholder="密码" /></dd>
      </dl>

      <div style="padding-top:15px;">
        <input id="btnLogin" name="btnLogin" type="button" class="button_dl" onclick="login();">
        <div style="display: inline-block;padding-top: 5px;vertical-align: top;text-align: right;width: 120px;">
          <input style="width:auto;" type="checkbox" id="chkRem" name="chkRem" value="rem" />
          <label>30天免登录</label>
        </div>
      </div>
      <script type="text/javascript">
        $("#loginForm input").focus(function(){
          $(this).parents("dl").attr("lang","no");
        }).blur(function(){
          $(this).parents("dl").attr("lang","");
        });
      </script>

    </form>
  </div>
</div>

<script type="text/javascript">
  /*window.onload = function(){
    var demo = null;
    if("1" == demo){
      $("#loginName").val("demo@zhiziyun.com");
      $("#loginPwd").val("123456");
    }
    createCode();
  };*/
  //绑定回车事件
  $("#loginForm").bind('keydown',function(e){
    var key = e.which;
    if (key == 13) {
      login();
    }
  });

  function login() {
    $("#loginForm").form('submit',{
      url: "<c:url value="/login"/>",
      success: function (result) {
        //var r = $.parseJSON(result);
        if (result == 'succ') {
          window.location.href = "<c:url value="/panel/index"/>";
        } else {
          showProcess(false);
          $.messager.alert('提示信息', "账号密码错误");
        }
      },
      error: function () {
        $.messager.alert('提示信息', '登录过程发送未知错误!');
      }
    });

  }
</script>
</body>
</html>
