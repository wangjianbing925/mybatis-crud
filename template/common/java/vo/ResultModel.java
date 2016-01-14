package com.{{companyName}}.vo;


import lombok.Data;


@Data
public final class ResultModel {

	public static final int SUCCESS_CODE = 20011011;
	public static final int FAIL_CODE = 50011011;
	public static final int NOT_EXIST_CODE = 40411011;
	public static final int NO_LOGIN_CODE = 40111011;
	
	private String msg;
	private int statusCode;
	private Object data;

	public ResultModel() {
	}
	
	public void setSuccessCode() {
		this.statusCode = SUCCESS_CODE;
	}
	
	public void setFailCode() {
		this.statusCode = FAIL_CODE;
	}
	
	public void setNotExistCode() {
		this.statusCode = NOT_EXIST_CODE;
	}

	public void setNoLoginCode() {
		this.statusCode = NO_LOGIN_CODE;
	}
	
	
}
