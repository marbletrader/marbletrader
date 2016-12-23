# (if docker login is needed)
# aws ecr get-login --region ap-southeast-1
docker build -t absurdisms/marbletrader:latest .
docker push absurdisms/marbletrader:latest
