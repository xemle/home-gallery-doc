## Extractor plugin

A extractor creates meta information from the original file or form
other extractor files.

As example: The Exif extractor reads the image and provides exif data as
meta data to the storage. The geo reverse plugin reads the exif meta
data, requests the address from a remote service and stores these
address as further meta information.

Further example: The image resizer reads the image and stores the
preview file in the storage. The AI extractor reads a small preview
image, sends it to the api service and stores similarity vectors as new
meta data.

The extractor has following phases

1. meta
2. raw
3. file

The *meta* phase reads basic meta data from files for each file.

The *raw* phase receives a file grouped by sidecars and can extract
images from raw files. The assumption is that a raw file extraction is
expensive and should only be executed if no image sidecar is available.

The *file* phase is called again for each file (sidecar files are
flatten again).

Therefore the extracor object has a `name` and
`phase` property and a `create` function. The
async `create()` function returns:

- a extractor function `(entry) => Promise<void>` or
- a task object with optional `test?: (entry) => boolean`, a required `task: (entry) => Promise<void>` and optional `end: () => Promise<void>` function or
- a stream `Transform` object

```js
// plugin definition as above

async function factory(manager) {
  await manager.register('extractor', acmeExtractor(manager))
}

function extractor(manager) (
  const pluginConfig = manager.getConfig().plugin?.acme || {}
  const suffix = 'acme.json'
  const log = manager.createLogger('plugin.acme.extractor')

  return {
    name: 'acmeExtractor',
    phase: 'file',

    async create(storage) {
      // plugins can provide properties or functions on the context

      const created = new Date().toISOString()
      const value = 'Acme'
      // Read property from plugin's configuration plugin.acme.property for customization
      const property = pluginConfig.property || 'defaultValue'

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
  }
})
```

The storage object has functions to read data from and write data to the
object storage.

```js
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
```
