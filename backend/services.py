import openai

API_KEY = open("key.txt", "r").read().strip()


def get_answer_from_bot(q: str, model: str = "gpt-3.5-turbo",
                        role: str = "code assistant") -> str:
    model, role = set_addition(model, role)
    answer = call_api(q=q, model=model, role=role)
    return answer


def call_api(q: str, model: str, role: str):
    openai.api_key = API_KEY
    messages = [
        {"role": "system", "content": f"You are {role}"},
        {"role": "user", "content": q}
    ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.5,
        max_tokens=3000)
    content = response["choices"][0]["message"]["content"]
    return content


def set_addition(model: str, role: str) -> tuple[str, str]:
    model = check_addition(model, "gpt-3.5-turbo")
    role = check_addition(role, "code assistant")
    return model, role


def check_addition(addition: str, default_value: str):
    if addition.strip() == "":
        return default_value
    return addition.strip()
