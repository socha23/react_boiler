FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8080

WORKDIR /tmp

ADD ozab.war ozab.war

ENTRYPOINT ["java", \
	"-Dspring.data.mongodb.host=ozab-mongodb", \
	"-Dspring.data.mongodb.port=27017", \
	"-jar","./ozab.war"]