FROM golang

ENV PORT 80

RUN go get github.com/danielkermode/marbletrader/web/server

ADD web/public web/public

EXPOSE 80

ENTRYPOINT server
