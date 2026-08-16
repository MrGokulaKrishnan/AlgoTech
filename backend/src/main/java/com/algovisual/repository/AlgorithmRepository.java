package com.algovisual.repository;

import com.algovisual.entity.Algorithm;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlgorithmRepository extends MongoRepository<Algorithm, Long> {
    List<Algorithm> findAllByOrderByNameAsc();
    List<Algorithm> findAllByTopicIdOrderByNameAsc(Long topicId);
}
