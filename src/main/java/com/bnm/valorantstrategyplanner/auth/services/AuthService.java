package com.bnm.valorantstrategyplanner.auth.services;

import com.bnm.valorantstrategyplanner.auth.dto.response.JwtAuthenticationResponse;

public interface AuthService {
    void register(String email, String firstName, String lastName, String password, String confirmationPassword);
    JwtAuthenticationResponse login(String email, String password);
}
