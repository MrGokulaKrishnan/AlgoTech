package com.algovisual.repository;

import com.algovisual.entity.Algorithm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmRepository extends JpaRepository<Algorithm, Long> {
    List<Algorithm> findAllByOrderByNameAsc();
    List<Algorithm> findAllByTopicIdOrderByNameAsc(Long topicId);
}
