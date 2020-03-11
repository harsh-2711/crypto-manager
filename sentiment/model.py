import numpy as np
import torch
import torch.optim as optim
import torch.nn as nn
from torch.autograd import Variable


class SimpleClassifier(nn.Module):
    def __init__(self, input_size, hidden_size):
        super(SimpleClassifier, self).__init__()
        self.hidden_size = hidden_size
        self.embedding = nn.Embedding(300000, hidden_size)
        self.gru = nn.GRU(input_size = hidden_size, hidden_size = hidden_size)
        self.linear = nn.Linear(hidden_size, 1)
        self.sigmoid = nn.Sigmoid()
        self.relu = nn.ReLU()

    def forward(self, input, hidden):
        embedded = self.embedding(input)
        output = embedded
        output, hidden = self.gru(output, hidden)
        output = self.relu(output)
        output = self.linear(output)
        output = self.sigmoid(output)
        return output, hidden

    def initHidden(self):
        return torch.zeros(1, 100, self.hidden_size)

def train(model, X_train, y_train, loss, optimizer, n_epochs = 10, batch_size = 32):
    hidden = model.initHidden()
    for epoch in range(n_epochs):
        t_loss = 0
        for i in range(0, len(X_train), batch_size):
            mse_loss = 0
            train_data = X_train[i:min(i+batch_size, len(X_train))]
            train_labels = y_train[i:min(i+batch_size, len(y_train))]
            pred, hidden = model.forward(train_data, hidden)
            hidden = hidden.detach()
            mse_loss += loss(pred, train_labels)
            optimizer.zero_grad()
            mse_loss.backward()
            optimizer.step()
            t_loss += mse_loss
        print("Epoch {} | Loss {}".format(epoch+1, t_loss))
    return model