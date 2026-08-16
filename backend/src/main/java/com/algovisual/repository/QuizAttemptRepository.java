package com.algovisual.repository;

import com.algovisual.entity.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, Long> {
    long countByUserId(Long userId);
    long countByUserIdAndCorrectTrue(Long userId);
}
