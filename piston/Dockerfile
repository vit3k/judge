FROM ghcr.io/engineer-man/piston

RUN apt update && apt install -y wget
RUN wget https://github.com/engineer-man/piston/releases/download/pkgs/python-3.10.0.pkg.tar.gz && \
    mkdir -p /piston/packages/python/3.10.0 && \
    tar xf python-3.10.0.pkg.tar.gz -C /piston/packages/python/3.10.0/ && \
    echo "1684948080895" > /piston/packages/python/3.10.0/.ppman-installed
