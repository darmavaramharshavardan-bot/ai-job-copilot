"""
Test script for PDF text extraction using PyMuPDF in the FastAPI backend.
"""
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.testclient import TestClient
from typing import Annotated
import fitz  # PyMuPDF
import io

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/analyze-resume")
async def analyze_resume(
    resume: Annotated[UploadFile, Form(...)],
    job_title: Annotated[str, Form(...)],
    company_name: Annotated[str, Form(...)],
    job_description: Annotated[str, Form(...)]
):
    try:
        # Read PDF content
        pdf_content = await resume.read()

        # Extract text from PDF using PyMuPDF
        with fitz.open(stream=pdf_content, filetype="pdf") as doc:
            # Check if PDF is valid and has extractable text
            if len(doc) == 0:
                raise HTTPException(status_code=400, detail="PDF is empty or has no pages")

            # Extract text from all pages
            all_text = []
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                text = page.get_text()
                if text:
                    all_text.append(text)

            # Combine all page texts
            combined_text = "\n\n".join(all_text)

            # Check if we got meaningful text content
            if not combined_text.strip():
                raise HTTPException(
                    status_code=400,
                    detail="PDF has little or no extractable text content"
                )

            # Return success response with extracted text
            return JSONResponse({
                "status": "success",
                "message": "Resume text extracted successfully",
                "data": {
                    "filename": resume.filename,
                    "content_type": resume.content_type,
                    "job_title": job_title,
                    "company_name": company_name,
                    "job_description_length": len(job_description),
                    "text_content": combined_text
                }
            })

    except fitz.fitz.FitzError as e:
        raise HTTPException(status_code=400, detail=f"Invalid or unreadable PDF: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

if __name__ == "__main__":
    # Run the test
    client = TestClient(app)

    # Test 1: Normal text-based PDF
    print("Test 1: Normal text-based PDF")
    pdf_content = b'''%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792] >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(John Doe
Software Engineer
john.doe@email.com
(123) 456-7890
) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000107 00000 n
0000000156 00000 n
trailer
<< /Size 5 >>
startxref
205
%%EOF'''

    with open('/tmp/test_normal.pdf', 'wb') as f:
        f.write(pdf_content)

    with open('/tmp/test_normal.pdf', 'rb') as f:
        response = client.post(
            "/analyze-resume",
            data={
                "job_title": "Software Engineer",
                "company_name": "Tech Corp",
                "job_description": "We are looking for a software engineer with experience in Python and FastAPI."
            },
            files={"resume": ("normal_resume.pdf", f, "application/pdf")}
        )

    print(f"Response status: {response.status_code}")
    print(f"Response: {response.json()}")

    # Test 2: Invalid PDF
    print("\nTest 2: Invalid PDF")
    invalid_pdf = b"This is not a valid PDF content"

    with open('/tmp/test_invalid.pdf', 'wb') as f:
        f.write(invalid_pdf)

    with open('/tmp/test_invalid.pdf', 'rb') as f:
        response = client.post(
            "/analyze-resume",
            data={
                "job_title": "Software Engineer",
                "company_name": "Tech Corp",
                "job_description": "We are looking for a software engineer with experience in Python and FastAPI."
            },
            files={"resume": ("invalid_resume.pdf", f, "application/pdf")}
        )

    print(f"Response status: {response.status_code}")
    print(f"Response: {response.json()}")

    # Test 3: PDF with empty pages (no extractable text)
    print("\nTest 3: PDF with no extractable text")
    empty_text_pdf = b'''%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792] >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
( ) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000107 00000 n
0000000156 00000 n
trailer
<< /Size 5 >>
startxref
205
%%EOF'''

    with open('/tmp/test_empty.pdf', 'wb') as f:
        f.write(empty_text_pdf)

    with open('/tmp/test_empty.pdf', 'rb') as f:
        response = client.post(
            "/analyze-resume",
            data={
                "job_title": "Software Engineer",
                "company_name": "Tech Corp",
                "job_description": "We are looking for a software engineer with experience in Python and FastAPI."
            },
            files={"resume": ("empty_resume.pdf", f, "application/pdf")}
        )

    print(f"Response status: {response.status_code}")
    print(f"Response: {response.json()}")