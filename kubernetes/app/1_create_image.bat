SET TAG=v4

cd ../..
call gradle build -Pprofile=dev
cd kubernetes/app
copy ..\..\build\libs\ozab-0.0.1.war ozab.war
docker build -t ozab-app:%TAG% .
docker tag ozab-app:%TAG% eu.gcr.io/ozab-195119/ozap-app:%TAG%
gcloud docker -- push eu.gcr.io/ozab-195119/ozap-app:%TAG%