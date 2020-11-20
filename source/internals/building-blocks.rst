Building Blocks
---------------

Indexer
^^^^^^^

.. uml:: plantuml/indexer.plantuml

Responsibilities:

* Create and update a file index from a diretory to detect file changes quickly such as new, deleted files and moved files
* Create unique file identifier for each file (SHA1 sum)

For the first time the creation of a file index can be time consuming
due the calculation of SHA1 checksum where each byte of a file needs
to be processed. Depending on the total file size this process can take
hours.

On file index update known files do not need to be updated. Known
files are detected by file path and inode. Other strategies are
supported, too.

Extractor
^^^^^^^^^

.. uml:: plantuml/extractor.plantuml

Responsibilities:

* Calculate preview images and videos based on the file index and the uniq file identifier
* Extract meta data original files, preview data or other meta data
* Store all data to the storage directory

The work of the extractor is explorative and the raw output data from extractors is stored.

The calculation of preview files and extracting meta data is time consuming.
The calculation of preview videos takes also long. Depending on image and video count
and used PC this process can take weeks for the intial run. Updates compute
only new media (detected by the file index).

Database Builder
^^^^^^^^^^^^^^^^

.. uml:: plantuml/builder.plantuml

Responsibilities:

* Create a database from preview files extracted meta data for the WebApp

The database builder prepares the data for the (mobile) browser and collects the important data for the presentational WebApp

Events
^^^^^^

User inputs such as add or remove tags are handled and stored as events.
These events are applied on the database entries.

Server
^^^^^^

.. uml:: plantuml/server.plantuml

Responsibilities:

* Serve the WebApp
* Serve the preview images and videos to the WebApp
* Handle user events like add or remove tags

Since the database is loaded into the browser, the server acts mainly
as a static webserver. The main logic such as filtering and sorting is
executed in the WebApp

Export
^^^^^^

.. uml:: plantuml/export.plantuml

Responsibilities:

* Export static web site from a subset
