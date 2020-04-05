FROM ubuntu:latest
MAINTAINER Harsh Patel (harshaudi27@gmail.com)
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
WORKDIR /usr/src/app
ADD api .
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]