---

# Chomsky Hierarchy Visualization Tool

An **interactive learning platform for Theory of Computation (ToC)** that helps students understand the **Chomsky Hierarchy** and the relationship between different language classes.
The tool combines **visualization, AI tutoring, quizzes, and automata generation** to make abstract concepts like **Regular Languages, Context-Free Languages, Context-Sensitive Languages, and Recursively Enumerable Languages** easier to understand.
This project integrates **modern web technologies with AI-powered explanations** to provide a guided learning experience.

---

# Live Learning Features

The platform includes **multiple interactive modules** designed to help students explore Theory of Computation concepts visually and intuitively.

---

# Core Concepts Covered

The application explains and demonstrates the full **Chomsky Hierarchy**:
Regular ⊂ Context Free ⊂ Context Sensitive ⊂ Recursively Enumerable
Each language class has a **dedicated page** explaining:

* Definition of the language class
* Associated automata
* Example languages
* Grammar representation
* Visual explanation of how the automaton works
* Relationships with other classes

---

# Main Features

## 1. Interactive Chomsky Hierarchy Visualization

The platform provides a **visual hierarchy graph** that clearly shows how language classes relate to each other.

Features:

* Interactive graph structure
* Clickable nodes for each language class
* Visual representation of language inclusion
* Smooth animations for better conceptual understanding

Each node represents:

| Language Class         | Automaton                |
| ---------------------- | ------------------------ |
| Regular                | Finite Automaton         |
| Context Free           | Pushdown Automaton       |
| Context Sensitive      | Linear Bounded Automaton |
| Recursively Enumerable | Turing Machine           |

Clicking a node navigates to a **dedicated explanation page**.

---

# 2. Dedicated Language Explanation Pages

Each language class has its own **educational page** that includes:

### Concept Explanation

A clear explanation of what the language class represents.

### Automaton Type

The automaton capable of recognizing the language.

Examples:

Regular → DFA / NFA
Context Free → Pushdown Automaton
Context Sensitive → Linear Bounded Automaton
Recursively Enumerable → Turing Machine

### Grammar Representation

Explanation of the grammar type associated with the class.

Example:

Regular → Type 3 Grammar
Context Free → Type 2 Grammar
Context Sensitive → Type 1 Grammar
Recursively Enumerable → Type 0 Grammar

### Example Languages

Example languages are shown for each class, such as:

Regular

```
(a+b)*
a*b*
```

Context Free

```
a^n b^n
balanced parentheses
```

Context Sensitive

```
a^n b^n c^n
```

Recursively Enumerable
General Turing-computable languages.

This helps students **connect theory with practical examples**.

---

# 3. DFA Visualizer

One of the core tools of the platform is the **Deterministic Finite Automaton (DFA) Visualizer**.

Students can:

* Create states
* Define transitions
* Mark start state
* Mark accepting states

The system generates a **clean DFA diagram automatically**.

### Visualization Technology

The backend uses **Graphviz** to generate structured automata diagrams.

Advantages:

* Clean graph layout
* Automatic edge positioning
* Scalable diagrams even with many states

The diagram is returned as an **SVG image** and rendered in the frontend.

---

# 4. Theory of Computation Quiz

The platform includes an **interactive quiz system** designed to test students' understanding of the Chomsky hierarchy.

Features:

* Randomized quiz questions
* Multiple choice answers
* Immediate feedback
* AI-generated explanations

Each quiz session:

* Randomly selects **5 questions**
* Tracks the user's **score**
* Shows explanations after answering

Example question:

```
Which class does the language a^n b^n belong to?
```

Options:

Regular
Context Free
Context Sensitive
Recursively Enumerable

After answering, the system explains **why the answer is correct**.

---

# 5. AI Chatbot Tutor

The platform includes a **Theory of Computation AI assistant** powered by **Google Gemini**.

Students can ask questions like:

* What is the difference between DFA and NFA?
* Why is aⁿbⁿ not regular?
* What is the pumping lemma?
* How does a Pushdown Automaton work?

The chatbot is **restricted to Theory of Computation topics**, ensuring responses stay focused on learning.

---

# 6. Language Classification Tool

Students can input a language description, and the system will:

1. Predict its **Chomsky class**
2. Show the **corresponding automaton**
3. Generate an **AI explanation**

Example:

Input:

```
a^n b^n
```

Output:

Language Class
Context Free

Automaton
Pushdown Automaton

Explanation
A Pushdown Automaton can use a stack to match equal numbers of a's and b's.

---

# Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Framer Motion (animations)
* React Flow (graph visualization)

## Backend

* Python
* Flask
* Flask-CORS

## AI Integration

* Google Gemini API

## Visualization

* Graphviz (automata diagrams)

---

# Project Structure

```
project-root
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── package.json
│
├── backend
│   ├── app.py
│   ├── quiz_questions.py
│   ├── requirements.txt
│
├── README.md
└── .gitignore
```

---

# Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/chomsky-visualizer.git
cd chomsky-visualizer
```

---

# Backend Setup

### Create Virtual Environment

```
python -m venv venv
```

Activate:

Windows

```
venv\Scripts\activate
```

Mac/Linux

```
source venv/bin/activate
```

---

### Install Dependencies

```
pip install -r backend/requirements.txt
```

Example requirements:

```
flask
flask-cors
google-generativeai
python-dotenv
graphviz
```

---

### Install Graphviz (Required for DFA Visualizer)

Windows
Install from the official Graphviz installer and add to PATH.

Mac

```
brew install graphviz
```

Ubuntu

```
sudo apt install graphviz
```

---

### Configure Environment Variables

Create a `.env` file inside the backend folder.

```
GEMINI_API_KEY=your_api_key_here
```

---

### Run Backend Server

```
python backend/app.py
```

Server runs at:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to the frontend folder.

```
cd frontend
```

Install dependencies.

```
npm install
```

Run the development server.

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# API Endpoints

## Chat Tutor

```
POST /chat
```

Body:

```
{
  "message": "Explain DFA vs NFA"
}
```

---

## Language Classification

```
POST /classify
```

Body:

```
{
  "language": "a^n b^n"
}
```

---

## Quiz Questions

```
GET /quiz
```

Returns 5 random questions.

---

## Quiz Explanation

```
POST /quiz/explain
```

Body:

```
{
  "language": "a^n b^n",
  "correct": "Context Free"
}
```

---

## DFA Visualization

```
POST /generate-dfa
```

Returns an SVG representation of the automaton.

---

# Educational Value

Theory of Computation is often difficult for students because:

* Concepts are highly abstract
* Automata behavior is hard to visualize
* Language classifications are confusing

This tool solves these problems by combining:

* Visual diagrams
* Interactive automata generation
* AI explanations
* Practice quizzes
* Concept navigation

The result is a **complete interactive learning environment for ToC**.

---


# License

This project is intended for **educational purposes**.

You may choose to release it under the **MIT License**.

---


They make the repo look **10× more impressive to professors and recruiters**.
