<%--
  Created by IntelliJ IDEA.
  User: pxy
  Date: 2016/5/3
  Time: 20:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>扫描二维码</title>
    <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
</head>
<body style="text-align: center">
    <div id="login_container"></div>
    <script type="text/javascript">
        var obj = new WxLogin({
            id:"login_container",
            appid: "",
            scope: "",
            redirect_uri: "",
            state: "",
            style: "",
            href: ""
        });
    </script>
</body>
</html>
