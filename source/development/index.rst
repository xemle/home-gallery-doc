Development
===========

Welcome to the development section. In this section you will get an overview of
the source code structure which helps you to fix or extend the gallery.

HomeGallery is written in Javascript/Typescript and the source code is structured in a
mono repro. To develop and change HomeGallery you need `NodeJS <https://www.nodejs.org>`_,
`git <https://git-scm.com>`_ and an IDE. `VS Code <https://code.visualstudio.com>`_ is a good IDE.

Visit :ref:`internals` and the :ref:`FAQ` to get familiar with the general
architecture and design decisions if you plan to fix a bug or to develop a feature.

.. note::

    You are invited to improve the documentation, the feature set or the code.

Overview
--------

HomeGallery is a set of command line (CLI) tools. Each CLI command has its own purpose and each command can be
built and developed separatly.

For example the `server` command starts the web server and spawns the `import` process to
read and update media files. The `import` process consists of further CLI calls to update
the file index, extract meta files and the database creation.
The extractor uses the api server for ML or AI features.

Depending on your goal you need to update one or several modules.

Since the modules can be developed independendly the state and code standard vary based
on the coder experience and their mood.
Some modules have unit tests, some have e2e integration tests.

As output there are the binaries for different platforms and docker images.
Via `caxa <https://github.com/leafac/caxa>`_ simple binarys are bundled for for Linux, Mac and Windows.
Docker and the binary are packaged by the `bundle` module.

Modules
-------

The main module dependencies looks like

.. uml:: plantuml/module-dependencies.plantuml

* `cli` provides the main entry point
* `index` implements the file index
* `extractor` implements the different meta file extractor and preview generation
* `database` creates and updates the database file
* `server` handles the backend web server
* `webapp` holds the frontend code
* `events` handles the logic for user events
* `fetch` pulls a remote gallery to a local gallery

Following utilities modules share some common logic

* `storage` deals with logic regarding read storage files and caches
* `query` implements the search parser and logic
* `logger` handles logging stuff
* `common` holds common logic for all modules like read and write compressed json files

Other modules are

* `api-server` implements the AI/ML features using `Tensorflow JS <https://www.tensorflow.org/js>`_
* `export-meta` exports user tags as XMP sidecar file
* `export-static` exports a subset of the gallery as static gallery
* `bundle` creates tar balls with binary dependencies for different OSs
* `cast` implements a casting feature for oogle Chromecast

.. note::

    Currently the code has no common format or style.

Setup
-----

A basic setup is to clone the repo with test data repo, install the dependencies,
build the code and run the tests.

.. code-block:: bash
    :linenos:

    git clone git@github.com:xemle/home-gallery.git
    cd home-gallery
    git clone git@github.com:xemle/home-gallery-e2e-data.git data
    npm install
    npm run clean
    npm run build
    npm run test
    npm run test:e2e

Some modules have a `dev` npm script which watches for changes and rebuilding the code
on file changes.

Development
-----------

Depending on your goal you can fix a bug or add a feature to the backend or the frontend.

Backend
^^^^^^^

Usually you change something in one module.

For example to change something in the database you change to the appropriate module's 
directory and changes the source below the `src` folder. Than you build the sources
and test your changes.

.. code-block:: bash
    :linenos:

    cd packages/database
    npm run build
    # Test your changes via cli command with parameters in the root folder
    
A bugfix or new feature in the backend should have a unit or an e2e test.

To debug you start the cli in the inspection mode and start the debugger in visual studio code
by short cut F5.

.. code-block:: bash
    :linenos:

    node --inspect-brk ./gallery.js ...

Frontend
^^^^^^^^

The major building blocks of the front are react, esbuild and tailwind css.

To develop something in the frontend you should run your server locally via ``./gallery.js run server``
and run the develop script in the `packages/webapp` module.

.. code-block:: bash

    # Run the server in one shell
    ./gallery.js run server
    # The local server is available on http://localhost:3000

    # Run the webapp development mode in another shell
    cd packages/webapp
    npm run dev
    # Open the web development with hot reload at http://localhost:1234

To debug use the browser debugger.

For the frontend there are not test at the moment.

Unit Tests
----------

For unit tests `TAP <https://node-tap.org/>`_ is used. Some modules provide tests for some
complex business logic.

Integration E2E Tests
---------------------

For integration tests `Gauge <https://gauge.org>`_ is used. It tests common cli calls and
different scenarios. The e2e scenarios can be inspected in the e2e folder like `here <https://github.com/xemle/home-gallery/blob/master/e2e/specs/run/basic.md>`_.

The e2e output logs are written to ``/tmp/gallery-e2e``. Each run is filed in a dedicated directory.
``/tmp/gallery-e2e/latest`` holds a symbolic link to the latest e2e run.
Each test scenario is filed in a separate directory. 

Within a single output folder the ``cli.log`` keeps the log of the cli calls. While the ``e2e.log`` holds the console
output of the cli calls. With the tool `jq <https://jqlang.github.io/jq/>`_ you can inspect these files.

Documentation
-------------

This documentation is build via the repo `xemle/home-gallery-doc <https://github.com/xemle/home-gallery-doc>`_.
Please read its ``README.md`` for further instructions.

Your fix and improvements are welcome as PR on github.