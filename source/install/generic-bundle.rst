Generic application bundle
--------------------------

The generic archive of HomeGallery contains all JS resources without
binary dependencies like `node.js <https://nodejs.org>`_,
`sharp <https://sharp.pixelplumbing.com/>`_, ``ffmpeg`` or ``ffprobe``.

It requires following binaryies preinstalled on your system:

- NodeJS LTS v16 (v14 should also work)
- perl
- ffmpeg
- ffprobe
- vipsthumbnail (via vips-tools) or convert (via ImageMagick)

Further the extractor has to be configured to use these native commands.
See :ref:`configuration` section for configuration details.

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    curl -sL https://dl.home-gallery.org/dist/latest/home-gallery-latest-all-generic.tar.gz -o home-gallery.tar.gz
    tar xf home-gallery.tar.gz
    cd home-gallery
    ./gallery.js run init --source ~/Pictures
    # Edit gallery.config.yml and set native commands, see example below
    ./gallery.js run server &

Update the gallery
^^^^^^^^^^^^^^^^^^

To update the gallery software, please stop your current server, download the latest version and start the new version.

Please run the import command to rebuild the database. This step will add new features and fix missing database entries. If all your media is already imported the import can be done in parallel with the server command.

.. code-block:: bash
    :linenos:

    # stop the current server
    # downlaod and extract the newest generic bundle
    # change directory to home-gallery
    ./gallery.js run import
    ./gallery.js run server &

Example configuration part for extractor:

.. code-block:: yaml
    :linenos:

    extractor:
      useNative:
        - vipsthumbnail
        - ffprobe
        - ffmpeg
