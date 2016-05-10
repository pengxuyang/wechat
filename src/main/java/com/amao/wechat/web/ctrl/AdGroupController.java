package com.amao.wechat.web.ctrl;

import com.amao.wechat.db.AdGroupMapper;
import com.amao.wechat.db.MaterialMapper;
import com.amao.wechat.db.TargetMapper;
import com.amao.wechat.model.*;
import com.amao.wechat.web.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by pxy on 2016/1/6.
 */
@Controller
@RequestMapping(value = "/panel/adg")
public class AdGroupController {

    @Autowired
    private AdGroupMapper adGroupMapper;
    @Autowired
    private MaterialMapper materialMapper;
    @Autowired
    private TargetMapper targetMapper;

    @RequestMapping(value = "index")
    public String index(HttpServletRequest request,Model model){
        User user = (User) request.getSession().getAttribute(Constants.SESSION_LOGIN_ATTRIBUTE);
        //基本信息
        AdGroupExample adGroupExample = new AdGroupExample();
        AdGroupExample.Criteria criteria = adGroupExample.createCriteria();
        criteria.andUserIdEqualTo(user.getId());
        List<AdGroup> groups = adGroupMapper.selectByExample(adGroupExample);
        if(groups.size()>0){
            model.addAttribute("ad",groups.get(0));
        }else{
            return "ad/index";
        }
        //素材信息
        MaterialExample materialExample = new MaterialExample();
        MaterialExample.Criteria criteriaMat = materialExample.createCriteria();
        criteriaMat.andUserIdEqualTo(user.getId());
        List<Material> materials = materialMapper.selectByExample(materialExample);
        model.addAttribute("materials", materials);
        //连接信息
        TargetExample targetExample = new TargetExample();
        TargetExample.Criteria criteriaTar = targetExample.createCriteria();
        criteriaTar.andUserIdEqualTo(user.getId());
        List<Target> targets = targetMapper.selectByExample(targetExample);
        model.addAttribute("targets",targets);
        return "ad/show";
    }

    @RequestMapping(value = "add")
    @Transactional
    @ResponseBody
    public String saveAd(HttpServletRequest request,String target,String material,
                         AdGroup adGroup,String launchTimeStartbak,String launchTimeEndbak){

        User user = (User) request.getSession().getAttribute(Constants.SESSION_LOGIN_ATTRIBUTE);
        String[] targetids  =    target.split(",");
        String[] materialIds  =    material.split(",");
        Date launchTimeStart =null;
        Date launchTimeEnd = null;
        try {
            launchTimeStart = parse(launchTimeStartbak);
            launchTimeEnd = parse(launchTimeEndbak);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        adGroup.setUserId(user.getId());
        adGroup.setLaunchTimeStart(launchTimeStart);
        adGroup.setLaunchTimeEnd(launchTimeEnd);
        //执行adGroup的插入操作
        adGroupMapper.insertSelective(adGroup);
        //
        for (String materialId : materialIds) {
            if( materialId == null || materialId.length() == 0) continue;
            Material materialUpt = new Material();
            materialUpt.setId(Integer.valueOf(materialId));
            materialUpt.setUserId(user.getId());
            materialMapper.updateByPrimaryKeySelective(materialUpt);
        }
        for (String targetid : targetids) {
            if( targetid == null || targetid.length() == 0) continue;
            Target targetUpt = new Target();
            targetUpt.setId(Integer.valueOf(targetid));
            targetUpt.setUserId(user.getId());
            targetMapper.updateByPrimaryKeySelective(targetUpt);
        }
        return "succ";
    }



    @RequestMapping(value = "update")
    @Transactional
    @ResponseBody
    public String update(HttpServletRequest request,String target,String material,
                         AdGroup adGroup,String launchTimeStartbak,String launchTimeEndbak){

        User user = (User) request.getSession().getAttribute(Constants.SESSION_LOGIN_ATTRIBUTE);
        String[] targetids  =    target.split(",");
        String[] materialIds  =    material.split(",");
        Date launchTimeStart =null;
        Date launchTimeEnd = null;
        try {
            launchTimeStart = parse(launchTimeStartbak);
            launchTimeEnd = parse(launchTimeEndbak);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        adGroup.setUserId(user.getId());
        adGroup.setLaunchTimeStart(launchTimeStart);
        adGroup.setLaunchTimeEnd(launchTimeEnd);
        //执行adGroup的插入操作
        adGroupMapper.updateByPrimaryKeySelective(adGroup);
        //
        for (String materialId : materialIds) {
            if( materialId == null || materialId.length() == 0) continue;
            Material materialUpt = new Material();
            materialUpt.setId(Integer.valueOf(materialId));
            materialUpt.setUserId(user.getId());
            materialMapper.updateByPrimaryKeySelective(materialUpt);
        }
        for (String targetid : targetids) {
            if( targetid == null || targetid.length() == 0) continue;
            Target targetUpt = new Target();
            targetUpt.setId(Integer.valueOf(targetid));
            targetUpt.setUserId(user.getId());
            targetMapper.updateByPrimaryKeySelective(targetUpt);
        }
        return "succ";
    }

    @RequestMapping(value = "delM")
    @ResponseBody
    public String delM(Integer id){
        materialMapper.deleteByPrimaryKey(id);
        return "succ";
    }

    @RequestMapping(value = "delT")
    @ResponseBody
    public  String delT(Integer id){
        targetMapper.deleteByPrimaryKey(id);
        return "succ";
    }

    public Date parse(String ds) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        return  sdf.parse(ds);
    }



}
