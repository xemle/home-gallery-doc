## Database plugin

The database plugin maps important meta data from the extrator to a
database entry.

The mapping is synchronous. Asynchronous stuff belongs to the extractor.

```js
// plugin definition as above

async function factory(manager) {
  await manager.register('database', databaseMapper(manager))
}

function databaseMapper(manager) (
  const log = manager.createLogger('plugin.acmeMapper')

  return {
    name: 'acmeMapper',
    order: 1,

    // entry is the storage entry containing all extracted data
    // media is the target database entry
    mapEntry(entry, media) {
      log.info(`Map database entry: ${entry}`)

      // Use somehow the data from the extractor task
      media.plugin.acme = entry.meta.acme
    }
  }
})
```
