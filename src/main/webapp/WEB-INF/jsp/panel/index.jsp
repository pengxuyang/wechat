<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
  <meta name="renderer" content="webkit|ie-comp|ie-stand" />

  <title>电信dpi、运营商大数据、专注于提升收益的精准营销【上海镶赢信息科技有限公司官网】</title>

  <link rel="stylesheet" type="text/css" href="<c:url value="/css/easyui.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/default_easyui.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/icon.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/page.css"/>">
  <link rel="stylesheet" type="text/css" href="<c:url value="/css/default.css"/>">
  <script type="text/javascript" src="<c:url value="/js/jquery-1.8.0.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/jquery.easyui.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/easyui-lang-zh_CN.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/zz.core.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/zz.menu.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/zz.index.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/util.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/js/zz.session1.js"/>"></script>
  <link rel="shortcut icon" href="<c:url value="/favicon.ico"/>" type="image/x-icon" />
</head>
<body class="easyui-layout">
<div data-options="region:'north',border:false,href:'<c:url value="/layout/head.jsp"/>'" style="height: 70px;overflow: hidden;" ></div>
<div data-options="region:'west'" title=" " style="width: 240px;overflow: hidden;">

  <!-- Left Menu -->
  <div class="side-left">
    <div class="side-box">
      <div class="mask none"></div>
      <!-- system switching -->
      <div class="system-switching">
        <div id="system-name" class="system-name">
          <em class="current-system">客户中心</em>
          <span class="current-system">客户中心</span>
          <a class="system-switching-icon" href="javascript:void(0)"></a>
        </div>
        <div style="" id="system-switching-tip" class="system-switching-tip none">
          <div id="switching-tip-box" class="switching-tip-box">
            <ul id="system-catalog"><li id="300"><a href="javascript:void(0)"><em class="order">客户中心</em><span></span></a></li><li id="301"><a href="javascript:void(0)"><em class="order">投放中心</em><span></span></a></li><li id="545"><a href="javascript:void(0)"><em class="order">人群中心</em><span></span></a></li><li id="303"><a href="javascript:void(0)"><em class="order">效果中心</em><span></span></a></li><li id="400"><a href="javascript:void(0)"><em class="order">账户中心</em><span></span></a></li></ul>
          </div>

        </div>
      </div>
      <!-- end system switching -->
      <!-- system menu -->
      <div class="system-menu">
        <div class="system-menu-list">

          <ul id="menu_tree" style="height:80%; overflow-y:auto;">
            <li><a href="javascript:void(0)" onclick="change_mt(this)" class="level-1 list-icon"><span>客户信息管理</span></a>
              <ul class="none sub-menu-list" style="overflow-y:auto;;padding-bottom:20px">
                <li><a href="javascript:void(0)" onclick="add_ad()" class="level-2"><span>客户公司信息管理(广告添加)</span></a></li>
                <li><a href="#" class="level-2"><span>客户网站信息管理</span></a></li>
                <li><a href="#" class="level-2 no-border-bottom"><span>广告主资质管理</span></a></li>
              </ul>
            </li>
            <li><a href="javascript:void(0)" onclick="change_mt(this)" class="level-1 list-icon"><span>客户平台管理</span></a>
              <ul class="none sub-menu-list" style="overflow-y:auto;;padding-bottom:20px">
                <c:if test="${money_user_id.userRole eq 'agent' or money_user_id.userRole eq 'admin'}">
                  <li><a href="javascript:void(0)" onclick="add_user()" class="level-2"><span>客户方用户管理(添加用户)</span></a></li>
                </c:if>
                <li><a href="#" class="level-2 no-border-bottom"><span>站内信管理</span></a></li>
              </ul>
            </li>
          </ul>


          <div id="treeLoading" class="none">菜单加载中...</div>
        </div>
      </div>
      <!-- end system menu -->

      <div class="side-icon"><a href="javascript:void(0)"></a></div>
      <!-- <div class="side-icon expand"><a href="#"></a></div> -->
    </div>
  </div>
  <!--Left Menu End-->

</div>
<div data-options="region:'center'" style="overflow: hidden;" id="mainPanle" class="maincenter">
  <div id="tt" class="easyui-tabs" data-options="fit:true,border:false,plain:true"></div>
</div>
<div data-options="region:'south',href:'<c:url value="/layout/foot.jsp"/>'" style="height: 30px;overflow: hidden;"></div>

<script>
  <!--点击下拉-->
  function change_mt(li){
    var li_q = $(li);
    var ul = li_q.next();
    ul.toggle(500);
  }
  <!--点击下拉-->
  <!--点击添加用户-->
  function add_user(){
    // 判断选项卡是否存在，如果存在，不添加，切换， 如果不存在，添加
    if($("#tt").tabs('exists','客户列表')){
      // 存在，切换
      $("#tt").tabs('select','客户列表');
    }else{
      // 不存在，添加
      // 添加新的选项卡
      $("#tt").tabs('add',{
        title: '客户列表',
        content: '<div style="width:100%;height:100%;overflow:hidden;">'
        + '<iframe src="<c:url value="/user/index"/>" '
        +'scrolling="auto"style="width:100%;height:100%;border:0;" ></iframe></div>',
        closable:true
      });// 调用add方法
    }
  }
  <!--点击添加用户-->

  <!--添加广告-->
   function add_ad(){
     // 判断选项卡是否存在，如果存在，不添加，切换， 如果不存在，添加
     if($("#tt").tabs('exists','广告信息')){
       // 存在，切换
       $("#tt").tabs('select','广告信息');
     }else{
       // 不存在，添加
       // 添加新的选项卡
       $("#tt").tabs('add',{
         title: '广告信息',
         content: '<div style="width:100%;height:100%;overflow:hidden;">'
         + '<iframe src="<c:url value="/panel/adg/index"/>" '
         +'scrolling="auto"style="width:100%;height:100%;border:0;" ></iframe></div>',
         closable:true
       });// 调用add方法
     }
   }
  <!--添加广告-->
</script>
</body>
</html>
