package com.{{companyName}}.common.cache;


import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;


/**
 * 缓存处理器接口
 *
 * @since 1.0.0
 * @author zhaohai.wu
 * @date 2015年9月29日 上午10:30:59
 * 
 */
public interface CacheHandler
{

    /**
     * 缓存是否连接正常
     * 
     * @return
     *
     * @since 1.0.0
     */
    boolean isConnected();


    /**
     * 保存对象
     * 
     * @param key
     * @param value
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean set(String key, T value);


    /**
     * 保存对象
     * 
     * @param key
     * @param value
     * @param expireSecond
     *            有效时间（秒）
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean set(String key, T value, int expireSecond);


    /**
     * 保存列表对象
     * 
     * @param key
     * @param list
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setList(String key, List<T> list);


    /**
     * 保存列表对象
     * 
     * @param key
     * @param list
     * @param expireSecond
     *            有效时间（秒）
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setList(String key, List<T> list, int expireSecond);


    /**
     * 保存集合对象
     * 
     * @param key
     * @param set
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setSet(String key, Set<T> set);


    /**
     * 保存集合对象
     * 
     * @param key
     * @param set
     * @param expireSecond
     *            有效时间（秒）
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setSet(String key, Set<T> set, int expireSecond);


    /**
     * 保存map对象
     * 
     * @param key
     * @param map
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setMap(String key, Map<String, T> map);


    /**
     * 保存map对象
     * 
     * @param key
     * @param map
     * @param expireSecond
     *            有效时间（秒）
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setMap(String key, Map<String, T> map, int expireSecond);


    /**
     * 保存对象Map的一个属性
     * 
     * @param key
     * @param field
     * @param value
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> boolean setMapField(String key, String field, T value);


    /**
     * 设置指定缓存对象的有效期
     * 
     * @param key
     * @param expireSecond
     *            有效时间（秒）
     * @return
     *
     * @since 1.0.0
     */
    boolean expire(String key, int expireSecond);


    /**
     * 获取对象
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> T get(String key, Class<T> clazz);


    /**
     * 获取String对象
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    String getString(String key);


    /**
     * 获取列表对象
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> List<T> getList(String key, Class<T> clazz);


    /**
     * 获取集合对象
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> Set<T> getSet(String key, Class<T> clazz);


    /**
     * 获取map对象
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> Map<String, T> getMap(String key, Class<T> clazz);


    /**
     * 获取对象Map的一个属性
     * 
     * @param key
     * @param field
     * @return
     *
     * @since 1.0.0
     */
    <T extends Serializable> T getMapField(String key, String field, Class<T> clazz);


    /**
     * 删除缓存对象
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    boolean del(String key);


    /**
     * 是否开启缓存
     * 
     * @return
     *
     * @since 1.0.0
     */
    boolean isOpenCache();


    /**
     * 获取不处理前缀的key，由于默认所有方法的key会自动处理前缀，如果需要不自动处理前缀，则需要将key使用此方法进行处理，如： <code>
     * cacheHandler.get(getNoPrefixKey("key"));
     * </code>
     * 
     * @param key
     * @return
     *
     * @since 1.0.0
     */
    String getNoPrefixKey(String key);


    /**
     * 获得缓存配置信息
     * 
     * @return
     *
     * @since 1.0.1
     */
    CacheConfig getCacheConfig();


    /**
     * 重新设置缓存配置信息
     * 
     * @param config
     * @return
     *
     * @since 1.0.1
     */
    boolean reloadCacheConfig(CacheConfig config);
    
    /**
     * 
     * 原子加1
     * 
     * @param key
     * @return 加1后的值
     *
     * @since 1.0.1
     * @author jicexosl
     */
    long incr(String key);
}
