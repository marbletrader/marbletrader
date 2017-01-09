# (if docker login is needed)
# aws ecr get-login --region ap-southeast-1
function build {
  cd server
  CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
  cd ..
}

case $1 in
  watch)
    build
    docker restart marbletrader_server_1
    inotifywait -e close_write,moved_to,create  ./server -r |
    while read -r directory events filename; do
      ./scripts.sh watch
    done
    ;;
  quick)
    build
    ;;
  deploy)
    build
    docker build -t absurdisms/marbletrader:latest .
    docker push absurdisms/marbletrader:latest
    ;;
  *)
esac
