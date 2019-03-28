package com.sujin.app.dto;

import java.io.Serializable;
import java.util.List;

public class User implements Serializable{
    
	private static final long serialVersionUID = 1L;
	private String userId;
    private String password;
    private List<String> authority;
    private boolean enabled;
    private String name;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<String> getAuthority() {
		return authority;
	}
	public void setAuthority(List<String> authority) {
		this.authority = authority;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "User [userId=" + userId + ", password=" + password + ", authority=" + authority + ", enabled=" + enabled
				+ ", name=" + name + "]";
	}
    
}