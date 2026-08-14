package com.algovisual.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record TopicRequest(
        @NotBlank @Pattern(regexp = "[a-z0-9-]{3,80}") String slug,
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Size(max = 4000) String description,
        @NotBlank @Size(max = 30) String difficulty,
        @Min(0) @Max(10000) int estimatedMinutes,
        @Min(0) @Max(1000) int sortOrder
) { }
