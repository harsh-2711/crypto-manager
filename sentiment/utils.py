import nltk
import numpy as np
import html,re
from nltk.stem.wordnet import WordNetLemmatizer


def preprocess(tweets):
    t = html.unescape(tweets)
    z = lambda x: re.compile('\#').sub('', re.compile('RT @').sub('@', x).strip())
    t = z(t)
    tweet = ' '.join(re.sub("(@[_A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",t).split())
    return tweet

def tokenizer(tweets):
    tweet = " ".join(re.split("[^a-zA-Z.,!?]*", tweets.lower())).strip()
    lemmatizer = WordNetLemmatizer()
    tweets = [lemmatizer.lemmatize(tweet.lower()) for tweet in tweets.split()]
    return tweets

def basic_tokenizer(tweet):
    #Same as tokenize but without the stemmer
    tweet = " ".join(re.split("[^a-zA-Z.,!?]*", tweet.lower())).strip()
    return tweet.split()

def word2index(sent, word_dict = {}, count = 1):
    index = []
    if len(word_dict)==0:
        word_dict['<SOS>'] = 1
        word_dict['<SOS>'] = 2
        count = 3
    
    for word in sent:
        if word in word_dict:
            index.append(word_dict[word])
        else:
            word_dict[word] = count
            index.append(count)
            count+=1
    return index, word_dict, count

def pad_sequences(seq, max_length = 100):
    out_seq = []
    for s in seq:
        if len(s)>=max_length:
            out_seq.append(s[:max_length])
        else:
            s_len = len(s)
            for j in range(max_length-s_len):
                s.append(0)
            out_seq.append(s)
    return np.array(out_seq)