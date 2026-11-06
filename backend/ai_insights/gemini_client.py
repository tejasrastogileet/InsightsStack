import google.generativeai as genai
from django.conf import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

def get_ai_response(prompt: str, context: str = '') -> str:
    model = genai.GenerativeModel('gemini-pro')
    full_prompt = f"""You are InsightStack's AI analytics assistant. Help users understand their business data.

Context: {context}

User Query: {prompt}

Provide concise, actionable insights. Use bullet points where helpful."""
    response = model.generate_content(full_prompt)
    return response.text

def get_kpi_insights(kpi_data: dict) -> str:
    prompt = f"""Analyze these KPIs and provide 3-5 actionable insights:
{kpi_data}
Focus on trends, anomalies, and recommendations."""
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text

def detect_trends(data_summary: dict) -> str:
    prompt = f"""Detect trends in this business data and flag any outliers:
{data_summary}
Identify: 1) Main trends 2) Outliers 3) Forecast next period 4) Recommendations"""
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text
