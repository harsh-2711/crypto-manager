from utils import *
from model import *
from sklearn.model_selection import train_test_split
import pandas as pd
import time
import torch

if __name__ == '__main__':

    #device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    '''
    TwComments = pd.read_csv('tweetsbitcoin.csv',delimiter=",", index_col=None)
    TwComments = TwComments.dropna() 
    TwComments=TwComments.drop_duplicates()
    TwComments=TwComments.sort_values(['date','time'], ascending=[True,True])
    TwComments["DateTime"]=pd.to_datetime(TwComments['date'] + ' ' + TwComments['time'])
    TwComments["hour"] = TwComments.DateTime.dt.hour
    TwComments["day"] = TwComments.DateTime.dt.weekday_name
    TwComments["DateTime"] = TwComments.DateTime.values.astype(np.int64) // 10 ** 9
    TwComments["TimeDiff"]= TwComments["DateTime"] - (TwComments["DateTime"] % 3600) #when time diff is 2.00pm it will categorize comments between 2.00 - 2.59pm
    TwComments = TwComments[TwComments.TimeDiff > 0]

    startTime = int(round(time.time()*60))
    tcomm=pd.DataFrame()
    grouped_terms = TwComments.groupby(["TimeDiff"])

    #This is done to combine the tweets in that hour into a list
    i = 0
    tweets = []
    for name, group in grouped_terms:
        t = []
        for row, data in group.iterrows():
            t.append(data['tweet'])
        tweets.append(''.join(t))
    
    #Formatting price into Y_train
    Price = pd.read_csv ('binanceprices.csv',delimiter="\t", index_col=None)
    Price["Date"] = pd.to_datetime(Price['ClTime'], unit = 'ms')
    Price = Price.sort_values(['OpTime'], ascending=True)
    high_prices = Price.loc[:,'High'].values
    low_prices = Price.loc[:,'Low'].values
    Price['Mid_Price'] = (high_prices+low_prices)/2.0

    Price['Log_Ret'] = np.log(Price.Mid_Price) - np.log(Price.Mid_Price.shift(1))
    Price['Price Diff']= (Price.Mid_Price) - (Price.Mid_Price.shift(1))
    Price=Price.dropna()

    Price.loc[Price['Price Diff'] < 0, 'Price Diff'] = 0
    Price.loc[Price['Price Diff'] > 0, 'Price Diff'] = 1

    Price1 = Price[['OpTime','Log_Ret','Price ']]
    Price1['Log_Ret']=np.square(Price1[['Log_Ret']])
    Price1['OpTime']= Price1['OpTime'].floordiv(1000)

    ProcComm = pd.read_csv('OldTwDocTMatrix1.3.csv',delimiter=",")
    date_time = ProcComm['Date']
    df = pd.DataFrame({'OpTime':date_time,'tweets':tweets})
    df = Price1.merge(df, on='OpTime')
    df = df[['tweets', 'Price Diff']]

    df['tweets'] = df['tweets'].apply(lambda x: preprocess(x))
    df['tweets'] = df['tweets'].apply(lambda x: tokenizer(x))
    
    tweets_1 = df['tweets']
    print(tweets_1)
    exit()
    final_tweets = []
    for t in tweets_1:
        t.insert(0, '<SOS>')
        t.append('<EOS>')
        final_tweets.append(t)
    
    w2i = {}
    word_indices = []
    count = 0
    for t in final_tweets: 
        ind, w2i, count = word2index(t, w2i, count)
        word_indices.append(ind)
    
    padded_word_indices = pad_sequences(word_indices)
    X_train, X_test, y_train, y_test = train_test_split(padded_word_indices, df['Price Diff'].values, test_size=0.1, shuffle=True)
    X_train = Variable(torch.from_numpy(X_train).long().device())
    y_train = Variable(torch.from_numpy(y_train).float().device())
    '''

    model = SimpleClassifier1(100, 32)
    #model.save('sentiment.pt')
    #print(model.parameters())
    mseLoss = nn.MSELoss()
    optimizer = optim.Adam(model.parameters())
    torch.save(model, 'sentiment.pt')
    #model = train(model, X_train, y_train, mseLoss, optimizer, batch_size = 16, n_epochs = 1)
    
