import time
from flask import Flask, jsonify, request
import urllib
import os
from dotenv import load_dotenv
import json
import boto3
import time
import hashlib

# Load secret API file
load_dotenv()
CRYPTO_API_KEY = os.getenv('CRYPTO_API_KEY')
NOMICS_API_KEY = os.getenv('NOMICS_API_KEY')

# Errors
ERR_RESP = "Page Not Found"
ERR_ACC = "Account not created"

# Initialize database
dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'crypto-manager'

app = Flask(__name__)

# TODO: Add SHA-256 or JSW token auth for secure APIs

########################
####### MetaData #######
########################

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

# Returns list of available cryptos
@app.route('/crypto/list')
def getCryptosList():
	url = "https://min-api.cryptocompare.com/data/blockchain/list?api_key=" + CRYPTO_API_KEY
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


##########################
####### OHLCV Data #######
##########################

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


#######################
####### Signals #######
#######################

# Trading signals for the provided tick
@app.route('/crypto/signal/<tick>')
def getTradingSignals(tick):
	url = "https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=" + tick + "&api_key=" + CRYPTO_API_KEY
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


###########################
####### Social Data #######
###########################

# Latest social data for all active cryptos
@app.route('/crypto/social/latest')
def getLatestSocialData():
	url = "https://min-api.cryptocompare.com/data/social/coin/latest?api_key=" + CRYPTO_API_KEY
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

# Historical social data for all active cryptos
@app.route('/crypto/social/historical', methods=['GET'])
def getHistoricalSocialData():
	url = "https://min-api.cryptocompare.com/data/social/coin/histo/day?limit=" + request.form['limit'] + "&api_key=" + CRYPTO_API_KEY
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


#############################
####### News Articles #######
#############################

# Returns latest news with crypto id as tags
@app.route('/crypto/news/latest')
def getLatestNews():
	url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=" + CRYPTO_API_KEY
	try:
		response = urllib.urlopen(url).read()
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response


##################################
####### Crypto Price Stats #######
##################################

# Returns price of single crypto in given currencies format
@app.route('/crypto/price/single', methods=['GET'])
def getSingleCryptoPriceConversions():
	url = "https://min-api.cryptocompare.com/data/price?fsym=" + request.form['tick'] + "&tsyms=" + request.form['currency_list'] + "&api_key=" + CRYPTO_API_KEY
	try:
		response = urllib.urlopen(url).read()
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response

# Returns price of provided cryptos in given currencies format
@app.route('/crypto/price/multiple', methods=['GET'])
def getMultiCryptosPriceConversions():
	url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + request.form['ticks'] + "&tsyms=" + request.form['currency_list'] + "&api_key=" + CRYPTO_API_KEY
	try:
		response = urllib.urlopen(url).read()
	except Exception as e:
		print(e)
		response = ERR_RESP
	return response


########################
####### Database #######
########################
@app.route('/user/account/create', methods=['POST'])
def addNewUser():
	try:
		table = dynamodb.Table(TABLE_NAME)
		userID = str(int(time.time()))
		response = table.put_item(
			Item = {
				'userID': userID,
				'email': request.form['email'],
				'password': hashlib.sha256(request.form['email'].encode()).hexdigest(),
				'first_name': request.form['first_name'], 
				'last_name': request.form['last_name'],
				'aadhar_card_no': request.form['aadhar_card_no'],
				'pan_card_no': request.form['pan_card_no'],
				'funds': 0,
				'invested_amount': 0,
				'current_amount': 0,
				'p_and_l': 0
			} 
		)

		# TODO: Check if the entry is successful or not and then proceed with creating other tables

		# Create watchlist and portfolio tables
		table = dynamodb.create_table(
			TableName=userID + "_watchlist",
			KeySchema=[ 
				{
					'AttributeName': 'id',
					'KeyType': 'HASH'
				}
			],
			AttributeDefinitions=[
				{
					'AttributeName': 'id',
					'AttributeType': 'N'
				}
			],
			ProvisionedThroughput={
				'ReadCapacityUnits': 5,
				'WriteCapacityUnits': 5
			}
    	)

		table = dynamodb.create_table(
			TableName=userID + "_portfolio",
			KeySchema=[ 
				{
					'AttributeName': 'id',
					'KeyType': 'HASH'
				}
			],
			AttributeDefinitions=[
				{
					'AttributeName': 'id',
					'AttributeType': 'N'
				}
			],
			ProvisionedThroughput={
				'ReadCapacityUnits': 5,
				'WriteCapacityUnits': 5
			}
    	)
		
		# TODO: Wait until the table is created (show some loading) -> It takes some time to allocate resources for a table in DynamoDB

		response = jsonify(response['ResponseMetadata']['HTTPStatusCode'])
	except Exception as e:
		print(e)
		response = ERR_ACC
	return response

# Ref for boto3 setup: https://medium.com/@aastha6348/easy-wizy-crud-operations-in-dynamodb-with-boto3-6d2844f150b5

if __name__ == '__main__':
    app.run()