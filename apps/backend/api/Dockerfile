FROM node:22-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run dev:dashboard

FROM node:22-alpine as production

WORKDIR /app

COPY --from=development /app/dist/apps/frontend/dashboard ./
RUN npm install --only=production --legacy-peer-deps

