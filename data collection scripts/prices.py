#Storing Date,High price,Low price,Open Price,Close Price  of 10 different crypto currencies for last 8 days
import requests
from datetime import datetime
import pandas as pd
to_symbol = 'USD'
datetime_interval = 'day'






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
  
crypto_list=['BTC','ETH','XRP','LTC','BCH','XMR','TRX','ZEC','BNB','HT']


def download_data(from_symbol, to_symbol, exchange, datetime_interval):
    supported_intervals = {'minute', 'hour', 'day'}
    assert datetime_interval in supported_intervals,\
        'datetime_interval should be one of %s' % supported_intervals
    print('Downloading %s trading data for %s %s from %s' %
          (datetime_interval, from_symbol, to_symbol, exchange))
    base_url = 'https://min-api.cryptocompare.com/data/histo'
    url = '%s%s' % (base_url, datetime_interval)
    params = {'fsym': from_symbol, 'tsym': to_symbol,
              'limit': 2000, 'aggregate': 1,
              'e': exchange}
    request = requests.get(url, params=params)
    data = request.json()
    return data

def convert_to_dataframe(data):
    df = pd.io.json.json_normalize(data, ['Data'])
    df['datetime'] = pd.to_datetime(df.time, unit='s')
    df = df[['datetime', 'low', 'high', 'open',
             'close', 'volumefrom', 'volumeto']]
    return df
def filter_empty_datapoints(df):
    indices = df[df.sum(axis=1) == 0].index
    print('Filtering %d empty datapoints' % indices.shape[0])
    df = df.drop(indices)
    return df


#main code
for k in range(len(crypto_list)):
    from_symbol=crypto_list[k]
    if(from_symbol=='BNB'):
        exchange='coinsbit'
    elif(from_symbol=='HT'):
        exchange='HitBTC'
    else:
        exchange='bitfinex'
    data = download_data(from_symbol, to_symbol, exchange, datetime_interval)
    df = convert_to_dataframe(data)
    df = filter_empty_datapoints(df)
    df.insert(0,'index',k+1)
    if(k==0): 
      m='w'
      h=True
    else:
      m='a'
      h=False
    df.tail(8).to_csv('price.csv',mode=m,index=False,header=h)
