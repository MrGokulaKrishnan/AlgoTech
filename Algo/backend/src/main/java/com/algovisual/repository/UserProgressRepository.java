package com.algovisual.repository;

import com.algovisual.entity.UserProgress;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findAllByUserIdOrderByUpdatedAtDesc(Long userId);
    Optional<UserProgress> findByUserIdAndAlgorithmId(Long userId, String algorithmId);
    Optional<UserProgress> findByIdAndUserId(Long id, Long userId);
}
