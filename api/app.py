import time
import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import urllib
import os
from dotenv import load_dotenv
import json
import boto3
import time
import hashlib
<<<<<<< HEAD
import torch
import numpy as np
from torch import Variable
=======
import jwt

>>>>>>> 62e71d6fc8bbf1389585b4ec199cc124c6be355f
# import ssl
# ssl._create_default_https_context = ssl._create_unverified_context

# Load secret API file
load_dotenv()
CRYPTO_API_KEY = os.getenv('CRYPTO_API_KEY')
NOMICS_API_KEY = os.getenv('NOMICS_API_KEY')

# Errors
ERR_RESP = "Page Not Found"
ERR_ACC = "Account not created"
ERR_UPD = "Data not updated"
ERR_GET = "Data not found"
ERR_EXT = "Data already exists"
ERR_ORD = "Can't execute order"

# Initialize database
dynamodb = boto3.resource('dynamodb',
						aws_access_key_id=os.getenv('AWS_SERVER_PUBLIC_KEY'),
						aws_secret_access_key=os.getenv('AWS_SERVER_SECRET_KEY'),
						region_name=os.getenv('REGION_NAME')
						)
TABLE_NAME = 'crypto-manager'
BLACKLISTED_TABLE_NAME = 'crypto_manager_blacklisted_tokens'

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
@cross_origin()
def helloWorld():
	return jsonify('Welcome to Crypto Manager')

# TODO: Add SHA-256 or JSW token auth for secure APIs
# TODO: Modify response of every endpoint -> statusCode and body

########################
####### MetaData #######
########################

# Getting metadata for any crypto
# 			- Eg: Name, Description, Images, etc.
@app.route('/crypto/metadata/<tick>')
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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

# Ref for boto3 setup: https://medium.com/@aastha6348/easy-wizy-crud-operations-in-dynamodb-with-boto3-6d2844f150b5

