package com.sujin.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sujin.app.dto.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

	User findByUserIdAndPassword(String userId, String password);
}
