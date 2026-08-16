package com.algovisual.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "algorithms")
public class Algorithm {
    @Id
    private Long id;

    @Indexed(unique = true)
    private String slug;

    private String name;

    private String category;

    private String difficulty;

    private String description;

    private String bestComplexity;

    private String averageComplexity;

    private String worstComplexity;

    private String spaceComplexity;

    private String language;

    private String sourceCode;

    @DBRef
    private Topic topic;

    private Instant createdAt = Instant.now();

    private Instant updatedAt = Instant.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getBestComplexity() { return bestComplexity; }
    public void setBestComplexity(String bestComplexity) { this.bestComplexity = bestComplexity; }
    public String getAverageComplexity() { return averageComplexity; }
    public void setAverageComplexity(String averageComplexity) { this.averageComplexity = averageComplexity; }
    public String getWorstComplexity() { return worstComplexity; }
    public void setWorstComplexity(String worstComplexity) { this.worstComplexity = worstComplexity; }
    public String getSpaceComplexity() { return spaceComplexity; }
    public void setSpaceComplexity(String spaceComplexity) { this.spaceComplexity = spaceComplexity; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getSourceCode() { return sourceCode; }
    public void setSourceCode(String sourceCode) { this.sourceCode = sourceCode; }
    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
