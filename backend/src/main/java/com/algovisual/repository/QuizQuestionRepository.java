package com.algovisual.repository;

import com.algovisual.entity.QuizQuestion;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizQuestionRepository extends MongoRepository<QuizQuestion, Long> {
    List<QuizQuestion> findAllByTopicIdOrderByIdAsc(Long topicId);
}
