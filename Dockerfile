FROM sphinxdoc/sphinx

RUN mkdir -p /usr/share/man/man1 \
  && apt-get update \
  && apt-get install --no-install-recommends -y \
    plantuml \
  && apt-get autoremove \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN pip install \
  myst-parser \
  sphinxcontrib-plantuml \
  sphinxcontrib.asciinema \
  sphinx-copybutton \
  sphinx_rtd_theme \
  sphinx-sitemap

CMD ["make", "html"]
