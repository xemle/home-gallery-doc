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
    docker-compose run gallery run init --source /data/Pictures
    docker-compose up -d
    docker-compose run gallery run import --initial

After importing all images you can import new images by:

.. code-block:: bash
    :linenos:

    docker-compose run gallery run import --update
    # For cron update task use -T to disable pseudo-tty allocation
    #docker-compose run -T gallery run import --update
