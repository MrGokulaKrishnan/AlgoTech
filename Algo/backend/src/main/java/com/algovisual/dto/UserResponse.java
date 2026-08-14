package com.algovisual.dto;

import com.algovisual.entity.User;

public record UserResponse(Long id, String name, String email, String role) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
