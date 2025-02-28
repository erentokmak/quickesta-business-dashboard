#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG GITHUB_USERNAME
ARG GITHUB_TOKEN
WORKDIR /src

# Copy nuget.config and replace placeholders
COPY ["nuget.config", "."]
RUN sed -i "s|%GITHUB_USERNAME%|${GITHUB_USERNAME}|g" nuget.config \
    && sed -i "s|%GITHUB_TOKEN%|${GITHUB_TOKEN}|g" nuget.config

COPY ["MS.Services.Identity.Api/MS.Services.Identity.Api.csproj", "MS.Services.Identity.Api/"]
COPY ["MS.Services.Identity.Domain/MS.Services.Identity.Domain.csproj", "MS.Services.Identity.Domain/"]
COPY ["MS.Services.Identity.Application/MS.Services.Identity.Application.csproj", "MS.Services.Identity.Application/"]
COPY ["MS.Services.Identity.Infrastructure/MS.Services.Identity.Infrastructure.csproj", "MS.Services.Identity.Infrastructure/"]

# Restore packages
RUN dotnet restore "MS.Services.Identity.Api/MS.Services.Identity.Api.csproj"

# Copy everything else
COPY . .
WORKDIR "/src/MS.Services.Identity.Api"

# Build
RUN dotnet build "MS.Services.Identity.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MS.Services.Identity.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Debug için gerekli araçları ekleyelim
RUN apt-get update

# Health check için script ekleyelim
ENTRYPOINT ["dotnet", "MS.Services.Identity.Api.dll"]