package com.amao.wechat.web.ctrl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;




@Controller
@RequestMapping("/user")
public class UserController {
  /*  @Autowired
    private UserService userService;
    @Autowired
    private UserGroupMapper userGroupMapper;
    @Autowired
    private UserMapper userMapper;
*/
    private static String token = "rSiycIMzp_Pg8m-Uc8tm_Q2E0SZj1v6wGqZYEbdmdABj5d9c1WWIP64C-FB5GyoSHXoDAoTrpabn0ldiOrPd1wYc2MwNMBZaa2c38h7xsD2v55TVmRwrk2kBk2zIii7mRZEbACADLQ";


    @RequestMapping("index")
    public String userpage(){

       // return "user/list";
      return "/user/list";
    }

    /*@RequestMapping("ajax")
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
    }*/


}
