package com.{{companyName}}.common.util;


import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;


/**
 * json处理工具
 * 
 * @author jicexosl
 * 
 *         2014-5-5
 */
public final class JsonUtil
{

    private static final Logger LOG = LoggerFactory.getLogger(JsonUtil.class);


    private JsonUtil() {
    }

    /**
     * ObjectMapper 提供单例供全�?使用
     */

    private static class SingletonHolder
    {

        private static final ObjectMapper mapper;


        static {
            mapper = new ObjectMapper();
            // 设置日期对象的输出格�?
            mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINESE));
            // 设置输入时忽略在JSON字符串中存在但Java对象实际没有的属�?
            mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        }
    }


    private static ObjectMapper getMapper() {
        return SingletonHolder.mapper;
    }


    /**
     * 将对象转换为json字符�?
     * 
     * @param pojo
     * @return
     * @throws IOException
     */
    public static String toJsonString(Object pojo) {
        if (pojo == null) {
            return null;
        }
        try {
            return getMapper().writeValueAsString(pojo);
        } catch (IOException e) {
            LOG.error("pojo parse  json string error", e);
            return null;
        }
    }


    /**
     * 将字符串转换为json对象
     * 
     * @param input
     * @return
     * @throws IOException
     */
    public static JsonNode parseJson(String input) {
        if (input == null) {
            return null;
        }
        try {
            return getMapper().readTree(input);
        } catch (IOException e) {
            LOG.error("json processing error,input: " + input, e);
            return null;
        }
    }


    /**
     * 将inputStream 转换为json对象
     * 
     * @param in
     * @return
     * @throws IOException
     */
    public static JsonNode getJsonNodefromStream(InputStream in) {
        try {
            return getMapper().readTree(in);
        } catch (IOException e) {
            LOG.error("read file error", e);
            return null;
        }
    }


    /**
     * 将json字符串转换为java对象，只支持返回�?单对象（非集合类型）
     * 
     * @param jsonString
     * @param valueType
     * @return
     * @throws IOException
     */
    public static <T> T jsonToObject(String jsonString, Class<T> valueType) {
        if (StringUtils.hasText(jsonString)) {
            try {
                return getMapper().readValue(jsonString, valueType);
            } catch (IOException e) {
                LOG.error("json to object failed", e);
            }
        }
        return null;
    }


    /**
     * 将json字符串转为集合类�? List、Map�?
     * 
     * @param <T>
     * @param jsonStr
     *            json字符�?
     * @param collectionClass
     *            集合类型，例�? ArrayList.class
     * @param elementClasses
     *            集合内元素类型，例如 String.class
     */
    public static <T> T jsonToObject(String jsonStr, Class<?> collectionClass, Class<?>... elementClass) {
        if (!StringUtils.hasText(jsonStr)) {
            return null;
        }
        JavaType javaType = getMapper().getTypeFactory().constructParametrizedType(collectionClass, collectionClass, elementClass);
        try {
            return getMapper().readValue(jsonStr, javaType);
        } catch (IOException e) {
            LOG.error("json to object failed", e);
            return null;
        }
    }


    /**
     * 创建�?个空的json对象
     * 
     * @return
     */
    public static ObjectNode createObjectNode() {
        return getMapper().createObjectNode();
    }


    /**
     * 创建�?个空的json数组对象
     * 
     * @return
     */
    public static ArrayNode createArrayNode() {
        return getMapper().createArrayNode();
    }


    public static <T> T convert(Object pojo, Class<T> target) {
        if (pojo == null) {
            return null;
        }
        
        return getMapper().convertValue(pojo, target);
    }


    public static <T> T convert(Object pojo, Class<?> collectionClass, Class<?>... elementClass) {
        if (pojo == null) {
            return null;
        }
        
        JavaType javaType = getMapper().getTypeFactory().constructParametrizedType(collectionClass, collectionClass, elementClass);

        return getMapper().convertValue(pojo, javaType);
    }
}
