package com.algovisual.dto;

import com.algovisual.entity.QuizOption;

public record QuizOptionResponse(Long id, String text) {
    public static QuizOptionResponse from(QuizOption option) {
        return new QuizOptionResponse(option.getId(), option.getText());
    }
}
