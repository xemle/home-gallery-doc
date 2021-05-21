.. _docker-compose:

Docker Compose
--------------

Docker compose simplifies the configuration of containers and
connected services. Following example starts the HomeGallery with
a local api server.

.. literalinclude:: files/docker-compose.yml
    :language: yaml
    :linenos:

.. note::

    The example uses ``node`` backend in the API server which is only
    supported for amd64 hosts. Use ``BACKEND=wasm`` on Raspberry PIs or
    if you discover troubles.

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    mkdir -p data
    echo "CURRENT_USER=$(id -u):$(id -g)" >> .env
    docker-compose exec gallery /app/gallery.js run init --source /data/Pictures
    docker-compose up
    docker-compose exec gallery /app/gallery.js run import --update