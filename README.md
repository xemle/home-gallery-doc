# Documentation of HomeGallery

This repository contains the [documentation](https://docs.home-gallery.org) of the
web gallery [HomeGallery](https://home-gallery.org). The documentation is
generated through [sphinx](https://www.sphinx-doc.org).

## Generate through docker

### Build docker image

```
docker build -t home-gallery-doc .
```

### Build Documentation

```
docker run -ti --rm -u $(id -u):$(id -g) -v $(pwd):/docs home-gallery-doc make html
```
