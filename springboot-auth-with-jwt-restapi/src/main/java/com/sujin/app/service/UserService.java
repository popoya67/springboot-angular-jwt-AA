package com.sujin.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sujin.app.dto.User;
import com.sujin.app.repository.UserRepository;


@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public User getUser(User user) {
		User loginUser = userRepository.findByUserIdAndPassword(user.getUserId(), user.getPassword());
		if(loginUser == null) {
			throw new IllegalArgumentException("잘못된 ID/PW를 입력하셨습니다.");
		}
		loginUser.setPassword(null);
		return loginUser;
	}
}
