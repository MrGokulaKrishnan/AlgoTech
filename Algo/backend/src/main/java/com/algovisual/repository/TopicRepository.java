package com.algovisual.repository;

import com.algovisual.entity.Topic;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findAllByOrderBySortOrderAsc();
}
