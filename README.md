# profile-project

Example Project for testing Spring Boot in combination with ReactJS where Spring also serves the frontend.

## Instructions for building an running

Project in Java and JavaScript can be built using maven via `mvn clean package`, which will create a file *profile-project-0.0.1-SNAPSHOT.jar* in the target directory.
The backend + frontend can be run by executing `java -jar profile-project-0.0.1-SNAPSHOT.jar`. Application runs on port 8080.
Solely the backend can be run as well in IntelliJ by running the class *ProfileProjectApplication*.
Solely the frontend can be run via `npm install` and then executing `npm run start`.
In case the maven build should not work, there is a built available in the folder bin-demo, which has some sample data.

## Implementation Details

Spring Project runs with embedded H2 database and is making use of Restcontrollers, JPA repositories, Caching, Unit tests, DTO Validation, DTO Entity differentiation, Logging/Logtracing configurations.
ReactJS Project is making use of the Material UI Framework with other plugins like SASS, Axios, etc.
