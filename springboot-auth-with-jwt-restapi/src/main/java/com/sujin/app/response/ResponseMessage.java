package com.sujin.app.response;

import java.io.Serializable;

public class ResponseMessage implements Serializable {
	private static final long serialVersionUID = -4761982162913112635L;

	private String message;
	private Object data;
	private boolean success;
	
	public ResponseMessage() {
		super();
	}
	
	public ResponseMessage(String message, Object data, boolean success) {
		super();
		this.message = message;
		this.data = data;
		this.success = success;
	}
	
	public ResponseMessage(String message) {
		this.message = message;
	}

	public ResponseMessage(Object data) {
		this.data = data;
	}

	public ResponseMessage(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
}