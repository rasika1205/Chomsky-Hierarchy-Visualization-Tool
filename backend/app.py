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


from flask import request, jsonify
import re

@app.route("/classify", methods=["POST"])
def classify_language():

    data = request.json
    lang = data.get("language", "").lower().strip()

    normalized = lang.replace(" ", "")

    language_class = "Recursively Enumerable"
    automaton = "Turing Machine"

    properties = {
        "needs_memory": False,
        "single_dependency": False,
        "multiple_dependency": False,
        "finite_pattern": False
    }


    if re.search(r"a\^?n+b\^?n+", normalized) or re.search(r"anbn", normalized):
        properties["single_dependency"] = True
        properties["needs_memory"] = True

    if re.search(r"a\^?n+b\^?n+c\^?n+", normalized) or re.search(r"anbncn", normalized):
        properties["multiple_dependency"] = True
        properties["needs_memory"] = True

    if re.search(r"n[≥>=]+[0-9]+", normalized):
        properties["needs_memory"] = True

    if "equal number of a and b" in lang:
        properties["single_dependency"] = True
        properties["needs_memory"] = True

    if "equal number of a b c" in lang:
        properties["multiple_dependency"] = True
        properties["needs_memory"] = True

    if "balanced parentheses" in lang or "palindrome" in lang:
        properties["single_dependency"] = True
        properties["needs_memory"] = True

    if (
        "(a+b)*" in lang
        or "a*b*" in lang
        or "regular expression" in lang
        or "regex" in lang
        or "finite" in lang
        or "starts with" in lang
        or "ends with" in lang
        or "contains substring" in lang
    ):
        properties["finite_pattern"] = True


    if not properties["needs_memory"] or properties["finite_pattern"]:
        language_class = "Regular"
        automaton = "Finite Automaton"

    elif properties["single_dependency"] and not properties["multiple_dependency"]:
        language_class = "Context Free"
        automaton = "Pushdown Automaton"

    elif properties["multiple_dependency"]:
        language_class = "Context Sensitive"
        automaton = "Linear Bounded Automaton"


    try:
        explanation_prompt = f"""
Explain why the language '{lang}' belongs to the {language_class} class in the Chomsky hierarchy.

IMPORTANT:
- If constraints like n ≥ 0 or n ≥ 1 are present, explain that they do NOT change the class.
- Focus on dependency between symbols.

Also mention:
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
port = int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)