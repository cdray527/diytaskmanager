# ---- Stage 1: Development ----
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install --force --development

COPY . .

RUN npm install

EXPOSE 4000

# ---- Stage 2: Build ----
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=development /app /app
RUN npm run build:dashboard

# ---- Stage 3: Production ----
FROM node:22-alpine AS production

WORKDIR /app
COPY --from=build /app/apps/frontend/dashboard/package.json ./
COPY --from=build /app/apps/frontend/dashboard/.next ./.next
COPY --from=build /app/apps/frontend/dashboard/public ./public

RUN npm install --production --force
EXPOSE 4000