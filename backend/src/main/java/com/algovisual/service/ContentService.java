package com.algovisual.service;

import com.algovisual.dto.AlgorithmResponse;
import com.algovisual.dto.TopicResponse;
import com.algovisual.exception.NotFoundException;
import com.algovisual.repository.AlgorithmRepository;
import com.algovisual.repository.TopicRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ContentService {
    private final TopicRepository topicRepository;
    private final AlgorithmRepository algorithmRepository;

    public ContentService(TopicRepository topicRepository, AlgorithmRepository algorithmRepository) {
        this.topicRepository = topicRepository;
        this.algorithmRepository = algorithmRepository;
    }

    public List<TopicResponse> topics() {
        return topicRepository.findAllByOrderBySortOrderAsc().stream().map(TopicResponse::from).toList();
    }

    public TopicResponse topic(Long id) {
        return topicRepository.findById(id).map(TopicResponse::from)
                .orElseThrow(() -> new NotFoundException("Topic not found"));
    }

    public List<AlgorithmResponse> algorithms(Long topicId) {
        if (topicId == null) return algorithmRepository.findAllByOrderByNameAsc().stream().map(AlgorithmResponse::from).toList();
        if (!topicRepository.existsById(topicId)) throw new NotFoundException("Topic not found");
        return algorithmRepository.findAllByTopicIdOrderByNameAsc(topicId).stream().map(AlgorithmResponse::from).toList();
    }

    public AlgorithmResponse algorithm(Long id) {
        return algorithmRepository.findById(id).map(AlgorithmResponse::from)
                .orElseThrow(() -> new NotFoundException("Algorithm not found"));
    }
}
