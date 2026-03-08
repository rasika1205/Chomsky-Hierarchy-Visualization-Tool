Build a **modern interactive web application frontend** for an educational platform called **“Chomsky Explorer – Interactive Theory of Computation Visualizer.”**

This application helps students understand the **Chomsky Hierarchy of Languages** through **interactive visualizations, diagrams, quizzes, and automata tools.**

The UI must feel like a **professional modern educational tool**, not a basic student project.

---

TECH STACK

* React (Vite)
* TailwindCSS
* Framer Motion (animations)
* React Flow (graphs and automata visualization)
* Axios (API calls to Flask backend)
* Lucide React (icons)

---

DESIGN REQUIREMENTS

The application must be **dark mode by default**.

Design style:

* Modern developer-tool style UI (similar to Linear / Vercel dashboards)
* Smooth animations using Framer Motion
* Glassmorphism UI cards
* Gradient neon accents (blue / purple)
* Animated hover effects
* Soft glowing borders
* Gradient mesh or particle animated background
* Smooth page transitions
* Responsive layout

The UI should feel **visually stunning, immersive, and interactive.**

---

LANDING PAGE (HOME PAGE)

The homepage should **NOT have a hero section**.

When the user opens the website, they should **immediately see the visual representation of the Chomsky Hierarchy.**

SECTION 1 — INTERACTIVE CHOMSKY HIERARCHY

Use **React Flow** to create a vertical hierarchy diagram.

Structure:

Recursively Enumerable
↑
Context Sensitive
↑
Context Free
↑
Regular

Each language class should be a **large glowing interactive node**.

Design requirements for nodes:

* Glass card style
* Neon border glow
* Hover animation
* Subtle floating motion

When a user clicks a node, it should **navigate to a full dedicated page explaining that language class.**

---

SECTION 2 — CHOMSKY HIERARCHY VENN DIAGRAM

Below the hierarchy diagram, show a **visual set representation of the hierarchy using a Venn-style nested diagram.**

Structure:

Regular ⊂ Context Free ⊂ Context Sensitive ⊂ Recursively Enumerable

Design this as **nested glowing circles**.

Each circle should have:

* animated border
* label
* hover highlight

When hovering over a region, show example languages such as:

Regular
(a+b)*

Context Free but not Regular
a^n b^n

Context Sensitive but not Context Free
a^n b^n c^n

This visualization should help students **intuitively understand the containment relationships.**

---

SECTION 3 — FEATURE DASHBOARD

Below the diagrams show **interactive feature cards** for the main tools.

Each card should have an icon, title, description, and hover animation.

Feature cards:

Language Classifier
Allows user to input a language and determine its class.

DFA Visualizer
Generate DFA graphs from transition tables.

TOC Chatbot
Ask questions about Theory of Computation.

Quiz
Test knowledge of language classes.

Cards should animate on hover and open their corresponding pages.

---

NAVIGATION BAR

Sticky top navbar.

Left side:
Logo: **Chomsky Explorer**

Right side navigation links:

Home
Languages
Classifier
DFA Visualizer
Quiz
Chatbot

Navbar should include subtle blur background and smooth hover animations.

---

LANGUAGE PAGES (VERY IMPORTANT)

Each language class must have its **own fully dedicated page**.

Create four separate pages:

Regular Languages
Context Free Languages
Context Sensitive Languages
Recursively Enumerable Languages

Each page should feel like an **interactive learning module**.

The page must contain:

Section 1 — Definition
Explain the language class clearly.

Section 2 — Automaton Type
Show the machine used to recognize the language.

Examples:

Regular → Finite Automaton
Context Free → Pushdown Automaton
Context Sensitive → Linear Bounded Automaton
Recursively Enumerable → Turing Machine

Section 3 — Grammar Rules
Explain grammar type.

Section 4 — Example Languages

Examples such as:

Regular
(a+b)*
a*b*

Context Free
a^n b^n
balanced parentheses

Context Sensitive
a^n b^n c^n

Section 5 — Visual Automaton Diagram

Use **React Flow** to display an example automaton for the language class.

Example:

Regular page → show DFA example
Context Free page → show Pushdown Automaton diagram

Section 6 — Key Properties

Include:

Closure properties
Pumping lemma intuition
Important characteristics

Each section should appear in **animated cards** with expandable details.

---

LANGUAGE CLASSIFIER PAGE

Create a page where users can input a language.

UI components:

Input box:

“Enter a language expression (example: a^n b^n)”

Button:
Classify Language

After submission call backend:

POST /classify-language

Display results in a result card showing:

Language Class
Automaton Type
Explanation

Animate the result appearing on screen.

---

DFA VISUALIZER PAGE

This page allows users to input a **transition table**.

UI elements:

Editable table:

State | a | b
q0 | q1 | q0
q1 | q2 | q1

Button:
Generate DFA

After submission render a **DFA graph using React Flow**.

Nodes = states
Edges = transitions

Graph should have glowing nodes and animated edges.

---

QUIZ PAGE

Interactive quiz for language classification.

Each question shows a language example.

Example:

L = { a^n b^n }

Options:

Regular
Context Free
Context Sensitive
Recursively Enumerable

After selection show:

Correct answer
Explanation

Include score tracking.

---

TOC CHATBOT PAGE

Chat interface similar to ChatGPT.

Components:

Chat message bubbles
Input field
Send button

Call backend:

POST /chatbot

Show responses with typing animation.

---

GLOBAL UI ELEMENTS

Use Framer Motion for:

Page transitions
Card hover animations
Node appearance
Result animations

Buttons should have glowing hover effects.

Cards should use glassmorphism with blur backgrounds.

Background should include a subtle animated gradient mesh.

---

PROJECT STRUCTURE

src/

components/
Navbar.jsx
FeatureCard.jsx
HierarchyGraph.jsx
VennDiagram.jsx
AutomataGraph.jsx
QuizCard.jsx

pages/
Home.jsx
RegularLanguage.jsx
ContextFreeLanguage.jsx
ContextSensitiveLanguage.jsx
RecursivelyEnumerableLanguage.jsx
Classifier.jsx
DFAVisualizer.jsx
Quiz.jsx
Chatbot.jsx

App.jsx
main.jsx

---

UX GOAL

The interface should feel like a **premium interactive educational platform** for learning Theory of Computation.

Students should be able to **visually explore the Chomsky hierarchy, study each language class deeply, and interact with automata tools and quizzes.**
