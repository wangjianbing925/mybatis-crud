package com.{{companyName}}.common.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.jdbc.core.JdbcTemplate;


public class SpringContextUtil implements ApplicationContextAware
{

	private static Logger logger = LoggerFactory.getLogger(SpringContextUtil.class);
	
	private static ApplicationContext applicationContext;

	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
		
		logger.info("webapp.root = " + System.getProperty("webapp.root"));
	}


	public static Object getBean(String name) throws BeansException {
		return applicationContext.getBean(name);
	}
	
	public static JdbcTemplate getJdbcTemplateBean(){
		return (JdbcTemplate) applicationContext.getBean("jdbcTemplate");
	}
	
	public static String getWebappRootPath() {
		return System.getProperty("webapp.root");
	}

}
