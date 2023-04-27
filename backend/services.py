import openai

API_KEY = open("key.txt", "r").read()


def get_answer_from_bot(q: str, model: str = "gpt-3.5-turbo") -> str:
    openai.api_key = API_KEY
    messages = [{"role": "user", "content": q}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.5,
        max_tokens=3000)
    content = response["choices"][0]["message"]["content"]
    return content
