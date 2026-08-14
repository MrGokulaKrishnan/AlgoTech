package com.algovisual.repository;

import com.algovisual.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    long countByUserId(Long userId);
    long countByUserIdAndCorrectTrue(Long userId);
}
