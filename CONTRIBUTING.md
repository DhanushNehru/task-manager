# Contributing to Task Manager

Thank you for considering a contribution to **Task Manager**—an open-source React+Redux app for task management! 📝 Your improvements, bug fixes, and new features help make this project better for everyone.

---

## How to Contribute

### 1. Getting Started

1. **Fork** the repository to your own GitHub account.
2. **Clone** your fork locally:

    ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

### 2. Development Setup

1. Ensure you have **Node.js** and **npm** (or **yarn**) installed.
2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

    You should see the app running at [http://localhost:3000](http://localhost:3000).

---

## Features of Task Manager

- **Add, Edit, and Delete Tasks**: Manage your tasks efficiently.
- **Task List**: View all tasks in a clean and organized list.
- **Redux State Management**: Robust state handling for seamless performance.
- **Responsive Design**: Works across devices of all sizes.
- **Customizable**: Easily extend functionality with modular components.

---

## Creating Your Pull Request (PR)

### 1. Branching

Create a new branch for your work:

```bash
git checkout -b feature/short-description
```

Replace `feature/short-description` with one describing the change.

### 2. Making Changes

- Keep your changes focused—one feature or fix per PR.
- Add or update documentation as needed.
- If your change impacts the UI, take a screenshot.
- Run tests and make sure everything passes.

### 3. Committing

Use clear, conventional commit messages:

```text
feat: add drag-and-drop for tasks
fix: resolve sidebar collapse bug
docs: update contributing guide
```

Push to your fork:

```bash
git push origin feature/short-description
```

### 4. Pull Request Format

When opening a PR, use the [PR Template](./pull_request_template.md) to ensure all necessary details are included.

---

## Code Style & Standards

- Use **ESLint** for code quality (`npm run lint`).
- Keep code modular and readable.
- Prefer functional components and hooks for React logic.
- For state management, use Redux patterns consistently.

---

## Issues and Feedback

- Browse or open issues on the [Issues](https://github.com/DhanushNehru/task-manager/issues) page.
- If reporting a bug, include reproduction steps, screenshots (minimal), and environment details.

---

## Community Expectations

- Be respectful and constructive.
- Follow the [Code of Conduct](./Code%20of%20Conduct.md).
- All conversations and reviews strive for clarity and friendly collaboration.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---
