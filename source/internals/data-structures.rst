Data Structures
---------------

File index
^^^^^^^^^^

The file index holds a state of the filesystem including

* Base directory
* Filename (relative path from base directory)
* Filetype
* Filesize
* Timestamps
* Inode
* File checksum

It is stored as gziped JSON file. This data is generated and can be recalculated

To inspect an file index the tool `jq <https://stedolan.github.io/jq>`_ is recommended.

.. code-block::

   $ zcat index.idx | jq .
   {
   "type": "home-gallery/fileindex@1.0",
   "created": "2020-09-26T21:10:15.269Z",
   "base": "/home/user/Pictures",
   "data": [
      {
         "dev": 65026,
         "mode": 33188,
         "nlink": 1,
         "uid": 1000,
         "gid": 1000,
         "rdev": 0,
         "blksize": 4096,
         "ino": 691414,
         "size": 3408759,
         "blocks": 6664,
         "atimeMs": 1601154468012.836,
         "mtimeMs": 1513937811000,
         "ctimeMs": 1578598308510.7227,
         "birthtimeMs": 1578598308382.723,
         "atime": "2020-09-26T21:07:48.013Z",
         "mtime": "2017-12-22T10:16:51.000Z",
         "ctime": "2020-01-09T19:31:48.511Z",
         "birthtime": "2020-01-09T19:31:48.383Z",
         "filename": "preview-test/files/camera/IMG_20171222_111649.jpg",
         "sha1sum": "f29f407905f8af94ece4720be997fd291adea487",
         "sha1sumDate": "2020-09-26T21:10:07.757Z",
         "isDirectory": false,
         "isFile": true,
         "isSymbolicLink": false,
         "isOther": false,
         "fileType": "f"
      },
      {...},
      ...
   ]
   }

.. _data-structure-storage:

Storage directory
^^^^^^^^^^^^^^^^^

The storage directory is a directory to store generated preview images, preview videos
and extracted meta such as EXIF data, geo addresses or similarity data.

It is a simple object storage where the key is the checksum of the file with given suffixes.
Most data have JSON or binary format.

.. code-block::

   ...
   |-- f2
   |   `-- 9f
   |       |-- 407905f8af94ece4720be997fd291adea487-exif.json
   |       |-- 407905f8af94ece4720be997fd291adea487-image-preview-1280.jpg
   |       |-- 407905f8af94ece4720be997fd291adea487-image-preview-128.jpg
   |       |-- 407905f8af94ece4720be997fd291adea487-image-preview-1920.jpg
   |       |-- 407905f8af94ece4720be997fd291adea487-image-preview-320.jpg
   |       |-- 407905f8af94ece4720be997fd291adea487-image-preview-800.jpg
   |       `-- 407905f8af94ece4720be997fd291adea487-similarity-embeddings.json
   |-- fc
   |   `-- 0b
   |       |-- 1fd17f3eab9c7caf15f3ff4a567573a8ac79-exif.json
   |       ...
   ...

.. note::
    In most cases the storage directory does not need to be deleted. It is
    assumed that the disk space at home is available (and the costs for that is cheap).
    The files in the storage are reused on file renames ore file moves to save CPU time.

Database
^^^^^^^^

The database is the main structure for the web app and holds all important
information of each media. This data is generated and can be recalculated.

The database is stored as a gzip compressed JSON object.

.. code-block::

    $ zcat database.db | jq .
    {
      "type": "home-gallery/database@1.0",
      "created": "2020-09-26T21:31:19.028Z",
      "data": [
        ...
        {
          "id": "f29f407905f8af94ece4720be997fd291adea487",
          "type": "image",
          "date": "2017-12-22T10:16:51.820Z",
          "files": [
            {
              "id": "f29f407905f8af94ece4720be997fd291adea487",
              "index": "index",
              "type": "image",
              "size": 3408759,
              "filename": "preview-test/files/camera/IMG_20171222_111649.jpg"
            }
          ],
          "previews": [
            "f2/9f/407905f8af94ece4720be997fd291adea487-image-preview-128.jpg",
            "f2/9f/407905f8af94ece4720be997fd291adea487-image-preview-1280.jpg",
            "f2/9f/407905f8af94ece4720be997fd291adea487-image-preview-1920.jpg",
            "f2/9f/407905f8af94ece4720be997fd291adea487-image-preview-320.jpg",
            "f2/9f/407905f8af94ece4720be997fd291adea487-image-preview-800.jpg"
          ],
          "year": 2017,
          "month": 12,
          "day": 22,
          "width": 4864,
          "height": 2736,
          "orientation": 1,
          "duration": 0,
          "make": "LEAGOO",
          "model": "T5",
          "iso": 1056,
          "exposureMode": "Auto",
          "focalLength": 3.5,
          "focalLength33mm": -1,
          "latitude": 0,
          "longitude": 0,
          "altitude": 0,
          "whiteBalance": "Auto",
          "similarityHash": "KuSqiWXWVVpqXGmJWU2JGlJula1epWlWaWmVJVQKaUZqIpWklFVJpoliaWqWWFoIZtqakN2VqFiSmWVFVGpilmKlWRYRdJplila3VirmiahlSyU5SaA="
        },
        ...
      ]
    }

Events
^^^^^^

All user interaction (currently limited to image tagging) are stored in a event database.

Events are stored as plain newline-delimited JSON (AKA ndjson). This data contains only manual
actions and should be treated with care.

.. code-block::

    $ cat events.db | jq .
    {
      "type": "home-gallery/events@1.0",
      "created": "2020-09-06T06:57:17.507Z"
    }
    {
      "id": "541c203a-bccc-455c-babd-4bcd7858f3b9",
      "type": "userAction",
      "targetIds": [
        "f29f407905f8af94ece4720be997fd291adea487"
      ],
      "actions": [
        {
          "action": "addTag",
          "value": "awessome"
        }
      ],
      "date": "2020-10-07T07:04:46.912Z"
    }
    ...

.. note::
    While the database can be recreated, the events holds your manual work
    which gets lost on deletion. Delete the events file only if you know
    what you are doing.