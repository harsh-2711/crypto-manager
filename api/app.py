import time
from flask import Flask, jsonify, request
import urllib
import os
from dotenv import load_dotenv

# Load secret API file
load_dotenv()
API_KEY = os.getenv('NOMICS_API_KEY')

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})

@app.route('/crypto/metadata/<tick>')
def getCryptoMetaData(tick):
	url = "https://api.nomics.com/v1/currencies?key=" + API_KEY + "&ids=" + tick
	response = urllib.urlopen(url).read()
	return response

if __name__ == '__main__':
    app.run()