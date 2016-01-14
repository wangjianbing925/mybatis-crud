package com.{{companyName}}.common.cache.impl;


import com.{{companyName}}.common.cache.CacheConfig;
import com.{{companyName}}.common.cache.CacheHandler;
import com.{{companyName}}.common.serializer.SerializerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import java.io.Serializable;
import java.util.*;
import java.util.Map.Entry;


/**
 * Redis缓存处理器
 *
 * @since 1.0.0
 * @author zhaohai.wu
 * @date 2015年9月29日 下午3:07:43
 * 
 */
public class RedisCacheHandler implements CacheHandler
{

    private static Logger logger = LoggerFactory.getLogger(CacheHandler.class);

    /**
     * 无缓存前缀
     */
    private static final String NO_CACHE_PREFIX = "$no_prefix$";

    /**
     * 序列化工具对象
     */
    private static SerializerUtil serializerUtil = new SerializerUtil();

    /**
     * Redis连接池
     */
    private JedisPool pool;
    /**
     * 缓存配置
     */
    private CacheConfig cacheConfig;


    public RedisCacheHandler(CacheConfig cacheConfig) {
        super();
        this.cacheConfig = cacheConfig;
        this.pool = JedisPools.getJedisPool(cacheConfig);
    }


    /**
     * 从连接池中取出一个连接
     * 
     * @return
     *
     * @since 1.0.0
     */
    private Jedis getJedis() {
        return pool.getResource();
    }


    /**
     * 序列化key值
     * 
     * @return
     *
     * @since 1.0.0
     */
    private byte[] serializeKey(String key) {
        return getPrefixKey(key).getBytes();
    }


    /**
     * 获得带前缀的key值
     * 
     * @return
     *
     * @since 1.0.0
     */
    private String getPrefixKey(String key) {
        // 如果key以不带前缀关键词开头，则不添加前缀
        if (key != null && key.startsWith(NO_CACHE_PREFIX)) {
            key = key.substring(NO_CACHE_PREFIX.length());
        }
        // 如果没有前缀，则添加前缀
        else if (key != null && cacheConfig.getPrefix() != null && !key.startsWith(cacheConfig.getPrefix())) {
            key = cacheConfig.getPrefix() + key;
        }


        return key;
    }


    /**
     * 序列化value值
     * 
     * @param value
     * @return
     *
     * @since 1.0.0
     */
    private <T extends Serializable> byte[] serializeValue(T value) {
        byte[] byteValue = null;
        // String 类型，则不进行序列化
        if (value != null && value instanceof String) {
            byteValue = ((String) value).getBytes();
        }
        // 其他则进行序列化
        else if (value != null) {
            byteValue = serializerUtil.serialize(value);
        }


        return byteValue;
    }


    /**
     * 反序列化value值
     * 
     * @param byteValue
     * @param clazz
     * @return
     *
     * @since 1.0.0
     */
    @SuppressWarnings("unchecked")
    private <T extends Serializable> T deserializeValue(byte[] byteValue, Class<T> clazz) {
        T newValue = null;
        // String 类型，则不进行序列化
        if (byteValue != null && String.class.equals(clazz)) {
            newValue = (T) new String(byteValue);
        }
        // 其他则进行序列化
        else if (byteValue != null) {
            newValue = serializerUtil.deserialize(byteValue, clazz);
        }


        return newValue;
    }


    /**
     * 关闭连接
     * 
     * @param jedis
     *
     * @since 1.0.0
     */
    private void closeJedis(Jedis jedis) {
        if (null != jedis) {
            jedis.close();
        }
    }


    @Override
    public <T extends Serializable> boolean set(String key, T value) {
        return set(key, value, -1);
    }


