package com.algovisual.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "user_progress")
@CompoundIndex(name = "user_algo_idx", def = "{'user.id': 1, 'algorithmId': 1}", unique = true)
public class UserProgress {
    @Id
    private Long id;

    @DBRef
    private User user;

    private String algorithmId;

    private boolean completed;

    private int progressPercentage;

    private int lastStep;

    private Instant updatedAt = Instant.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getAlgorithmId() { return algorithmId; }
    public void setAlgorithmId(String algorithmId) { this.algorithmId = algorithmId; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public int getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; }
    public int getLastStep() { return lastStep; }
    public void setLastStep(int lastStep) { this.lastStep = lastStep; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
