package com.algovisual.repository;

import com.algovisual.entity.Topic;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TopicRepository extends MongoRepository<Topic, Long> {
    List<Topic> findAllByOrderBySortOrderAsc();
}
