import json
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib3 import request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity. For production, specify your frontend's URL.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

class ChatHistory(BaseModel):
    chatHistory : List[dict[str, str]]

@app.post("/user_response")
async def user_response(chat_history: ChatHistory):
    print(chat_history.model_dump_json())
    try:
        ai_response = request(
        method="POST",
        url="http://n8n:5678/webhook/send-chat",
        headers={"Content-Type": "application/json"},
        body = chat_history.model_dump_json(),
        timeout = 30
        )
        data = ai_response.json()['output']
        print(data)
        return {'AI': data}
    except (Exception) as e:
        print(e)
        return {'AI': e}