package com.algovisual.repository;

import com.algovisual.entity.QuizQuestion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findAllByTopicIdOrderByIdAsc(Long topicId);
}
