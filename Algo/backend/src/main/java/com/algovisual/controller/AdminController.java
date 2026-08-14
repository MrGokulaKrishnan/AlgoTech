package com.algovisual.controller;

import com.algovisual.dto.AlgorithmRequest;
import com.algovisual.dto.AlgorithmResponse;
import com.algovisual.dto.QuizQuestionRequest;
import com.algovisual.dto.QuizQuestionResponse;
import com.algovisual.dto.TopicRequest;
import com.algovisual.dto.TopicResponse;
import com.algovisual.dto.UserStatsResponse;
import com.algovisual.service.AdminContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminContentService adminContentService;

    public AdminController(AdminContentService adminContentService) { this.adminContentService = adminContentService; }

    @PostMapping("/topics")
    @ResponseStatus(HttpStatus.CREATED)
    TopicResponse createTopic(@Valid @RequestBody TopicRequest request) { return adminContentService.createTopic(request); }

    @PostMapping("/algorithms")
    @ResponseStatus(HttpStatus.CREATED)
    AlgorithmResponse createAlgorithm(@Valid @RequestBody AlgorithmRequest request) {
        return adminContentService.createAlgorithm(request);
    }

    @PutMapping("/algorithms/{id}")
    AlgorithmResponse updateAlgorithm(@PathVariable Long id, @Valid @RequestBody AlgorithmRequest request) {
        return adminContentService.updateAlgorithm(id, request);
    }

    @PostMapping("/quizzes/questions")
    @ResponseStatus(HttpStatus.CREATED)
    QuizQuestionResponse createQuestion(@Valid @RequestBody QuizQuestionRequest request) {
        return adminContentService.createQuestion(request);
    }

    @GetMapping("/users/stats")
    UserStatsResponse stats() { return adminContentService.stats(); }
}
