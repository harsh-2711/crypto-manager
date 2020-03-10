from utils import *
from model import *

if __name__ == '__main__':
	bitcoin_prices = pd.read_csv('BitcoinPrices.csv')
	mean_prices = rolling_mean(bitcoin_prices['Close'].values[::-1])
	mean_prices = mean_prices - np.mean(mean_prices)
	mean_prices = mean_prices/np.std(mean_prices)
	train_btc_price, test_btc_price = get_training_matrix(mean_prices)
	model = BTCPrice(10, 5, 1)
	loss = nn.MSELoss()	
	optimizer = optim.Adam(model.parameters())
	train(model = model, train_data = train_btc_price, test_data = test_btc_price, loss = loss, optimizer = optimizer)
	torch.save(model, 'model.pt')

