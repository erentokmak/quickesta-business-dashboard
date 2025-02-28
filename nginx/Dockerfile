FROM nginx:alpine

# Nginx konfigürasyonunu kopyala
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# SSL sertifikalarını kopyala
COPY ./nginx/quickesta.com.pem /etc/nginx/quickesta.com.pem
COPY ./nginx/quickesta.com.key /etc/nginx/quickesta.com.key

# Port'ları aç
EXPOSE 80
EXPOSE 443
