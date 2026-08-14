package com.algovisual.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record QuizOptionInput(@NotBlank @Size(max = 1000) String text, boolean correct) { }
