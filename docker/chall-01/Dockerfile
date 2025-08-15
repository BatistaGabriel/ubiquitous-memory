FROM docker.io/library/golang:alpine AS build
WORKDIR /app
COPY main.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static" -s -w' -o main main.go

FROM scratch
COPY --from=build /app/main /main
CMD ["/main"]