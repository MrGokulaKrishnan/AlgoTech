CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email)
);

CREATE TABLE topics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    slug VARCHAR(80) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    estimated_minutes INT NOT NULL,
    sort_order INT NOT NULL,
    created_at TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_topics_slug (slug)
);

CREATE TABLE algorithms (
    id BIGINT NOT NULL AUTO_INCREMENT,
    slug VARCHAR(80) NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    best_complexity VARCHAR(30) NOT NULL,
    average_complexity VARCHAR(30) NOT NULL,
    worst_complexity VARCHAR(30) NOT NULL,
    space_complexity VARCHAR(30) NOT NULL,
    language VARCHAR(30) NOT NULL,
    source_code LONGTEXT NOT NULL,
    topic_id BIGINT NOT NULL,
    created_at TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_algorithms_slug (slug),
    CONSTRAINT fk_algorithms_topic FOREIGN KEY (topic_id) REFERENCES topics (id)
);

CREATE TABLE user_progress (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    algorithm_id VARCHAR(80) NOT NULL,
    completed BOOLEAN NOT NULL,
    progress_percentage INT NOT NULL,
    last_step INT NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_progress_algorithm (user_id, algorithm_id),
    CONSTRAINT fk_user_progress_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE quiz_questions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    topic_id BIGINT NOT NULL,
    type VARCHAR(30) NOT NULL,
    question_text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_questions_topic FOREIGN KEY (topic_id) REFERENCES topics (id)
);

CREATE TABLE quiz_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    text TEXT NOT NULL,
    correct BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_options_question FOREIGN KEY (question_id) REFERENCES quiz_questions (id)
);

CREATE TABLE quiz_attempts (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_option_id BIGINT NOT NULL,
    correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_attempts_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_quiz_attempts_question FOREIGN KEY (question_id) REFERENCES quiz_questions (id),
    CONSTRAINT fk_quiz_attempts_selected_option FOREIGN KEY (selected_option_id) REFERENCES quiz_options (id)
);
