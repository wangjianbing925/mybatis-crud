package com.{{companyName}}.common.cache;


import com.{{companyName}}.common.cache.impl.RedisCacheHandler;

import java.util.HashMap;
import java.util.Map;


/**
 * 缓存处理器工厂
 *
 * @since 1.0.0
 * @author zhaohai.wu
 * @date 2015年9月29日 上午10:31:58
 * 
 */
public final class CacheHandlerFactory
{

    /**
     * 默认缓存配置文件
     */
    private static final String DEFAULT_CACHE_CONFIG = "/cacheConfig.properties";

    /**
     * 维护一个处理类集合,便于重新加载
     */
    private static Map<String, CacheHandler> handlerMap = new HashMap<String, CacheHandler>();


    private CacheHandlerFactory() {
        super();
    }


    /**
     * 默认构造CacheHandler方法，从cacheConfig.properties中读取配置
     * 
     * @return
     *
     * @since 1.0.0
     */
    public static CacheHandler createCacheHandler() {
        return createCacheHandler(DEFAULT_CACHE_CONFIG);
    }


    /**
     * 从配置文件中读取配置构造CacheHandler
     * 
     * @param configFile
     * @return
     *
     * @since 1.0.0
     */
    public static CacheHandler createCacheHandler(String configFile) {

        // 将处理类放入集合中
        if (!handlerMap.containsKey(configFile)) {
            CacheHandler handler = createCacheHandler(new CacheConfig(configFile));
            handlerMap.put(configFile, handler);
        }


        return handlerMap.get(configFile);
    }


    /**
     * 从配置对象中读取配置构造CacheHandler
     * 
     * @param config
     * @return
     *
     * @since 1.0.0
     */
    public static CacheHandler createCacheHandler(CacheConfig config) {
        CacheHandler handler = null;

        if (config != null) {
            handler = new RedisCacheHandler(config);
        }

        return handler;
    }


    /**
     * 重新加载配置文件对应的处理类，用于修改了配置文件后动态更新处理类
     * 
     * @param configFile
     *            配置文件，如果为null则加载默认配置文件
     *
     * @since 1.0.1
     */
    public static boolean reloadHandler(String configFile) {
        boolean res = false;
        if (configFile == null) {
            configFile = DEFAULT_CACHE_CONFIG;
        }

        // 重新赋值
        if (handlerMap.containsKey(configFile)) {
            CacheHandler cacheHandler = handlerMap.get(configFile);
            cacheHandler.reloadCacheConfig(new CacheConfig(configFile));

            res = true;
        }


        return res;
    }

}