def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, hours=1, minutes=0, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            os.getenv('JWT_SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e

def decode_auth_token(auth_token):
	try:
		blacklistedTable = dynamodb.Table(BLACKLISTED_TABLE_NAME)
		scan = blacklistedTable.scan()
		flag = False
		for each in scan['Items']:
			if each['token'] == auth_token:
				flag = True
				break
		if not flag:
			payload = jwt.decode(auth_token, os.getenv('JWT_SECRET_KEY'))
			return payload['sub']
		else:
			return 407
	except jwt.ExpiredSignatureError:
		return 405
	except jwt.InvalidTokenError:
		return 406

# Creates a new account along with custom watchlist and portfolio
@app.route('/user/account/create', methods=['POST'])
@cross_origin()
def addNewUser():
	try:
		table = dynamodb.Table(TABLE_NAME)
		userID = str(int(time.time()))
		response = table.put_item(
			# TODO: Add regex for input fields
			Item = {
				'userID': userID,
				'email': request.form['email'],
				'password': hashlib.sha256(request.form['password'].encode()).hexdigest(),
				'first_name': request.form['first_name'],
				'last_name': request.form['last_name'],
				'aadhar_card_no': request.form['aadhar_card_no'],
				'pan_card_no': request.form['pan_card_no'],
				'mobile_no': request.form['mobile_no'],
				'funds': 0,
				'invested_amount': 0,
				'current_amount': 0,
				'p_and_l': 0,
				'watchlist_count': 0,
				'portfolio_count': 0,
				'registered_on': str(datetime.datetime.now()),
				'is_admin': request.form['is_admin']
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

		auth_token = encode_auth_token(str(userID))
		response = {
			'statusCode': 200,
			'message': 'Successfully Registered',
			'auth_token': auth_token.decode()
		}
		response = jsonify(response)
	except Exception as e:
		print(e)
		response = ERR_ACC
	return response

@app.route('/user/account/login', methods=['POST'])
@cross_origin()
def newUserLogIn():
	try:
		table = dynamodb.Table(TABLE_NAME)
		hashedPassword = hashlib.sha256(request.form['password'].encode()).hexdigest()
		scan = table.scan()
		userID = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['password'] == hashedPassword:
				userID = str(each['userID'])
				break
		if userID !=  "":
			auth_token = encode_auth_token(userID)
		else:
			auth_token = None
		if auth_token:
			response = {
				'statusCode': 200,
				'message': 'Successfully logged in',
				'auth_token': auth_token.decode()
			}
			return jsonify(response)
		else:
			response = {
				'statusCode': 404,
				'message': 'User not found'
			}
			return jsonify(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response

@app.route('/user/details', methods=['POST'])
@cross_origin()
def getUserDetails():
	try:
		table = dynamodb.Table(TABLE_NAME)
		authToken = request.form['Authorization']
		if authToken and authToken != 'undefined':
			userID = decode_auth_token(authToken)
			if not isinstance(userID, int):
				user = table.get_item(
					Key = {
						'userID': userID
					}
				)
				user = user['Item']
				response = {
					'statusCode': 200,
					'data' : {
						'userID': userID,
						'email': user['email'],
						'first_name': user['first_name'],
						'last_name': user['last_name'],
						'registered_on': user['registered_on'],
						'is_admin': user['is_admin']
					}
				}
				return jsonify(response)
			else:
				response = {
					'statusCode': 405,
					'message': 'Token error'
				}
				return jsonify(response)
		else:
			response = {
				'statusCode': 404,
				'message': 'Not Found'
			}
			return jsonify(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response

@app.route('/user/account/logout', methods=['POST'])
@cross_origin()
def logoutUser():
	try:
		authToken = request.form['Authorization']
		if authToken:
			userID = decode_auth_token(authToken)
			if not isinstance(userID, int):
				blacklistedTable = dynamodb.Table(BLACKLISTED_TABLE_NAME)
				# TODO: Check for failed response
				blacklistedTable.put_item(
					Item = {
						'id': str(int(time.time())),
						'token': authToken
					}
				)
				response = {
					'statusCode': 200,
					'message': 'Successfully logged out'
				}
				return jsonify(response)
			else:
				response = {
					'statusCode': 405,
					'message': 'Token error'
				}
				return jsonify(response)
		else:
			response = {
				'statusCode': 404,
				'message': 'Not Found'
			}
			return jsonify(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response


# Account Related Queries

# Updates funds
@app.route('/user/update/funds', methods=['POST'])
@cross_origin()
def updateUserFunds():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				response = table.update_item(
					Key = {
						'userID': userID
					},
					UpdateExpression = "set funds = :r",
					ExpressionAttributeValues = {
						':r': request.form['funds']
					},
					ReturnValues = "UPDATED_NEW"
				)
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Get funds
@app.route('/user/get/funds', methods=['GET'])
@cross_origin()
def getUserFunds():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				response = each['funds']
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response

# Updates invested amount
@app.route('/user/update/invested_amount', methods=['POST'])
@cross_origin()
def updateUserInvestedAmount():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				response = table.update_item(
					Key = {
						'userID': userID
					},
					UpdateExpression = "set invested_amount = :r",
					ExpressionAttributeValues = {
						':r': request.form['invested_amount']
					},
					ReturnValues = "UPDATED_NEW"
				)
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Get invested amount
@app.route('/user/get/invested_amount', methods=['GET'])
@cross_origin()
def getUserInvestedAmount():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				response = each['invested_amount']
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response

# Updates current amount
@app.route('/user/update/current_amount', methods=['POST'])
@cross_origin()
def updateUserCurrentAmount():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				response = table.update_item(
					Key = {
						'userID': userID
					},
					UpdateExpression = "set current_amount = :r",
					ExpressionAttributeValues = {
						':r': request.form['current_amount']
					},
					ReturnValues = "UPDATED_NEW"
				)
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Get current amount
@app.route('/user/get/current_amount', methods=['GET'])
@cross_origin()
def getUserCurrentAmount():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				response = each['current_amount']
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response

# Updates profit and loss
@app.route('/user/update/p_and_l', methods=['POST'])
@cross_origin()
def updateUserProfitAndLoss():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				response = table.update_item(
					Key = {
						'userID': userID
					},
					UpdateExpression = "set p_and_l = :r",
					ExpressionAttributeValues = {
						':r': request.form['p_and_l']
					},
					ReturnValues = "UPDATED_NEW"
				)
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Get profit and loss
@app.route('/user/get/p_and_l', methods=['GET'])
@cross_origin()
def getUserProfitAndLoss():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				response = each['p_and_l']
				break
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response


# Porfolio related queries

# Add crypto to portfolio
@app.route('/user/portfolio/add', methods=['POST'])
@cross_origin()
def addCryptoToPorfolio():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		cryptoCount = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				cryptoCount = each['portfolio_count']
				break

		portfolioTable = dynamodb.Table(userID + "_portfolio")
		response = portfolioTable.put_item(
			Item = {
				'id': int(time.time()),
				'tick': request.form['tick'],
				'quantity': request.form['quantity'],
				'investmentPrice': request.form['investmentPrice']
			} 
		)

		response = table.update_item(
			Key = {
				'userID': userID
			},
			UpdateExpression = "set portfolio_count = :r",
			ExpressionAttributeValues = {
				':r': str(int(cryptoCount) + 1)
			},
			ReturnValues = "UPDATED_NEW"
		)
		return json.dumps(response)
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Remove all instances of crypto from portfolio
@app.route('/user/portfolio/remove', methods=['POST'])
@cross_origin()
def removeCryptoFromPorfolio():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		cryptoCount = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				cryptoCount = each['portfolio_count']
				break

		portfolioTable = dynamodb.Table(userID + "_portfolio")
		deletionCount = 0
		scan = portfolioTable.scan()
		for each in scan['Items']:
			if each['tick'] == request.form['tick']:
				cryptoID = each['id']
				portfolioTable.delete_item(
					Key = {
						'id': cryptoID
					}
				)
				deletionCount += 1

		if deletionCount != 0:
			response = table.update_item(
				Key = {
					'userID': userID
				},
				UpdateExpression = "set portfolio_count = :r",
				ExpressionAttributeValues = {
					':r': str(int(cryptoCount) - deletionCount)
				},
				ReturnValues = "UPDATED_NEW"
			)
			return json.dumps(response)
		else:
			response = ERR_GET
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Remove specific instances of crypto from portfolio
@app.route('/user/portfolio/sell', methods=['POST'])
@cross_origin()
def sellCryptoFromPorfolio():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		cryptoCount = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				cryptoCount = each['portfolio_count']
				break

		portfolioTable = dynamodb.Table(userID + "_portfolio")
		deletionCount = 0
		scan = portfolioTable.scan()
		totalCount = 0
		sellCount = int(request.form['quantity'])
		sellPrice = float(request.form['price'])
		sellBook = {}

		for each in scan['Items']:
			if each['tick'] == request.form['tick']:
				totalCount += int(each['quantity'])
				sellBook[each['id']] = [each['investmentPrice'], each['quantity']]

		if totalCount < sellCount:
			return jsonify(ERR_ORD)
		else:
			# TODO: Add rigid test
			while sellCount != 0:
				diffBook = {}
				for key, value in sellBook.items():
					diffBook[key] = abs(float(value[0]) - sellPrice)

				sortedDiffBook = {k: v for k, v in sorted(diffBook.items(), key=lambda item: item[1])}
				
				for key, value in sortedDiffBook.items():
					if int(sellBook[key][1]) <= sellCount:
						sellCount -= sellBook[key][1]
						deletionCount += 1
						portfolioTable.delete_item(
							Key = {
								'id': key
							}
						)
					else:
						newQuantity = sellBook[key][1] - sellCount
						sellCount = 0
						response = portfolioTable.update_item(
							Key = {
								'id': int(key)
							},
							UpdateExpression = "set quantity = :r",
							ExpressionAttributeValues = {
								':r': newQuantity
							},
							ReturnValues = "UPDATED_NEW"
						)
						return jsonify("Order completed successfully")
		
		if deletionCount != 0:
			response = table.update_item(
				Key = {
					'userID': userID
				},
				UpdateExpression = "set portfolio_count = :r",
				ExpressionAttributeValues = {
					':r': str(int(cryptoCount) - deletionCount)
				},
				ReturnValues = "UPDATED_NEW"
			)
			return json.dumps(response)
		else:
			response = ERR_GET
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Fetch crypto data from portfolio
@app.route('/user/portfolio/get', methods=['POST'])
@cross_origin()
def getPorfolio():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				break

		portfolioTable = dynamodb.Table(userID + "_portfolio")
		portfolio = []
		scan = portfolioTable.scan()
		for each in scan['Items']:
			portfolio.append({'tick': each['tick'], 'quantity': int(each['quantity']), 'investmentPrice': float(each['investmentPrice'])})
		return jsonify(portfolio)
	except Exception as e:
		print(e)
		response = ERR_GET
	return response


# Watchlist related queries

# Add crypto to watchlist
@app.route('/user/watchlist/add', methods=['POST'])
@cross_origin()
def addCryptoToWatchlist():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		cryptoCount = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				cryptoCount = each['watchlist_count']
				break

		watchListTable = dynamodb.Table(userID + "_watchlist")
		scan = watchListTable.scan()
		cryptoExist = False
		for each in scan['Items']:
			if each['tick'] == request.form['tick']:
				cryptoExist = True
				break

		if not cryptoExist:
			response = watchListTable.put_item(
				Item = {
					'id': int(time.time()),
					'tick': request.form['tick']
				}
			)

			response = table.update_item(
				Key = {
					'userID': userID
				},
				UpdateExpression = "set watchlist_count = :r",
				ExpressionAttributeValues = {
					':r': str(int(cryptoCount) + 1)
				},
				ReturnValues = "UPDATED_NEW"
			)
			return json.dumps(response)
		else:
			response = ERR_EXT
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Remove crypto from watchlist
@app.route('/user/watchlist/remove', methods=['POST'])
@cross_origin()
def removeCryptoFromWatchlist():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		cryptoCount = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				cryptoCount = each['watchlist_count']
				break

		watchListTable = dynamodb.Table(userID + "_watchlist")
		scan = watchListTable.scan()
		cryptoExists = False
		for each in scan['Items']:
			if each['tick'] == request.form['tick']:
				cryptoID = each['id']
				watchListTable.delete_item(
					Key = {
						'id': cryptoID
					}
				)
				cryptoExists = True

		if cryptoExists:
			response = table.update_item(
				Key = {
					'userID': userID
				},
				UpdateExpression = "set watchlist_count = :r",
				ExpressionAttributeValues = {
					':r': str(int(cryptoCount) - 1)
				},
				ReturnValues = "UPDATED_NEW"
			)
			return json.dumps(response)
		else:
			response = ERR_GET
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Fetch user's watchlist
@app.route('/user/watchlist/get', methods=['POST'])
@cross_origin()
def getWatchlist():
	try:
		table = dynamodb.Table(TABLE_NAME)
		scan = table.scan()
		userID = ""
		response = ""
		for each in scan['Items']:
			if each['email'] == request.form['email'] and each['aadhar_card_no'] == request.form['aadhar_card_no'] and each['pan_card_no'] == request.form['pan_card_no']:
				userID = each['userID']
				break

		watchListTable = dynamodb.Table(userID + "_watchlist")
		watchlist = []
		scan = watchListTable.scan()
		for each in scan['Items']:
			watchlist.append(each['tick'])
		return jsonify(watchlist)
	except Exception as e:
		print(e)
		response = ERR_UPD
	return response

# Temporary endpoint for checking Doughnut Chart functionality
@app.route('/temp/data')
@cross_origin()
def sendTempData():
	data = {
		"data": [
			{
				'coin': 'BTC',
				'percentage': 50
			},
			{
				'coin': 'ETH',
				'percentage': 25
			},
			{
				'coin': 'LTC',
				'percentage': 25
			}
		]
	}
	return jsonify(data)


# ML - API

#Prediction for the next k-datapoints
@app.route('/ml/prediction/<k_data>')
@cross_origin()
def prediction(k_data):
	#k_data (json) is the data of the previous k data-points of the given currenct
	#k is determined by the number of previous data used for training (Currently k = 5)
	m = int(k_data['next'])
	k_data = np.array(k_data['data'])
	#Model directory here
	model = torch.load('../prediction/model.pt')
	output = []
	with torch.no_grad():
		for i in range(m):
			data = Variable(torch.from_numpy(k_data))
			out = model.forward(data)[0].cpu().float().numpy()
			k_data.append(out)
			output.append(out)
			k_data = k_data[1:-1]
	return jsonify(output)


if __name__ == '__main__':
    app.run()