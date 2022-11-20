.. _configuration:

Configuration
=============

HomeGallery has serveral modules/parts which can be configured through the
``gallery.config.yml`` file. It is loaded on the start of the CLI and
is created if not found. It comes with a well selected preset
of settings.

In a bare minimum configuration you need to define your media directories:

.. code-block:: yaml
    :linenos:

    sources:
      - dir: ~/Pictures

By default the configuration files are stored to ``~/.config/home-gallery``
and the previews are stored in ``~/.cache/home-gallery/storage``.

It is advisable to initialize the configuration through the ``run init`` command:

.. code-block:: bash

    gallery run init --source ~/Pictures /mnt/media

Full configuration
------------------

The full configuration contains valuable details to some settings

.. literalinclude:: files/gallery.config-example.yml
    :linenos:
    :language: yaml