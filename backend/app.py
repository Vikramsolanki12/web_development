from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from google.api_core.exceptions import GoogleAPIError, InvalidArgument, ResourceExhausted

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GOOGLE_API_KEY environment variable not found. Please set it for production.")
    pass 


genai.configure(api_key="YOUR_API_KEY")
try:
    model = genai.GenerativeModel('gemini-2.0-flash')
    print("Gemini model 'gemini-2.0-flash' initialized successfully.")
except Exception as e:
    print(f"ERROR: Failed to initialize Gemini model 'gemini-2.0-flash'. Details: {e}")
    print("Please ensure the model is available and your API key is correct.")
    exit(1)


def chat_with_gemini(prompt):
    try:
        response = model.generate_content(
            f"Answer concisely and only about robotics or AI: {prompt}"
        )
        return response.text.strip()
    except InvalidArgument as e:
        print(f"Gemini API Error: Invalid argument. Details: {e}")
        return "I received an invalid request. Please ensure your message is appropriate."
    except ResourceExhausted as e:
        print(f"Gemini API Error: Rate limit or quota exceeded. Details: {e}")
        return "I'm getting too many requests right now, or my quota is exhausted. Please try again in a moment."
    except GoogleAPIError as e:
        print(f"Gemini API Error: A Google API error occurred. Details: {e}")
        return "I encountered an unexpected error while trying to generate a response from the AI."
    except Exception as e:
        print(f"Chatbot Error: An unexpected Python error occurred. Details: {e}")
        return "I'm sorry, something went wrong on my end and I can't respond right now."

@app.route('/api/chat', methods=['POST'])
def handle_chat():
    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    print(f"Received message from frontend: '{user_message}'")
    response_text = chat_with_gemini(user_message)
    print(f"Sending response to frontend: '{response_text}'")
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
