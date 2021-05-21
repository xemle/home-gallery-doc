CLI/Command line tool
=====================

In general it is a command line tool to init the configuration, start the web server
and import the media sources. It has further commands to execute sub task to

* Create and update file index of your media directories
* Extract meta data and calculate previews
* Build the gallery database
* Extract static gallery

You can list the help of available commands and options via ``gallery -h``.

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
    The ``server`` command starts only the local web server. Photos
    and videos have to be imported manually to update the media
    database

run import command
------------------

The import command

* creates or updates the file indices
* extracts meta data and calculates previews
* build the media database

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
    The ``import`` command can run in parallel to the server.
    If the database is updated, the server and webapp will reload it
    by default.

.. note::
    If the ``import`` command is aborted (eg. by the user), you should run
    a full import to ensure that all meta data and all previews are
    available.
