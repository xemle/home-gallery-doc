.. _Plugin:

Plugin
======

HomeGallery can be extended via plugins. This feature is quite new
and it is in an experimental state. Currently the plugin feature
supports meta data extraction and database creator.

Visit :ref:`Internals` and the :ref:`FAQ` to get familiar with the basic
architecture and design decisions if you plan to develop and fix as plugin.
See also :ref:`Development` for full blown development.

In this section assumes that you setup the gallery with a
gallery configuration correctly. Please visit :ref:`install` section
if not done yet.

.. note::

    To develop a plugin it is recommended to run the gallery
    from sources via git or at least from the `tar.gz` ball. The `tar.gz` ball
    can be downloaded from `dl.home-gallery.org/dist <https://dl.home-gallery.org/dist/latest>`_.

.. note::

    Extending the web application is not yet supported. This feature
    is planed for the future. For the time being please visit :ref:`Development`
    to extend the web application.

Plugin Quickstart
-----------------

.. code-block:: bash
    :linenos:

    # Create a vanilla plugin
    ./gallery.js plugin create --name acme --module extractor database
    # Trigger an import to extract and add plugin to the database
    ./gallery.js --log trace run import
    # Check database with new plugin properties
    zcat ~/.config/home-gallery/database.db | jq .data[].plugin.acme



Disable built in plugins
------------------------

Build in plugins can be disabled in the configuration `gallery.config.yml`.

.. code-block:: yaml
    :linenos:

    pluginManager:
      disabled:
        - geoAddressExtractor
      disabledExtractors:
        - video
      disabledDatabaseMappers:
        - objectMapper
        - facesMapper

See ``./gallery plugin ls`` to list available plugins to deactivate. Use ``--long``
argument to see detailed list

.. code-block:: bash
    :linenos:

    ./gallery.js plugin ls
    List Plugins: 12 available
    - metaExtractor v1.0.0
    - imageResizeExtractor v1.0.0
    - heicPreviewExtractor v1.0.0
    - embeddedRawPreviewExtractor v1.0.0
    - imagePreviewExtractor v1.0.0
    - videoFrameExtractor v1.0.0
    - videoPosterExtractor v1.0.0
    - vibrantExtractor v1.0.0
    - geoAddressExtractor v1.0.0
    - aiExtractor v1.0.0
    - videoExtractor v1.0.0
    - baseMapper v1.0.0

After a plugin has been deactivated the database needs to be rebuilt to
apply changes.

.. code-block:: bash
    :linenos:

    # Rebuild database to apply disabled plugins
    ./gallery.js database