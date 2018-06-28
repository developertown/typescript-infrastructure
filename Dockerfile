# ---- Base Node ----
FROM mhart/alpine-node:9.11.1 AS base
WORKDIR /app
RUN apk add --no-cache make gcc git bash g++ python

# ---- Development ----
FROM base as development
WORKDIR /app