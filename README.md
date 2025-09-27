# Todo List App — API Integrated (Frontend)

**Author:** Thanawat Chuamuangphan
**Project type:** Frontend assessment
**Stack:** React, TypeScript, Vite, TailwindCSS, Axios, Context API

---

## Project overview

This repository contains a Todo List front-end application implemented with React and TypeScript. The application demonstrates client-side state management, clean separation of concerns, and integration with a RESTful API for persistent storage of todo items. It is designed as a compact, production-minded example for a frontend take-home assignment.

Key objectives:

- Provide a clear and maintainable code structure.
- Demonstrate integration with an external API.
- Show considered choices in state management, typing, and styling.
- Include basic UX improvements such as loading states and notifications.

---

## Features

- List todos fetched from an external API.
- Create new todos.
- Toggle todo completion.
- Update and delete todos.
- Loading and error states.
- Notification feedback for success/error (using react-hot-toast).
- Minimal, responsive UI implemented with TailwindCSS and DaisyUI.

---

## Tech stack

- **React** (functional components)
- **TypeScript** (static typing)
- **Vite** (dev server and build)
- **TailwindCSS** + **DaisyUI** (utility-first styling + components)
- **Axios** (HTTP client)
- **React Context + Custom Hook** (application state)
- **react-hot-toast** (user feedback)

---

## Prerequisites

- Node.js 18+ recommended
- npm (or compatible package manager)

---

## Setup & Running

1. Clone the repository

   ```bash
   git clone https://github.com/kimhanz/my-todo-app.git
   cd my-todo-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open the application in a browser:
   ```
   http://localhost:5173
   ```

---

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production (`tsc -b && vite build`)
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

---

## Configuration / API base URL

The app uses an Axios instance defined in `src/services/api.ts`. By default the project is configured to talk to:

```
https://68d787692144ea3f6da5960a.mockapi.io
```

If you need to change the API endpoint for local testing or a different backend, you may:

- Edit the `baseURL` in `src/services/api.ts`; or
- Refactor the module to read from an environment variable (e.g., `import.meta.env.VITE_API_BASE`) if you prefer a runtime-configurable approach.

---

## Project structure (key files)

```
src/
 ├─ components/
 │   ├─ TodoList.tsx      # List container + UI for todos
 │   ├─ TodoItem.tsx      # Individual todo row (toggle, edit, delete)
 │   ├─ TodoForm.tsx      # Controlled form to add/edit todos
 │   └─ Loader.tsx        # Small loader component for UI feedback
 ├─ context/
 │   └─ TodoContext.tsx   # Context provider — holds todos, loading, error, and CRUD actions
 ├─ hooks/
 │   └─ useTodos.ts       # Custom hook to consume TodoContext
 ├─ services/
 │   └─ api.ts            # Axios instance and API call wrapper(s)
 ├─ types/
 │   └─ todos.ts          # TypeScript types (Todo interface)
 ├─ App.tsx
 └─ main.tsx
```

---

## API contract (used by the frontend)

The app expects the following REST endpoints on the configured base URL:

- `GET /todos` — retrieve list of todos (response: `Todo[]`)
- `POST /todos` — create a new todo (body: `{ title: string, completed?: boolean }`)
- `PUT /todos/:id` or `PATCH /todos/:id` — update a todo (body: partial fields)
- `DELETE /todos/:id` — delete a todo

`Todo` shape (from `src/types/todos.ts`):

```ts
export interface Todo {
  id: number
  title: string
  completed: boolean
}
```

---

## API contract (used by the frontend)

The app expects the following REST endpoints on the configured base URL:

- `GET /todos` — retrieve list of todos (response: `Todo[]`)
- `POST /todos` — create a new todo (body: `{ title: string, completed?: boolean }`)
- `PUT /todos/:id` or `PATCH /todos/:id` — update a todo (body: partial fields)
- `DELETE /todos/:id` — delete a todo

`Todo` shape (from `src/types/todos.ts`):

```ts
export interface Todo {
  id: number
  title: string
  completed: boolean
}
```

---

## Architectural decisions & thought process

### Code organization

- **Services layer** (`src/services/api.ts`): isolates API calls and Axios configuration, making it straightforward to swap endpoints or add request interceptors in one place.
- **Context + custom hook** (`src/context/TodoContext.tsx` + `src/hooks/useTodos.ts`): chosen because the application requires light global state (todos, loading, error) without the added complexity of a larger state-management library. The custom hook provides ergonomics and encapsulation for consumers.
- **Component boundaries**: Presentational components (form, list, item, loader) are intentionally small and single-purpose to improve readability and reusability.

### Tooling choices

- **TypeScript**: enforce correctness and provide better DX via autocompletion and compile-time checks.
- **Vite**: fast HMR and quick iteration; suitable for test assignments where reviewers expect short startup times.
- **TailwindCSS + DaisyUI**: speed up styling while keeping HTML and class names readable; DaisyUI is used for ready-made components and consistent UI tokens.
- **Axios**: simple, proven HTTP client with nicer ergonomics over `fetch` in many cases.

---

## UX & reliability notes

- The UI shows a loader while fetching data and uses toast notifications for success/error feedback.
- Error handling exists at API-call boundaries; network or server errors are surfaced to users via notifications and `error` state.
- The current implementation focuses on clarity and maintainability over micro-optimizations. For production, consider:
  - Adding unit tests (Jest + React Testing Library) and e2e tests (Cypress / Playwright).
  - Implementing optimistic updates or a caching layer (React Query / SWR) for improved perceived performance.
  - Accessibility (a11y) improvements and keyboard navigation.

---

## How to test manually (basic acceptance)

1. Run the app (`npm run dev`).
2. Create a todo using the add form — the new item should appear and persist via API.
3. Toggle a todo completion — change should reflect visually and persist.
4. Edit or delete a todo — actions should call the corresponding API endpoints and update the UI.
5. Disconnect network or change base URL to simulate errors — ensure error handling and toast notifications show.

---

## Known limitations & suggestions for improvements

- No unit/e2e tests included.
- No authentication flow (if required by API).
- No optimistic UI updates or client-side caching.
- Validation on input fields can be enhanced.
- Consider replacing Context with React Query for better data synchronization and caching if the app grows.

---
