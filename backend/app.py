from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message required"}), 400

    try:
        response = model.generate_content(
            f"""
You are a helpful assistant that answers ONLY Theory of Computation questions.

Topics include:
- Chomsky hierarchy
- DFA
- NFA
- PDA
- Turing Machines
- Pumping Lemma
- Formal Languages
- Grammars

Explain clearly and simply.

User question:
{user_message}
"""
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@app.route("/classify", methods=["POST"])
def classify_language():

    data = request.json
    lang = data.get("language", "").lower().strip()

    language_class = "Recursively Enumerable"
    automaton = "Turing Machine"

    if "a^n b^n c^n" in lang or "anbncn" in lang:
        language_class = "Context Sensitive"
        automaton = "Linear Bounded Automaton"

    elif (
        "a^n b^n" in lang
        or "anbn" in lang
        or "balanced parentheses" in lang
        or "palindrome" in lang
    ):
        language_class = "Context Free"
        automaton = "Pushdown Automaton"

    elif (
        "(a+b)*" in lang
        or "a*b*" in lang
        or "regular" in lang
        or "finite" in lang
    ):
        language_class = "Regular"
        automaton = "Finite Automaton"

    try:

        explanation_prompt = f"""
Explain why the language '{lang}' belongs to the {language_class} class
in the Chomsky hierarchy.

Mention:
- why it belongs to that class
- what automaton recognizes it ({automaton})
- explanation suitable for a Theory of Computation student
"""

        response = model.generate_content(explanation_prompt)

        explanation = response.text

    except:
        explanation = f"This language belongs to the {language_class} class and is recognized by a {automaton}."

    return jsonify({
        "languageClass": language_class,
        "automaton": automaton,
        "explanation": explanation
    })

import random
from quiz_questions import questions

@app.route("/quiz", methods=["GET"])
def get_quiz():

    selected = random.sample(questions, 5)

    return jsonify({
        "questions": selected
    })



@app.route("/quiz/explain", methods=["POST"])
def explain_question():

    data = request.json

    language = data["language"]
    correct = data["correct"]

    prompt = f"""
Explain briefly (2-3 lines) why the following language belongs to {correct}
in the Chomsky hierarchy.

Language:
{language}

Keep explanation simple for students studying Theory of Computation.
"""

    response = model.generate_content(prompt)

    return {
        "explanation": response.text
    }

from graphviz import Digraph
import base64


@app.route("/generate-dfa", methods=["POST"])
def generate_dfa():

    data = request.json

    states = data["states"]
    start_state = data["start_state"]
    accept_states = data["accept_states"]
    transitions = data["transitions"]

    dot = Digraph()

    dot.attr(rankdir="LR")

    # states
    for s in states:
        if s in accept_states:
            dot.node(s, shape="doublecircle")
        else:
            dot.node(s)

    # start arrow
    dot.node("", shape="none")
    dot.edge("", start_state)

    # transitions
    for t in transitions:
        dot.edge(t["from"], t["to"], label=t["symbol"])

    svg = dot.pipe(format="svg")

    encoded = base64.b64encode(svg).decode("utf-8")

    return jsonify({"svg": encoded})


if __name__ == "__main__":
    app.run(debug=True, port=5000)