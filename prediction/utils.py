import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def rolling_mean(input, last_items=5):
    output = []
    for i in range(len(input)):
        sum = 0
        for j in range(max(0, i-last_items), i+1):
            sum+=input[j]
        sum/=min(i+1, last_items)
        output.append(sum)
    return np.array(output)

def get_training_matrix(input, last_items = 10):
    output = []
    output1 = []
    for i in range(len(input)):
        temp_output = []
        for j in range(max(0, i-last_items), i):
            temp_output.append(input[j])
        if i-last_items < 0:
            for j in range(last_items-i):
                temp_output.append(input[i])
        output.append(temp_output)
        output1.append(input[i])
    return np.array(output), np.array(output1)

