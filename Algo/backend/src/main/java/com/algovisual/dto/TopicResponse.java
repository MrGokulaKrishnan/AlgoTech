package com.algovisual.dto;

import com.algovisual.entity.Topic;

public record TopicResponse(Long id, String slug, String name, String description, String difficulty,
                            int estimatedMinutes, int sortOrder) {
    public static TopicResponse from(Topic topic) {
        return new TopicResponse(topic.getId(), topic.getSlug(), topic.getName(), topic.getDescription(),
                topic.getDifficulty(), topic.getEstimatedMinutes(), topic.getSortOrder());
    }
}
