var menuCache = {};
/* 初始化系统菜单 */
var refreshMenu = function (modelCode) {
    var $menu = $("#menu_tree"),
            htmlTemplate = {
                level0: '<ul class="none sub-menu-list" style="overflow-y:auto;;padding-bottom:20px">',
                level1: '<li><a href="#" class="level-{level}"><span>{name}</span></a></li>'
            },
            bindTree = function ($parent, nodeData, level) {

                var index, itemHtml, $item, template, $newParent, $tempSubItem;
                template = htmlTemplate.level1;
                itemHtml = new zhiziyun.Template({ html: template }).apply($.extend(nodeData, { "level": level }));

                $item = $(itemHtml).appendTo($parent);
                $item.data("model", nodeData);
                if (nodeData.children && nodeData.children.length > 0) {
                    $newParent = $(htmlTemplate.level0).appendTo($item);
                    for (var i = 0; i < nodeData.children.length; i++) {
                        $tempSubItem = bindTree($newParent, nodeData.children[i], level + 1);
                        if (i == nodeData.children.length - 1) {
                            $tempSubItem.children("a").addClass("no-border-bottom");
                        }
                    }
                    $item.find("a:first").addClass("list-icon");
                }
                return $item;
            },
            bindTreeEvent = function () {
                $("#menu_tree li").click(function (e) {
                	
            		$(this).siblings("li").has("a.expand").find("ul").addClass("none");  //隐藏同级其它菜单的子菜单
                    $(this).siblings("li").find("a.expand").removeClass("expand");       //修改同级其它菜单的样式为隐藏
                    $(this).has("ul").find("a:first").toggleClass("expand");             //切换当前菜单隐藏或显示样式
                    $(this).find("ul:first").toggleClass("none");                        //隐藏或显示当前菜单的子菜单


                    var node = $(this).data("model"), view, attr = node.attributes;
                    var tabTitle = node.name;  
                    var url = node.url; 
                    
                    //判断是否用iframe,content装的是iframe标签
                    if(node.content != null && node.content!= '') {
                    	layout_center_addTabFun({title : tabTitle,
    						closable : true,
    						iconCls : node.iconCls,
    						href : '',
    						content : node.content}); 
                    }
                    else{
                    	layout_center_addTabFun({title : tabTitle,
    						closable : true,
    						iconCls : node.iconCls,
    						href : url,
    						content:''}); 
                    }
                
                    e.stopPropagation();
                    
                });
            };

    $menu.empty();
    $("#treeLoading").removeClass("none");

    var secondaryMenu = menuCache[modelCode];
    if(!secondaryMenu){
    	$.ajax({//加载二级菜单
            url: "menu/subSystemMenus.action?subSystem=" + modelCode, 
            async:false,
            dataType:"json",
            success: function (menuData) {
            	if(typeof(menuData) == "string"){
            		menuData = $.parseJSON(menuData);
    			}
            	menuCache[modelCode] = menuData;
            	secondaryMenu = menuCache[modelCode];
            }
        });
    }
    for (var index in secondaryMenu) {
        bindTree($menu, secondaryMenu[index], 1);
    }
    bindTreeEvent();
    $("#tree ul>li:last-child").addClass("no-border-bottom"); //最后一个节点的样式控制
    $("#tree>li:first").has("ul").trigger("click"); //展开第一个节点
    $("#treeLoading").addClass("none");

};

