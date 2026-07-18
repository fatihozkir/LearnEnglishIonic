# Application Architecture & Knowledge Base

This documentation serves as a persistent guide to the system architecture, code design patterns, and state flows for the English Practice Exam application.

---

## 🏗️ Architecture Design System (Clean Architecture)

The codebase is split into three decoupled layers:

```
+-------------------------------------------------------+
|                 PRESENTATION LAYER (UI)              |
|   Angular Components (Tabs, Listening Player, etc.)   |
|   Directives (Glossary text-selection)                |
|   State (Angular Signals in ExamStateService)         |
+---------------------------+---------------------------+
                            |
                            v
+---------------------------+---------------------------+
|                  DOMAIN LAYER (CORE)                  |
|   Contracts/Interfaces (ExamRepository, UserRep)      |
|   Entities/Models (Question, ExamState, Section)      |
+---------------------------+---------------------------+
                            ^
                            |
+---------------------------+---------------------------+
|                  DATA LAYER (STORAGE)                 |
|   Implementations (LocalExamRepository, SQLDb)        |
|   Adapters & APIs (Stripe, Capacitor SQLite, FCM)     |
+-------------------------------------------------------+
```

### 1. Domain Layer (`/core`)
* **Strict Rule:** Contains pure TypeScript logic, types, and abstract interfaces. It must **not** import any libraries or components from Ionic or the Presentation layer.
* **Key Files:**
  * `core/models/models.ts`: Houses the `QuestionType` enum and `Question`, `ListeningSection`, `ReadingSection`, `GrammarSection`, and `VocabularySection` models.
  * `core/repositories/exam.repository.ts`: Abstract definition of how questions and section states are accessed.

### 2. Data Layer (`/data`)
* **Strict Rule:** Implements the core repository interfaces. Connects directly to storage engines (initially static files, later SQLite/API).
* **Key Files:**
  * `data/repositories/local-exam.repository.ts`: Reads question assets from local memory.
  * `data/datasources/`: Static TS arrays representing the questions database.

### 3. Presentation Layer (`/presentation`)
* **Strict Rule:** Manages UI rendering and application state.
* **State Engine:** Powered by **Angular Signals** inside the `ExamStateService`.
  * Signals are read-only when exposed to components, modified only via specific Service actions to prevent direct mutation bugs.
  * State variables include: `currentTab`, `answers` (`{ questionId: string }`), `submitted`, `playedSections`, and `glossary`.

---

## 🎨 Theme & UI Rules
* **Theme variables:** Defined in `src/theme/variables.scss`.
* **Dark Mode:** Follows CSS media queries `@media (prefers-color-scheme: dark)` and toggles via `.dark` class helper.
* **Component Reusability:**
  * **Smart Components (Containers):** Connected directly to `ExamStateService`. Manages route logic and fetches data (e.g., Reading Page).
  * **Dumb Components (Presentational):** Receives data via `@Input()` (or Angular 17.3 input signals) and propagates user choices via `@Output()`. Example: `QuestionCardComponent`.
