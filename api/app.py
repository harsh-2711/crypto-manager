import time
from flask import Flask, jsonify, request
import urllib
import os
from dotenv import load_dotenv
import json

# Load secret API file
load_dotenv()
CRYPTO_API_KEY = os.getenv('CRYPTO_API_KEY')
NOMICS_API_KEY = os.getenv('NOMICS_API_KEY')

# Errors
ERR_RESP = "Page Not Found"

app = Flask(__name__)

# Getting metadata for any crypto
# 			- Eg: Name, Description, Images, etc.
@app.route('/crypto/metadata/<tick>')
def getCryptoMetaData(tick):
	url = "https://api.nomics.com/v1/currencies?key=" + NOMICS_API_KEY + "&ids=" + tick
	try:
		response = urllib.urlopen(url).read()
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response

# Daily tick data
@app.route('/crypto/data/daily', methods=['GET'])
def getDailyOHLCV():
	url = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + request.form['tick'] + "&tsym=" + request.form['currency'] + "&limit=" + request.form['limit'] + "&api_key=" + CRYPTO_API_KEY
	try:
		resp = urllib.urlopen(url)
		jsonResp = json.load(resp)
		if jsonResp['Response'] == 'Success':
			response = jsonify(jsonResp['Data'])
		else:
			response = jsonResp['Response']
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response

# Hourly tick data
@app.route('/crypto/data/hourly', methods=['GET'])
def getHourlyOHLCV():
	url = "https://min-api.cryptocompare.com/data/v2/histohour?fsym=" + request.form['tick'] + "&tsym=" + request.form['currency'] + "&limit=" + request.form['limit'] + "&api_key=" + CRYPTO_API_KEY
	try:
		resp = urllib.urlopen(url)
		jsonResp = json.load(resp)
		if jsonResp['Response'] == 'Success':
			response = jsonify(jsonResp['Data'])
		else:
			response = jsonResp['Response']
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response

# Minute by minute tick data
@app.route('/crypto/data/minute', methods=['GET'])
def getMinuteOHLCV():
	url = "https://min-api.cryptocompare.com/data/v2/histominute?fsym=" + request.form['tick'] + "&tsym=" + request.form['currency'] + "&limit=" + request.form['limit'] + "&api_key=" + CRYPTO_API_KEY
	try:
		resp = urllib.urlopen(url)
		jsonResp = json.load(resp)
		if jsonResp['Response'] == 'Success':
			response = jsonify(jsonResp['Data'])
		else:
			response = jsonResp['Response']
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response

if __name__ == '__main__':
    app.run()