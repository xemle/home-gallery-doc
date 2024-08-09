.. _Plugin:

Plugin
======

HomeGallery can be extended via plugins. This feature is quite new
and it is in an experimental state. Currently the plugin feature
supports meta data extraction and database creator.

Visit :ref:`Internals` and the :ref:`FAQ` to get familiar with the basic
architecture and design decisions if you plan to develop and fix as plugin.
See also :ref:`Development` for full blown development.

In this section assumes that you setup the gallery with a
gallery configuration correctly. Please visit :ref:`install` section
if not done yet.

.. note::

    To develop a plugin it is recommended to run the gallery
    from sources via git or at least from the `tar.gz` ball. The `tar.gz` ball
    can be downloaded from `dl.home-gallery.org/dist <https://dl.home-gallery.org/dist/latest>`_.

.. note::

    Extending the web application is not yet supported. This feature
    is planed for the future. For the time being please visit :ref:`Development`
    to extend the web application.

Plugin Quickstart
-----------------

.. code-block:: bash
    :linenos:

    # Create a vanilla plugin
    ./gallery.js plugin create --name acme
    # Trigger an import to extract and add plugin to the database
    ./gallery.js --log trace run import
    # Check database with new plugin properties
    zcat ~/.config/home-gallery/database.db | jq .data[].plugin.acme



Disable built in plugins
------------------------

Build in plugins can be disabled in the configuration `gallery.config.yml`.

.. code-block:: yaml
    :linenos:

    pluginManager:
      disabled:
        - geoAddressExtractor
      disabledExtractors:
        - video
      disabledDatabaseMappers:
        - objectMapper
        - facesMapper

See ``./gallery plugin ls`` to list available plugins to deactivate. Use ``--long``
argument to see detailed list

.. code-block:: bash
    :linenos:

    ./gallery.js plugin ls
    List Plugins: 12 available
    - metaExtractor v1.0.0
    - imageResizeExtractor v1.0.0
    - heicPreviewExtractor v1.0.0
    - embeddedRawPreviewExtractor v1.0.0
    - imagePreviewExtractor v1.0.0
    - videoFrameExtractor v1.0.0
    - videoPosterExtractor v1.0.0
    - vibrantExtractor v1.0.0
    - geoAddressExtractor v1.0.0
    - aiExtractor v1.0.0
    - videoExtractor v1.0.0
    - baseMapper v1.0.0

After a plugin has been deactivated the database needs to be rebuilt to
apply changes.

.. code-block:: bash
    :linenos:

    # Rebuild database to apply disabled plugins
    ./gallery.js database

Plugin Structure
----------------

The plugin defines basic information and an entry point.

The entry file must export an object with `name`, `version` property and an `initialize` function.
Optionally a `requires` array can define dependencies to other plugins. The dependency
can contain also a semantic version like `other@1.2.3`.

The asynchronous `initialize` function is called with the plugin manager and must
return an array with different plugin modules.

.. code-block:: js
    :linenos:

    const factory = async manager => {
      const log = manager.createLogger('plugin.acme.factory')
      log.trace(`Initialize plugin factory`)

      return {
        getExtractors() {
          return []
        },
        getDatabaseMappers() {
          return []
        },
        getQueryPlugins() {
          return []
        },
      }
    }

    const plugin = {
      name: 'Acme Plugin',
      version: '1.0',
      requires: [],
      async initialize(manager) {
        const log = manager.createLogger('plugin.acme')
        log.trace(`Initialize Acme plugin`)

        return factory(manager)
      }
    }

    export default plugin

The manager offers access to the gallery config and the context properties and can create logger instances.

.. code-block:: ts
    :linenos:

    type TManager = {
      getApiVersion(): string
      getConfig(): TGalleryConfig
      createLogger(module: string): TLogger
      getContext(): TGalleryContext
    }

Plugins can store properties and objects in the context, namespaeced by `plugin.<pluginName>`.

Extractor plugin
----------------

A extractor creates meta information from the original file or form other extractor
files.

As example: The Exif extractor reads the image and provides exif data as meta data to the
storage. The geo reverse plugin reads the exif meta data, requests the address from
a remote service and stores these address as further meta information.

Further example: The image resizer reads the image and stores the preview file in the storage.
The AI extractor reads a small preview image, sends it to the api service and stores
similarity vectors as new meta data.

The extractor has following phases

#. meta
#. raw
#. file

The *meta* phase reads basic meta data from files for each file.

The *raw* phase receives a file grouped by sidecars and can extract images from raw files.
The assumption is that a raw file extraction is expensive and should only be executed if no
image sidecar is available.

The *file* phase is called again for each file (sidecar files are flatten again).

Therefore the extracor object has a `name` and `phase` property and a `create` function.
The async `create` function returns:

* a extractor function `(entry) => Promise<void>` or
* a task object with optional `test?: (entry) => boolean`, a required `task: (entry) => Promise<void>`
  and optional `end: () => Promise<void>` function or
* a stream `Transform` object

