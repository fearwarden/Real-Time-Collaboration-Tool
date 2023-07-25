package com.bnm.valorantstrategyplanner.auth.services;

public interface AuthService {
    void register(String email, String firstName, String lastName, String password, String confirmationPassword);
}
