package com.amao.wechat.web.ctrl;

import com.alibaba.fastjson.JSON;
import com.amao.wechat.util.JsonUtil;
import com.amao.wechat.util.SendRequestUtil;
import com.amao.wechat.util.Token;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pxy on 2016/4/27.
 */
@Controller
@RequestMapping(value = "wechat")
public class WechatController {
    private final static String sendUrl = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";

    private final static String getUserUrl = "https://api.weixin.qq.com/cgi-bin/user/info";

    @RequestMapping("register")
    public String login(HttpServletRequest request){
        request.getParameter("");

        return "register";
    }

    @RequestMapping(value = "receive")
    @ResponseBody
    public String main(HttpServletRequest request){
        //------------接收物流方请求的XML数据-----------------------
        //获取request接收到的流长度，因为这里如果是使用Struts2框架，当发送方把Content-type
        //设置成application/x-www-form-urlencoded会导致传送过来的数据流被过滤掉
        //如果这里len不为-1，而下面的br又为空的话，说明被过滤掉了。
        int len = request.getContentLength();
        System.out.println("数据流长度:" +len);
        //获取HTTP请求的输入流
        InputStream is = null;
        StringBuffer sb = new StringBuffer();
        try {
            is = request.getInputStream();
            //已HTTP请求输入流建立一个BufferedReader对象
            BufferedReader br = new BufferedReader(new InputStreamReader(is,"UTF-8"));
            //BufferedReader br = request.getReader();

            //读取HTTP请求内容
            String buffer = null;
            while ((buffer = br.readLine()) != null) {
                //在页面中显示读取到的请求参数
                sb.append(buffer);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("sb为:"+sb);
        String xml = sb.toString();
        if(xml != null && !"".equals(xml)){
            Document document = null;
            try {
                document = DocumentHelper.parseText(xml);
            } catch (DocumentException e) {
                e.printStackTrace();
            }

            //获取根节点对象
            //未注为关注
            Element rootElement = document.getRootElement();
            System.out.println("根节点名称：" + rootElement.getName());//获取节点的名称
            String toUserName = rootElement.element("ToUserName").getTextTrim();
            System.out.println("toUserName:"+toUserName);
            String FromUserName = rootElement.element("FromUserName").getTextTrim();
            System.out.println("FromUserName:"+FromUserName);
            String CreateTime = rootElement.element("CreateTime").getTextTrim();
           /* Date date = new Date();
            date.setTime(Long.getLong(CreateTime));*/
            System.out.println("CreateTime:"+CreateTime);
            String MsgType = rootElement.element("MsgType").getTextTrim();
            System.out.println("MsgType:"+MsgType);
            String Event = rootElement.element("Event").getTextTrim();
            System.out.println("Event:"+Event);
            //扫描二维码
            String EventKey = rootElement.element("EventKey").getTextTrim();
            Element element = rootElement.element("Ticket");
            String Ticket = null;
            if(element != null){
               Ticket = rootElement.element("Ticket").getTextTrim();
                System.out.println("扫描二维码");
            }
            String token = null;
            try {
                token = Token.returnToken();
            } catch (IOException e) {
                e.printStackTrace();
            }

            //通过获取的openId 获取用户的具体信息
            String param = "access_token="+token+
                           "&openid="+FromUserName+
                           "&lang=zh_CN";
            String userJson = SendRequestUtil.sendGet(getUserUrl,param);
            Map<String,Object> userInfoMap = null;
            try {
                userInfoMap =   JsonUtil.jsonToMap(userJson);
            } catch (IOException e) {
                e.printStackTrace();
            }


            String url =sendUrl+token;
            System.out.println(url);
            Map<String ,Object> para = new HashMap<>();
            para.put("touser",FromUserName);
            para.put("msgtype","text");



            Map<String,Object> content = new HashMap<>();
            String sex ="先生";
            if((userInfoMap.get("sex").toString().trim()).equals("1")){
                sex ="先生";
            }else{
                sex="女士";
            }
            content.put("content","你好:"+userInfoMap.get("nickname").toString()+sex+",地址:"
                                         +userInfoMap.get("country").toString()
                    +userInfoMap.get("province").toString()
                    +userInfoMap.get("city").toString()
            );
            para.put("text",content);
            String json =  JSON.toJSONString(para);
            System.out.println(json);
            String result =  sendPost(url,json);
            System.out.println(result);
            return "true";
        }else{
            //微信验证服务器
            String signature = request.getParameter("signature");
            String timestamp = request.getParameter("timestamp");
            String nonce = request.getParameter("nonce");
            String echostr = request.getParameter("echostr");
            System.out.println("signature:"+signature);
            System.out.println("timestamp:"+timestamp);
            System.out.println("nonce:"+nonce);
            System.out.println("echostr:"+echostr);
            //
            return echostr;
        }
    }


    /**
     * 向指定 URL 发送POST方法的请求
     *
     * @param url
     *            发送请求的 URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     */
    public static String sendPost(String url, String param) {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(param);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送 POST 请求出现异常！"+e);
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result;
    }
}
