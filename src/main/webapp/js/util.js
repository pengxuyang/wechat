/**
 * 取消easyui默认开启的parser
 * 在页面加载之前，先开启一个进度条
 * 然后在页面所有easyui组件渲染完毕后，关闭进度条
 * 
 * @author 黄富
 * @requires jQuery,EasyUI
 */
$.parser.auto = false;
$(function() {
	$.messager.progress({
		text : '页面加载中....',
		interval : 100
	});
	$.parser.parse(window.document);
	window.setTimeout(function() {
		$.messager.progress('close');
		if (self != parent) {
			window.setTimeout(function() {
				try {
					parent.$.messager.progress('close');
				} catch (e) {
				}
			}, 500);
		}
	}, 1);
	$.parser.auto = true;
});

/**
 * 使panel和datagrid在加载时提示
 * 修改easyui的默认属性
 * 
 * @author 黄富
 * @requires jQuery,EasyUI
 * 
 */
//panel加载时提示
$.fn.panel.defaults.loadingMessage = '加载中....';
//datagrid加载时提示
$.fn.datagrid.defaults.loadMsg = '加载中....';
//输入框为空时的提示信息
$.fn.validatebox.defaults.missingMessage = "该输入项为必输项";
//页面大小默认为20条
$.fn.datagrid.defaults.pageSize = 20;
//定义对话框默认长宽
$.fn.dialog.defaults.width = 800;
$.fn.dialog.defaults.height = 500;
//定义numberbox的默认宽度
$.fn.numberbox.defaults.width = 300;
//定义combo的默认宽度
$.fn.combo.defaults.width = 200;
//定义combobox的默认宽度
$.fn.combobox.defaults.width = 200;
//定义textbox的默认宽度
$.fn.textbox.defaults.width = 200;
$.fn.datebox.defaults.width = 200;

