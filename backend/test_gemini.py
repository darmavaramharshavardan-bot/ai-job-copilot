
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("FAILED: GEMINI_API_KEY was not found in .env")
else:
    try:
        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents="Reply with exactly: Gemini API connection successful"
        )

        print("SUCCESS: Gemini API is working!")
        print(response.text)

    except Exception as e:
        print("API TEST FAILED:", type(e).__name__)
        print(str(e))