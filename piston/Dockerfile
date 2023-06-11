FROM ghcr.io/engineer-man/piston

RUN apt update && apt install -y wget
RUN wget https://github.com/engineer-man/piston/releases/download/pkgs/python-3.10.0.pkg.tar.gz && \
    mkdir -p /piston/packages/python/3.10.0 && \
    tar xf python-3.10.0.pkg.tar.gz -C /piston/packages/python/3.10.0/

RUN echo "1684948080895" > /piston/packages/python/3.10.0/.ppman-installed && \
    echo "PATH=/piston/packages/python/3.10.0/bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin:." > /piston/packages/python/3.10.0/.env