/* 初始化页面控件 */
var initControl = function () {
    $("#system-name").hover(function () {
        $(this).addClass("current");
    }, function () {
        $(this).removeClass("current");
    });

    var unloginContent = '<a href="logOff" class="quit-icon">确认退出</a>';
    var msgLinkContent = '<div class="mgs-tips-content"><ul id="msg"></ul></div><div class="mgs-tips-footer"><a id="allMsgLink" href="javascript:void(0)">全部&gt;&gt;</a></div>';

    //阻止元素冒泡
    $(".system-function").click(function (e) {
        e.stopPropagation();
    });

    //点击tip内容时时阻止事件冒泡
    $(".tips.header-tips").unbind(".tip").bind("click.tip", function (e) {
        e.stopPropagation();
    });
    //点击页面时隐藏tip
    $(document).unbind(".tips").bind("click.tips", function () {
        $(".tips.header-tips").addClass("none");
    });

    //side-icon
    $(".side-icon").toggle(function () {

         var $westEle = $(".layout-panel-west");
         $westEle.css("left", "-240px"); 

        $(".layout-panel-center div").css("width", ($(".layout-panel-center div").width() + 240) + "px");
        $(".layout-panel-center").css("width", ($(".layout-panel-center").width() + 240) + "px");
         
        $(".layout-panel-center").css("left", "0px");
         
        $(this).addClass("expand");
        //            resize();
    }, function () {

        var $westEle = $(".layout-panel-west");
        $westEle.css("left", "0px"); 
         
        $(".layout-panel-center div").css("width", ($(".layout-panel-center div").width() - 240) + "px");
        $(".layout-panel-center").css("width", ($(".layout-panel-center").width() - 240) + "px");
         
        $(".layout-panel-center").css("left", "240px");
         
        $(this).removeClass("expand");

    });

};


/* 加载系统下拉菜单 */
var loadSystem = function (cb) {
    var cookie = new zhiziyun.Cookie(),
            isMenuOpenning = false, isMenuClosing = false, isReadyClose = false,
            openMenu = function (e) {
                if (isMenuOpenning || isMenuClosing) return;
                isMenuOpenning = true;
                $("#system-switching-tip").slideDown(200, function () { isMenuOpenning = false; });
            },
            closeMenu = function (e) {
                if (isMenuClosing) return;
                isMenuClosing = true;
                $(".system-switching-tip").slideUp(300, function () { isMenuClosing = false; });
            },
            readyCloseMenu = function (e) {
                if (isReadyClose) return;
                isReadyClose = true;
                setTimeout(function () {
                    //如果准备关闭过程中又被设为不再关闭则不做关闭动作
                    if (!isReadyClose) return;
                    isReadyClose = false;
                    closeMenu(e);
                }, 400);
            };

    $(".system-switching-tip").mouseenter(function () {
        //如果菜单还未关闭，又再次移上去，则取消之前的关闭动作
        if (isReadyClose) isReadyClose = false;
    });
    $(".system-switching").unbind(".systemMenu")
        .bind("mouseenter.systemMenu", function (e) {
            $(this).addClass("current");
           
        })
        .bind("click.systemMenu", function (e) {
            openMenu(e);
        })
        .bind("mouseleave.systemMenu", function (e) {
            $(this).removeClass("current");
            readyCloseMenu(e);
        });

    var catalog = new zhiziyun.Menu({ selector: "#system-catalog" });
    catalog.bind("click", function (e) {
        var modelData = e.model;
        if (modelData && modelData.ID) {
            $("#system-name .current-system").text(modelData.Name);
            
        	refreshMenu(modelData.ID);
            cookie.set(systemCookieKey, modelData.ID);
            e.stopPropagation();
            closeMenu(e);
        }
    }).bind("loaded", function (systems) {
        var selectedSystem = cookie.get(systemCookieKey);
        if (selectedSystem) {
            //加载缓存系统
            $("#system-catalog li[id='" + selectedSystem + "']:first").click();
        } else {
            //加载第一个系统
            $("#system-catalog li:first").click();
        }
        cb && cb(systems);
    }).load();


};

