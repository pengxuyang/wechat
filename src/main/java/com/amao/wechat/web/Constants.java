package com.amao.wechat.web;

/**
 * Login related constants.
 *
 * @author Amao
 * @since 2015-8-6
 */
public class Constants {
    public static final String SESSION_LOGIN_ATTRIBUTE = "money_user_id";
    public static final String SESSION_SMS_ATTRIBUTE = "VERIFICATION_CODE";
    public static final String SESSION_SMS_TIME_ATTRIBUTE = "VERIFICATION_CODE_TIME";
    public static final String SESSION_WECHAT_INVEST_TTY_MONEY = "INVEST_TTY_MONEY";
    public static final String SESSION_WECHAT_INVEST_MONEY = "INVEST_MONEY";
    public static final int LOGIN_SUCCESS = 1;
    public static final int LOGIN_FAIL = 0;
    public static final String FIND_PWD_SMS = "FIND_PWD";
    public static final String FIND_TRADEPWD_SMS_SMS = "FIND_PWD";
    public static final String FIND_PWD_SMS_TIME = "FIND_PWD_TIME";
    public static final String FIND_TRADEPWD_SMS_TIME = "FIND_PWD_TIME";
    //找回登录密码的验证
    public static final String FIND_LOGIN_PWD_VERIFICATION = "FLPV";
    //找回交易密码的验证
    public static final String FIND_TRADE_PWD_VERIFICATION = "FTPV";
    //后台管理员
    public static final String SESSION_ADMIN_ATTRIBUTE = "admin_user_id";
    //业务部管理系统
    public static final String SESSION_BUSINESS_ATTRIBUTE = "BUSINESS_ID";

    //图形验证码的值
    public static final String CAPTCHATOKEN = "captchaToken";
    //微信的签名
    public static final String WECHAT_TICKET = "WECHAT_TICKET";
    //微信签名的过期时间
    public static final String WECHAT_APPID = "wx3954f9247dd1d180";
    public static final String WECHAT_APPID_NAME = "WECHAT_APPID";

    public static final String WECHAT_APPSECRET = "34ae2ccd9b494b114d2d72b977042112";
    public static final String WECHAT_APPSECRET_NAME = "WECHAT_APPSECRET";
    //微信配置随机字符串
    public static final String WECHAT_NONCESTR = "WECHAT_NONCESTR";
    //微信配置时间戳
    public static final String WECHAT_TIMESTAMP = "WECHAT_TIMESTAMP";
    public static final String WECHAT_ACCESS_TOKEN = "WECHAT_ACCESS_TOKEN";
    public static final String WECHAT_JSAPITICKET = "WECHAT_jsApiTicket";



}
