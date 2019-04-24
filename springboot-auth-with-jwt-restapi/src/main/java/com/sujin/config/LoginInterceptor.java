package com.sujin.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sujin.app.annotation.AdminOnly;
import com.sujin.app.annotation.LoginRequired;
import com.sujin.app.dto.TokenSet;
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

			String accessToken = request.getHeader("ACCESS_TOKEN");
			final String refreshToken = request.getHeader("REFRESH_TOKEN");
			
			if( refreshToken !=null) {
				TokenSet tokenSet = jwtService.refreshAccessToken(refreshToken);
				accessToken = tokenSet.getAccessToken();
				response.addHeader("ACCESS_TOKEN", accessToken);
				response.addHeader("REFRESH_TOKEN", tokenSet.getRefreshToken());
			}
			if (hm.hasMethodAnnotation(LoginRequired.class) && (accessToken == null || !jwtService.isValidToken(accessToken, JwtService.AT_SECRET_KEY))) {
				throw new AuthenticationException("로그인되어있지 않습니다.");
			}
			if (hm.hasMethodAnnotation(AdminOnly.class) && !jwtService.getUser(accessToken, JwtService.AT_SECRET_KEY).getAuthority().contains(ADMIN)) {
				throw new AuthorizationException();
			}
		}
		return super.preHandle(request, response, handler);
	}
}