/* 初始化tab页面 */
var systemTabs = $(function() {
	$('#layout_center_tabsMenu').menu({
		onClick : function(item) {
			var curTabTitle = $(this).data('tabTitle');
			var type = $(item.target).attr('type');

			if (type === 'refresh') {
				layout_center_refreshTab(curTabTitle);
				return;
			}

			if (type === 'close') {
				var t = $('#layout_center_tabs').tabs('getTab', curTabTitle);
				if (t.panel('options').closable) {
					$('#layout_center_tabs').tabs('close', curTabTitle);
				}
				return;
			}

			var allTabs = $('#layout_center_tabs').tabs('tabs');
			var closeTabsTitle = [];

			$.each(allTabs, function() {
				var opt = $(this).panel('options');
				if (opt.closable && opt.title != curTabTitle && type === 'closeOther') {
					closeTabsTitle.push(opt.title);
				} else if (opt.closable && type === 'closeAll') {
					closeTabsTitle.push(opt.title);
				}
			});

			for ( var i = 0; i < closeTabsTitle.length; i++) {
				$('#layout_center_tabs').tabs('close', closeTabsTitle[i]);
			}
		}
	});

	$('#layout_center_tabs').tabs({
		fit : true,
		border : false,
		onContextMenu : function(e, title) {
			e.preventDefault();
			$('#layout_center_tabsMenu').menu('show', {
				left : e.pageX,
				top : e.pageY
			}).data('tabTitle', title);
		},
		tools : [ {
			iconCls : 'icon-reload',
			handler : function() {
				var href = $('#layout_center_tabs').tabs('getSelected').panel('options').href;
				if (href) {/*说明tab是以href方式引入的目标页面*/
					var index = $('#layout_center_tabs').tabs('getTabIndex', $('#layout_center_tabs').tabs('getSelected'));
					$('#layout_center_tabs').tabs('getTab', index).panel('refresh');
				} else {/*说明tab是以content方式引入的目标页面*/
					var panel = $('#layout_center_tabs').tabs('getSelected').panel('panel');
					var frame = panel.find('iframe');
					try {
						if (frame.length > 0) {
							for ( var i = 0; i < frame.length; i++) {
								frame[i].contentWindow.document.write('');
								frame[i].contentWindow.close();
								frame[i].src = frame[i].src;
							}
							if ($.browser.msie) {
								CollectGarbage();
							}
						}
					} catch (e) {
					}
				}
			}
		}, {
			iconCls : 'icon-cancel',
			handler : function() {
				var index = $('#layout_center_tabs').tabs('getTabIndex', $('#layout_center_tabs').tabs('getSelected'));
				var tab = $('#layout_center_tabs').tabs('getTab', index);
				if (tab.panel('options').closable) {
					$('#layout_center_tabs').tabs('close', index);
				} else {
					$.messager.alert('提示', '[' + tab.panel('options').title + ']不可以被关闭', 'error');
				}
			}
		} ]
	});
});

function layout_center_addTabFun(opts) {
    if(opts.href.length > 2 ||
    		opts.content.length > 2)
    {
		var t = $('#layout_center_tabs');
		if (t.tabs('exists', opts.title)) {
			t.tabs('select', opts.title);
		} else {
			t.tabs('add', opts);
		}
    }
}

function layout_center_addTabFun2(opts) {
    if(opts.href.length > 2 ||
    		opts.content.length > 2)
    {
		var t = $('#layout_center_tabs');
		if (t.tabs('exists', opts.title)) {
			t.tabs('close', opts.title);
		} 
		t.tabs('add', opts);
    }
}

function layout_center_refreshTab(title) {
	$('#layout_center_tabs').tabs('getTab', title).panel('refresh');
}

var refreshOnline = function () { 
    $.ajax({
        url: "refreshOnline",
        type: "get",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data.success == false) {
                $.messager.alert('提示信息', data.msg, '');
                window.location.href = '/home/login';
            }
        }
    });
};


$(function () {
    $('body').layout();
    
    systemCookieKey = "zhiziyun.platform.admin";
    initControl(); 
    loadSystem();

    height = $('.side-left').parent().height();
    $('.side-left').attr("style", "height:" + height + "px;");

});


function IsLogin() {
    $.messager.alert('提示信息', '登录已失效，请重新登录！', '');
    window.location.href = 'login';
}