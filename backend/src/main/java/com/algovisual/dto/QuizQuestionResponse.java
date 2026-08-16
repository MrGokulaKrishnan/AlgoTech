package com.algovisual.dto;

import com.algovisual.entity.QuizQuestion;
import java.util.List;

public record QuizQuestionResponse(Long id, String type, String questionText, List<QuizOptionResponse> options) {
    public static QuizQuestionResponse from(QuizQuestion question, List<QuizOptionResponse> options) {
        return new QuizQuestionResponse(question.getId(), question.getType().name(), question.getQuestionText(), options);
    }
}
