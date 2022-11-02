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
    ./gallery.js run server &
    ./gallery.js run import --initial