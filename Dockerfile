FROM golang

ENV PORT 5000

COPY web/server web/server

RUN go build web/server/server.go

COPY web/public web/public

EXPOSE 5000

ENTRYPOINT ./server
