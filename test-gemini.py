import urllib.request
import json
import ssl
import sys

def test_api():
    try:
        api_key = ''
        with open('.env.local', 'r') as f:
            for line in f:
                if line.startswith('GOOGLE_GENERATIVE_AI_API_KEY'):
                    api_key = line.split('=')[1].strip().strip('"')
        
        print(f"Key: {api_key[:8]}...")
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        data = {
            "contents": [{"parts":[{"text": "say hi"}]}]
        }
        
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            print("SUCCESS:", result['candidates'][0]['content']['parts'][0]['text'])
            
    except urllib.error.HTTPError as e:
        print(f"HTTP ERROR: {e.code}")
        print(e.read().decode())
    except Exception as e:
        print(f"ERROR: {e}")

test_api()
