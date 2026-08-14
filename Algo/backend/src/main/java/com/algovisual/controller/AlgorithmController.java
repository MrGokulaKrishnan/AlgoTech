package com.algovisual.controller;

import com.algovisual.dto.AlgorithmResponse;
import com.algovisual.service.ContentService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {
    private final ContentService contentService;

    public AlgorithmController(ContentService contentService) { this.contentService = contentService; }

    @GetMapping
    List<AlgorithmResponse> list(@RequestParam(required = false) Long topicId) {
        return contentService.algorithms(topicId);
    }

    @GetMapping("/{id}")
    AlgorithmResponse get(@PathVariable Long id) { return contentService.algorithm(id); }
}
