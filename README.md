# profile-project

Example Project for testing Spring Boot in combination with ReactJS where Spring also serves the frontend.

## Instructions for building an running

Project in java and javascript can be built using maven via `mvn clean package`, which will a file *profile-project-0.0.1-SNAPSHOT.jar* in the target directory.
The backend + frontend can be run using this jar and executing `java -jar profile-project-0.0.1-SNAPSHOT.jar` and connecting to *http://localhost:8080*.
Solely the backend can be run as well in IntelliJ by running the class *ProfileProjectApplication*.
Solely the frontend can be run via `npm install` and then executing `npm run start`.
In case the maven build should not work, there is a built available in the folder bin-demo, which can be executed with some sample data.

## Implementation Details

Spring Project is making use of Restcontrollers, JPA repositories, Caching, Unit tests, DTO Validation, DTO Entity differentiation.
ReactJS Project is making use of the Material UI Framework with other plugins like SASS, Axios, etc.
