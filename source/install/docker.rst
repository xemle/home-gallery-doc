Docker
------

HomeGallery offers docker image at `xemle/home-gallery <https://hub.docker.com/r/xemle/home-gallery>`_
(amd64, arm64, arm/v7 and arm/v6 architecture).
These image are build via `GitHub actions <https://github.com/xemle/home-gallery/actions>`_.

Data volume structure
^^^^^^^^^^^^^^^^^^^^^

The gallery application is located at ``/app`` whereas the data is stored
in ``/data`` within the container. The ``/data`` folder has following structure:

.. code-block::

    `-- /data - Docker data volume
      +-- sources - Your media file sources or other volumne mounts
      +-- config - File index, database and configuration files
      | `-- gallery.config.yml - Main configuration file
      `-- storage - Preview images and meta data

The media volumes should be mounted into the ``/data`` directory.
Eg. mount your host directory ``~/Pictures`` to ``/data/Pictures``
in the container and add it as source to your ``gallery.config.yml``.

To avoid user permission problems it is advisable to run the container
with your user and group id via ``-u`` parameter.

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    mkdir -p data
    alias gallery="docker run -ti --rm \
      -v $(pwd)/data:/data \
      -v $HOME/Pictures:/data/Pictures \
      -u $(id -u):$(id -g) \
      -p 3000:3000 xemle/home-gallery"
    gallery run init --source /data/Pictures
    gallery run server &
    gallery run import --initial

While your media files are imported open your HomeGallery at
`localhost:3000 <http://localhost:3000>`_ in your browser.

Custom image
^^^^^^^^^^^^

You can customize and build the docker image by your own

.. code-block:: bash

    git clone https://github.com/xemle/home-gallery.git
    cd home-gallery
    docker build -t home-gallery .
