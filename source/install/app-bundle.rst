Application bundle
------------------

HomeGallery can be also downloaded as tar.gz archive from `dl.home-gallery.org/dist <https://dl.home-gallery.org/dist>`_
for Linux, Mac and Windows. These tar.gz archives are the same as the
prebuilt binaries. You have to start the main script manually.

These tar balls include binaries for the given platform

- NodeJS
- ffmpeg and ffprobe
- sharp
- exiftool

.. note::
    On Linux and Mac perl needs to be installed and in the ``PATH`` environment

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    curl -sL https://dl.home-gallery.org/dist/latest/home-gallery-latest-linux-x64.tar.gz -o home-gallery.tar.gz
    tar xvf home-gallery.tar.gz
    cd home-gallery
    node gallery.js run init --source ~/Pictures
    node gallery.js run server &

While your media files are imported open your HomeGallery at
`localhost:3000 <http://localhost:3000>`_ in your browser.

Update the gallery
^^^^^^^^^^^^^^^^^^

To update the gallery software, please stop your current server, download the latest version and start the new version.

Please run the import command to rebuild the database. This step will add new features and fix missing database entries. If all your media is already imported the import can be done in parallel with the server command.

.. code-block:: bash
    :linenos:

    # stop the current server
    mv home-gallery home-gallery.old
    curl -sL https://dl.home-gallery.org/dist/latest/home-gallery-latest-linux-x64.tar.gz -o home-gallery.tar.gz
    tar xvf home-gallery.tar.gz
    cd home-gallery
    node gallery.js import
    node gallery.js run server &
