/*
package com.amao.ad2.web.ctrl;

import com.amao.ad2.core.UserService;
import com.amao.ad2.db.UserGroupMapper;
import com.amao.ad2.db.UserMapper;
import com.amao.ad2.model.User;
import com.amao.ad2.model.UserExample;
import com.amao.ad2.model.UserGroup;
import com.amao.ad2.model.UserGroupExample;
import com.amao.ad2.util.Hash;
import com.amao.ad2.web.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

*/
/**
 * Created by pxy on 2016/1/2.
 *//*

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserGroupMapper userGroupMapper;
    @Autowired
    private UserMapper userMapper;
    */
/**
     * 跳转客户列表界面
     * @return
     *//*

    @RequestMapping("index")
    public String userpage(){
        return "user/list";
    }

    @RequestMapping("ajax")
    @ResponseBody
    public List<User> reloadData(HttpServletRequest request){
        User useradmin = (User) request.getSession().getAttribute(Constants.SESSION_LOGIN_ATTRIBUTE);
        return userService.getUser(useradmin.getId());
    }

    @RequestMapping("add")
    @ResponseBody
    @Transactional
    public String addUser(User user,HttpServletRequest request){
        User useradmin = (User) request.getSession().getAttribute(Constants.SESSION_LOGIN_ATTRIBUTE);
        user.setCreateTime(new Date());
        String pwd= user.getPassword();
        user.setPassword(Hash.md5(pwd));
        int res =  userService.addUser(user);
        UserGroup userGroup = new UserGroup();
        userGroup.setOwnerUserId(useradmin.getId());
        userGroup.setClientUserId(user.getId());
        userGroupMapper.insertSelective(userGroup);
        return String.valueOf(res) ;
    }
    @RequestMapping("del")
    @Transactional
    @ResponseBody
    public String delUser(Integer id){
        userMapper.deleteByPrimaryKey(id);

        UserGroupExample userGroupExample = new UserGroupExample();
        UserGroupExample.Criteria criteria = userGroupExample.createCriteria();
        criteria.andClientUserIdEqualTo(id);
        userGroupMapper.deleteByExample(userGroupExample);
        return "succ";
    }


    public String modUser(User user){
        return String.valueOf(userService.modUser(user));
    }


}
*/
