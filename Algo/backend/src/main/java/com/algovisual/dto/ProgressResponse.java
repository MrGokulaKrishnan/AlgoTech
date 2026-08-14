package com.algovisual.dto;

import com.algovisual.entity.UserProgress;
import java.time.Instant;

public record ProgressResponse(
        Long id,
        String algorithmId,
        boolean completed,
        int progressPercentage,
        int lastStep,
        Instant updatedAt
) {
    public static ProgressResponse from(UserProgress progress) {
        return new ProgressResponse(
                progress.getId(),
                progress.getAlgorithmId(),
                progress.isCompleted(),
                progress.getProgressPercentage(),
                progress.getLastStep(),
                progress.getUpdatedAt()
        );
    }
}
