# RAG Chatbot – Frontend

This is the frontend for a RAG-powered chatbot that answers news-related queries. Built with React, TailwindCSS, and Vite.

## Tech Stack

- React 18 + TypeScript
- TailwindCSS
- Vite
- lucide-react for icons
- uuid for session ids

## Features

- Responsive chat UI with dark mode
- Session-based chat via `session_id` in localStorage
- Live typing indicator, smooth scrolling
- API calls to backend for `/chat`, `/history`, `/reset`

## src folder structure

```
src/
  components/      # UI building blocks (ChatInput, ChatMessage, etc.)
  context/         # Theme context (light/dark mode)
  hooks/           # useChatSession: session logic, API calls, localStorage
  types/           # TypeScript enums and interfaces
  utils/           # Formatters for timestamps and fake bot fallback responses
```

- `POST /chat` – Send user message, receive AI response
- `GET /history?session_id=...` – Fetch full session history
- `POST /reset` – Clear chat history and reset session

## Notes

- Session ID is stored in `localStorage`
- Fetch errors display in the chat UI
- Designed to be lightweight, extendable, and production-ready
