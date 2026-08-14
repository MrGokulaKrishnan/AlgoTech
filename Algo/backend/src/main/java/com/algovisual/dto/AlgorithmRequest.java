package com.algovisual.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AlgorithmRequest(
        @NotBlank @Pattern(regexp = "[a-z0-9-]{3,80}") String slug,
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Size(max = 50) String category,
        @NotBlank @Size(max = 30) String difficulty,
        @NotBlank @Size(max = 4000) String description,
        @NotBlank @Size(max = 30) String bestComplexity,
        @NotBlank @Size(max = 30) String averageComplexity,
        @NotBlank @Size(max = 30) String worstComplexity,
        @NotBlank @Size(max = 30) String spaceComplexity,
        @NotBlank @Size(max = 30) String language,
        @NotBlank @Size(max = 20000) String sourceCode,
        @NotNull Long topicId
) { }
