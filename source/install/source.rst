Source code
-----------

If you like to fix and tweak HomeGallery you can checkout the
source code, install the npm dependencies and build the packages.

Quickstart
^^^^^^^^^^

.. code-block:: bash
    :linenos:

    git clone https://github.com/xemle/home-gallery.git
    cd home-gallery
    npm install --force
    npm run build
    ./gallery.js run init --source ~/Pictures
    ./gallery.js run server

Run the CLI
^^^^^^^^^^^

The CLI with all commands from source is started via

.. code-block:: bash
    :linenos:

    ./gallery.js -h

Upgrade the gallery
^^^^^^^^^^^^^^^^^^^

To upgrade the gallery software, please stop your current server, fetch the latest master, build the sources and start the new version.

Please run the import command to rebuild the database. This step will add new features and fix missing database entries. If all your media is already imported the import can be done in parallel with the server command.

.. code-block:: bash
    :linenos:

    # Stop the current server
    # Got to the source directory
    git pull
    npm i
    npm run clean
    npm run build
    ./gallery.js run import
    ./gallery.js run server