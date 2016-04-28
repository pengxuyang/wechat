package com.amao.ad2.web.ctrl;

import com.alibaba.fastjson.JSON;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pxy on 2016/4/28.
 */
public class Test2 {
    private final static String sendUrl = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";
    public static void main(String[] args) {
        /*String token ="cGgstHy98yfcI6R-rUIMTrv_mPcZtGDUgEkL_mhJKoOVR12R1dVoUcctl8eqSBZwuOhofc2eKyP59Ve_A1jkwJoESY8548yrMpI0EAjHjkoLJAiABAXVM";
        String url =sendUrl+token;
        Map<String ,Object> para = new HashMap<>();
        para.put("touser","osKOSwy4mtrqtLE8J2RJ5uOxqIFo");
        para.put("msgtype","text");
        Map<String,Object> content = new HashMap<>();
        content.put("content","你好:"+"osKOSwy4mtrqtLE8J2RJ5uOxqIFo");
        para.put("text",content);
        String json =  JSON.toJSONString(para);
        System.out.println(json);
        String result =  sendPost(url,json);
        System.out.println(result);*/
        //System.out.println(new Date());
        String xml ="<xml><ToUserName><![CDATA[gh_ed7db34d82eb]]></ToUserName>" +
                "<FromUserName><![CDATA[osKOSwy4mtrqtLE8J2RJ5uOxqIFo]]></FromUserName>" +
                "<CreateTime>1461855966</CreateTime>" +
                "<MsgType><![CDATA[event]]></MsgType>" +
                "<Event><![CDATA[subscribe]]></Event>" +
                "<EventKey><![CDATA[]]></EventKey></xml>\n";
        parseXml01(xml);
    }

    public static void parseXml01(String xml){
        try{
            //将src下面的xml转换为输入流
           // InputStream inputStream = new FileInputStream(new File("D:/project/dynamicWeb/src/resource/module01.xml"));
            //InputStream inputStream = this.getClass().getResourceAsStream("/module01.xml");//也可以根据类的编译文件相对路径去找xml
            //创建SAXReader读取器，专门用于读取xml
            SAXReader saxReader = new SAXReader();
            //根据saxReader的read重写方法可知，既可以通过inputStream输入流来读取，也可以通过file对象来读取
            //Document document = saxReader.read(inputStream);
            //Document document = saxReader.read(new File("D:/project/dynamicWeb/src/resource/module01.xml"));//必须指定文件的绝对路径
            //另外还可以使用DocumentHelper提供的xml转换器也是可以的。
            //<?xml version="1.0" encoding="UTF-8"?><modules id="123"><module> 这个是module标签的文本信息</module></modules>
            Document document = DocumentHelper.parseText(xml);

            //获取根节点对象
            //未注为关注
            Element rootElement = document.getRootElement();
            System.out.println("根节点名称：" + rootElement.getName());//获取节点的名称
            String toUserName = rootElement.element("ToUserName").getTextTrim();
            String FromUserName = rootElement.element("FromUserName").getTextTrim();
            String CreateTime = rootElement.element("CreateTime").getTextTrim();
            String MsgType = rootElement.element("MsgType").getTextTrim();
            String Event = rootElement.element("Event").getTextTrim();
            //扫描二维码
            String EventKey = rootElement.element("EventKey").getTextTrim();

            String Ticket = rootElement.element("Ticket").getText();
            //


            //String MsgType = rootElement.element("MsgType").getTextTrim();


            //System.out.println("根节点有多少属性：" + rootElement.attributeCount());//获取节点属性数目
            //System.out.println("根节点id属性的值：" + rootElement.attributeValue("ToUserName"));//获取节点的属性id的值
            //System.out.println("根节点内文本：" + rootElement.getText());//如果元素有子节点则返回空字符串，否则返回节点内的文本
            //rootElement.getText() 之所以会换行是因为 标签与标签之间使用了tab键和换行符布局，这个也算是文本所以显示出来换行的效果。
            //System.out.println("根节点内文本(1)：" + rootElement.getTextTrim());//去掉的是标签与标签之间的tab键和换行符等等，不是内容前后的空格
            //System.out.println("根节点子节点文本内容：" + rootElement.getStringValue()); //返回当前节点递归所有子节点的文本信息。

            //获取子节点
            //Element element = rootElement.element("module");
            //if(element != null){
            //    System.out.println("子节点的文本：" + element.getText());//因为子节点和根节点都是Element对象所以它们的操作方式都是相同的
            //}
            //但是有些情况xml比较复杂，规范不统一，某个节点不存在直接java.lang.NullPointerException，所以获取到element对象之后要先判断一下是否为空

            //rootElement.setName("root");//支持修改节点名称
            //System.out.println("根节点修改之后的名称：" + rootElement.getName());
            //rootElement.setText("text"); //同样修改标签内的文本也一样
            //System.out.println("根节点修改之后的文本：" + rootElement.getText());
        } catch (Exception e) {
            e.printStackTrace();
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
