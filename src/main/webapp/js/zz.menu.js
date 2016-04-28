(function ($) {
    var zhiziyun = window.zhiziyun,
        Widget = zhiziyun.ui.Widget,
        DefineClass = zhiziyun.DefineClass,
        extand = $.extend;

    var defaults = {
        selector: "#",
        url: "menu/rootMenus.action",
        actionParam: {},
        events: {
            click: null
        }
    };

    var menu = DefineClass(Widget, {
        options: {},
        init: function (options) {
            var self = this;
            Widget.fn.init.apply(self, arguments);
            extand(self.options, defaults, options);
            self.$element = $(self.options.selector);
        },
        load: function (postData) {
            var self = this, options = self.options, currentItem;
            var bindMenu = function ($parent, liData, level) {
                var level1 = '<li id="' + liData.id + '"><a href="javascript:void(0)"><em class="' + (liData.iconCls || "order") + '">' + liData.name + '</em><span></span></a></li>',
                    level2 = '<li id="' + liData.id + '"><a href="javascript:void(0)"><em>' + liData.name + '</em></a></li>',
                    $navItem=$('<li class="XY'+ liData.id +'"><a href="javascript:void(0)"><em>' + liData.name + '</em></a></li>'),
                    $item = $(level != 1 ? level2 : level1),
                    itemStatus = "hide",
                    showItem = function () {
                        if (level == 1) {
                            itemStatus = "show";
                            currentItem = $item;
                        }
                        $item.siblings("li.current").not($item).removeClass("current");
                        $item.addClass("current");

                    },
                    hideItem = function () {
                        if (level == 1) {
                            itemStatus = "hide";
                            currentItem = null;
                        }
                        $item.removeClass("current");
                    },
                    onEnter = function () {
                        switch (itemStatus) {
                            case "show":
                                itemStatus = "show"; break;
                            default:
                                itemStatus = "readyshow";
                                setTimeout(function () {
                                    if (itemStatus == "readyshow") { showItem(); }
                                }, 200);
                                break;
                        }
                    },
                    onLeave = function () {
                        switch (itemStatus) {
                            case "show":
                                itemStatus = "readyhide";
                                setTimeout(function () {
                                    if (itemStatus == "readyhide") { hideItem(); }
                                }, 200);
                                break;
                            default:
                                itemStatus = "hide";
                                break;
                        }
                    };
                $item.data("model", liData);
                $parent.append($item);
                $(".system-btn ul").append($navItem);
                $navItem.click(function(e){
                	$(".system-btn ul li").removeClass("hover");
                	$(this).addClass("hover");
                	var index=$(".system-btn ul li").index($(this));
                	$("#system-catalog li").eq(index).trigger("click",e);
                });
                $item.click(
                    function (e) {
                        e.model = $(this).data("model").attributes;
                        var isDefaultPrevented = self.trigger("click", e);
                        var index=$("#system-catalog li").index($(this));
                        $(".system-btn ul li").removeClass("hover");
                        $(".system-btn ul li").eq(index).addClass("hover");
                        if (!isDefaultPrevented) {
                            e.preventDefault();
                        }
                    })
                .hover(
                    function (e) {
                        if (level == 1) {
                            if (currentItem) {
                                onEnter();
                            } else {
                                showItem();
                            }
                        } else {
                            $(this).siblings("li.current").not(this).removeClass("current");
                            $(this).addClass("current");
                        }
                    },
                    function () {
                        if (level == 1) {
                            onLeave();
                        }
                        else {
                            $(this).removeClass("current");
                        }
                    });
                if (liData.children) {
                    var $ul = $("<ul class='m-submenu'>");
                    $item.append($ul);
                    $.each(liData.children, function () {
                        bindMenu($ul, this, level + 1);
                    });
                };
                return self;
            };

            var post = $({}, options.actionParam, postData);


            $.ajax({//加载一级菜单
                url: options.url,
                dataType:"json",
                success: function (result) {
                    self.$element.empty();

                    for (var index in result) {
                        bindMenu(self.$element, result[index], 1);
                    }

                    self.trigger("loaded", result);

                }
            });

        }
    });

    extand(zhiziyun, { "Menu": menu });
})(jQuery);