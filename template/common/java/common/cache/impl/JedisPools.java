package com.{{companyName}}.common.cache.impl;


import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;


import com.{{companyName}}.common.cache.CacheConfig;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;


/**
 * redis连接池工厂类
 *
 * @since 1.0.0
 * @author zhaohai.wu
 * @date 2015年10月8日 上午11:15:38
 * 
 */
public final class JedisPools
{

    /**
     * 内部维护的一个单例连接池集合
     */
    private final static Map<String, JedisPool> poolMap = new HashMap<String, JedisPool>();


    private JedisPools() {
        // do nothing
    }


    static {
        Runtime.getRuntime().addShutdownHook(new Thread()
        {

            @Override
            public void run() {
                Set<Entry<String, JedisPool>> entrySet = poolMap.entrySet();
                for (Entry<String, JedisPool> entry : entrySet) {
                    entry.getValue().destroy();
                }
            }
        });
    }


    public static JedisPool getJedisPool(CacheConfig cacheConfig) {
        String key = getPoolKey(cacheConfig);

        if (!poolMap.containsKey(key)) {
            // 如果不存在，则创建，维护一个单例
            synchronized (poolMap) {
                if (!poolMap.containsKey(key)) {
                    JedisPoolConfig config = new JedisPoolConfig();
                    config.setMaxTotal(cacheConfig.getMaxTotal());
                    config.setMaxIdle(cacheConfig.getMaxIdle());
                    JedisPool jedisPool = new JedisPool(config, cacheConfig.getHost(), cacheConfig.getPort(), cacheConfig.getTimeout(), cacheConfig.getPassword(), cacheConfig.getDatabaseNo());

                    poolMap.put(key, jedisPool);
                }
            }
        }


        return poolMap.get(key);
    }


    private static String getPoolKey(CacheConfig cacheConfig) {
        StringBuffer poolKey = new StringBuffer();
        poolKey.append(cacheConfig.getHost()).append(cacheConfig.getPort()).append(cacheConfig.getTimeout()).append(cacheConfig.getPassword()).append(cacheConfig.getDatabaseNo())
                .append(cacheConfig.getMaxTotal()).append(cacheConfig.getMaxIdle());


        return poolKey.toString();
    }
}
