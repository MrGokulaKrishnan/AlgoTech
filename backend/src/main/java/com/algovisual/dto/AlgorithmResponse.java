package com.algovisual.dto;

import com.algovisual.entity.Algorithm;

public record AlgorithmResponse(Long id, String slug, String name, String category, String difficulty,
                                String description, String bestComplexity, String averageComplexity,
                                String worstComplexity, String spaceComplexity, String language,
                                String sourceCode, Long topicId) {
    public static AlgorithmResponse from(Algorithm algorithm) {
        return new AlgorithmResponse(algorithm.getId(), algorithm.getSlug(), algorithm.getName(),
                algorithm.getCategory(), algorithm.getDifficulty(), algorithm.getDescription(),
                algorithm.getBestComplexity(), algorithm.getAverageComplexity(), algorithm.getWorstComplexity(),
                algorithm.getSpaceComplexity(), algorithm.getLanguage(), algorithm.getSourceCode(),
                algorithm.getTopic().getId());
    }
}
