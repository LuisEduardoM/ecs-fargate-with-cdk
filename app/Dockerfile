FROM --platform=linux/amd64 openjdk:11-jdk

COPY /build/libs/app-0.0.1-SNAPSHOT.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","app.jar"]