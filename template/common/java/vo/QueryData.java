package com.{{companyName}}.vo;

import lombok.Data;

import java.util.List;


@Data
public final class QueryData {
	
	
	private int totalCount;
	private int totalPage;
	private int pageSize;
	private int currPage;
	private List<?> dataList;
	
	public void build() {
		if (totalCount % pageSize == 0) {
			totalPage = totalCount / pageSize;
		} else {
			totalPage = totalCount / pageSize + 1;
		}
	}
}
