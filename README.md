# 🚀 GitHub Issues Tracker (Assignment - 5)

A simple and efficient GitHub Issue Tracker built with HTML, Tailwind CSS, and Vanilla JavaScript. This application allows users to view, filter, and search for issues fetched from a live API.

## 🔗 Project Links

- **Live Site:** [Your Live Link Here]
- **Client Repository:** [Your Repo Link Here]

## 🛠️ Technology Stack

- **Frontend:** HTML5, Tailwind CSS (via CDN)
- **Logic:** Vanilla JavaScript (ES6+)
- **API:** Phi-Lab Server API

## 🌟 Key Features

- **Secure Login:** Access the dashboard using admin credentials.
- **Dynamic Issue Loading:** Fetches and displays 50+ issues from the API.
- **Filtering:** Filter issues by status (All, Open, Closed).
- **Search:** Real-time search functionality to find specific issues.
- **Interactive UI:** Detailed view of each issue in a professional modal.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

## 🔑 Demo Credentials

- **Username:** `admin`
- **Password:** `admin123`

---

## 📝 Conceptual Questions & Answers

### 1️⃣ What is the difference between var, let, and const?

`var` is function-scoped and allows redeclaration and reassignment, often leading to bugs due to hoisting. In contrast, `let` and `const` are block-scoped, meaning they only exist within the curly braces where they are defined. While `let` allows you to reassign values, `const` is for constants and cannot be reassigned after the initial value is set.

### 2️⃣ What is the spread operator (...)?

The spread operator `(...)` is an ES6 feature that allows an iterable (like an array or object) to be expanded into individual elements. It is widely used for creating shallow copies, merging multiple arrays, or passing array elements as arguments to functions without mutating the original data.

### 3️⃣ What is the difference between map(), filter(), and forEach()?

`forEach()` iterates through an array to perform actions but does not return anything. `map()` also iterates through the array but returns a **new array** of the same length with transformed data. `filter()` returns a **new array** containing only the elements that satisfy a specific condition.

### 4️⃣ What is an arrow function?

An arrow function is a concise way to write JavaScript functions using the `=>` syntax. Unlike regular functions, they do not have their own `this` context (they inherit it from the parent scope), making them ideal for callbacks and cleaner, more readable code.

### 5️⃣ What are template literals?

Template literals are strings wrapped in backticks (`` ` ``) instead of quotes. They support string interpolation, allowing you to embed variables directly using `${}` syntax, and they easily handle multi-line strings without needing concatenation symbols.
