import mimetypes
from http.server import BaseHTTPRequestHandler, HTTPServer
class MyRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path[1:]  # Remove leading slash
        try:
            with open(path, 'rb') as f:
                content = f.read()
                content_type = mimetypes.guess_type(path)[0] or 'application/octet-stream'
                self.send_response(200)
                self.send_header('Content-Type', content_type)
                self.end_headers()
                self.wfile.write(content)
        except FileNotFoundError:
            self.send_error(404)

# ...
httpd = HTTPServer(('localhost', 8081), MyRequestHandler)
httpd.serve_forever()