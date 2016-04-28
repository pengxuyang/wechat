/*
package com.amao.ad2.core;

import com.amao.ad2.db.UserGroupMapper;
import com.amao.ad2.db.UserMapper;
import com.amao.ad2.model.User;
import com.amao.ad2.model.UserExample;
import com.amao.ad2.model.UserGroup;
import com.amao.ad2.model.UserGroupExample;
import com.amao.ad2.util.Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

*/
/**
 * Created by pxy on 2016/1/2.
 *//*

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserGroupMapper userGroupMapper;

    public List<User> getUser(Integer id){
       //用户关系
       UserGroupExample userGroupExample = new UserGroupExample();
       UserGroupExample.Criteria criteria = userGroupExample.createCriteria();
       criteria.andOwnerUserIdEqualTo(id);
       List<UserGroup> userGroups = userGroupMapper.selectByExample(userGroupExample);
        List<User> users = new ArrayList<User>();
        for(UserGroup userGroup :userGroups){
            users.add(userMapper.selectByPrimaryKey(userGroup.getClientUserId()));
        }
       return users;
    }

    */
/**
     * 根据ID获取用户
     * @param id
     * @return
     *//*

    public User getUserById(Integer id){
        //UserExample userExample = new UserExample();
       return userMapper.selectByPrimaryKey(id);
    }

    */
/**
     * 判断用户帐号密码是否正确
     * @param user
     * @return
     *//*

    public User checkedUser(User user){
        String pwd = user.getPassword();
        String md5Pwd= Hash.md5(pwd);
//        System.out.println(md5Pwd);
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andMobilephoneEqualTo(user.getMobilephone());
        criteria.andPasswordEqualTo(md5Pwd);
        List<User> users = userMapper.selectByExample(userExample);
        User userRes = null;
        if(users.size() > 0){
            userRes = users.get(0);
        }
        return userRes;
    }

    public Integer addUser(User user){
        return  userMapper.insertSelective(user);
    }

    public Integer modUser(User user){
        return  userMapper.updateByPrimaryKeySelective(user);
    }
}
*/
