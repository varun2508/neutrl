SQL_INSTANCE=carbon-neutral-dev:us-central1:carbon-neutral-staging

docker build -t gcr.io/$1/$2:$3 -f ./Dockerfile.staging .
docker push gcr.io/$1/$2:$3

gcloud run deploy $2 --image gcr.io/$1/$2:$3 \
--add-cloudsql-instances $SQL_INSTANCE \
--update-env-vars INSTANCE_CONNECTION_NAME="$SQL_INSTANCE" \
--platform managed