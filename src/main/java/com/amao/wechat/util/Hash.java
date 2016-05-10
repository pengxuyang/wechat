/*
package com.amao.ad2.util;

import org.apache.commons.codec.digest.DigestUtils;

import java.nio.charset.Charset;
import java.security.MessageDigest;

*/
/**
 * Created by Amao on 7/18/2015.
 *//*

public class Hash {
    public static String md5(String src) {
        MessageDigest md = DigestUtils.getDigest("MD5");
        md.update(src.getBytes(Charset.forName("utf-8")));
        StringBuilder buf=new StringBuilder();
        for (byte b : md.digest()) {
            buf.append(String.format("%02x", b & 0xff) );
        }
        return buf.toString();
    }
}
*/
