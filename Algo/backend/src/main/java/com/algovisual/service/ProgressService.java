package com.algovisual.service;

import com.algovisual.dto.ProgressRequest;
import com.algovisual.dto.ProgressResponse;
import com.algovisual.entity.User;
import com.algovisual.entity.UserProgress;
import com.algovisual.exception.NotFoundException;
import com.algovisual.repository.UserProgressRepository;
import com.algovisual.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProgressService {
    private final UserRepository userRepository;
    private final UserProgressRepository progressRepository;

    public ProgressService(UserRepository userRepository, UserProgressRepository progressRepository) {
        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
    }

    public List<ProgressResponse> list(Long userId) {
        return progressRepository.findAllByUserIdOrderByUpdatedAtDesc(userId).stream()
                .map(ProgressResponse::from)
                .toList();
    }

    public ProgressResponse upsert(Long userId, ProgressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        UserProgress progress = progressRepository.findByUserIdAndAlgorithmId(userId, request.algorithmId())
                .orElseGet(() -> {
                    UserProgress created = new UserProgress();
                    created.setId(System.currentTimeMillis());
                    created.setUser(user);
                    created.setAlgorithmId(request.algorithmId());
                    return created;
                });
        apply(progress, request);
        return ProgressResponse.from(progressRepository.save(progress));
    }

    public ProgressResponse update(Long userId, Long id, ProgressRequest request) {
        UserProgress progress = progressRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new NotFoundException("Progress record not found"));
        if (!progress.getAlgorithmId().equals(request.algorithmId())) {
            throw new IllegalArgumentException("Algorithm id cannot be changed");
        }
        apply(progress, request);
        return ProgressResponse.from(progressRepository.save(progress));
    }

    private void apply(UserProgress progress, ProgressRequest request) {
        progress.setCompleted(request.completed());
        progress.setProgressPercentage(request.progressPercentage());
        progress.setLastStep(request.lastStep());
    }
}
