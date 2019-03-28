package com.sujin.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sujin.app.dto.User;
import com.sujin.app.response.ResponseMessage;
import com.sujin.app.service.JwtService;
import com.sujin.app.service.UserService;

@RestController
public class LoginController {

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserService userService;

	@PostMapping("issueToken")
	public ResponseEntity<ResponseMessage> issueToken(@RequestBody User user) {
		String token = null;
		User loginUser = userService.getUser(user);
		if (loginUser != null) {
			token = jwtService.createLoginToken(loginUser);
		}

		return token != null ? ResponseEntity.ok().body(new ResponseMessage(null, token, true))
				: new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
