# Handbook Assistant

An AI-powered assistant that turns a handbook into an intelligent, searchable tool. Built with FastAPI, n8n workflows, and a polished frontend, this project makes interacting with complex documents smooth and accessible.

##  Overview

- **Backend (`backend/`)**: A FastAPI server that handles user queries, communicates with LLM services, and returns structured responses.
- **Frontend (`frontend/`)**: A client interface (plain HTML, vanilla JS) that connects to the backend to let users interact via a chat-like UI.
- **Workflow (`n8n_workflow/`)**: n8n configurations to orchestrate file parsing, API calls, and database storage.
- **Infrastructure (`docker-compose.yml`)**: Brings up the entire stack—FastAPI, n8n, PostgreSQL—with a single command.

##  Why “Handbook Assistant”?

Ever wrestle with a thick PDF handbook—like employee policies, student guides, or user manuals—and wished you could just ask questions? That’s the puzzle this solves. Drop the handbook in, ask anything, and get crisp, context-aware answers.

## Getting Started

### Prerequisites

- Docker & Docker Compose installed  
- Your OpenAI (or preferred LLM) API key  
- A handbook PDF (or a set of files you want to query)

### Setup

```bash
git clone https://github.com/Kkoderr/handbook-assistant.git
cd handbook-assistant
docker compose up --build
```

### n8n Workflow Setup

Before using the bot efficiently, perform the following one-time manual setup in n8n:

- Open the n8n UI at http://localhost:5678.

- Import the workflow JSON from n8n_workflow/.

- Trigger the file parsing workflow manually:

  - This parses handbook PDFs and inserts Markdown content into Postgres.

  - If using embeddings, it creates vector entries in the database.

- Activate the AI workflow:

  - Once parsing and DB setup are done, turn the workflow on.

  - This workflow handles user queries and returns AI-generated answers.

⚠️ Manual triggering is only required once per dataset. After that, the bot works continuously.
