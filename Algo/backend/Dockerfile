# Multi-stage Docker build for AlgoVisual Spring Boot API (Java 17)

# Stage 1: Build JAR using Maven & Temurin 17 JDK
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

# Stage 2: Minimal JRE 17 runtime container for Render
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/algovisual-api-0.1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
