package com.{{companyName}}.common;


import com.{{companyName}}.common.config.ConfigUtils;


public final class Constants {

    public static String SERVER_PATH = ConfigUtils.getValue("serverPath");

    public static String SERVER_CONTEXT_PATH = ConfigUtils.getValue("serverContextPath");


	public static final String KEY_PAGE_FROM = "pageFrom";

	public static final String KEY_PAGE_SIZE = "pageSize";


	public static final String DEFAULT_PASSWORD = "123456";


	
}
