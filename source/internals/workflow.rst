Workflow
--------

.. uml:: plantuml/workflow.plantuml

* The Indexer creates a file index from a directory to detect
  quickly file changes and to calculate unique file IDs
* The Extractor calculates preview files and extracts meta data
  based on the file index and unique file IDs. Duplicated files
  (same binary content) are extracted only once. All preview files
  and meta data are stored in a storage directory
* The database builder creates a database from the extracted
  preview files and meta data for the WebApp
* The server serves the database with preview files from the
  storage directory