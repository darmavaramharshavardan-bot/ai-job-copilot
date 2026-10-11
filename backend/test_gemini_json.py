
import os
import json
from dotenv import load_dotenv
from google import genai
from schema import ResumeAnalysis

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents="Analyze this sample: Python and SQL skills; job requires Python, SQL, and Docker. Return a realistic match score.",
    config={
        "response_mime_type": "application/json",
        "response_schema": ResumeAnalysis,
    },
)

result = ResumeAnalysis.model_validate_json(response.text)

print(json.dumps(result.model_dump(), indent=2))
