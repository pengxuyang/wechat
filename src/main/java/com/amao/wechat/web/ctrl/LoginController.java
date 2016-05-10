/*
package com.amao.ad2.web.ctrl;

import com.amao.ad2.core.UserService;
import com.amao.ad2.model.User;
import com.amao.ad2.util.Hash;
import com.amao.ad2.web.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

*/
/**
 * Created by Amao on 2015/12/15 0015.
 *//*

@Controller
@RequestMapping("")
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String doGet() {
        return "login";
    }

    @RequestMapping(value = "login" ,method = RequestMethod.POST)
    @ResponseBody
    public String doPost(User user,HttpServletRequest request ){
        String result = "fail";
        User userRes = userService.checkedUser(user);
        if(userRes != null){
            userRes.setPassword("");
            request.getSession().setAttribute(Constants.SESSION_LOGIN_ATTRIBUTE, userRes);
            result = "succ";
        }
        return result;
    }

    @RequestMapping(value = "logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/login";
    }
}
*/
