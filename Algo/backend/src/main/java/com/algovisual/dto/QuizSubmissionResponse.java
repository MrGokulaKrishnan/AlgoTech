package com.algovisual.dto;

public record QuizSubmissionResponse(boolean correct, String explanation, Long correctOptionId) { }
