package com.algovisual.repository;

import com.algovisual.entity.QuizOption;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizOptionRepository extends JpaRepository<QuizOption, Long> {
    List<QuizOption> findAllByQuestionIdOrderByIdAsc(Long questionId);
    Optional<QuizOption> findByIdAndQuestionId(Long id, Long questionId);
}
