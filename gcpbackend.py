import hashlib
from hashlib import sha256
import os
import json
import base64
import pdfplumber
from docx import Document
import requests
from flask import Response
import pymongo
from datetime import datetime

# Config
AIML_API_URL = "https://api.aimlapi.com/v1/completions"
AIML_API_KEY = os.environ.get("AIMLAPI")
MONGO_URI = os.environ.get("MONGOSTR")

# MongoDB setup
mongo_client = pymongo.MongoClient(MONGO_URI)
db = mongo_client["muwakkil"]
users_col = db["users"]
docs_col = db["docs"]
chats_col = db["chats"]


# AIML call
def call_aiml_api(prompt, model="gpt-4o"):
    
    from openai import OpenAI

    client = OpenAI(
        base_url="https://api.aimlapi.com/v1",
        api_key=AIML_API_KEY,    
    )
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a legal assistant trained on UAE laws."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.model_dump()
    except Exception as e:
        return {"error": str(e)}

# def call_aiml_api(prompt, model="gpt-4o", language="en", max_tokens=500):
#     headers = {"Authorization": f"Bearer {AIML_API_KEY}"}
#     payload = {
#         "prompt": prompt,
#         "model": model,
#         "language": language,
#         "max_tokens": max_tokens
#     }
#     response = requests.post(AIML_API_URL, json=payload, headers=headers)
#     if response.status_code != 200:
#         raise Exception(f"AIML API error: {response.text}")
#     return response.json()


# PDF text extraction
def extract_text_from_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.strip()

# DOCX text extraction
def extract_text_from_docx(path):
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs]).strip()



def sendsms(tonum, message):


    url = "https://us-central1-aiot-fit-xlab.cloudfunctions.net/sendsms"

    payload = json.dumps({
    "receiver": tonum,
    "message": message,
    "token": "hackeroo"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    # print(response.text)

def hashthis(st):


    hash_object = hashlib.md5(st.encode())
    h = str(hash_object.hexdigest())
    return h




# Main entrypoint
def muwakkil_ai_entrypoint(request):
    # CORS-compatible headers
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Max-Age": "3600"
    }

    if request.method == 'OPTIONS':
        return ('', 204, headers)

    try:
        req_json = request.get_json()
    except:
        return Response(json.dumps({"error": "Invalid JSON"}), status=400, headers=headers)

    action = req_json.get("action")

    # CHAT FLOW
    if action == "ask_question":
        user_id = req_json.get("user_id", "anonymous")
        question = req_json.get("question")
        if not question:
            return Response(json.dumps({"error": "Missing question"}), status=400, headers=headers)

        try:
            response = call_aiml_api(prompt=question)
            # Log chat
            chats_col.insert_one({
                "user_id": user_id,
                "question": question,
                "response": response,
                "timestamp": datetime.utcnow()
            })
            return Response(json.dumps({
                "user_id": user_id,
                "question": question,
                "response": response
            }), headers=headers)
        except Exception as e:
            return Response(json.dumps({"error": "AIML API failure", "details": str(e)}), status=500, headers=headers)

    # DOCUMENT UPLOAD + ANALYSIS
    if action == "analyze_uploaded_file":
        filename = req_json.get("filename")
        file_b64 = req_json.get("file_content")
        user_id = req_json.get("user_id", "anonymous")

        if not filename or not file_b64:
            return Response(json.dumps({"error": "Missing filename or file content"}), status=400, headers=headers)

        try:
            suffix = filename.lower().split('.')[-1]
            tmp_path = f"/tmp/{filename}"
            with open(tmp_path, "wb") as f:
                f.write(base64.b64decode(file_b64))

            if suffix == "pdf":
                extracted_text = extract_text_from_pdf(tmp_path)
            elif suffix == "docx":
                extracted_text = extract_text_from_docx(tmp_path)
            else:
                return Response(json.dumps({"error": "Unsupported file type"}), status=415, headers=headers)

            if not extracted_text:
                return Response(json.dumps({"error": "No text extracted from document"}), status=422, headers=headers)

            # Analyze with AIML
            analysis_prompt = f"Analyze the following legal document for compliance with UAE laws and flag any problematic clauses:\n\n{extracted_text}"
            analysis = call_aiml_api(prompt=analysis_prompt)

            # Log document entry
            doc_entry = {
                "user_id": user_id,
                "filename": filename,
                "uploaded_at": datetime.utcnow(),
                "analysis_summary": analysis
            }
            docs_col.insert_one(doc_entry)

            return Response(json.dumps({
                "user_id": user_id,
                "filename": filename,
                "analysis_result": analysis
            }), headers=headers)

        except Exception as e:
            return Response(json.dumps({"error": "Document analysis failed", "details": str(e)}), status=500, headers=headers)

    return Response(json.dumps({"error": "Unknown or missing action"}), status=400, headers=headers)
