from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/checkout_data/', methods = ['POST'])
def receive_order():
        try:
                data = request.get_json()
                items = data['items']
                user = data['user']

                print("Order Received")
                return '', 200
        except Exception as e:
                return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0', port=5000)