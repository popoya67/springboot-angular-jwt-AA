package com.sujin.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.sujin.app.exception.AuthenticationException;
import com.sujin.app.response.ResponseMessage;

@ControllerAdvice
public class ExceptionController {
	@ExceptionHandler({ AuthenticationException.class})
	public ResponseEntity<ResponseMessage> authException(Exception e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage(e.getMessage()));
	}

}