/**
 * 通用错误提示
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 * 
 * @author 黄富
 * @requires jQuery,EasyUI
 */
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	$.messager.alert('错误', "网络可能出现问题了哦" + XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;


var formOnSubmitFunction = function(XMLHttpRequest) {
	var bln = $(this).form("validate");
	if(bln){
		showProcess(true);
	}
	return bln;
};
$.fn.form.defaults.onSubmit = formOnSubmitFunction;

/**
 * 加载成功提示
 * 后台数据库连接出错时并未返回错误信息,所以通过设置total=-1来标识错误
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 * 
 * @author 黄富
 * @requires jQuery,EasyUI
 */
var easyuiSuccessFunction = function(data) {
	$.messager.progress('close');
	if(data.total == -1){
		$.messager.alert('错误', "数据库连接错误,请稍后再重试.");
	}
	
};
$.fn.datagrid.defaults.onLoadSuccess = easyuiSuccessFunction;
/*$.fn.treegrid.defaults.onLoadSuccess = easyuiSuccessFunction;
$.fn.tree.defaults.onLoadSuccess = easyuiSuccessFunction;
$.fn.combogrid.defaults.onLoadSuccess = easyuiSuccessFunction;
$.fn.combobox.defaults.onLoadSuccess = easyuiSuccessFunction;
$.fn.form.defaults.onLoadSuccess = easyuiSuccessFunction;*/

/**
 * 防止panel/window/dialog组件超出浏览器边界
 * 
 * @author 黄富
 * @requires jQuery,EasyUI
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var browserWidth = window.screen.width;
	var browserHeight = window.screen.height;
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	if(width > browserWidth){
		width = browserWidth - 1;
		$(this).parent().css('width',width/2);
	}
	if(height > browserHeight){
		height = browserHeight;
//		$(this).parent().css('height',height-30);
		$(this).panel('resize',{
			width: width,
			height: height
		});
	}
	var right = l + width;
	var buttom = t + height;
	
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

/**
 * 修改分页栏显示信息 
 * 使用示例:editPagerDisplay($('#admin_generaltemplate_datagrid-list').datagrid('getPager'))
 * 
 * @author 黄富
 */
 function editPagerDisplay(pager){
	 $(pager).pagination({  
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [ 20, 40, 60, 80, 100],//可以设置每页记录条数的列表  
        beforePageText: '第',//页数文本框前显示的汉字  
        afterPageText: '页    共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	}); 
 }
 
 /**
  * 扩展validatebox，添加验证两次密码功能
  * 使用示例:validType="equalTo['#password']"
  * 第一个密码框的id="password"
  * 
  * @author 黄富
  * @requires jQuery,EasyUI
  */
 $.extend($.fn.validatebox.defaults.rules, {
	 equalTo : {
 		validator : function(value, param) {
 			return value == $(param[0]).val();
 		},
 		message : '密码不一致！'
 	}
 });
 
 /**
  * 验证开始时间小于结束时间 
  * 使用示例
  * validType="timeAfterTo['#startTime']"
  */
 $.extend($.fn.validatebox.defaults.rules, {
	 timeAfterTo: { 
		 validator: function(value, param){ 
		 startTime = $(param[0]).datebox('getValue'); 
		 var d1 = $.fn.datebox.defaults.parser(startTime); 
		 var d2 = $.fn.datebox.defaults.parser(value); 
		 varify=d2>d1; 
		 return varify; 
	
		 }, 
		 message: '结束时间要大于开始时间！' 
	 } 
 });
 
 /**
  * 扩展validatebox，添加验证url地址的功能,url可以包含%
  * 使用示例:validType="urlExt"
  * 
  * @author 黄富
  * @requires jQuery,EasyUI
  */
 $.extend($.fn.validatebox.defaults.rules, {
	 urlExt : {
 		validator : function(value) {
 			return /https?:\/\/\w+\.\w+.*/gi.test(value);
 		},
 		message : '请输入正确的url！'
 	}
 });
 
 /*
  * 动态添加/删除/显示/隐藏dialog的按钮
  * 使用示例
  * d.dialog('addButtonsItem',[{text:"保存",handler:function(){alert("aaaa")}}]);
  * d.dialog('removeButtonsItem',"保存");
  */
 $.extend($.fn.dialog.methods, {  
 	addButtonsItem: function(jq, items){  
 		return jq.each(function(){  
 			var buttonbar = $(this).children("div.dialog-button");
 			for(var i = 0;i<items.length;i++){
 				var item = items[i];
 				var btn=$("<a href=\"javascript:void(0)\"></a>");
 				btn[0].onclick=eval(item.handler||function(){});
 				btn.css("float","left").appendTo(buttonbar).linkbutton($.extend({},item,{plain:false}));
 			}
 			buttonbar = null;
 		});  
 	},
 	removeButtonsItem: function(jq, param){  
 		return jq.each(function(){  
 			var btns = $(this).children("div.dialog-button").children("a");
 			var cbtn = null;
 			if(typeof param == "number"){
 				cbtn = btns.eq(param);
 			}else if(typeof param == "string"){
 				var text = null;
 				btns.each(function(){
 					text = $(this).data().linkbutton.options.text;
 					if(text == param){
 						cbtn = $(this);
 						text = null;
 						return;
 					}
 				});
 			} 
 			if(cbtn){
 				var prev = cbtn.prev()[0];
 				var next = cbtn.next()[0];
 				if(prev && next && prev.nodeName == "DIV" && prev.nodeName == next.nodeName){
 					$(prev).remove();
 				}else if(next && next.nodeName == "DIV"){
 					$(next).remove();
 				}else if(prev && prev.nodeName == "DIV"){
 					$(prev).remove();
 				}
 				cbtn.remove();	
 				cbtn= null;
 			}						
 		});  
 	},
 	hideButtonsItem: function(jq, param){  
 		return jq.each(function(){  
 			var btns = $(this).children("div.dialog-button").children("a");
 			var cbtn = null;
 			if(typeof param == "number"){
 				cbtn = btns.eq(param);
 			}else if(typeof param == "string"){
 				var text = null;
 				btns.each(function(){
 					text = $(this).data().linkbutton.options.text;
 					if(text == param){
 						cbtn = $(this);
 						cbtn.hide();
 						return;
 					}
 				});
 			} 
 		});  
 	},
 	showButtonsItem: function(jq, param){  
 		return jq.each(function(){  
 			var btns = $(this).children("div.dialog-button").children("a");
 			var cbtn = null;
 			if(typeof param == "number"){
 				cbtn = btns.eq(param);
 			}else if(typeof param == "string"){
 				var text = null;
 				btns.each(function(){
 					text = $(this).data().linkbutton.options.text;
 					if(text == param){
 						cbtn = $(this);
 						cbtn.show();
 						return;
 					}
 				});
 			} 
 		});  
 	}	
 });

/**
 * 把表单元素转换成json对象 
 * 使用示例:serializeObject($("#formId"))
 * return {"name1":"value1","name2":"value2"...}
 */
 function serializeObject(form){
	 var o={};
	 $.each(form.serializeArray(),function(i,field){
		if(field.value != null && field.value != ""){
			o[field.name]=field.value;
		}
	 });
	 
	 return o;
 }
 
 /**
  * 格式化日期,转化成一天的开始时间 
  * 使用示例:formatMinDate(new Date())
  * return "xxxx-xx-xx 00:00:00"
  */
 function formatMinDate(date){
	 var y = date.getFullYear();
	 var m = date.getMonth()+1;
	 var d = date.getDate();
	 return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+" 00:00:00";
 }
 
 /**
  * 格式化数字,整数位添加千分号相隔，如：12132.334--->>>>12,132.334
  * 如果tp=="double",那么保留两位小数,否则为整数 
  * 使用示例:formatNumber("1234.654","double")
  * return "xxxx-xx-xx 00:00:00"
  *//*
 function formatNumber(num,tp){

 	var str=num.toString();
 	var arr = str.split('.');
 	str = arr[0].toString();
 	str = str.replace(/(?=(?:\d{3})+(?!\d))/g,',');
 	
 	if(str.indexOf(",") == 0){
 		str = str.substring(1);
 	}
 	
 	if(tp!=null&&tp=="double"){
 		if(arr.length == 1){
 			str += ".00";
 		}else{
 			if(arr[1].length==2){
 				str += "."+arr[1];
 			}else{
 				str += "."+arr[1]+"0";
 			}
 		}
 	}
 		
 	return str;
 }*/
 
//格式化数字,整数位添加千分号相隔，如：12132.334--->>>>12,132.334
 function formatNumber(num){
 	if(num < 1 && num > 0){
 		return num+"";
 	}
 	if (num < 0) {
 		var str=num+"";
 		str = str.substring(1);
 	 	var arr = str.split('.');
 	 	str = arr[0]+"";
 	 	str = str.replace(/(?=(?:\d{3})+(?!\d))/g,',');
 	 	if(str.match(/./) == ","){
 	 		str = str.substring(1);
 	 	}
 	 	if(arr.length == 1){
 	 		return str;
 	 	}
 	 	str += "."+arr[1];
 	 	str = "-" + str;
 	} else {
 		var str=num+"";
 		var arr = str.split('.');
 		str = arr[0]+"";
 		str = str.replace(/(?=(?:\d{3})+(?!\d))/g,',');
 		if(str.match(/./) == ","){
 			str = str.substring(1);
 		}
 		if(arr.length == 1){
 			return str;
 		}
 		str += "."+arr[1];
 	}
 	return str;
 }
 
 /**
  * 格式化日期,转化成一天的结束时间
  * 使用示例:formatMaxDate(new Date())
  * return "xxxx-xx-xx 23:59:59"
  */
 function formatMaxDate(date){
	 var y = date.getFullYear();
	 var m = date.getMonth()+1;
	 var d = date.getDate();
	 return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+" 23:59:59";
 }
 
 function confirmDate(value,i){
	$("#lab"+i).show();
	selectDate(value);
 }
 
 function cancelDate1(value,i){
	$("#lab"+i).hide();
	selectDate(value);
 }

function selectDate(dateType) {
	if(dateType == "custom") {
		/*document.getElementById("beginTime").removeAttribute("disabled");
		document.getElementById("endTime").disabled = false;*/
		
	} else {
		setDate(dateType);
		/*document.getElementById("beginTime").disabled = "disabled";
		document.getElementById("endTime").disabled = "disabled";*/
	}
}
	
function setDate1(flag) {
	
	//事件参数 flag 类型分:
	//	today       今天
	//	yesterday   昨天
	//  before_yesterday 前天
	//  最近3天
	//	this_week   本周
	//	last_week   上周
	//	this_month  本月
	//	7_days		最近7天
	//	30_days		最近30天
	
	
	var TYPE_YESTERDAY = 'yesterday';
	var TYPE_BEFORE_YESTERDAY = 'before_yesterday';
	var TYPE_3_DAYS = '3_days';
	var TYPE_THIS_WEEK = 'this_week';
	var TYPE_LAST_WEEK = 'last_week';
	var TYPE_THIS_MONTH = 'this_month';
	var TYPE_TODAY = 'today';
	var TYPE_7_DAYS = '7_days';
	var TYPE_30_DAYS = '30_days';
	
	var date = new Date();
	var curYear = date.getFullYear();//四位数的年份
	var curMonth = date.getMonth() + 1;//date.getMonth()返回月份(0 ~ 11)  0 表示一月
	var curDate = date.getDate();//返回一个月中的某一天 (1 ~ 31)
	
	var beginTime = $(".beginTime");
	var endTime = $(".endTime");
	
	if(flag == TYPE_TODAY) {
		$(".beginTime").val(setDateFormat2(curYear, curMonth, curDate));
		$(".beginTime").datebox("setValue", setDateFormat2(curYear, curMonth, curDate));
		$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
		$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	}
	else if(flag == TYPE_YESTERDAY) {
		if(curDate - 1 >= 1) {
			$(".beginTime").val(setDateFormat3(curYear, curMonth, curDate-1));
			$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-1));
			$(".endTime").val(setDateFormat3(curYear, curMonth, curDate-1));
			$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-1));
		}
		else {
			if(curMonth - 1 >= 1) {
				$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()));
				$(".endTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()));
				$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()));
			}
			else {
				$(".beginTime").val(setDateFormat3(curYear-1, 12, 31));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31));
				$(".endTime").val(setDateFormat3(curYear-1, 12, 31));
				$(".endTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31));
			}
		}
	}
	else if(flag == TYPE_BEFORE_YESTERDAY) {
		if(curDate - 2 >= 1) {
			$(".beginTime").val(setDateFormat3(curYear, curMonth, curDate-2));
			$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-2));
			$(".endTime").val(setDateFormat3(curYear, curMonth, curDate-2));
			$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-2));
		}
		else {
			if(curMonth - 1 >= 1) {
				if(curDate - 2 == 0){
					$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()));
					$(".endTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()));
					$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()));
				}else{
					$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-1));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-1));
					$(".endTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()-1));
					$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()-1));
				}
			}
			else {
				if(curDate - 2 == 0){
					$(".beginTime").val(setDateFormat3(curYear-1, 12, 31));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31));
					$(".endTime").val(setDateFormat3(curYear-1, 12, 31));
					$(".endTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31)); 
				}else{
					$(".beginTime").val(setDateFormat3(curYear-1, 12, 30));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 30));
					$(".endTime").val(setDateFormat3(curYear-1, 12, 30));
					$(".endTime").datebox("setValue", setDateFormat3(curYear-1, 12, 30));
				}
			}
		}
	}
	else if(flag == TYPE_3_DAYS) {
		if(curDate - 3 >= 1) {
			$(".beginTime").val(setDateFormat3(curYear, curMonth, curDate-3));
			$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-3));
			$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
			$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
		}
		else {
			if(curMonth - 1 >= 1) {
				if(curDate - 3 == 0){
					$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()));
					$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
					$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
				}else if(curDate - 3 == -1){
					$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-1));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-1));
					$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
					$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
				}else{
					$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-2));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-2));
					$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
					$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
				}
			}
			else {
				if(curDate - 2 == 0){
					$(".beginTime").val(setDateFormat3(curYear-1, 12, 31));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31));
					$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
					$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
				}else if(curDate - 2 == -1){
					$(".beginTime").val(setDateFormat3(curYear-1, 12, 30));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 30));
					$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
					$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
				}else{
					$(".beginTime").val(setDateFormat3(curYear-1, 12, 29));
					$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 29));
					$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
					$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
				}
			}
		}
	}
	else if(flag == TYPE_THIS_WEEK) {
		//day表示当前星期几  (0~6 表示 周末~周六),需要转化为中国（周一~周末）
		var day = date.getDay()-1;
		if(curDate - day >= 1) {
			$(".beginTime").val(setDateFormat3(curYear, curMonth, curDate-day));
			$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-day));
		}
		else {
			if(curMonth - 1 >= 1) {
				$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day)));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day)));
			}
			else {
				$(".beginTime").val(setDateFormat3(curYear-1, 12, 31+(curDate-day)));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31+(curDate-day)));
			}
		}
		$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
		$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	}
	else if(flag == TYPE_LAST_WEEK) {
		var day = date.getDay()-1;
		if(curDate - day - 7 >= 1) {
			$(".beginTime").val(setDateFormat3(curYear, curMonth, curDate-day-7));
			$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-day-7));
			$(".endTime").val(setDateFormat3(curYear, curMonth, curDate-day-1));
			$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-day-1));
		}
		else if(curDate - day - 1 >= 1) {
			if(curMonth - 1 >= 1) {
				$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-7)));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-7)));
			}
			else {
				$(".beginTime").val(setDateFormat3(curYear-1, 12, 31+(curDate-day-7)));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31+(curDate-day-7)));
			}
			$(".endTime").val(setDateFormat3(curYear, curMonth, curDate-day-1));
			$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth, curDate-day-1));
		}
		else {
			if(curMonth - 1 >= 1) {
				$(".beginTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-7)));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-7)));
				$(".endTime").val(setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-1)));
				$(".endTime").datebox("setValue", setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-1)));
			}
			else {
				$(".beginTime").val(setDateFormat3(curYear-1, 12, 31+(curDate-day-7)));
				$(".beginTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31+(curDate-day-7)));
				$(".endTime").val(setDateFormat3(curYear-1, 12, 31+(curDate-day-1)));
				$(".endTime").datebox("setValue", setDateFormat3(curYear-1, 12, 31+(curDate-day-1)));
			}
		}
	}
	else if(flag == TYPE_THIS_MONTH) {
		$(".beginTime").val(setDateFormat3(curYear, curMonth, 1));
		$(".beginTime").datebox("setValue", setDateFormat3(curYear, curMonth, 1));
		$(".endTime").val(setDateFormat(curYear, curMonth, curDate));
		$(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	}
	else if(flag == TYPE_7_DAYS) {
		   if(curDate - 7 >= 1) {
		        $(".beginTime").val(setDateFormat(curYear, curMonth, curDate-7));
		        $(".beginTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate-7));
		        $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
		        $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
		   } else if(curMonth - 1 >= 1) {
		        var remainingDay = 7 - curDate;
		        var lastMonthDay = new Date(curYear,curMonth-1,0).getDate();
		        /*if (lastMonthDay <= remainingDay) {//2月份的情况
		            $(".endTime").val()= setDateFormat(curYear, curMonth-2, 31-(7-lastMonthDay-curDate));
		            endTime.value = setDateFormat(curYear, curMonth, curDate);
		        }*/
		        $(".beginTime").val(setDateFormat(curYear, curMonth-1, lastMonthDay-remainingDay));
		        $(".beginTime").datebox("setValue", setDateFormat(curYear, curMonth-1, lastMonthDay-remainingDay));
		        $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
		        $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
		        
		   } else {
		        var remainingDay = 7 - curDate;
		        $(".beginTime").val(setDateFormat(curYear - 1, 12, 31 - remainingDay));
		        $(".beginTime").datebox("setValue", setDateFormat(curYear - 1, 12, 31 - remainingDay));
		        $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
		        $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
		        
		   }
	}
	else if(flag == TYPE_30_DAYS) {
	   if(curDate - 30 >= 1) {
	        $(".beginTime").val(setDateFormat(curYear, curMonth, curDate-30));
	        $(".beginTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate-30));
	        $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
	        $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	   } else if(curMonth - 1 >= 1) {
	        var remainingDay = 30 - curDate;
	        var lastMonthDay = new Date(curYear,curMonth-1,0).getDate();
	        if (lastMonthDay <= remainingDay) {//2月份的情况
	            $(".beginTime").val(setDateFormat(curYear, curMonth-2, 31-(30-lastMonthDay-curDate)));
	            $(".beginTime").datebox("setValue", setDateFormat(curYear, curMonth-2, 31-(30-lastMonthDay-curDate)));
	            $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
	            $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	        }
	        $(".beginTime").val(setDateFormat(curYear, curMonth-1, lastMonthDay-remainingDay));
	        $(".beginTime").datebox("setValue", setDateFormat(curYear, curMonth-1, lastMonthDay-remainingDay));
	        $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
	        $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	   } else {
	        var remainingDay = 30 - curDate;
	        $(".beginTime").val(setDateFormat(curYear - 1, 12, 31 - remainingDay));
	        $(".beginTime").datebox("setValue", setDateFormat(curYear - 1, 12, 31 - remainingDay));
	        $(".endTime").val(setDateFormat(curYear, curMonth, curDate));
	        $(".endTime").datebox("setValue", setDateFormat(curYear, curMonth, curDate));
	   }
	}
}

function setDateFormat3(year, month, date) {
	if(month < 10) month = "0" + month;
	if(date < 10) date = "0" + date;
	return year + "-" + month + "-" + date; 
}

function setDateFormat2(year, month, date) {
	if(month < 10) month = "0" + month;
	if(date < 10) date = "0" + date;
	return year + "-" + month + "-" + date;
}

function setDateFormat(year, month, date) {
	if(month < 10) month = "0" + month;
	if(date < 10) date = "0" + date;
	return year + "-" + month + "-" + date ;
}

function setDateFormat4(date) {
	 var y = date.getFullYear();
	 var m = date.getMonth() + 1;
	 var d = date.getDate();
	return y + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d);
}

function setDateTimeFormat(date) {
	 var y = date.getFullYear();
	 var m = date.getMonth() + 1;
	 var d = date.getDate();
	 var h = date.getHours();
	 var mm = date.getMinutes();
	 var s = date.getSeconds();
	return y + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d) + " " + h + ":" + mm + ":" + s;
}

