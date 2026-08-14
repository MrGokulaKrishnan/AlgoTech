package com.algovisual.controller;

import com.algovisual.dto.QuizQuestionResponse;
import com.algovisual.dto.QuizSubmissionRequest;
import com.algovisual.dto.QuizSubmissionResponse;
import com.algovisual.security.UserPrincipal;
import com.algovisual.service.QuizService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) { this.quizService = quizService; }

    @GetMapping("/{topicId}")
    List<QuizQuestionResponse> questions(@PathVariable Long topicId) { return quizService.questions(topicId); }

    @PostMapping("/{questionId}/submit")
    QuizSubmissionResponse submit(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long questionId,
                                  @Valid @RequestBody QuizSubmissionRequest request) {
        return quizService.submit(principal.getId(), questionId, request);
    }
}
