package com.sujin.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sujin.app.annotation.LoginRequired;
import com.sujin.app.response.ResponseMessage;

@RestController
public class MainController {

	@GetMapping("getPrivateInfo")
	@LoginRequired
	public ResponseEntity<ResponseMessage> getPrivateInfo(){
		return ResponseEntity.ok(new ResponseMessage(null, "private info", true));
	}
	
}
