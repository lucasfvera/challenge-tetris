FROM python:3.11 AS builder

WORKDIR /server

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app /server/app
COPY ./scripts /server/scripts

CMD ["bash", "scripts/start.sh"]



