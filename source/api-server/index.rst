.. _api-server:

API Server
==========

For reverse image lookups (similar image search), object detection and face
recogintion, HomeGallery uses the
its own public API at ``api.home-gallery.org``. This public API supports
low powered devices such as the SoC Raspberry PI and all preview images are
send to this public API by default. No images or privacy data are kept.

The API server can be configured and ran also locally or as Docker container
through ``xemle/home-gallery-api-server`` (amd64 and arm64 architecture).

.. code-block:: bash

    docker run -ti --rm -p 3001:3000 xemle/home-gallery-api-server

and add ``extractor.apiServer: http://localhost:3001`` to your
``gallery.config.yml``. See :ref:`configuration` section for configuration
details.

See :ref:`docker-compose` section to configure it together with home gallery
locally through docker compose or
have a look to the ``packages/api-server`` of the
`GitHub repo <https://github.com/xemle/home-gallery/tree/master/packages/api-server>`_.