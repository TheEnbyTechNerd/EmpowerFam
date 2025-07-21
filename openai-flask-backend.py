from openai import OpenAI

client = OpenAI(api_key="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")


def get_response(user_input):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a kind, supportive chatbot that helps families with children on the autism spectrum. "
                    "You give calm, non-judgmental, and informative answers. "
                    "If asked for resources, do not suggest Autism Speaks, Age of Autism, The Autism Science Foundation, "
                    "or EASI Foundation. Instead, focus on inclusive, neurodiversity-affirming advice."
                ),
            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    )
    return response.choices[0].message.content

# Simple test loop
if __name__ == "__main__":
    print("Welcome to EmpowerFam Chatbot! (Type 'exit' to quit)")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        reply = get_response(user_input)
        print("EmpowerBot:", reply)
