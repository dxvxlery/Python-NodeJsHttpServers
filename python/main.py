from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
from typing import Collection

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    fruits = ["cherry","banana","watermelon","123"]

    def do_GET(self):
       
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        print(self.fruits)
        for i in self.fruits:
            self.wfile.write(i.encode()+" ".encode())
        
   
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        response = BytesIO()
        response.write(b'This is POST request. ')
        response.write(b'Received: ')
        response.write(body)
        self.fruits.append(str(body.decode()))
        self.fruits.pop(0)
        self.wfile.write(response.getvalue()+"! Измененный массив: ".encode())
        for i in self.fruits:
            self.wfile.write(i.encode()+" ".encode())
        print(self.fruits)

httpd = HTTPServer(('localhost', 3000), SimpleHTTPRequestHandler)
httpd.serve_forever()
