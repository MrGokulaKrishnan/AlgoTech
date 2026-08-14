package com.algovisual.controller;

import com.algovisual.dto.TopicResponse;
import com.algovisual.service.ContentService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final ContentService contentService;

    public TopicController(ContentService contentService) { this.contentService = contentService; }

    @GetMapping
    List<TopicResponse> list() { return contentService.topics(); }

    @GetMapping("/{id}")
    TopicResponse get(@PathVariable Long id) { return contentService.topic(id); }
}
