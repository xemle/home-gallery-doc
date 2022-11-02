Generic application bundle
--------------------------

The generic archive of HomeGallery contains all JS resources without
binary dependencies like `node.js <https://nodejs.org>`_,
`sharp <https://sharp.pixelplumbing.com/>`_, ``ffmpeg`` or ``ffprobe``.

It requires following binaryies preinstalled on your system:

- NodeJS LTS v16 (v14 should also work)
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
    # Edit gallery.config.yml and set native commands
    ./gallery.js run server &
    ./gallery.js run import --initial