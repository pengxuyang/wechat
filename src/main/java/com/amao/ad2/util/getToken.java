package com.amao.ad2.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.text.MessageFormat;


/**
 * Created by pxy on 2016/4/22.
 */
public class getToken {


        public static String accessToken="";

        public static void returnToken(String apiUrl,String appId, String secret )
        {
            HttpClient client = new DefaultHttpClient();
            String tokenurl=MessageFormat.format(apiUrl+"?corpid="+appId+"&corpsecret="+secret, apiUrl,appId,secret);
            HttpGet httpget = new HttpGet(tokenurl);
            String result = null;
            try
            {
                HttpResponse res = client.execute(httpget);
                String responseContent = null; // 响应内容
                HttpEntity entity = res.getEntity();
                responseContent = EntityUtils.toString(entity, "UTF-8");
                JsonParser jsonparer = new JsonParser();// 初始化解析json格式的对象
                JsonObject json = jsonparer.parse(responseContent)
                        .getAsJsonObject();
                // 将json字符串转换为json对象
                if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
                {
                    if (json.get("errcode") != null)
                    {// 错误时微信会返回错误码等信息，{"errcode":40013,"errmsg":"invalid appid"}
                    }
                    else
                    {// 正常情况下{"access_token":"ACCESS_TOKEN","expires_in":7200}
                        result = json.get("access_token").getAsString();
                    }
                }
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
            finally
            {
                //释放连接
                httpget.releaseConnection();
                // 关闭连接 ,释放资源
                client.getConnectionManager().shutdown();
            }

            accessToken=result;
        }

    }


