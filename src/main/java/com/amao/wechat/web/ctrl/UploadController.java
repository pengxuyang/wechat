package com.amao.wechat.web.ctrl;

import com.amao.wechat.db.MaterialMapper;
import com.amao.wechat.db.TargetMapper;
import com.amao.wechat.model.Material;
import com.amao.wechat.model.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.*;

@Controller
@RequestMapping("/file")
public class UploadController {
    @Autowired
    private MaterialMapper materialMapper;
    @Autowired
    private TargetMapper targetMapper;

    @RequestMapping("/upload")
    @ResponseBody
    public Map upload2(HttpServletRequest request) throws IllegalStateException, IOException {
        Map resultMap = new HashMap<String,Object>();
        resultMap.put("res", "fail");
        List<String> list = new ArrayList<String>();
        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if (multipartResolver.isMultipart(request)) {
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            //取得request中的所有文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while (iter.hasNext()) {
                //记录上传过程起始时的时间，用来计算上传时间
                int pre = (int) System.currentTimeMillis();
                //取得上传文件
                MultipartFile file = multiRequest.getFile(iter.next());
                if (file != null) {
                    //取得当前上传文件的文件名称
                    String myFileName = file.getOriginalFilename();
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在
                    if (myFileName.trim().length() > 0 ) {
                        //获取当前系统路径  项目路径
                        String realPath = request.getSession().getServletContext().getRealPath("/upload/demoUpload/");
                        //String fileId =  UUID.randomUUID().toString();
                        //String path = String.valueOf(year) + month + day
                        //        + "/" + fileId + "." + fileType;
                        String pathAll = realPath+"/"+ file.getOriginalFilename();
                        //String pathAll = realPath + path;
                        File distFile = new File(pathAll);
                        if (!distFile.getParentFile().exists())
                            distFile.getParentFile().mkdirs();
                        file.transferTo(distFile);

                        BufferedOutputStream bos = null;  //新建一个输出流
                        byte[] bfile = new byte[500*1024];
                       /* FileOutputStream fos  = new FileOutputStream(distFile);
                        bos = new BufferedOutputStream(fos);
                        bos.write(bfile);

                        bos.flush();
                        fos.close();
                        bos.close();*/
                        Material material = new Material();
                        material.setContent(bfile);
                        material.setName(myFileName);
                        materialMapper.insertSelective(material);
                        int id = material.getId();

                        list.add(String.valueOf(id));
                        System.out.println(pathAll);
                        //重命名上传后的文件名
                        //String fileName = "demoUpload" + file.getOriginalFilename();
                        //定义上传路径
                        //String path = "H:/" + fileName;
                        //File localFile = new File(path);
                        //file.transferTo(localFile);
                    }
                }
                //记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();
                System.out.println(finaltime - pre);
            }
        }
        if(list.size()>0){
            resultMap.put("res","succ");
            resultMap.put("list",list);
        }
        return resultMap;
    }


    @RequestMapping("/uploadurl")
    @ResponseBody
    public Map uploadurl(HttpServletRequest request) throws IllegalStateException, IOException {
        Map resultMap = new HashMap<String,Object>();
        resultMap.put("res", "fail");
        List<String> list = new ArrayList<String>();
        request.setCharacterEncoding("UTF-8");//你的编码格式
        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if (multipartResolver.isMultipart(request)) {
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            //取得request中的所有文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while (iter.hasNext()) {
                //记录上传过程起始时的时间，用来计算上传时间
                int pre = (int) System.currentTimeMillis();
                //取得上传文件
                MultipartFile file = multiRequest.getFile(iter.next());
                if (file != null) {
                    //取得当前上传文件的文件名称
                    String myFileName = file.getOriginalFilename();
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在
                    if (myFileName.trim().length() > 0 ) {
                        //获取当前系统路径  项目路径
                        String realPath = request.getSession().getServletContext().getRealPath("/upload/demoUpload");
                        //String fileId =  UUID.randomUUID().toString();
                        //String path = String.valueOf(year) + month + day
                        //        + "/" + fileId + "." + fileType;
                        String pathAll = realPath + file.getOriginalFilename();
                        //String pathAll = realPath + path;
                        File distFile = new File(pathAll);
                        if (!distFile.getParentFile().exists())
                            distFile.getParentFile().mkdirs();
                        file.transferTo(distFile);
                        //String imgPath = request.getContextPath()+"/public/upload/"+filePath+path; //
                        String url =  readTxtFile(pathAll);

                        //读取的内容 在target 新建一条记录
                        Target target = new Target();
                        target.setTargetUrl(url);
                        int res = targetMapper.insertSelective(target);
                        int id = target.getId();
                        list.add(String.valueOf(id));
                        //list.add(pathAll);
                        System.out.println("文件路径为:"+pathAll);
                        //重命名上传后的文件名
                        //String fileName = "demoUpload" + file.getOriginalFilename();
                        //定义上传路径
                        //String path = "H:/" + fileName;
                        //File localFile = new File(path);
                        //file.transferTo(localFile);
                    }
                }
                //记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();
                System.out.println(finaltime - pre);
            }
        }
        if(list.size()>0){
            resultMap.put("res","succ");
            resultMap.put("list",list);
        }
        return resultMap;
    }


    @RequestMapping("/toUpload"	)
    public String toUpload() {
        return "/upload";
    }

    /**
     * 功能：Java读取txt文件的内容
     * 步骤：1：先获得文件句柄
     * 2：获得文件句柄当做是输入一个字节码流，需要对这个输入流进行读取
     * 3：读取到输入流后，需要读取生成字节流
     * 4：一行一行的输出。readline()。
     * 备注：需要考虑的是异常情况
     * @param filePath
     */
    public static String readTxtFile(String filePath){
        try {
            //String encoding="utf-8";
            File file=new File(filePath);
            if(file.isFile() && file.exists()){ //判断文件是否存在
                InputStreamReader read = new InputStreamReader(
                        new FileInputStream(file));//考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);
                String text = "";
                String lineTxt = "";
                while((lineTxt = bufferedReader.readLine()) != null){

                    text+=lineTxt;
                    System.out.println(lineTxt);
                }
                read.close();
                return text;
            }else{
                System.out.println("找不到指定的文件");
                return "找不到指定的文件";
            }
        } catch (Exception e) {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
            return "读取文件内容出错";
        }
    }

    /**
     * 判断文件的编码格式
     *
     * @param fileName
     *            :file
     * @return 文件编码格式
     * @throws Exception
     */
    public static String codeString(String fileName) throws Exception {
        BufferedInputStream bin = new BufferedInputStream(new FileInputStream(
                fileName));
        int p = (bin.read() << 8) + bin.read();
        String code = null;

        switch (p) {
            case 0xefbb:
                code = "UTF-8";
                break;
            case 0xfffe:
                code = "Unicode";
                break;
            case 0xfeff:
                code = "UTF-16BE";
                break;
            default:
                code = "GBK";
        }

        return code;
    }

}
