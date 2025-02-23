package com.colorpicker.security.auth;

import lombok.Builder;

@Builder
public record AuthenticationRequest(String email, String password) {}
