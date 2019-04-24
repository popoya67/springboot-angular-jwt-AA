package com.sujin.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sujin.app.dto.TokenSet;
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
		TokenSet tokenSet = null;
		User loginUser = userService.getUser(user);
		if (loginUser != null) {
			tokenSet = jwtService.createTokenSet(loginUser);
		}

		return tokenSet != null ? ResponseEntity.ok().body(new ResponseMessage(null, tokenSet, true))
				: new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}
	
	@PostMapping("refreshAccessToken")
	public ResponseEntity<ResponseMessage> refreshAccessToken(@RequestBody String token) {
		TokenSet tokenSet = jwtService.refreshAccessToken(token);

		return tokenSet != null ? ResponseEntity.ok().body(new ResponseMessage(null, tokenSet, true))
				: new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}
}
