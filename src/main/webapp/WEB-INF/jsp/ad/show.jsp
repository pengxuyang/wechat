<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
	<link rel="stylesheet" type="text/css" href="<c:url value="/css/easyui.css"/>">
	<link rel="stylesheet" type="text/css" href="../../../css/default_easyui.css">
	<link rel="stylesheet" type="text/css" href="../../../css/icon.css">
	<link rel="stylesheet" type="text/css" href="../../../css/page.css" />
	<link rel="stylesheet" type="text/css" href="../../../css/default.css"/>
	<script type="text/javascript" src="../../../js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="../../../js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../../../js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="../../../js/citycode.js"></script>
	<script type="text/javascript" src="../../../js/zz.core.js"></script>
	<script type="text/javascript" src="../../../js/zz.menu.js"></script>
	<script type="text/javascript" src="../../../js/zz.index.js"></script>
	<script type="text/javascript" src="../../../js/util.js"></script>
	<script type="text/javascript" src="../../../js/zz.session1.js"></script>
	<link rel="shortcut icon" href="../../../favicon.ico" type="image/x-icon" />
	<style>
		img{ display:block;}
		body{ margin:0;}
		ul{ padding:0; margin:0;}
		li{ padding:0; margin:0; list-style:none;}
		a{ text-decoration:none;}
		.titleTd{
			background-color: #F2F6FF;
			text-align: right;
			font-size: 14px;
			width: 15%;
		}
		.artTable tr td{
			border: 1px solid gray;
			line-height: 40px;

		}
		.textbox{
			margin-left:10px;
		}
		.upload-btn{
			cursor: pointer;
			margin-left: 10px;
			padding:1px 15px;
			border: 1px solid #95b8e7;
			border-radius: 5px;
		}
		.content{
			line-height:20px;
			border: 1px solid gray;
			margin-left: 10px;
		}

	</style>
