package com.sujin.app.dto;

public class TokenSet {

	private String accessToken;
	private String refreshToken;

	private TokenSet() {

	}

	public static TokenSet create() {
		return new TokenSet();
	}

	public TokenSet accessToken(String token) {
		this.setAccessToken(token);
		return this;
	}

	public TokenSet refreshToken(String token) {
		this.setRefreshToken(token);
		return this;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

}