.. code-block:: js
    :linenos:

    const factory = async manager => {
      const acmeExtractor = await extractor(manager)
      return {
        getExtractors() {
          return [extractor]
        },
        // ...
      }
    }

    const extractor = manager => ({
      name: 'acmeExtractor',
      phase: 'file',

      async create(storage) {
        const pluginConfig = manager.getConfig().plugin?.acme || {}
        // plugins can provide properties or functions on the context
        const suffix = 'acme.json'

        const created = new Date().toISOString()
        const value = 'Acme'
        // Read property from plugin's configuration plugin.acme.property for customization
        const property = pluginConfig.property || 'defaultValue'

        const log = manager.createLogger('plugin.acme.extractor')
        log.debug(`Creating Acme extractor task`)

        return {
          test(entry) {
            // Execute task if the storage file is not present
            return !storage.hasFile(entry, suffix)
          },
          async task(entry) {
            log.debug(`Processing ${entry}`)
            const data = { created, value, property }
            // Write plugin data to storage. Data can be a buffer, string or object
            return storage.writeFile(entry, suffix, data)
          }
        }
      }

    })

The storage object has functions to read data from and write data to the object storage.

.. code-block:: js
    :linenos:

    type TStorage = {
      // Evaluates if the entry has given storage file
      hasFile(entry, suffix): boolean
      // Reads a file from the storage
      readFile(entry, suffix): Promise<Buffer | any>
      // Write a extracted data to the storage.
      //
      // If the suffix ends on `.json` or `.json.gz` the data is automatically serialized and compressed.
      // The storage file is added to the entry `.files` array and the json data is added to the `.meta` object
      writeFile(entry, suffix, data): Promise<void>
      // Copy a local file to the storage
      copyFile(entry, suffix, file): Promise<void>
      // Creates a symbolic link from a local file
      symlink(entry, suffix, file): Promise<any>
      // Removes a file from the storage directory
      removeFile(entry, suffix): Promise<any>
      // Creates a local file handle new or existing storage files.
      //
      // The file handle should be committed or released after usage
      createLocalFile(entry, suffix): Promise<TLocalStorageFile>
      // Create local directory to create files
      createLocalDir(): Promise<TLocalStorageDir>
    }


Database plugin
---------------

The database plugin maps important meta data from the extrator to a database entry.

The mapping is synchronous. Asynchronous stuff belongs to the extractor.

.. code-block:: js
    :linenos:

    const factory = async manager => {
      const acmeDatabaseMapper = databaseMapper(manager)
      return {
        getDatabaseMappers() {
          return [acmeDatabaseMapper]
        },
        // ...
      }
    }

    const databaseMapper = manager => ({
      name: 'acmeMapper',
      order: 1,

      mapEntry(entry, media) {
        const log = manager.createLogger('plugin.acmeMapper')
        log.info(`Map database entry: ${entry}`)

        // Use somehow the data from the extractor task
        media.plugin.acme = entry.meta.acme
      }

    })

Query plugin
------------

The query plugin extends the query language and can extend the simple text search,
manipulates the query abstract syntax tree (AST) or defines new comparator keys.

The `textFn` function extends the simple text search if only an identifier is search.

The `transformRules` array contains rules of query AST manipulation on top to down
traversal. A transform rule can create new query AST nodes to insert expressions.

After the AST is build, the filter and sort function is created from bottom to top.
The `queryHandler` is called in a chain if a comparison or function key could not
be resolved. If the plugin can handle the query AST node it must return `true` to
skip further chain evaluation.

.. code-block:: js
    :linenos:

    const factory = async manager => {
      const acmeQueryPlugin = queryPlugin(manager)
      return {
        getQueryPlugins() {
          return [acmeQueryPlugin]
        },
        // ...
      }
    }

    const queryPlugin = manager => ({
      name: 'acmeQuery',
      order: 1,
      textFn(entry) {
        return entry.plugin.acme?.value || ''
      },
      transformRules: [
        {
          transform(ast, queryContext) {
            return ast
          }
        }
      ],
      queryHandler(ast, queryContext) {
        // Create filter on acme keyword in condition to support 'acme = value' or 'acme:value'
        if (ast.type == 'cmp' && ast.key == 'acme' && ast.op == '=') {
          ast.filter = (entry) => {
            return entry.plugin?.acme?.value == ast?.value?.value
          }
          // The ast node could be handled. Return true to prevent further chain calls
          return true
        }

        // Create custom sort key 'order by acme'
        if (ast.type == 'orderKey' && ast.value == 'acme') {
          ast.scoreFn = e => e.plugin.acme.created || '0000-00-00'
          ast.direction = 'desc'
          return true
        }

        // Check ast and return if ast node can be resolved
        return false
      }
    }

See the query package for further details with `debug.js` script to evaluate and inspect the
query AST.

.. code-block:: bash
    :linenos:

    $ cd packages/query/
    $ ./debug.js
    debug.js [ast|traverse|transform|transformStringify|stringify] query
    $ ./debug.js 'year >= 2024 not tag:trashed'
    {
    "type": "query",
    "value": {
      "type": "terms",
      "value": [
      {
        "type": "cmp",
        "key": "year",
        "op": ">=",
        "value": {
        "type": "comboundValue",
        "value": "2024",
        "col": 9
        },
        "col": 1
      },
      {
        "type": "not",
        "value": {
        "type": "keyValue",
        "key": "tag",
        "value": {
          "type": "identifier",
          "value": "trashed",
          "col": 22
        },
        "col": 18
        },
        "col": 14
      }
      ],
      "col": 1
    },
    "col": 1
    }