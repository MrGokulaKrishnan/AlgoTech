package com.algovisual.dto;

import jakarta.validation.constraints.NotNull;

public record QuizSubmissionRequest(@NotNull(message = "Select an answer") Long selectedOptionId) { }