    @Override
    public <T extends Serializable> boolean set(String key, T value, int expireSecond) {
        boolean res = false;

        if (isOpenCache() && key != null && value != null) {
            Jedis jedis = null;
            try {

                // 获得连接
                jedis = getJedis();
                // 保存对象
                jedis.set(serializeKey(key), serializeValue(value));
                // 设置有效时间
                expire(jedis, key, expireSecond);

                res = true;
            } catch (Exception e) {
                logger.error("redis error , the key is " + key + " and the value is " + value, e);
            } finally {
                // 关闭连接
                closeJedis(jedis);
            }
        }


        return res;
    }


    @Override
    public <T extends Serializable> boolean setList(String key, List<T> list) {
        return setList(key, list, -1);
    }


    @Override
    public <T extends Serializable> boolean setList(String key, List<T> list, int expireSecond) {
        boolean res = false;

        if (isOpenCache() && key != null && list != null) {
            Jedis jedis = null;
            try {
                // redis存储list是倒序的
                int size = list.size();
                byte[][] array = new byte[size][];
                for (int i = size - 1, j = 0; i >= 0; i--, j++) {
                    array[j] = serializeValue(list.get(i));
                }

                jedis = getJedis();
                jedis.del(key);
                jedis.lpush(serializeKey(key), array);

                // 设置有效时间
                expire(jedis, key, expireSecond);

                res = true;
            } catch (Exception e) {
                logger.error("Exception:", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return res;
    }


    @Override
    public <T extends Serializable> boolean setMap(String key, Map<String, T> map) {
        return setMap(key, map, -1);
    }


    @Override
    public <T extends Serializable> boolean setMap(String key, Map<String, T> map, int expireSecond) {
        boolean res = false;

        if (isOpenCache() && key != null && map != null) {

            Jedis jedis = null;
            try {
                // 转换数据
                Map<byte[], byte[]> dataMap = new HashMap<byte[], byte[]>(map.size());
                Set<Entry<String, T>> entrySet = map.entrySet();
                for (Entry<String, T> entry : entrySet) {
                    dataMap.put(entry.getKey().getBytes(), serializeValue(entry.getValue()));
                }

                jedis = getJedis();
                jedis.hmset(serializeKey(key), dataMap);
                // 设置有效时间
                expire(jedis, key, expireSecond);

                res = true;
            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return res;
    }


    @Override
    public <T extends Serializable> boolean setMapField(String key, String field, T value) {
        boolean res = false;

        if (isOpenCache() && key != null && field != null && value != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();
                jedis.hset(serializeKey(key), field.getBytes(), serializeValue(value));

                res = true;
            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return res;
    }


    /**
     * 设置有效时间
     * 
     * @param jedis
     * @param key
     * @param expireSecond
     * @return
     *
     * @since 1.0.0
     */
    private boolean expire(Jedis jedis, String key, int expireSecond) {
        boolean res = false;

        // 如果值小于0，则取默认值
        if (expireSecond < 0) {
            expireSecond = cacheConfig.getExpire();
        }

        if (expireSecond == 0) {
            // 为0则不设置有效时间，即永久有效
            res = true;
        } else if (expireSecond > 0) {
            Long value = jedis.expire(getPrefixKey(key), expireSecond);
            res = value != null && value == 1;
        }


        return res;
    }


    @Override
    public boolean expire(String key, int expireSecond) {
        boolean res = false;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();
                expire(jedis, key, expireSecond);

                res = true;
            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return res;
    }


    @Override
    public <T extends Serializable> T get(String key, Class<T> clazz) {
        T result = null;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();

                byte[] value = jedis.get(serializeKey(key));
                result = deserializeValue(value, clazz);

            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return result;
    }


    @Override
    public <T extends Serializable> List<T> getList(String key, Class<T> clazz) {
        List<T> result = null;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();

                List<byte[]> list = jedis.lrange(serializeKey(key), 0, -1);
                if (list != null && list.size() > 0) {
                    result = new ArrayList<T>(list.size());
                    for (byte[] value : list) {
                        result.add(deserializeValue(value, clazz));
                    }
                }
            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }

        return result;
    }


    @Override
    public <T extends Serializable> Map<String, T> getMap(String key, Class<T> clazz) {

        Map<String, T> result = null;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();

                Map<byte[], byte[]> map = jedis.hgetAll(serializeKey(key));
                if (map != null && map.size() > 0) {
                    result = new HashMap<String, T>(map.size());

                    Set<Entry<byte[], byte[]>> entrySet = map.entrySet();
                    for (Entry<byte[], byte[]> entry : entrySet) {
                        result.put(String.valueOf(entry.getKey()), deserializeValue(entry.getValue(), clazz));
                    }
                }

            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return result;
    }


    @Override
    public <T extends Serializable> T getMapField(String key, String field, Class<T> clazz) {
        T result = null;

        if (isOpenCache() && key != null && field != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();
                byte[] value = jedis.hget(serializeKey(key), field.getBytes());

                result = deserializeValue(value, clazz);
            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }

        return result;
    }


    @Override
    public boolean del(String key) {
        boolean res = false;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();
                jedis.del(getPrefixKey(key));

                res = true;
            } catch (Exception e) {
                logger.error("redis error ", e);
                res = false;
            } finally {
                closeJedis(jedis);
            }
        }

        return res;
    }


    @Override
    public boolean isOpenCache() {
        return cacheConfig.isOpen();
    }


    @Override
    public String getNoPrefixKey(String key) {
        return key == null ? null : NO_CACHE_PREFIX + key;
    }


    @Override
    public String getString(String key) {
        return get(key, String.class);
    }


    /**
     * 缓存是否连接正常 能从pool中获取到jedis则认为正常
     * 
     * @return
     */
    @Override
    public boolean isConnected() {
        boolean flag = true;
        Jedis jedis = null;
        try {
            jedis = pool.getResource();
            flag = true;
        } catch (Exception e) {
            if (e instanceof JedisConnectionException && e.getMessage().equals("Could not get a resource from the pool")) {
                flag = false;
            } else {
                logger.error(e.getMessage(), e);
            }
        } finally {
            if (null != jedis) {
                jedis.close();
            }
        }

        return flag;
    }


    @Override
    public CacheConfig getCacheConfig() {
        return cacheConfig;
    }


    @Override
    public boolean reloadCacheConfig(CacheConfig config) {
        this.cacheConfig = config;
        this.pool = JedisPools.getJedisPool(config);

        return true;
    }


    @Override
    public <T extends Serializable> boolean setSet(String key, Set<T> set) {
        return setSet(key, set, -1);
    }


    @Override
    public <T extends Serializable> boolean setSet(String key, Set<T> set, int expireSecond) {
        boolean res = false;

        if (isOpenCache() && key != null && set != null) {
            Jedis jedis = null;
            try {
                // redis存储list是倒序的
                int size = set.size();
                byte[][] array = new byte[size][];

                int i = 0;
                for (T s : set) {
                    array[i] = serializeValue(s);
                    i++;
                }

                jedis = getJedis();
                jedis.del(key);
                jedis.sadd(serializeKey(key), array);

                // 设置有效时间
                expire(jedis, key, expireSecond);

                res = true;
            } catch (Exception e) {
                logger.error("Exception:", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return res;
    }


    @Override
    public <T extends Serializable> Set<T> getSet(String key, Class<T> clazz) {
        Set<T> result = null;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();

                Set<byte[]> set = jedis.smembers(serializeKey(key));
                if (set != null && set.size() > 0) {
                    result = new HashSet<T>(set.size());
                    for (byte[] value : set) {
                        result.add(deserializeValue(value, clazz));
                    }
                }
            } catch (Exception e) {
                logger.error("redis error ", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return result;
    }



    @Override
    public long incr(String key) {
        long res = -1;

        if (isOpenCache() && key != null) {
            Jedis jedis = null;
            try {
                jedis = getJedis();
                res = jedis.incr(serializeKey(key));
            } catch (Exception e) {
                logger.error("Exception:", e);
            } finally {
                closeJedis(jedis);
            }
        }


        return res;
    }

}
