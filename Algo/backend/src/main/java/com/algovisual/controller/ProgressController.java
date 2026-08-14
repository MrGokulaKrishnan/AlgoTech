package com.algovisual.controller;

import com.algovisual.dto.ProgressRequest;
import com.algovisual.dto.ProgressResponse;
import com.algovisual.security.UserPrincipal;
import com.algovisual.service.ProgressService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) { this.progressService = progressService; }

    @GetMapping
    List<ProgressResponse> list(@AuthenticationPrincipal UserPrincipal principal) {
        return progressService.list(principal.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ProgressResponse upsert(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody ProgressRequest request) {
        return progressService.upsert(principal.getId(), request);
    }

    @PutMapping("/{id}")
    ProgressResponse update(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id,
                            @Valid @RequestBody ProgressRequest request) {
        return progressService.update(principal.getId(), id, request);
    }
}
