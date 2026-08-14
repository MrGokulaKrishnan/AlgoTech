# Fallback Dockerfile for Render directory resolution
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/algovisual-api-0.1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