</head>
<body>
	<div data-options="region:'center'" style="padding: 5px;">
		<table class="artTable" style="border-collapse:collapse;width: 100%;">
			<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放连接:</a>
							</td>
							<td width="90%">
								<form id="form1" action="" method="post" enctype="multipart/form-data">
								<!--已经有的-->
									<c:forEach items="${targets}" var="tar">
										<span id="tar${tar.id}"><span style="margin-left: 10px;">${tar.targetUrl}</span><a style="margin-left: 10px;cursor: pointer" onclick="del_tar(${tar.id})">删除</a><br></span>
									</c:forEach>
								<!--已经有的-->
									<div id="newUpload1" style="margin-top: 10px;">
									<input class="easyui-filebox" name="file" data-options="buttonText:'选择文件'" style="width:30%"/>
								</div>
								<input type="button" class="upload-btn" id="btn_add" value="增加一行" >
								<input type="button" class="upload-btn" onclick="upload(1);" value="上传" >
								<%--<a class="upload-btn" onclick="upload()">上传</a><br>--%>
								</form>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放素材:</a>
							</td>
							<td width="90%">
								<form id="form2" action="" method="post" enctype="multipart/form-data">
									<!--已经有的-->
									<c:forEach items="${materials}" var="mat">
										<span id="mat${mat.id}"><span style="margin-left: 10px;"><img src="<c:url value="/upload/demoUpload/${mat.name}"/>" alt=""/></span><a style="margin-left: 10px;cursor: pointer" onclick="del_mat(${mat.id})">删除</a><br></span>
									</c:forEach>
									<!--已经有的-->
									<div id="newUpload2" style="margin-top: 10px;">
						 					<input class="easyui-filebox" name="cs_file" data-options="buttonText:'选择文件'" style="width:30%"/>
									</div>
									<input type="button" class="upload-btn" id="btn_cs_add" value="增加一行" >
									<input type="button" class="upload-btn" onclick="upload(2)" value="上传" >
									<%--<a class="upload-btn" onclick="upload()">上传</a><br>--%>
								</form>
							</td>
			</tr>
						<!--提交信息使用的from-->
			<form id="myform" name="myform"	method="post">
							<!--链接-->
							<input type="hidden" name="target">
							<!--素材-->
							<input type="hidden" name="material">
							<input type="hidden" name="id" value="${ad.id}">
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放区域:</a>
							</td>
							<td>
								<%--<input style="line-height:20px; border: 1px solid gray; margin-left: 10px;"	name="compnay" type="text" />--%>
								<select name="province" id="province" class="content"	style="width: 100px;" onchange="changeProvince()">
									<option id="province2" selected="selected"></option>
									<option value="340000">安徽</option>
									<option value="110000">北京</option>
									<option value="350000">福建</option>
									<option value="620000">甘肃</option>
									<option value="440000">广东</option>
									<option value="450000">广西</option>
									<option value="520000">贵州</option>
									<option value="460000">海南</option>
									<option value="130000">河北</option>
									<option value="410000">河南</option>
									<option value="230000">黑龙江</option>
									<option value="420000">湖北</option>
									<option value="430000">湖南</option>
									<option value="220000">吉林</option>
									<option value="320000">江苏</option>
									<option value="360000">江西</option>
									<option value="210000">辽宁</option>
									<option value="150000">内蒙古</option>
									<option value="640000">宁夏</option>
									<option value="630000">青海</option>
									<option value="370000">山东</option>
									<option value="140000">山西</option>
									<option value="610000">陕西</option>
									<option value="310000">上海</option>
									<option value="510000">四川</option>
									<option value="120000">天津</option>
									<option value="540000">西藏</option>
									<option value="650000">新疆</option>
									<option value="530000">云南</option>
									<option value="330000">浙江</option>
									<option value="500000">重庆</option>
								</select><a>省</a>
								<select name="city" id="city" class="content" style="width: 150px;" >
									<option selected="selected" id="city2"></option>
								</select><a>市</a>
								<input class="content"	style="width: 235px;" name="landmarkBuilding" type="text" value="${ad.landmarkBuilding}" /><a>标志性建筑</a>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">目标性别:</a>
							</td>
							<td width="90%">
								<select name="gender" id="gender" class="content">
									<option <c:if test="${ad.gender eq 'm'}">selected="selected"</c:if> value="m">男</option>
									<option <c:if test="${ad.gender eq 'f'}">selected="selected"</c:if> value="f">女</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放年龄段:</a>
							</td>
							<td width="90%">
								<select class="content"	style="width: 30%"	name="ageGroup">
									<option <c:if test="${ad.ageGroup eq '12'}">selected="selected"</c:if> value="12">12-18</option>
									<option <c:if test="${ad.ageGroup eq '18'}">selected="selected"</c:if> value="18">18-25</option>
									<option <c:if test="${ad.ageGroup eq '25'}">selected="selected"</c:if> value="25">25-35</option>
									<option <c:if test="${ad.ageGroup eq '35'}">selected="selected"</c:if> value="35">35+</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放喜好:</a>
							</td>
							<td width="90%">
								<input class="content" style="width: 30%"	value="${ad.adLike}" name="adLike" type="text" />
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放时间段:</a>
							</td>
							<td width="90%">
								<a style=" margin-left: 10px;">起始时间:</a><input class="content"	value="<fmt:formatDate value="${ad.launchTimeStart}" pattern="HH:mm"/>" name="launchTimeStartbak" type="time" />--
								<a>结束时间:</a><input class="content" value="<fmt:formatDate value="${ad.launchTimeEnd}" pattern="HH:mm"/>"	name="launchTimeEndbak" type="time" />
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">工作角色:</a>
							</td>
							<td width="90%">
								<select class="content"	style="width: 30%"	name="jobRole">
									<option <c:if test="${ad.jobRole eq '1'}">selected="selected"</c:if> value="1">初中</option>
									<option <c:if test="${ad.jobRole eq '2'}">selected="selected"</c:if> value="2">高中</option>
									<option <c:if test="${ad.jobRole eq '3'}">selected="selected"</c:if> value="3">大学及以上</option>
									<option <c:if test="${ad.jobRole eq '4'}">selected="selected"</c:if> value="4">管理层</option>
									<option <c:if test="${ad.jobRole eq '5'}">selected="selected"</c:if> value="5">程序员</option>
									<option <c:if test="${ad.jobRole eq '6'}">selected="selected"</c:if> value="6">职员</option>
									<option <c:if test="${ad.jobRole eq '7'}">selected="selected"</c:if> value="7">其他</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">收入:</a>
							</td>
							<td width="90%">
								<select class="content"	style="width: 30%"	name="income">
									<option <c:if test="${ad.income eq '1'}">selected="selected"</c:if> value="1">5-10万</option>
									<option <c:if test="${ad.income eq '2'}">selected="selected"</c:if> value="2">5-10</option>
									<option <c:if test="${ad.income eq '3'}">selected="selected"</c:if> value="3">10-20</option>
									<option <c:if test="${ad.income eq '4'}">selected="selected"</c:if> value="4">20-30</option>
									<option <c:if test="${ad.income eq '5'}">selected="selected"</c:if> value="5">30-50</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">消费能力:</a>
							</td>
							<td width="90%">
								<select class="content"	style="width: 30%"	name="consumptionCapacity">
									<option <c:if test="${ad.consumptionCapacity eq '1000'}">selected="selected"</c:if> value="1000">1000元</option>
									<option <c:if test="${ad.consumptionCapacity eq '2000'}">selected="selected"</c:if> value="2000">2000元</option>
									<option <c:if test="${ad.consumptionCapacity eq '3000'}">selected="selected"</c:if> value="3000">3000元</option>
									<option <c:if test="${ad.consumptionCapacity eq '4000'}">selected="selected"</c:if> value="4000">4000元</option>
									<option <c:if test="${ad.consumptionCapacity eq '5000'}">selected="selected"</c:if> value="5000">5000+元</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放预算:</a>
							</td>
							<td width="90%">
								<input style="width: 10%" class="content" name="launchBudget" value="${ad.launchBudget}" type="text" />元
							</td>
						</tr>
						<%--<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">投放预算:</a>
							</td>
							<td width="90%">
								<input style="line-height:20px; border: 1px solid gray; margin-left: 10px; width: 70%"	name="email" type="text" />
							</td>
						</tr>--%>
						<tr>
							<td class="titleTd">
								<a style="margin-right: 10px;">每日消费:</a>
							</td>
							<td width="90%">
								<input style="width: 10%" class="content" name="pv" value="${ad.pv}" type="text"/>pv
							</td>
						</tr>
							<tr>
								<td class="titleTd">
									<a style="margin-right: 10px;">每日消费:</a>
								</td>
								<td width="90%">
									<input style="width: 10%" class="content" name="uv" value="${ad.uv}" type="text"/>uv
								</td>
							</tr>
						<tr>
							<td></td>
							<td><input onclick="save()" type="button" style="text-align: center;margin: 5px;width: 10%;margin-left: 10px;" value="确认"/></td>
						</tr>
			</form>
		</table>
	</div>

