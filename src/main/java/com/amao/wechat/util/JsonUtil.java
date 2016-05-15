package com.amao.wechat.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.xpath.internal.axes.OneStepIterator;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pxy on 2016/5/11.
 */
public class JsonUtil {


    public static String mapToJson(Map<String,Object> map) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String jsonfromMap =  mapper.writeValueAsString(map);
        return jsonfromMap;
    }

    public static Map<String,Object> jsonToMap(String jsonStr) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map map =  mapper.readValue(jsonStr, Map.class);
        return map;
    }
}
