# Fase di build
FROM golang:1.23 as builder

WORKDIR /app

# Copia i file del progetto
COPY . .

# Scarica le dipendenze e costruisci il binario
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dashboardfluidos .

# Fase di runtime
FROM alpine:3.14

# Crea una directory per i file statici
RUN mkdir -p /app/dist

# Copia il binario e i file statici
COPY --from=builder /app/dashboardfluidos /dashboardfluidos
COPY --from=builder /app/dist /app/dist

# Installazione di ca-certificates se necessario per HTTPS
RUN apk --no-cache add ca-certificates

# Imposta la directory di lavoro
WORKDIR /app

# Espone la porta su cui il server ascolterà
EXPOSE 8080

# Esegui il binario
ENTRYPOINT ["/dashboardfluidos"]
