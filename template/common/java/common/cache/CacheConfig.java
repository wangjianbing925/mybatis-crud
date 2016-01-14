/**
 * 
 */
package com.{{companyName}}.common.cache;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.util.Properties;


/**
 * 缓存配置信息
 *
 * @since 1.0.0
 * @author zhaohai.wu
 * @date 2015年9月29日 上午10:19:13
 * 
 */
public class CacheConfig implements Serializable
{

    private static final long serialVersionUID = 2768730136288026108L;

    private static Logger logger = LoggerFactory.getLogger(CacheConfig.class);

    /**
     * 是否使用缓存，默认true
     */
    private boolean isOpen = true;
    /**
     * 缓存前缀
     */
    private String prefix;

    /**
     * 缓存服务器地址
     */
    private String host;
    /**
     * 缓存端口
     */
    private int port;
    /**
     * 缓存服务器密码
     */
    private String password;
    /**
     * 缓存对应数据库id
     */
    private int databaseNo;

    /**
     * 缓存最大线程数，默认200
     */
    private int maxTotal = 200;
    /**
     * 缓存最大空闲线程数，默认20
     */
    private int maxIdle = 20;
    /**
     * 缓存操作超时时间(ms)，默认5000
     */
    private int timeout = 5000;
    /**
     * 缓存有效期，默认7天；填0则永久有效
     */
    private int expire = 604800;


    public CacheConfig() {
    }


    public CacheConfig(String prop) {
        Properties resourceBundle = new Properties();
        InputStream in = null;
        try {
            in = getClass().getResourceAsStream(prop);
            resourceBundle.load(in);

            if (resourceBundle.containsKey("CACHE_OPEN")) {
                this.setOpen(Boolean.valueOf(resourceBundle.getProperty("CACHE_OPEN")));
            }
            if (resourceBundle.containsKey("CACHE_PREFIX")) {
                this.setPrefix(resourceBundle.getProperty("CACHE_PREFIX"));
            }

            // 缓存服务器地址
            if (resourceBundle.containsKey("CACHE_HOST")) {
                this.setHost(resourceBundle.getProperty("CACHE_HOST"));
            }
            // 缓存端口
            if (resourceBundle.containsKey("CACHE_PORT")) {
                this.setPort(Integer.parseInt(resourceBundle.getProperty("CACHE_PORT")));
            }
            // 缓存服务器密码
            if (resourceBundle.containsKey("CACHE_PASSWORD")) {
                this.setPassword(resourceBundle.getProperty("CACHE_PASSWORD"));
            }
            // 缓存对应数据库id
            if (resourceBundle.containsKey("CACHE_DATABASE_NO")) {
                this.setDatabaseNo(Integer.parseInt(resourceBundle.getProperty("CACHE_DATABASE_NO")));
            }

            // 缓存最大线程数
            if (resourceBundle.containsKey("CACHE_MAXTOTAL")) {
                this.setMaxTotal(Integer.parseInt(resourceBundle.getProperty("CACHE_MAXTOTAL")));
            }
            // 缓存最大空闲线程数
            if (resourceBundle.containsKey("CACHE_MAXAIDLE")) {
                this.setMaxIdle(Integer.parseInt(resourceBundle.getProperty("CACHE_MAXAIDLE")));
            }
            // 缓存操作超时时间
            if (resourceBundle.containsKey("CACHE_TIMEOUT")) {
                this.setTimeout(Integer.parseInt(resourceBundle.getProperty("CACHE_TIMEOUT")));
            }
            // 缓存操作超时时间
            if (resourceBundle.containsKey("CACHE_EXPIRE")) {
                this.setExpire(Integer.parseInt(resourceBundle.getProperty("CACHE_EXPIRE")));
            }
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }


    }


    public boolean isOpen() {
        return isOpen;
    }


    public void setOpen(boolean isOpen) {
        this.isOpen = isOpen;
    }


    public String getPrefix() {
        return prefix;
    }


    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }


    public int getMaxTotal() {
        return maxTotal;
    }


    public void setMaxTotal(int maxTotal) {
        this.maxTotal = maxTotal;
    }


    public int getMaxIdle() {
        return maxIdle;
    }


    public void setMaxIdle(int maxIdle) {
        this.maxIdle = maxIdle;
    }


    public String getHost() {
        return host;
    }


    public void setHost(String host) {
        this.host = host;
    }


    public int getPort() {
        return port;
    }


    public void setPort(int port) {
        this.port = port;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public int getDatabaseNo() {
        return databaseNo;
    }


    public void setDatabaseNo(int databaseNo) {
        this.databaseNo = databaseNo;
    }


    public int getTimeout() {
        return timeout;
    }


    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }


    public int getExpire() {
        return expire;
    }


    public void setExpire(int expire) {
        this.expire = expire;
    }


}
