package com.algovisual.service;

import com.algovisual.dto.QuizOptionResponse;
import com.algovisual.dto.QuizQuestionResponse;
import com.algovisual.dto.QuizSubmissionRequest;
import com.algovisual.dto.QuizSubmissionResponse;
import com.algovisual.entity.QuizAttempt;
import com.algovisual.entity.QuizOption;
import com.algovisual.entity.QuizQuestion;
import com.algovisual.entity.User;
import com.algovisual.exception.NotFoundException;
import com.algovisual.repository.QuizAttemptRepository;
import com.algovisual.repository.QuizOptionRepository;
import com.algovisual.repository.QuizQuestionRepository;
import com.algovisual.repository.TopicRepository;
import com.algovisual.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizService {
    private final TopicRepository topicRepository;
    private final QuizQuestionRepository questionRepository;
    private final QuizOptionRepository optionRepository;
    private final QuizAttemptRepository attemptRepository;
    private final UserRepository userRepository;

    public QuizService(TopicRepository topicRepository, QuizQuestionRepository questionRepository,
                       QuizOptionRepository optionRepository, QuizAttemptRepository attemptRepository,
                       UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.attemptRepository = attemptRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<QuizQuestionResponse> questions(Long topicId) {
        if (!topicRepository.existsById(topicId)) throw new NotFoundException("Topic not found");
        return questionRepository.findAllByTopicIdOrderByIdAsc(topicId).stream()
                .map(question -> QuizQuestionResponse.from(question,
                        optionRepository.findAllByQuestionIdOrderByIdAsc(question.getId()).stream()
                                .map(QuizOptionResponse::from).toList()))
                .toList();
    }

    @Transactional
    public QuizSubmissionResponse submit(Long userId, Long questionId, QuizSubmissionRequest request) {
        QuizQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new NotFoundException("Quiz question not found"));
        QuizOption selected = optionRepository.findByIdAndQuestionId(request.selectedOptionId(), questionId)
                .orElseThrow(() -> new NotFoundException("Selected option does not belong to this question"));
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuestion(question);
        attempt.setSelectedOption(selected);
        attempt.setCorrect(selected.isCorrect());
        attemptRepository.save(attempt);

        Long correctOptionId = optionRepository.findAllByQuestionIdOrderByIdAsc(questionId).stream()
                .filter(QuizOption::isCorrect).findFirst().map(QuizOption::getId)
                .orElseThrow(() -> new IllegalStateException("Quiz question has no correct option"));
        return new QuizSubmissionResponse(selected.isCorrect(), question.getExplanation(), correctOptionId);
    }
}
