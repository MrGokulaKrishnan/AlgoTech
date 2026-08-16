package com.algovisual.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "quiz_attempts")
public class QuizAttempt {
    @Id
    private Long id;

    @DBRef
    private User user;

    @DBRef
    private QuizQuestion question;

    @DBRef
    private QuizOption selectedOption;

    private boolean correct;

    private Instant attemptedAt = Instant.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public QuizQuestion getQuestion() { return question; }
    public void setQuestion(QuizQuestion question) { this.question = question; }
    public QuizOption getSelectedOption() { return selectedOption; }
    public void setSelectedOption(QuizOption selectedOption) { this.selectedOption = selectedOption; }
    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
    public Instant getAttemptedAt() { return attemptedAt; }
    public void setAttemptedAt(Instant attemptedAt) { this.attemptedAt = attemptedAt; }
}
