package com.sujin.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sujin.app.annotation.AdminOnly;
import com.sujin.app.annotation.LoginRequired;
import com.sujin.app.exception.AuthenticationException;
import com.sujin.app.exception.AuthorizationException;
import com.sujin.app.service.JwtService;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	private static final String ADMIN = "ADMIN";

	@Autowired
	private JwtService jwtService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (handler instanceof HandlerMethod) {
			HandlerMethod hm = (HandlerMethod) handler;

			final String token = request.getHeader("AUTH_TOKEN");
			if (hm.hasMethodAnnotation(LoginRequired.class) && (token == null || !jwtService.isValidToken(token))) {
				throw new AuthenticationException("접근 권한이 없습니다.");
			}
			if (hm.hasMethodAnnotation(AdminOnly.class) && !jwtService.getUser(token).getAuthority().contains(ADMIN)) {
				throw new AuthorizationException();
			}
		}
		return super.preHandle(request, response, handler);
	}
}
