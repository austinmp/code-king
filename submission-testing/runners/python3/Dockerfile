FROM python:3

RUN apt-get update && apt-get -y install jq
COPY /code /code
COPY /entrypoint.bash /entrypoint.bash

ENTRYPOINT ["/entrypoint.bash"]
