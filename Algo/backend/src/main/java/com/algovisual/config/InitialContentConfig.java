package com.algovisual.config;

import com.algovisual.entity.Algorithm;
import com.algovisual.entity.QuizOption;
import com.algovisual.entity.QuizQuestion;
import com.algovisual.entity.QuizQuestionType;
import com.algovisual.entity.Topic;
import com.algovisual.repository.AlgorithmRepository;
import com.algovisual.repository.QuizOptionRepository;
import com.algovisual.repository.QuizQuestionRepository;
import com.algovisual.repository.TopicRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InitialContentConfig {
    @Bean
    CommandLineRunner seedInitialContent(TopicRepository topicRepository, AlgorithmRepository algorithmRepository,
                                         QuizQuestionRepository questionRepository, QuizOptionRepository optionRepository) {
        return arguments -> {
            if (topicRepository.count() > 0) return;

            Topic arrays = topicRepository.save(topic("arrays", "Arrays", "Learn how ordered collections are stored and traversed.", "Beginner", 180, 2));
            Topic searching = topicRepository.save(topic("searching", "Searching", "Find a value efficiently by following clear comparisons.", "Beginner", 120, 4));
            Topic sorting = topicRepository.save(topic("sorting", "Sorting", "Put values in order while seeing every movement.", "Beginner", 240, 5));
            topicRepository.saveAll(List.of(
                    topic("programming-basics", "Programming Basics", "Build the essentials before tackling data structures.", "Foundations", 120, 1),
                    topic("strings", "Strings", "Work with sequences of characters.", "Beginner", 180, 3),
                    topic("linked-lists", "Linked Lists", "Explore node-based collections.", "Intermediate", 240, 6),
                    topic("stack-queue", "Stack & Queue", "Learn two fundamental linear data structures.", "Intermediate", 180, 7),
                    topic("recursion", "Recursion", "Solve a problem by reducing it to smaller versions.", "Intermediate", 180, 8),
                    topic("trees", "Trees", "Understand hierarchical data structures.", "Intermediate", 300, 9),
                    topic("graphs", "Graphs", "Model connected systems and paths.", "Intermediate", 360, 10),
                    topic("dynamic-programming", "Dynamic Programming", "Reuse solutions to overlapping subproblems.", "Intermediate", 480, 11)
            ));

            algorithmRepository.saveAll(List.of(
                    algorithm("linear-search", "Linear Search", "Searching", "Beginner", "Check each value in order until the target is found.", "O(1)", "O(n)", "O(n)", searching, "for each value: if value == target return index;"),
                    algorithm("binary-search", "Binary Search", "Searching", "Beginner", "Use a sorted array to safely discard half the remaining values.", "O(1)", "O(log n)", "O(log n)", searching, "while (left <= right) { int mid = (left + right) / 2; }"),
                    algorithm("bubble-sort", "Bubble Sort", "Sorting", "Beginner", "Swap neighbouring out-of-order values over repeated passes.", "O(n)", "O(n²)", "O(n²)", sorting, "for each pass: compare neighbours and swap when needed;"),
                    algorithm("selection-sort", "Selection Sort", "Sorting", "Beginner", "Select the smallest remaining value for each position.", "O(n²)", "O(n²)", "O(n²)", sorting, "for each position: find the smallest remaining value;"),
                    algorithm("insertion-sort", "Insertion Sort", "Sorting", "Beginner", "Insert each value into a growing sorted section.", "O(n)", "O(n²)", "O(n²)", sorting, "for each value: shift larger values and insert the key;"),
                    algorithm("array-traversal", "Array Traversal", "Arrays", "Beginner", "Visit every value in an array once.", "O(n)", "O(n)", "O(n)", arrays, "for (int value : array) { visit(value); }")
            ));

            QuizQuestion binaryQuestion = questionRepository.save(question(searching, QuizQuestionType.COMPLEXITY,
                    "What is the worst-case time complexity of Binary Search on a sorted array?",
                    "Binary Search halves the remaining search space after every comparison, so it takes O(log n) time."));
            optionRepository.saveAll(List.of(option(binaryQuestion, "O(n²)", false), option(binaryQuestion, "O(n)", false), option(binaryQuestion, "O(log n)", true), option(binaryQuestion, "O(1)", false)));
        };
    }

    private Topic topic(String slug, String name, String description, String difficulty, int minutes, int order) {
        Topic topic = new Topic();
        topic.setSlug(slug);
        topic.setName(name);
        topic.setDescription(description);
        topic.setDifficulty(difficulty);
        topic.setEstimatedMinutes(minutes);
        topic.setSortOrder(order);
        return topic;
    }

    private Algorithm algorithm(String slug, String name, String category, String difficulty, String description,
                                String best, String average, String worst, Topic topic, String sourceCode) {
        Algorithm algorithm = new Algorithm();
        algorithm.setSlug(slug);
        algorithm.setName(name);
        algorithm.setCategory(category);
        algorithm.setDifficulty(difficulty);
        algorithm.setDescription(description);
        algorithm.setBestComplexity(best);
        algorithm.setAverageComplexity(average);
        algorithm.setWorstComplexity(worst);
        algorithm.setSpaceComplexity("O(1)");
        algorithm.setLanguage("Java");
        algorithm.setSourceCode(sourceCode);
        algorithm.setTopic(topic);
        return algorithm;
    }

    private QuizQuestion question(Topic topic, QuizQuestionType type, String text, String explanation) {
        QuizQuestion question = new QuizQuestion();
        question.setTopic(topic);
        question.setType(type);
        question.setQuestionText(text);
        question.setExplanation(explanation);
        return question;
    }

    private QuizOption option(QuizQuestion question, String text, boolean correct) {
        QuizOption option = new QuizOption();
        option.setQuestion(question);
        option.setText(text);
        option.setCorrect(correct);
        return option;
    }
}
