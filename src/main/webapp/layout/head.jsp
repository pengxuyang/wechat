<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>




<div class="header">
  <div class="header-box">
    <div class="header-right">
      <!-- logo -->
      <div class="logo">
        <h1></h1>
      </div>
      <!-- end logo -->

      <!-- system btn -->
      <div class="system-btn">
        <ul>
          <li class="XY300 hover"><a href="javascript:void(0)"><em>客户中心</em></a></li>
          <li class="XY301"><a href="javascript:void(0)"><em>投放中心</em></a></li>
          <li class="XY545"><a href="javascript:void(0)"><em>人群中心</em></a></li>
          <li class="XY303"><a href="javascript:void(0)"><em>效果中心</em></a></li>
          <li class="XY400"><a href="javascript:void(0)"><em>账户中心</em></a></li>
        </ul>
      </div>
      <!-- end system btn -->

      <!-- system function -->
      <div class="system-function">
        <ul class="clearfix">
          <li><a href="javascript:void(0)" class="main-icon account" onclick="editUser();"><span class="realName">partner-demo@51dpi.com</span></a></li>
          <li><a href="javascript:void(0)" class="main-icon message" onclick="readMessage();"><span>站内信&nbsp;[<strong id="num">0</strong>]</span></a></li>
          <!--<li><a id="msgLink" href="javascript:void(0)" class="main-icon mgs new"><span>信息 （<em id="unreadCount" class="unread-mgs">0</em>）</span></a></li>
          <li><a id="setting" href="javascript:void(0)" class="main-icon personal-setting"><span>设置</span></a></li>
          <li><a id="feedback" href="javascript:void(0)" class="main-icon help"><span>问题反馈</span></a></li>-->
          <li><a id="quitLink" href="javascript:void(0)" class="main-icon logout" onclick="logout();"><span>退出</span></a></li>
        </ul>
      </div>
      <!-- end system function -->




    </div>
  </div>
</div>

<script type="text/javascript">
  var user = 'com.zhiziyun.platform.console.bean.User@5b4d4c61';
  $(function() {
    if(user == 'null'){
//		window.location.href = "/admin/login.jsp";
    }
    $.ajax({
      url: '/admin/message/getNoReadMessageCount.action',
      dataType:"json",
      success: function (data) {
        if(data.success){
          $("#num").text(' '+data.obj.num+' ');
        }else{
          $.messager.alert('提示', data.msg);
        }
      }
    });
  });

  function logout(){
    window.location.href = "<c:url value="/logout"/>";
  }

  function editUser(){
    $('<div/>').dialog({
      href : '/admin/adminuser/editCurrentUser.action',
      width : 400,
      height : 450,
      modal : true,
      title : '编辑用户信息',
      buttons : [ {
        text : '保存',
        iconCls : 'icon-save',
        handler : function() {
          var d = $(this).closest('.window').find(".window-body");
          $('#admin_adminuser_editForm').form({
            url : '/admin/adminuser/doCurrentUserEdit.action',
            success : function(result) {
              showProcess(false);
              var data = $.parseJSON(result);
              $.messager.alert('提示信息', data.msg,'info');
              if (data.success) {
                d.dialog('destroy');
                $(".realName").html(data.obj.userName);
              }
            }
          });
          $('#admin_adminuser_editForm').submit();
        }
      } ],
      onClose : function() {
        $(this).dialog('destroy');
      },
      onLoad : function() {
      }
    });
  }

  function readMessage(){
    var url =  "/admin/view/message/myMessage.jsp";
    var furl = "<iframe src=\"" + url + "\" frameborder=\"0\" style=\"width:100%;height:100%;\"></iframe>";
    window.parent.layout_center_addTabFun2({title:"我的站内信",
      closable : true,
      href : "",
      content:furl});
  }

</script>