FROM sphinxdoc/sphinx

RUN mkdir -p /usr/share/man/man1 \
 && apt-get update \
 && apt-get install --no-install-recommends -y \
      openjdk-11-jre-headless \
      plantuml \
 && apt-get autoremove \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN pip install sphinx_rtd_theme sphinxcontrib-plantuml

CMD ["make", "html"]