function myparser(s){  
    if (!s) return new Date();  
    var ss = (s.split('-'));  
    var y = parseInt(ss[0],10);  
    var m = parseInt(ss[1],10);  
    var d = parseInt(ss[2],10);  
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){  
        return new Date(y,m-1,d);  
    } else {  
        return new Date();  
    }  
}  

function myformatter(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();  
    var strDate = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    return strDate;
} 

function cancelDate(value,i){
	$("#lab"+i).hide();
	setDate(value,i);
	if(i==1){
		$('#beginTime1').datebox('setValue', $("#beginTime1").val()); 
		$('#endTime1').datebox('setValue', $("#endTime1").val());  
	}else if(i==2){
		$('#beginTime2').datebox('setValue', $("#beginTime2").val()); 
		$('#endTime2').datebox('setValue', $("#endTime2").val());  
	}else if(i==3){
		$('#beginTime3').datebox('setValue', $("#beginTime3").val()); 
		$('#endTime3').datebox('setValue', $("#endTime3").val());  
	}else if(i==4){
		$('#beginTime4').datebox('setValue', $("#beginTime4").val()); 
		$('#endTime4').datebox('setValue', $("#endTime4").val());  
	}else if(i==5){
		$('#beginTime5').datebox('setValue', $("#beginTime5").val()); 
		$('#endTime5').datebox('setValue', $("#endTime5").val());  
	}else{
		$('#beginTime').datebox('setValue', $("#beginTime").val()); 
		$('#endTime').datebox('setValue', $("#endTime").val());  
	}
}

