package com.algovisual.service;

import com.algovisual.dto.AlgorithmRequest;
import com.algovisual.dto.AlgorithmResponse;
import com.algovisual.dto.QuizOptionInput;
import com.algovisual.dto.QuizQuestionRequest;
import com.algovisual.dto.QuizQuestionResponse;
import com.algovisual.dto.TopicRequest;
import com.algovisual.dto.TopicResponse;
import com.algovisual.dto.UserStatsResponse;
import com.algovisual.entity.Algorithm;
import com.algovisual.entity.QuizOption;
import com.algovisual.entity.QuizQuestion;
import com.algovisual.entity.QuizQuestionType;
import com.algovisual.entity.Topic;
import com.algovisual.exception.NotFoundException;
import com.algovisual.repository.AlgorithmRepository;
import com.algovisual.repository.QuizAttemptRepository;
import com.algovisual.repository.QuizOptionRepository;
import com.algovisual.repository.QuizQuestionRepository;
import com.algovisual.repository.TopicRepository;
import com.algovisual.repository.UserProgressRepository;
import com.algovisual.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AdminContentService {
    private final TopicRepository topicRepository;
    private final AlgorithmRepository algorithmRepository;
    private final QuizQuestionRepository questionRepository;
    private final QuizOptionRepository optionRepository;
    private final UserRepository userRepository;
    private final UserProgressRepository progressRepository;
    private final QuizAttemptRepository attemptRepository;

    public AdminContentService(TopicRepository topicRepository, AlgorithmRepository algorithmRepository,
                               QuizQuestionRepository questionRepository, QuizOptionRepository optionRepository,
                               UserRepository userRepository, UserProgressRepository progressRepository,
                               QuizAttemptRepository attemptRepository) {
        this.topicRepository = topicRepository;
        this.algorithmRepository = algorithmRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
        this.attemptRepository = attemptRepository;
    }

    public TopicResponse createTopic(TopicRequest request) {
        Topic topic = new Topic();
        topic.setId(System.currentTimeMillis());
        apply(topic, request);
        return TopicResponse.from(topicRepository.save(topic));
    }

    public AlgorithmResponse createAlgorithm(AlgorithmRequest request) {
        Algorithm algorithm = new Algorithm();
        algorithm.setId(System.currentTimeMillis());
        apply(algorithm, request);
        return AlgorithmResponse.from(algorithmRepository.save(algorithm));
    }

    public AlgorithmResponse updateAlgorithm(Long id, AlgorithmRequest request) {
        Algorithm algorithm = algorithmRepository.findById(id).orElseThrow(() -> new NotFoundException("Algorithm not found"));
        apply(algorithm, request);
        return AlgorithmResponse.from(algorithmRepository.save(algorithm));
    }

    public QuizQuestionResponse createQuestion(QuizQuestionRequest request) {
        long correctOptions = request.options().stream().filter(QuizOptionInput::correct).count();
        if (correctOptions != 1) throw new IllegalArgumentException("Exactly one quiz option must be marked correct");
        Topic topic = topicRepository.findById(request.topicId()).orElseThrow(() -> new NotFoundException("Topic not found"));
        QuizQuestion question = new QuizQuestion();
        question.setId(System.currentTimeMillis());
        question.setTopic(topic);
        try {
            question.setType(QuizQuestionType.valueOf(request.type().trim().toUpperCase()));
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Quiz type is invalid");
        }
        question.setQuestionText(request.questionText().trim());
        question.setExplanation(request.explanation().trim());
        QuizQuestion saved = questionRepository.save(question);
        List<QuizOption> options = request.options().stream().map(input -> {
            QuizOption option = new QuizOption();
            option.setId(System.currentTimeMillis() + (long)(Math.random() * 1000));
            option.setQuestion(saved);
            option.setText(input.text().trim());
            option.setCorrect(input.correct());
            return option;
        }).toList();
        List<QuizOption> savedOptions = optionRepository.saveAll(options);
        return QuizQuestionResponse.from(saved, savedOptions.stream()
                .map(option -> new com.algovisual.dto.QuizOptionResponse(option.getId(), option.getText())).toList());
    }

    public UserStatsResponse stats() {
        return new UserStatsResponse(userRepository.count(), progressRepository.count(), attemptRepository.count());
    }

    private void apply(Topic topic, TopicRequest request) {
        topic.setSlug(request.slug().trim());
        topic.setName(request.name().trim());
        topic.setDescription(request.description().trim());
        topic.setDifficulty(request.difficulty().trim());
        topic.setEstimatedMinutes(request.estimatedMinutes());
        topic.setSortOrder(request.sortOrder());
    }

    private void apply(Algorithm algorithm, AlgorithmRequest request) {
        Topic topic = topicRepository.findById(request.topicId()).orElseThrow(() -> new NotFoundException("Topic not found"));
        algorithm.setSlug(request.slug().trim());
        algorithm.setName(request.name().trim());
        algorithm.setCategory(request.category().trim());
        algorithm.setDifficulty(request.difficulty().trim());
        algorithm.setDescription(request.description().trim());
        algorithm.setBestComplexity(request.bestComplexity().trim());
        algorithm.setAverageComplexity(request.averageComplexity().trim());
        algorithm.setWorstComplexity(request.worstComplexity().trim());
        algorithm.setSpaceComplexity(request.spaceComplexity().trim());
        algorithm.setLanguage(request.language().trim());
        algorithm.setSourceCode(request.sourceCode());
        algorithm.setTopic(topic);
    }
}
