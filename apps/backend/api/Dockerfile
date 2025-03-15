# ---- Stage 1: Development ----
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install --force

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

RUN npx prisma generate

RUN npm install --production --force
EXPOSE 3000
