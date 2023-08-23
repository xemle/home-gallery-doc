Prebuilt binaries
-----------------

Download the binary for your platform:

* `Linux (x64) <https://dl.home-gallery.org/dist/latest/home-gallery-latest-linux-x64>`_
* `Mac (x64) <https://dl.home-gallery.org/dist/latest/home-gallery-latest-darwin-x64>`_
* `Windows (x64) <https://dl.home-gallery.org/dist/latest/home-gallery-latest-win-x64.exe>`_

Other download options can be found `here <https://dl.home-gallery.org/dist>`_.
and there are also `unstable releases <https://dl.home-gallery.org/dist/unstable>`_ from
the current development stage.

A prebuilt binary is a command line application through a selfextracting archive.
On the first start it extracts all required files to a temporary directory
and starts the gallery CLI. Please be patient on the first start.
Future starts skip the extraction and the gallery starts faster.

The gallery CLI requires a ``gallery.config.yml`` configuration file and
it is created if missing. See :ref:`configuration` section for details and comments.

By default the HomeGallery stores the configuration files in ``~/.config/home-gallery``.
The generated preview and extracted meta data files are stored in ``~/.cache/home-gallery/storage``.
For docker containers theses directories are different.

.. note::

    On Windows the app might be blocked by the anti virus application
    and should be allowed manually. The extracted files can be found at %temp% directory.

.. note::

    On Mac the app might be blocked the OS and should be allowed manually.
    See `Open a Mac app from an unidentified developer <https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac>`_.

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    curl -sL https://dl.home-gallery.org/dist/latest/home-gallery-latest-linux-x64 -o gallery
    chmod 755 gallery
    ./gallery run init --source ~/Pictures
    ./gallery run server &

While your media files are imported open your HomeGallery at
`localhost:3000 <http://localhost:3000>`_ in your browser.

Run the CLI
^^^^^^^^^^^

The CLI with all commands of the gallery binary is started via

.. code-block:: bash
    :linenos:

    ./gallery -h

Upgrade the gallery
^^^^^^^^^^^^^^^^^^^

To upgrade the gallery software, please stop your current server, download the latest version and start the new version.

Please run the import command to rebuild the database. This step will add new features and fix missing database entries. If all your media is already imported the import can be done in parallel with the server command.

.. code-block:: bash
    :linenos:

    # stop the current server
    mv gallery gallery.old
    curl -sL https://dl.home-gallery.org/dist/latest/home-gallery-latest-linux-x64 -o gallery
    chmod 755 gallery
    ./gallery run import
    ./gallery run server &
