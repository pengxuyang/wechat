package com.amao.wechat.web.ctrl;

import com.alibaba.fastjson.JSON;
import com.amao.wechat.util.SendRequestUtil;
import com.amao.wechat.util.Token;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by pxy on 2016/4/28.
 */
public class Test {
    public static void main(String[] args) {
        String param   =  "grant_type="+Token.grant_type+"&" +
                        "appid="+Token.appId+"&"+
                        "secret="+Token.secret;

        //System.out.println(SendRequestUtil.sendGet(Token.apiUrl,param));

        Map<String ,Object> para = new HashMap<>();
        para.put("touser","osKOSw8ALIlicPmgUaILCycflPgg");
        para.put("msgtype","text");
        Map<String,Object> content = new HashMap<>();
        content.put("content","老赵呵呵");
        para.put("text",content);
        String json =  JSON.toJSONString(para);
        System.out.println(json);
        String token = "LhhZt-KVjKuHkONPsfiDoI2il6c6r4dE9ayMgHAQZZALZGwh8pfinPSDY8OgPZX-btX2J67dYIRO2Oqxc1cSyWze02JBOPMqxwMpQi9sX08iCDVF2T_0pPcaet9e-X5gQSMjADAYAU";


        String result = SendRequestUtil.sendPost("https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token="+token,json);
        System.out.println(result);
        /*Date date = new Date();
        System.out.println(date);
        long time  = date.getTime();
        System.out.println(time);
        Date date1 = new Date();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        date1.setTime(time);

        System.out.println(date1);

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/



        //System.out.println(new Date());
    }
}
