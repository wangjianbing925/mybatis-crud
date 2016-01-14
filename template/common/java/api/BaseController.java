package com.{{companyName}}.api;


import com.{{companyName}}.common.Constants;
import com.{{companyName}}.common.util.DateEditor;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;


public class BaseController {


    protected Map<String, Object> buildBgCondition(Map<String, Object> paramMap, HttpServletRequest request) {

		Map<String, Object> conditionMap = convertParam(paramMap);

		return conditionMap;
	}


    protected Map<String, Object> buildFrCondition(Map<String, Object> paramMap, HttpServletRequest request) {

		Map<String, Object> conditionMap = convertParam(paramMap);

        return conditionMap;
    }


	private Map<String, Object> convertParam(Map<String, Object> paramMap) {

		Map<String, Object> conditionMap = new HashMap<String, Object>();

		for (Entry<String, Object> entry : paramMap.entrySet()) {
			Object obj = entry.getValue();
			if (obj != null && !obj.toString().trim().equals("")) {

				if (entry.getKey().equals(Constants.KEY_PAGE_SIZE)) {
					int pageSize = Integer.parseInt(obj.toString());
					conditionMap.put(entry.getKey(), pageSize);
				} else if (entry.getKey().equals(Constants.KEY_PAGE_FROM)) {
                    int pageFrom = Integer.parseInt(obj.toString());
                    conditionMap.put(entry.getKey(), pageFrom);
                } else {
					conditionMap.put(entry.getKey(), obj.toString());
				}
			}
		}

		return conditionMap;
	}



    @InitBinder
    protected void initBinder(HttpServletRequest request,
                              ServletRequestDataBinder binder) throws Exception {
        //对于需要转换为Date类型的属性，使用DateEditor进行处理
        binder.registerCustomEditor(Date.class, new DateEditor());
    }



}
