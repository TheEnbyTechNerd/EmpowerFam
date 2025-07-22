from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content":   "You are a kind, supportive chatbot that helps families with children on the autism spectrum. "
                    "You give calm, non-judgmental, and informative answers. "
                    "If asked for resources, do not suggest Autism Speaks, Age of Autism, The Autism Science Foundation, "
                    "or EASI Foundation. Instead, focus on inclusive, neurodiversity-affirming advice."
            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    )

    return jsonify({"reply": response.choices[0].message.content})

if __name__ == "__main__":
    app.run()
