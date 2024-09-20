Docker
------

HomeGallery offers docker image at `xemle/home-gallery <https://hub.docker.com/r/xemle/home-gallery>`_
(amd64 and arm64 architecture).
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

    mkdir -p data/config
    alias gallery="docker run -ti --rm \
      -v $(pwd)/data:/data \
      -v $HOME/Pictures:/data/Pictures \
      -u $(id -u):$(id -g) \
      -p 3000:3000 xemle/home-gallery"
    gallery run init --source /data/Pictures
    gallery run server

While your media files are imported open your HomeGallery at
`localhost:3000 <http://localhost:3000>`_ in your browser.

.. note::
    The docker container is configured to poll image sources
    each 5 minutes for compatibility reasons of slow or
    large media volumes. Check if inotify through disabled polling by
    ``GALLERY_WATCH_POLL_INTERVAL=0`` is working for you.

Run the CLI
^^^^^^^^^^^

The CLI with all commands via docker is started by

.. code-block:: bash
    :linenos:

    gallery -h

Upgrade the gallery
^^^^^^^^^^^^^^^^^^^

To upgrade the gallery software, please stop your current container, pull the latest image and start a new container.

Please run the import command after an application upgrade to rebuild the database. This step will add new features and fix missing database entries. If all your media is already imported the import can be done while the server is running

.. code-block:: bash
    :linenos:

    # stop the current container
    docker pull xemle/home-gallery
    gallery run import
    gallery run server

Custom image
^^^^^^^^^^^^

You can customize and build the docker image by your own

.. code-block:: bash

    git clone https://github.com/xemle/home-gallery.git
    cd home-gallery
    docker build -t home-gallery .
