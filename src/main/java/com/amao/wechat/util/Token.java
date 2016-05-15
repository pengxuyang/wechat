package com.amao.wechat.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


/**
 * @author pxy
 * 获取Spring容器中的service bean
 */
public  class Token {

        private static ConcurrentHashMap<String,Object> tokenMap ;
        public static String apiUrl = "https://api.weixin.qq.com/cgi-bin/token";
        public static String grant_type = "client_credential";
        public static String appId ="wx3f569c5ced5933fd";
        public static String secret = "4f3e07a4565fbc89a937a97f2983feba";
        //public static String accessToken="4f3e07a4565fbc89a937a97f2983feba";

        public static String returnToken() throws IOException {
            //todo 初始化判断，后期可交给spring init
            if(tokenMap == null){
                tokenMap = new ConcurrentHashMap<String,Object>();
                tokenMap.put("getTime",new Date());
                String param =  "grant_type="+Token.grant_type+"&" +
                        "appid="+Token.appId+"&"+
                        "secret="+Token.secret;
                String result = SendRequestUtil.sendGet(Token.apiUrl,param);
                Map<String,Object> map = JsonUtil.jsonToMap(result);
                tokenMap.put("token",map.get("access_token"));
            }else{
                //如果超时则重新获取
                Date tokenTime = (Date) tokenMap.get("getTime");
                Date nowDate = new Date();
                //设置间隔为110分钟 todo 后期放入配置文件中
                int interval = 110*60*1000;
                if(tokenTime.getTime()+interval <= nowDate.getTime() ){
                    String param =  "grant_type="+Token.grant_type+"&" +
                            "appid="+Token.appId+"&"+
                            "secret="+Token.secret;
                    String result = SendRequestUtil.sendGet(Token.apiUrl,param);
                    Map<String,Object> map = JsonUtil.jsonToMap(result);
                    tokenMap.put("getTime",new Date());
                    tokenMap.put("token", map.get("access_token"));
                }
            }
            return (String) tokenMap.get("token");
        }

    }


