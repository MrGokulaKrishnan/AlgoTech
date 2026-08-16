package com.algovisual.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ProgressRequest(
        @NotBlank(message = "Algorithm id is required")
        @Pattern(regexp = "[a-z0-9-]{3,80}", message = "Algorithm id is invalid") String algorithmId,
        @NotNull(message = "Completion state is required") Boolean completed,
        @Min(value = 0, message = "Progress must be at least 0") @Max(value = 100, message = "Progress cannot exceed 100") int progressPercentage,
        @Min(value = 0, message = "Last step cannot be negative") int lastStep
) { }
