#!/usr/bin/env python3
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse

class MockOPAHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Read the request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        # Parse the URL to get the endpoint
        parsed_path = urllib.parse.urlparse(self.path)
        endpoint = parsed_path.path
        
        # Parse the request body to understand what's being requested
        try:
            request_data = json.loads(post_data.decode('utf-8'))
        except:
            request_data = {}
        
        # Determine the appropriate response based on the endpoint and request
        if 'allow' in endpoint:
            # For permission checks, return True
            response = {"result": True}
        elif 'filter' in endpoint or 'projects' in endpoint or 'tasks' in endpoint:
            # For filtering operations, return an empty list (allow all)
            response = {"result": []}
        else:
            # Default response
            response = {"result": True}
        
        # Send response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
        
        print(f"Mocked OPA request to {endpoint} - returning: {response}")
    
    def log_message(self, format, *args):
        # Suppress default logging
        pass

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 8181), MockOPAHandler)
    print("Mock OPA server running on port 8181")
    server.serve_forever()