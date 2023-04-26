.. _docker-compose:

Docker Compose
--------------

Docker compose simplifies the configuration of containers and
connected services. Following example starts the HomeGallery with
a local API server.

.. literalinclude:: files/docker-compose.yml
    :language: yaml
    :linenos:

.. note::

    By default the ``wasm`` backend for the API server is used for best
    support on most platforms (SoS, NAS, cloud and desktop). Use ``node``
    backend for best performance on amd64 CPUs like desktops. Please
    validate that the backend ``node`` works for you.

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    mkdir -p data
    echo "CURRENT_USER=$(id -u):$(id -g)" >> .env
    docker compose run gallery run init --source /data/Pictures
    docker compose up -d

.. note::
    The docker container is configured to poll image sources
    each 5 minutes for compatibility reasons of slow or
    large media volumes. Check if inotify through disabled polling by
    ``GALLERY_WATCH_POLL_INTERVAL=0`` is working for you.

Update the gallery
^^^^^^^^^^^^^^^^^^

To update the gallery software, please pull the latest container and restart your services.

Please run the import command after an application upgrade to rebuild the database. This step will add new features and fix missing database entries. If all your media is already imported the import can be done while the server is running

.. code-block:: bash
    :linenos:

    docker compose pull
    docker compose run gallery run import
    # For cron update task use -T to disable pseudo-tty allocation
    #docker compose run -T gallery run import
    docker compose up -d
