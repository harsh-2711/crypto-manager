import pytest

import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir) 
import app

@pytest.fixture
def client():
	client = app.app.test_client()
	return client

def test_empty_db(client):
	rv = client.get('/')
	assert b'Welcome to Crypto Manager' in rv.data