package com.example.Back.Auth.Models;

public class AuthRequest {
    private String email;
    private String password;

    public AuthRequest(String email) {
        this.email = email;
    }

    public AuthRequest() {
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
