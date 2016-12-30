case $1 in
  watch)
    CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
    docker restart marbletrader_server_1
    inotifywait -e close_write,moved_to,create  . ./db |
    while read -r directory events filename; do
      ./build.sh watch
    done
    ;;
  *)
esac
