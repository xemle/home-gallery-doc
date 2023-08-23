CLI/Command line tool
=====================

In general HOmeGallery is a command line tool to init the configuration, start the web server
and import the media sources. It has further commands to execute sub task to

* Create and update file index of your media directories
* Extract meta data and calculate previews
* Build the gallery database
* Extract meta data to xmp sidecar files
* Extract static gallery
* Fetch a remote HomeGallery to the local gallery
* Stream media to Google Chromecast

You can list the help of available commands and options via ``gallery -h``.
See the :ref:`install` section how to start the CLI in your environment.

By default it starts in the interactive mode. The ``run`` command should be used
for scripting, eg. for cron jobs. Other commands can be used in advance use
cases.

To run the CLI your gallery settings are configured in ``gallery.config.yml``.
It should be initialized via the :ref:`run init command`.
See :ref:`configuration` section for configuration details.

General help
------------

.. literalinclude:: files/help.out
    :language: bash

run command
-----------

The ``run`` command runs common task

.. literalinclude:: files/run-help.out
    :language: bash

.. _run init command:

run init command
----------------

.. literalinclude:: files/run-init-help.out
    :language: bash

Use the ``--source`` parameter to initialize your media directories. You can edit
the sources later in the ``gallery.config.yml`` configuration.

See :ref:`configuration` section for all available configuration options.

run server command
------------------

.. literalinclude:: files/run-server-help.out
    :language: bash

.. note::
    The ``server`` command starts the local web server.
    Source directories are imported and watched for changes
    by default

run import command
------------------

The import command

* creates or updates the file indices
* extracts meta data and calculates previews
* build the media database
* watch for file changes

.. literalinclude:: files/run-import-help.out
    :language: bash

The import command supports 3 modes

* Initial/incremental import
* Update import
* Full import

At the beginning you should use the *initial import*. It batches
the import in several chunks to build the database step by step.
At the beginning the chunks are small and database updates are done
frequently. If you have a many files in the database the chunk
sizes grow and database updates happens less frequently.

When all media are imported and processed you should run
*update import* to import only new unknown files. Eg. if you copied
new camera files from your memory cart to your hard drive.

The *full import* processes all files and checks for missing meta data
or preview files. This mode should be run after your finished the
initial import - just to be safe. This mode is slow since all
media files, meta data and previews needs to be checked.

.. note::
    The watch mode should use the polling mechanism for larger, slow
    or remote media repositories. An polling interval of at least
    5 min is recommended.

.. note::
    The ``import`` command can run in parallel to the server.
    If the database is updated, the server and webapp will reload it
    by default.

.. note::
    If the ``import`` command is aborted (eg. by the user), you should run
    a full import to ensure that all meta data and all previews are
    available.

export static command
---------------------

The export meta command

* Exports a static gallery
* Requires only static webserver like nginx or Apache
* Supports subset exports via query

.. literalinclude:: files/export-static-help.out
    :language: bash

export meta command
-------------------

The export meta command

* Exports meta data to XMP sidecar files

All media with manual tags from HomeGallery are written to XMP sidecar files. By default
it will create ``<name>.<ext>.xmp`` file. E.g. for the image ``IMG_1234.JPG``
the sidecar ``IMG_1234.JPG.xmp`` is created. If ``IMG_1234.xmp`` exists it will
use this file.

The tags are written through `Exiftool <https://exiftool.org>`_ to following namespaces:

* Dublin Core (see `Exiftool dc Tags <https://exiftool.org/TagNames/XMP.html#dc>`_)
* Digikam (see `Exiftool digiKam Tags <https://exiftool.org/TagNames/XMP.html#digiKam>`_)
* Lightroom (see `Exiftool lr Tags <https://exiftool.org/TagNames/XMP.html#Lightroom>`_)

.. literalinclude:: files/export-meta-help.out
    :language: bash

fetch command
------------------

The fetch command

* Fetches a remote gallery
* Merges remote database and events from local
* Downloads remote previews to local storage
* Supports subset imports via query

.. literalinclude:: files/fetch-help.out
    :language: bash

database command
----------------

The database command

* Remove database entries by query

.. literalinclude:: files/database-remove-help.out
    :language: bash

storage command
------------------

The storage command

* Purges unused and orphan files from the storage directory

.. literalinclude:: files/storage-purge-help.out
    :language: bash

cast command
------------------

The cast command

* Cast a slideshow to a Chromecast-enabled TV
* Supports subsets via query

.. literalinclude:: files/cast-help.out
    :language: bash

Example:
  ``./gallery cast -u https://demo.home-gallery.org``

.. note::
    Cast command does not work inside a docker container by default.
    The cast command needs to run in the same network as Google's Chromecast
    device. Please ensure that your docker container runs in the
    same network
