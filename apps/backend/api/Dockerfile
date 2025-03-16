# ---- Stage 1: Development ----
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install --force --only=development 

COPY . .

RUN npx prisma generate

EXPOSE 3000
EXPOSE 5555

# ---- Stage 2: Build ----
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=development /app /app
RUN npm run build:api 

# ---- Stage 3: Production ----
FROM node:22-alpine AS production

WORKDIR /app
COPY --from=build /app/apps/backend/api/package.json ./
COPY --from=build /app/apps/backend/api/dist ./dist
COPY --from=build /app/libs/backend/db/prisma ./prisma

RUN npm install --production --force

RUN npx prisma generate

EXPOSE 3000
