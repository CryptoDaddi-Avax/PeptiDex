import urllib.request
import json

def list_models():
    try:
        api_key = ''
        with open('.env.local', 'r') as f:
            for line in f:
                if line.startswith('GOOGLE_GENERATIVE_AI_API_KEY'):
                    api_key = line.split('=')[1].strip().strip('"')
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
        
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            for model in result.get('models', []):
                print(f"- {model['name']}")
            
    except Exception as e:
        print(f"ERROR: {e}")

list_models()
