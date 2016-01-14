package com.{{companyName}}.service;


import com.{{companyName}}.vo.QueryData;
import com.{{companyName}}.vo.ResultModel;

import java.io.Serializable;
import java.util.Map;


public interface BaseService<T, ID extends Serializable>
{

	T get(ID id);

	ResultModel add(T object);

	ResultModel update(T object);

	ResultModel delete(ID id);

	QueryData queryListAndCount(Map<String, Object> condition);

}