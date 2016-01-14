package com.{{companyName}}.fastdfs;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Enumeration;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;


public final class FastdfsConfig
{

	private static Logger logger = LoggerFactory.getLogger(FastdfsConfig.class);
	
	private static Map<String, String> configs = new ConcurrentHashMap<String, String>();
	
	static {
		initConfig();
	}
	
	private static void initConfig() {
		
		try {
			URL url = Thread.currentThread().getContextClassLoader().getResource("group_config.properties");
			
			Properties prop = new Properties();
			prop.load(new InputStreamReader(url.openStream(), "UTF-8"));
			
			Enumeration<?> propNames = prop.propertyNames();
			while (propNames.hasMoreElements()) {
				String key = (String)propNames.nextElement();
				String value = prop.getProperty(key);
				
				configs.put(key, value);
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	public static String getValue(String key) {
		Object obj = configs.get(key);
		if (obj != null) {
			return obj.toString().trim();
		} else {
			return null;
		}
	}
	
}
