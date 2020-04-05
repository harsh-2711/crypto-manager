# -*- coding: utf-8 -*-
"""
Created on Sat Apr  4 09:34:03 2020

@author:Nikunj Shah
"""

import tweepy
import csv
import pandas as pd
import time

##Code for fetching tweets with their's details using standard API

####input your credentials here
consumer_key = #API key
consumer_secret = #API Secret Key
access_token = #Access Token Key
access_token_secret = #Access Token Secret Key

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)

list=['bitcoin','ETH','XRP','LTC','BCH','Monero','TRON','Zcash','Binance coin','Huobi token'];
#index cryptocurrencies
# 1    bitcoin
# 2    Ethereum
#3     Ripple
#4     Litecoin
#5     bitcoin cash
#6     monero
#7     TRON
#8     Zcash
#9    Binance coin
#10   Huobi token
# Open/Create a file to append data
csvFile =open('tweet_data1.csv', 'a')
#Use csv Writer
c=0
csvWriter = csv.writer(csvFile,lineterminator='\n')
csvWriter.writerow(['index','username','tweet','likes_count','retweet_count','date & time']);
for i in range(len(list)):
        s=list[i]
        print(i)
        for tweet in tweepy.Cursor(api.search,q=s,lang="en",count=1000,since="2020-03-29").items():
                print(tweet.created_at)
                csvWriter.writerow([i+1,tweet.user.screen_name,tweet.text.encode('utf-8'),tweet.favorite_count,tweet.retweet_count,tweet.created_at]);