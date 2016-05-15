package com.amao.wechat.util;

import com.alibaba.fastjson.JSON;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pxy on 2016/5/13.
 */
public class WechatUtil {

    //根据用户openID获取用户信息
    public static String getUserInfo(String FromUserName) throws IOException {
        String token = Token.returnToken();
        //通过获取的openId 获取用户的具体信息
        String param = "access_token="+token+
                "&openid="+FromUserName+
                "&lang=zh_CN";
        return  SendRequestUtil.sendGet(WechatConstants.USER_INFO_URL,param);
    }

    //发送普通消息
    public static String sendMsg(String FromUserName,String text) throws IOException {
        Map<String ,Object> para = new HashMap<>();
        para.put("touser",FromUserName);
        para.put("msgtype","text");

        Map<String,Object> content = new HashMap<>();
        content.put("content",text);
        para.put("text",content);
        String json =  JSON.toJSONString(para);
        String result =  SendRequestUtil.sendPost(WechatConstants.SEND_MSG_URL+Token.returnToken(),json);
        return result;
    }
}