function setDate(index,i) {
	
	//事件参数 index 类型分:
	//	today       今天
	//	yesterday   昨天
	//  before_yesterday 前天
	//	this_week   本周
	//	last_week   上周
	//	this_month  本月
	//	30_days		最近30天
	
	
	var TYPE_YESTERDAY = 'yesterday';
	var TYPE_BEFORE_YESTERDAY = 'before_yesterday';
	var TYPE_THIS_WEEK = 'this_week';
	var TYPE_LAST_WEEK = 'last_week';
	var TYPE_THIS_MONTH = 'this_month';
	var TYPE_TODAY = 'today';
	var TYPE_30_DAYS = '30_days';
	
	var date = new Date();
	var curYear = date.getFullYear();//四位数的年份
	var curMonth = date.getMonth() + 1;//date.getMonth()返回月份(0 ~ 11)  0 表示一月
	var curDate = date.getDate();//返回一个月中的某一天 (1 ~ 31)
	
	var beginTime = document.getElementById("beginTime"+i);
	var endTime = document.getElementById("endTime"+i);
	
	if(index == TYPE_TODAY) {
		beginTime.value = setDateFormat2(curYear, curMonth, curDate);
		endTime.value = setDateFormat(curYear, curMonth, curDate);
	}
	else if(index == TYPE_YESTERDAY) {
		if(curDate - 1 >= 1) {
			beginTime.value = setDateFormat3(curYear, curMonth, curDate-1);
			endTime.value = setDateFormat3(curYear, curMonth, curDate-1);
		}
		else {
			if(curMonth - 1 >= 1) {
				beginTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate());
				endTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate());
			}
			else {
				beginTime.value = setDateFormat3(curYear-1, 12, 31);
				endTime.value = setDateFormat3(curYear-1, 12, 31);
			}
		}
	}
	else if(index == TYPE_BEFORE_YESTERDAY) {
		if(curDate - 2 >= 1) {
			beginTime.value = setDateFormat3(curYear, curMonth, curDate-2);
			endTime.value = setDateFormat3(curYear, curMonth, curDate-2);
		}
		else {
			if(curMonth - 1 >= 1) {
				if(curDate - 2 == 0){
					beginTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate());
					endTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate());
				}else{
					beginTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()-1);
					endTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear, curMonth-1,0).getDate()-1);
				}
			}
			else {
				if(curDate - 2 == 0){
					beginTime.value = setDateFormat3(curYear-1, 12, 31);
					endTime.value = setDateFormat3(curYear-1, 12, 31);
				}else{
					beginTime.value = setDateFormat3(curYear-1, 12, 30);
					endTime.value = setDateFormat3(curYear-1, 12, 30);
				}
			}
		}
	}
	else if(index == TYPE_THIS_WEEK) {
		//day表示当前星期几  (0~6 表示 周末~周六),需要转化为中国（周一~周末）
		var day = date.getDay()-1;
		if(curDate - day >= 1) {
			beginTime.value = setDateFormat3(curYear, curMonth, curDate-day);
		}
		else {
			if(curMonth - 1 >= 1) {
				beginTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day));
			}
			else {
				beginTime.value = setDateFormat3(curYear-1, 12, 31+(curDate-day));
			}
		}
		endTime.value = setDateFormat(curYear, curMonth, curDate);
	}
	else if(index == TYPE_LAST_WEEK) {
		var day = date.getDay()-1;
		if(curDate - day - 7 >= 1) {
			beginTime.value = setDateFormat3(curYear, curMonth, curDate-day-7);
			endTime.value = setDateFormat3(curYear, curMonth, curDate-day-1);
		}
		else if(curDate - day - 1 >= 1) {
			if(curMonth - 1 >= 1) {
				beginTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-7));
			}
			else {
				beginTime.value = setDateFormat3(curYear-1, 12, 31+(curDate-day-7));
			}
			endTime.value = setDateFormat3(curYear, curMonth, curDate-day-1);
		}
		else {
			if(curMonth - 1 >= 1) {
				beginTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-7));
				endTime.value = setDateFormat3(curYear, curMonth-1, new Date(curYear,curMonth-1,0).getDate()+(curDate-day-1));
			}
			else {
				beginTime.value = setDateFormat3(curYear-1, 12, 31+(curDate-day-7));
				endTime.value = setDateFormat3(curYear-1, 12, 31+(curDate-day-1));
			}
		}
	}
	else if(index == TYPE_THIS_MONTH) {
		beginTime.value = setDateFormat3(curYear, curMonth, 1);
		endTime.value = setDateFormat(curYear, curMonth, curDate);
	}
	else if(index == TYPE_30_DAYS) {
	   if(curDate - 30 >= 1) {
	        beginTime.value = setDateFormat(curYear, curMonth, curDate-30);
	        endTime.value = setDateFormat(curYear, curMonth, curDate);
	   } else if(curMonth - 1 >= 1) {
	        var remainingDay = 30 - curDate;
	        var lastMonthDay = new Date(curYear,curMonth-1,0).getDate();
	        if (lastMonthDay <= remainingDay) {//2月份的情况
	            beginTime.value = setDateFormat(curYear, curMonth-2, 31-(30-lastMonthDay-curDate));
	            endTime.value = setDateFormat(curYear, curMonth, curDate);
	        }
	        beginTime.value = setDateFormat(curYear, curMonth-1, lastMonthDay-remainingDay);
	        endTime.value = setDateFormat(curYear, curMonth, curDate);
	   } else {
	        var remainingDay = 30 - curDate;
	        beginTime.value = setDateFormat(curYear - 1, 12, 31 - remainingDay);
	        endTime.value = setDateFormat(curYear, curMonth, curDate);
	   }
	}
}

function showIsDoingMsg(){
	$.messager.alert('提示', "服务器正在处理,请耐心等待", "info");
}

function showProcess(isShow, title, msg) {
     if (!isShow) {
         $.messager.progress('close');
         return;
     }
     if(!title){
    	 title = "温馨提示";
     }
     if(!msg){
    	 msg = "正在处理数据...";
     }
     var win = $.messager.progress({
         title: title,
         msg: msg
     });
}

function showOrHide(tagId, show){
	 var id = "#" + tagId;
	 if(show){
		 $(id).show();
	 }else{
		 $(id).hide();
	 }
}