</body>
<script type="text/javascript">
	function del_tar(id){
		$.post(
			"<c:url value="/panel/adg/delT"/> ",
			{id:id},
			function(data){
					if(data == 'succ'){
						alert("成功");
						$("#tar"+id).hide();
					}else{
						alert("失败")
					}
				}
		)
	}

	function del_mat(id){
		$.post(
				"<c:url value="/panel/adg/delM"/> ",
				{id:id},
				function(data){
					if(data == 'succ'){
						alert("成功");
						$("#mat"+id).hide();
					}else{
						alert("失败")
					}
				}
		)
	}

	function save(){
		$("#myform").form('submit',{
			url:"<c:url value="/panel/adg/update"/>",
			onSubmit: function(){
			},
			success:function(data){
				if(data == 'succ'){
					alert("成功");
				}else{
					alert("失败")
				}
			}
		});
	}

	/*---------------startwith-----------------*/
	String.prototype.startWith = function (s) {
		if (s == null || s == "" || this.length == 0 || s.length > this.length)
			return false;
		if (this.substr(0, s.length) == s) {
			return true;
		} else {
			return false;
		}
	};
	/*---------------startwith-----------------*/

		var provincecode  = '${ad.province}';
		var citycode = '${ad.city}';
		for (var j in provinceArray) {
			if (provinceArray[j].ppostcode.startWith(provincecode)) {
				$("#province").find("option[value=" + provincecode + "]").attr("selected", "selected");
				/*provincecode2.val(provinceArray[i].ppostcode);
				provincecode2.text(data.province);*/
				break;
			}
		}

		for (var k in baseData[provincecode]) {
			if (baseData[provincecode][k].postcode.startWith(citycode)) {
				var city2 = $('#city2')
				city2.val(baseData[provincecode][k].postcode);
				city2.text(baseData[provincecode][k].county);
				break;
			}
		}


	<!--投放链接-->
	i = 1;
	$(function(){
		$("#btn_add").click(function(){
			$("#newUpload1").append('<div id="div_'+i+'"><input  id="file'+i+'" name="file'+i+'" type="text" style="width:30%"/><input type="button" value="删除"  onclick="del('+i+')"/></div>');
			$('#file'+i).filebox({
				buttonText: '选择文件',
				buttonAlign: 'right'
			})
			//document.getElementById("newUpload1")
			//.innerHTML+='<div id="div_'+i+'"><input  name="file'+i+'" type="file"  /><input type="button" value="删除"  onclick="del('+i+')"/></div>';
			i = i + 1;
		});
	});

	function del(o){
		document.getElementById("newUpload1").removeChild(document.getElementById("div_"+o));
	}
	<!--投放连接-->

	<!--投放素材-->
	j = 1;
	$(function(){
		$("#btn_cs_add").click(function(){
			$("#newUpload2").append('<div id="div_sc'+j+'"><input  id="sc_file'+j+'" name="sc_file'+j+'" type="text" style="width:30%"/><input type="button" value="删除"  onclick="del_sc('+j+')"/></div>');
			$('#sc_file'+j).filebox({
				buttonText: '选择文件',
				buttonAlign: 'right'
			})
			//document.getElementById("newUpload1")
			//.innerHTML+='<div id="div_'+i+'"><input  name="file'+i+'" type="file"  /><input type="button" value="删除"  onclick="del('+i+')"/></div>';
			j = j + 1;
		});
	});

	function del_sc(o){
		document.getElementById("newUpload2").removeChild(document.getElementById("div_sc"+o));
	}
	<!--投放素材-->

	function upload(type){
		var form =  $('#form1');
		var form_id ;
		if(type == 1){
			$("#form1").form('submit',{
				url:"<c:url value="/file/uploadurl"/>",
				onSubmit: function(){
				},
				success:function(data){
					var json = eval('(' + data + ')');
					if(json.res == 'succ'){
						alert("上传成功");
						$('input[name="target"]').val(json.list);
					}else{
						alert("上传失败")
					}
				}
			});
		}else if(type == 2){
			$("#form2").form('submit',{
				url:"<c:url value="/file/upload"/>",
				onSubmit: function(){
				},
				success:function(data){
					var json = eval('(' + data + ')');
					if(json.res == 'succ'){
						alert("上传成功");
						$('input[name="material"]').val(json.list);
					}else{
						alert("上传失败")
					}

				}
			});

		}

	}
	/*--------------------省市级联-------------------------*/
	function changeProvince() {
		var pVal = document.myform.province.value;
		document.myform.city.options.length = 1;
		for (var k in baseData[pVal]) {
//      newOption1 = new Option(baseData[pVal][i].postcode,baseData[pVal][i].county);
			document.myform.city.options.add(new Option(baseData[pVal][k].county, baseData[pVal][k].postcode));
		}
	}
	/*--------------------省市级联-------------------------*/

</script>
</html>
