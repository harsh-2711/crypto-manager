import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from torch.autograd import Variable
import torch.optim as optim


class BTCPrice(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(BTCPrice, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.lstm = nn.LSTMCell(self.input_size, self.hidden_size)
        self.tanh = nn.Tanh()
        self.linear = nn.Linear(self.hidden_size, self.output_size)    

    def forward(self, input):
        out, hidden = self.lstm(input)
        out = self.linear(out)
        return out


def train(model, train_data, test_data, loss, optimizer, batch_size = 32, n_epochs = 1000):
    for epoch in range(n_epochs):
        t_loss = 0
        for i in range(0, len(train_data), batch_size):
            optimizer.zero_grad()
            train_X = Variable(torch.from_numpy(train_data[i:min(i+batch_size, len(train_data))]).float())
            train_Y = Variable(torch.from_numpy(test_data[i:min(i+batch_size, len(test_data))]).float())
            out_X = model.forward(train_X)
            mse_loss = loss(out_X, train_Y)
            mse_loss.backward()
            optimizer.step()
            t_loss+=mse_loss
        print("Epoch {} | Loss {}".format(epoch+1, t_loss))

