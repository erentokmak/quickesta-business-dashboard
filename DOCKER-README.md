# Docker Setup for Quickesta Accounts Dashboard

This repository contains Docker configuration for running the Quickesta Accounts Dashboard application with Nginx.

## Prerequisites

- Docker and Docker Compose installed on your system
- SSL certificates for your domains

## Project Structure

- `nextjs/` - Contains the Dockerfile for the Next.js application
- `nginx/` - Contains the Nginx configuration and Dockerfile
- `docker-compose.yml` - Docker Compose configuration file
- `.env` - Environment variables for the Docker setup

## Environment Variables

Copy the example environment file and update it with your values:

```bash
cp .env.example .env
```

Edit the `.env` file and fill in the required values:

- `NEXT_PUBLIC_HASURA_GRAPHQL_URL` - URL for the Hasura GraphQL API
- `NEXT_PUBLIC_HASURA_ADMIN_SECRET` - Admin secret for the Hasura GraphQL API
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `NEXT_PUBLIC_ABANT_API_PROXY` - URL for the Abant API proxy
- `NEXTAUTH_SECRET` - Secret for NextAuth.js

## SSL Certificates

Make sure you have the following SSL certificate files in the `nginx/` directory:

- `quickesta.com.pem` - SSL certificate
- `quickesta.com.key` - SSL certificate key

## Running the Application

To start the application, run:

```bash
docker-compose up -d
```

This will start the following services:

- `nginx` - Nginx web server (ports 80 and 443)
- `nextjs-app` - Next.js application (dashboard.visa.quickesta.com)

## Accessing the Application

Once the application is running, you can access it at:

- Dashboard: https://dashboard.visa.quickesta.com

## Stopping the Application

To stop the application, run:

```bash
docker-compose down
```

## Logs

To view the logs for a specific service, run:

```bash
docker-compose logs -f [service-name]
```

Replace `[service-name]` with one of: `nginx` or `nextjs-app`.

## Rebuilding the Application

If you make changes to the application code, you need to rebuild the Docker images:

```bash
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Nginx Configuration

If you need to modify the Nginx configuration, edit the `nginx/nginx.conf` file and restart the Nginx service:

```bash
docker-compose restart nginx
```

### Next.js Application

If you need to modify the Next.js application, make your changes and rebuild the Docker image:

```bash
docker-compose build nextjs-app
docker-compose up -d
``` 