package com.algovisual.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quiz_options")
public class QuizOption {
    @Id
    private Long id;

    @DBRef
    private QuizQuestion question;

    private String text;

    private boolean correct;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public QuizQuestion getQuestion() { return question; }
    public void setQuestion(QuizQuestion question) { this.question = question; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
}
