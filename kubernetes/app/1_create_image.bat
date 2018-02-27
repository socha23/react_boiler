cd ../..
call gradle build -Pprofile=dev
cd kubernetes/app
copy ..\..\build\libs\ozab-0.0.1.war ozab.war
docker build -t ozab-app:v3 .
del ozab.war