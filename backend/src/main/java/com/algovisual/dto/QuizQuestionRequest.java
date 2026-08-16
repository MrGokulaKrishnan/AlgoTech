package com.algovisual.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record QuizQuestionRequest(
        @NotNull Long topicId,
        @NotBlank String type,
        @NotBlank @Size(max = 4000) String questionText,
        @NotBlank @Size(max = 4000) String explanation,
        @NotEmpty @Size(min = 2, max = 6) List<@Valid QuizOptionInput> options
) { }
