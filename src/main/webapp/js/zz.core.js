(function($){
    var zhiziyun = window.zhiziyun = window.zhiziyun || {},
        extend = $.extend,
        isFunction = $.isFunction,
        isObject=$.isPlainObject,
        each=$.each,
        isArray=$.isArray,
        slice = Array.prototype.slice,
        LoadStatus={NOTLOAD:"NotLoad",LOADING:"Loading",LOADED:"Loaded",EXCUTING:"Excuting",EXCUTED:"Excuted"};
    
    /* 类定义方法 */
    var DefineClass = function(/* [sup,]  proto */) {
        var args=arguments,length,
            F = function() {},
            member,
            subclass,
            sup,proto,
            fn;
        if((length=args.length)>1){
            sup=args[0];
            proto=args[1];
        }
        else{
            proto=args[0];
        }
        
        subclass = proto && proto.init ? proto.init : function () {
                sup && sup.apply(this, arguments);
            };
        F.prototype = sup ? sup.prototype : F.prototype;
        fn = subclass.fn = subclass.prototype = extend(new F, proto);

        for (member in fn) {
            if (typeof fn[member] === "object") {
                fn[member] = extend(true, {}, F.prototype[member], proto[member]);
            }
        }

        fn.constructor = subclass;
        subclass.superclass=F.prototype;
        
        return subclass;
    };

    /* 基础类 */
    var Base=DefineClass({
        init:function(){
        },
        destroy:function(){
            
        }
    });

    var LazyLoad=DefineClass({
        init:function(module,usedCallback){
            var self=this;
            self._callback=usedCallback;
            self.module=module;
            
            if(self._isExists()) self.status=LoadStatus.LOADED;
            else self.status=LoadStatus.NOTLOAD;
        },
        _isExists:function(){
            var self=this,scripts=document.getElementsByTagName("script"),url=self._getUrl();
            for(var i=0;i<scripts.length;i++){
                if(scripts[i].src===url){
                    return true;
                }
            }
            return false;
        },
        _getUrl:function(){
            return this.module;
        },
        load:function(){
            var self=this,script;

            if(self.status===LoadStatus.LOADING || self.status===LoadStatus.LOADED || self.status===LoadStatus.EXCUTING || self.status===LoadStatus.EXCUTED){
                self._callback();
                return;
            }

            script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {  //IE
                script.onreadystatechange = function() {
                    //ie下readyState的状态的值loaded和complete可能只会出现一个
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        self.status=LoadStatus.LOADED;
                        //避免loaded和complete重复处理
                        script.onreadystatechange = null;
                        self.status=LoadStatus.EXCUTING;
                        self._callback();
                        self.status=LoadStatus.EXCUTED;
                    }
                };
            } else {  //Others
                script.onload = function() {
                    self.status=LoadStatus.EXCUTING;
                    self._callback();
                    self.status=LoadStatus.EXCUTED;
                };
            }
            script.src = self._getUrl();
            document.getElementsByTagName("head")[0].appendChild(script);
            self.status=LoadStatus.LOADING;
        }
    });
    
    /*
    * 动态引用JS脚本模块文件
    * example:
    *       zhiziyun.using(["Scripts/jquery.min.js","Scripts/jquery.json-2.3.js"],function(){
    *           // do something...
    *       });
    */
    var using=function(modules,callback){
        var i=0,loadingLength,loaders=[],excutedStep={};
        if(!isArray(modules)) modules=[modules];
        
        if(loadingLength=modules.length){
            for(i=0;i<modules.length;i++){
                loaders.push(new LazyLoad(modules[i],function(){
                    loadingLength--;
                    if(loadingLength===0) callback && callback();
                }));
            }
            for(i=0;i< loaders.length;i++){
                loaders[i].load();
            }
        }
        else{
            callback && callback();
        }
    };
    
    /* 观察者类，用于监听和触发绑定事件 */
    var Observable = DefineClass(Base,{
        init: function() {
            this._events = {};
        },

        bind: function(eventName, handlers, one) {
            var that = this,
                idx,
                eventNames = $.isArray(eventName) ? eventName : [eventName],
                length,
                handler,
                original,
                events;

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = isFunction(handlers) ? handlers : handlers[eventName];

                if (handler) {
                    if (one) {
                        original = handler;
                        handler = function() {
                            that.unbind(eventName, handler);
                            original.call(that, arguments);
                        }
                    }
                    events = that._events[eventName] || [];
                    events.push(handler);
                    that._events[eventName] = events;
                }
            }

            return that;
        },

        one: function(eventName, handlers) {
            return this.bind(eventName, handlers, true);
        },

        trigger: function(eventName, parameter) {
            var that = this,
                events = that._events[eventName],
                isDefaultPrevented = false,
                params = extend(parameter, {
                    preventDefault: function() {
                        isDefaultPrevented = true;
                    },
                    isDefaultPrevented: function() {
                        return isDefaultPrevented;
                    }
                }),
                args=[params],
                idx,
                length;

            if(arguments.length>2) args=args.concat(slice.call(arguments,2));

            if (events) {
                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].apply(that, args);
                }
            }

            return isDefaultPrevented;
        },

        unbind: function(eventName, handler) {
            var that = this,
                events = that._events[eventName],
                idx,
                length;

            if (events) {
                if (handler) {
                    for (idx = 0, length = events.length; idx < length; idx++) {
                        if (events[idx] === handler) {
                            events.splice(idx, 1);
                        }
                    }
                } else {
                    that._events[eventName] = [];
                }
            }

            return that;
        },

        destroy:function(){
            delete this._events;
        }
    });

    /* 中介者类，用于在多个类或模块或页面间通讯调用，避免直接调用降低相互的耦合 */
    var Mediator =DefineClass({
        init:function(handlers){
            var self=this;

            self.handlers=handlers||{};

            self._setup();
        },
        _setup:function(){
        },
        /* 调用指定的动作 */
        execute:function(name /* args1[,args2, ... ] */){
            var self=this,handler=self.handlers[name],args=arguments;

            args = slice.call(args, 1);

            return handler && handler.apply(self,args);
        }
    });
    
    var Widget=DefineClass(Observable,{
        init:function(options){
            var self=this;
//                tmplHtml,$tempEle;

            Observable.fn.init.apply(self,arguments);

            self.options=extend({},self.options,options);
//            self.$element=self.options.selector && $(self.options.selector);

            self._createElement();
            /*else{
                self.$element =$(self.options.selector);
            }*/
//            self.$element = self.$element.after($tempEle).css("display", "none");
//            self.$element = $tempEle;
        },
        _createElement:function(){
            var self=this,templater;
            if(self.options.template){
                templater = new Template({html:self.options.template});
                self.$element = $(templater.apply(self.templateData||{}));
            }
        },
        renderTo:function(selector){
            this.$element.appendTo(selector);
            return this;
        },
        renderAfter:function(selector){
            this.$element.insertAfter(selector);
            return this;
        },
        renderBefore:function(selector){
            this.$element.insertBefore(selector);
            return this;
        },
        destroy:function(){
            Observable.fn.destroy.apply(this,arguments);
            if(this.$element && this.$element.length) this.$element.remove();
            this.$element=null;
        }
    });

    var DelayTaskManager=DefineClass({
        init:function(options){
            var self=this;
            self.options=extend({},self.options||{},options);
            
            self.handles=[];
            self._isStopped=true;
            self._hasRunnedTimes=0;

            options.handle && self.addHandle(self.options.handle);
        },
        options:{
            delay:100,
            times:1
        },
        addHandle:function(handle){
            this.handles.push(handle);
            return this;
        },
        start:function(){
            var self = this,run,args=arguments;

            if(self._isStopped===false) throw Error("任务已经在运行!");
            if(!self.handles.length) throw Error("没有添加处理程序!");

            run = function() {
                var handle,i;
                if (self._isStopped === false) {
                    for(i=0;i<self.handles.length;i++){
                        handle=self.handles[i];
                        handle && handle.apply(self, args);
                    }
                    self._hasRunnedTimes++;

                    if (self.options.times > self._hasRunnedTimes || self.options.times===0) {
                        setTimeout(arguments.callee, self.options.delay);
                    }
                }
//                self._isStopped =  false;
                return;
            };

            self._isStopped=false;
            self._hasRunnedTimes=0;
            run();
            return this;
        },
        cancel:function(){
            this._isStopped=true;
            return this;
        }
    });

    var TaskManager=function(o){
        var defaults={interval:10},
            taskQueue = [], 
            removeQueue = [],
            threadId,running=false,
            options = extend({}, defaults, o);

        // private
    	var runTasks = function(){
	    	var rqLen = removeQueue.length,
	    		now = new Date().getTime();

	        if(rqLen > 0){
	            for(var i = 0; i < rqLen; i++){
	                taskQueue.remove(removeQueue[i]);
	            }
	            removeQueue = [];
	            if(taskQueue.length < 1){
	                stopThread();
	                return;
	            }
	        }
            
	        for(var i = 0, t, itime, rt, len = taskQueue.length; i < len; ++i){
	            t = taskQueue[i];
	            itime = now - t.taskRunTime;
	            if(t.interval <= itime){
	                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
	                t.taskRunTime = now;
	                if(rt === false || t.taskRunCount === t.repeat){
	                    removeTask(t);
	                    return;
	                }
	            }
	            if(t.duration && t.duration <= (now - t.taskStartTime)){
	                removeTask(t);
	            }
	        }
	    };

    	// private
    	var removeTask = function(t){
	        removeQueue.push(t);
	        if(t.onStop){
	            t.onStop.apply(t.scope || t);
	        }
	    };

        //private
        var startThread=function(){
            if(!running){
                running=true;
                threadId = setInterval(runTasks, options.interval);
            }
        };
    	// private
    	var stopThread = function(){
	        running = false;
	        clearInterval(threadId);
	        threadId = 0;
	    };

        this.start = function(task){
            taskQueue.push(task);
            task.taskStartTime = new Date().getTime();
            task.taskRunTime = 0;
            task.taskRunCount = 0;
            startThread();
            return task;
        };
        this.stop = function(task){
            removeTask(task);
            return task;
        };
        this.stopAll = function(){
            stopThread();
            for(var i = 0, len = taskQueue.length; i < len; i++){
                if(taskQueue[i].onStop){
                    taskQueue[i].onStop();
                }
            }
            taskQueue = [];
            removeQueue = [];
        };
    };

    /* 异步锁
    Lock(syncObj,{
        scope:null,
        args:null,
        region:funcion(){
            
        }
    });
    */
    var Lock=function(syncObj,codeRegion){
        var context=this;
        var doLock=function(){
            if(!syncObj["_sync_"]){
                syncObj["_sync_"]=true;

                if(isFunction(codeRegion)){
                    codeRegion.call(context);
                }else{
                    codeRegion.region.apply(codeRegion.scope||context,codeRegion.args);
                }
                
                delete syncObj["_sync_"];
            }else{
                setTimeout(arguments.callee,20);
            }
        };

        if(!syncObj["_sync_"]){
            doLock();
        }else{
            setTimeout(doLock,20);
        }
    };

    /*var Task={
        interval:1000,
        scope:null,
        args:null,
        run:function(){
            ...
        },
        stop:function(){
            ...
        }
    };*/
    /* 工作线程池 */
    var ThreadPool=function(o){
        var defaults = {
                max:10
            },
            taskCount = 0,
            readyQueue = [],runningQueue = [],threadId,
            syncObj={},
            options = extend({}, defaults, o);

        //private
        var runTask=function(task){
            var taskRunner=function(){
                task.run.apply(task.scope||task,task.args);
                taskComplete(task);
            };
            var isRunned=false;
            Lock(syncObj,function(){
                if(runningQueue.length<options.max){
                    var intervalId=setTimeout(taskRunner,task.interval||100);
                    runningQueue.push({intervalId:intervalId,task:task});
                    isRunned = true;
                }
            });

            return isRunned;
        };
        //private
        var taskComplete=function(task){
            Lock(syncObj,function(){
                var queue=$.grep(runningQueue, function (i) { if(i.task==task) taskCount--; return i.task != task; });
                runningQueue=queue;
            });
        };
        //private
        var startThread=function(){
            var doTask=function(){
                for(var i=readyQueue.length-1;i>=0;i--){
                    var t,item=readyQueue.pop();
                    for(var k in item){
                        t=item[k];
                    }
                    if(!runTask(t)){
                        var thread={},id=zhiziyun.guid();
                        thread[id]=t;
                        readyQueue.push(thread);
                    }
                }
            };
            threadId=setInterval(doTask,200);
        };
        //private
        var stopThread=function(){
            if(threadId){
                clearInterval(threadId);
                threadId=undefined;
            }
        };

        //public
        this.start=function(){
            startThread();
            return this;
        };
        //public
        this.stop=function(){
            stopThread();
            Lock(syncObj,function(){
                if(runningQueue.length){
                    while(runningQueue.length>0){
                        var t=runningQueue.pop();
                        clearTimeout(t.intervalId);
                        t.task.stop && t.task.stop();
                        readyQueue.push(t.task);
                    }
                }
            });
            return this;
        };
        //public
        this.queueTask=function(task){
//            readyQueue.push(task);
            var thread={},id=zhiziyun.guid();
            thread[id]=task;
            readyQueue.push(thread);
            taskCount++;
            return id;
        };
        //public
        this.dequeueTask=function(id){
            if(readyQueue.length){
                var task= readyQueue[id];
                if(task){
                    delete readyQueue[id];
                    taskCount--;
                    return task;
                }
            }
            return null;
        };
        //public
        this.createThread=function(handler){
            var task={interval:100};
            if(isFunction(handler)){
                task.run=handler;
            }else{
                task=handler;
            }
            var id=this.queueTask(task);
            return {id:id,task:task};
        };
    };
    
    /* 模板类
     * var temp=new Template({html:'<a class="ui-inputitem l-btn"><span class="l-btn-left"><span class="l-btn-text {iconCls}">{text}</span></span></a>'});
     * var htmlResult=temp.apply({iconCls:"icon-ok",text:"test"});
     * console.log(htmlResult);//<a class="ui-inputitem l-btn"><span class="l-btn-left"><span class="l-btn-text icon-ok">test</span></span></a>
     */
    var Template = DefineClass({
        init:function(options) {
            var self = this,buf = [],
                html=options.html||"",compiled=options.compiled||true;

            if (isArray(html)) {
                html = html.join("");
            }
            self.html = html;
            self._re = /\{([\w-]+)\}/g;
            if (self.compiled=compiled) {
                self.compile();
            }
        },
        compile : function() {
            var self = this,sep = ",";

            function fn(m, name) {
                name = "values['" + name + "']";
                return "'" + sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
            };

            eval("this.compiled = function(values){ return " + "['" +
                self.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this._re, fn) +
                "'].join('');};");
            return self;
        },
        apply:function(values) {
            var self=this;
            return self.compiled ?
        		self.compiled(values) :
				self.html.replace(self._re, function(m, name){
		        	return values[name] !== undefined ? values[name] : "";
		        });
        }
    });

    /* Cookie类 */
    var Cookie=DefineClass({
        init:function(options){
            var self=this;
            self.options = $.extend({},self.options, options);

            if (typeof self.options.expires === 'number') {
                var days = self.options.expires, t = self.expires = new Date();
                t.setDate(t.getDate() + days);
            }
        },
        options:{
            expires:1,
            path:undefined,
            domain:undefined,
            secure:false,
            raw:false
        },
        set:function(key,value){
            var options=this.options,expires=this.expires;
            
            if (value === null || value === undefined) {
                expires = new Date();
                expires.setDate(expires.getDate() -1);
            }
            
            value = String(value);

            (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
            
            return this;
        },
        get:function(key){
            var options=this.options;

            var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

            var pairs = document.cookie.split('; ');
            for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
                if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
            }
            return null;
        }
    });
    
    extend(zhiziyun,{
        DefineClass:DefineClass,
        Base:Base,
        Observable:Observable,
        Mediator:Mediator,
        ThreadPool:ThreadPool,
        TaskManager:TaskManager,
        Template:Template,
        Cookie:Cookie,
        DelayTaskManager:DelayTaskManager,
        using:using,
        guid: function() {
            var id = "", i, random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        },
        ui:{}
    });
    extend(zhiziyun.ui,{
        Widget:Widget
    })
})(jQuery);