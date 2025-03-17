# Diytaskmanager

This project is a simple task management app. Users can create tasks, view all tasks, edit tasks, and remove tasks.
![Task Dashboard](https://snipboard.io/ytzn5X.jpg)

## Key Features:

-   **RESTful API** for managing tasks
-   **Swagger Docs** for API reference
-   **Responsive UI**
-   **Manageable Monorepo** with NX powerful features like dependency graph and a single root `package.json` for efficient dependency management
-   **Dockerized setup** for consistent development within teams & easy deployment
-   **Separate CI/CD pipelines** for the frontend and backend
-   **Hosted on AWS EC2**

## Tech Stack

**Workspace**: NX Monorepo

**Backend**:

-   Node NestJS
-   Prisma ORM
-   Swagger Docs

**Frontend**:

-   React Next.js
-   TailwindCSS
-   DaisyUI

**Database**:

-   PostgreSQL

## Running Locally

### Prerequisites:

-   Node.js v22
-   Docker compose

### Steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-repo/diytaskmanager.git
    cd diytaskmanager
    ```
2. **Create a `.env` file** (refer to `.env.example`).
3. **Start services with Docker Compose:**

    ```sh
    docker-compose -f dockerconfig/docker-compose.dev.yml up -d
    ```

    **(Run Locally for the First Time)**

    ```sh
    docker exec -it diytaskmanager-api sh

    # Init database
    npx prisma migrate dev --name init

    # Seed default data
    npx tsx libs/backend/db/pr

    exit

    docker-compose -f dockerconfig/docker-compose.dev.yml down
    docker-compose -f dockerconfig/docker-compose.dev.yml up -d
    ```

4. **Access the application:**

**Access locally**

    - Swagger Docs: http://localhost:3000/docs
    - Task API: http://localhost:3000/task
    - Dashboard App: http://localhost:4000

**Access the deployed application on EC2**

-   [http://18.141.192.252:4000/](http://18.141.192.252:4000/)

## Project Structure

```
📦 diytaskmanager
├── apps
│   ├── frontend
│   │   ├── dashboard/        # Next.js Dashboard App
│   │   ├── dashboard-e2e/    # E2E tests for Dashboard
│   ├── backend
│   │   ├── api/              # NestJS API
│   │   ├── api-e2e/          # E2E tests for API
├── libs
│   ├── frontend
│   │   ├── ui/               # Shared UI components
│   │   ├── utils/            # typescript interface, custom hooks, tools etc...
│   │   ├── services/         # API calls
│   ├── backend
│   │   ├── db/               # Database config
├── dockerconfig
│   ├── docker-compose.yml    # Docker compose config
├── .env.example              # Put env here
├── package.json              # Dependencies & scripts
```
