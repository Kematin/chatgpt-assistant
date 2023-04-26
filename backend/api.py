from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services import get_answer_from_bot

app = FastAPI()

origins = []

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/answer", tags=["root"])
def gpt_ask(q: str | None = None):
    if q in ("", None):
        return {"message": "No question for bot!"}
    else:
        message = get_answer_from_bot(q)
        return {"message": message}
