from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origin = '*')

@app.route("/api/test", methods = ['GET'])
def users():
    return jsonify(
        {
            "testobjs": [
                'test-obj-1',
                'test-obj-2',
                'test-obj-3'
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug = True, port = 8080)