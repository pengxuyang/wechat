package com.amao.ad2.web;

import com.amao.ad2.model.User;

import javax.servlet.http.HttpServletRequest;

/**
 *session工具
 * Created by pxy on 2015/8/6.
 */
public class SessionUtil {
//    获取session中的用户信息
    public static User getUser(HttpServletRequest httpServletRequest){
       return (User) httpServletRequest.getSession().getAttribute(Constants.SESSION_LOGIN_ATTRIBUTE);
    }

    public static void setUser(HttpServletRequest request, User user) {
        request.getSession().setAttribute(Constants.SESSION_LOGIN_ATTRIBUTE, user);
    }
}
