package com.{{companyName}}.servlet;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;


/**
 * @author wushen
 */
public class InitServlet extends HttpServlet
{

	private static final long serialVersionUID = -7704034054661745516L;

    private static Logger logger = LoggerFactory.getLogger(InitServlet.class);

    
	@Override
	public void init() throws ServletException {

		// do something init
	}

}
