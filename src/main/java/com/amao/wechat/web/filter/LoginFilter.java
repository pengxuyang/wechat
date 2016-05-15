package com.amao.wechat.web.filter;


import com.amao.wechat.model.User;
import com.amao.wechat.web.SessionUtil;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *
 *
 * @author pxy
 * @since 2014/6/18*/


@WebFilter(filterName = "loginFilter", urlPatterns = {"/panel/*"})
public class LoginFilter implements Filter {
    private String contextPath = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        contextPath =  filterConfig.getServletContext().getContextPath();
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        User user = SessionUtil.getUser(req);
        if (user != null) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            HttpServletResponse resp = (HttpServletResponse) servletResponse;
            resp.sendRedirect(contextPath + "/login");
        }
    }

    @Override
    public void destroy() {

    }
}
