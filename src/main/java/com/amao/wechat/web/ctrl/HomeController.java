package com.amao.wechat.web.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 *
 * Created by Amao on 2015/12/15 0015.
 */
@Controller
@RequestMapping("")
public class HomeController {
    @RequestMapping("/")
    public String homepage() {
        return "redirect:/panel/index";
    }

    @RequestMapping("/panel/index")
    public String panel() {
        return "panel/index";
    }
}
