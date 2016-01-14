package com.{{companyName}}.interceptor;


import com.{{companyName}}.common.util.JsonUtil;
import com.{{companyName}}.vo.ResultModel;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class BgBaseInterceptor extends HandlerInterceptorAdapter
{


	@Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
		response.setHeader("Access-Control-Allow-Origin", "*");

		System.out.println(request.getRequestURI());

		String token = request.getHeader("x-manage-token");

		// TODO validate token BgSsoService

		if (token == null) {
			// no login or token expire
			ResultModel rm = new ResultModel();
			rm.setNoLoginCode();
			String json = JsonUtil.toJsonString(rm);
			response.getWriter().write(json);

			return false;
		}

		return true;
    }


	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}


}  

