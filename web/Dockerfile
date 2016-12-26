FROM golang

ENV PORT 5000

COPY server server

WORKDIR server

RUN go install

COPY public public

EXPOSE 5000

ENTRYPOINT server
