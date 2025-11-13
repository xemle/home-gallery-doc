# Plugin

HomeGallery can be extended via plugins. This feature is quite new and
it is in an experimental state. Currently the plugin feature supports
meta data extraction and database creator.

Visit [Internals](../internals/building-blocks.md) and the
[FAQ](../faq/index.md) to get familiar with the basic
architecture and design decisions if you plan to develop and fix as
plugin. See also [Development](../development/index.md) for full
blown development.

In this section assumes that you setup the gallery with a gallery
configuration correctly. Please visit [Install](../install/index.mdx)
section if not done yet.

:::note
To develop a plugin it is recommended to run the gallery from sources via git or at least from the [tar.gz generic bundle](../install/generic-bundle.md) ball. The [tar.gz](../install/generic-bundle.md) ball can be downloaded from [dl.home-gallery.org/dist](https://dl.home-gallery.org/dist/latest).
:::

:::note
Extending the web application is not yet supported. This feature is planed for the future. For the time being please visit [Development](../development/index.md) to extend the web application.
:::

## Plugin Quickstart

```bash
# Create a vanilla plugin
./gallery.js plugin create --name acme
# Trigger an import to extract and add plugin to the database
./gallery.js --log trace run import
# Check database with new plugin properties
zcat ~/.config/home-gallery/database.db | jq .data[].plugin.acme
```

## Disable built in plugins

Build in plugins can be disabled in the configuration
[gallery.config.yml](../configuration/index.mdx)

```yaml
pluginManager:
  disabled:
    - baseMapper.similarityMapper
    - baseMapper.objectMapper
    - baseMapper.faceMapper
```

See `./gallery plugin ls` to list available plugins to deactivate. Use
`--long` argument to see detailed list

```bash
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
```

After a plugin has been deactivated the database needs to be rebuilt to
apply changes.

```bash
# Rebuild database to apply disabled plugins
./gallery.js database
```

## Plugin Structure

The plugin defines basic information and an entry point.

The entry file must export an object with `name`,
`version`, `requires` property and an `initialize` function.
Optionally a `requires` array can define dependencies to
other plugins. The dependency can contain also a semantic version like
`['other@1.2.3']`.

The asynchronous `initialize()` function is called with the
plugin manager and must return an array with different plugin modules.

```js
const plugin = {
  name: 'Acme Plugin',
  version: '1.0',
  // requires: ['other@1.0.0'],
  // environment: ['server', 'browser']
  async initialize(manager) {
    const log = manager.createLogger('plugin.acme')
    log.trace(`Initialize Acme plugin`)

    return factory(manager)
  }
}

export default plugin

async function factory(manager) {
  // register plugins extensions here
}
```

The manager offers access to the gallery config and the context
properties and can create logger instances.

```js
type TExtenstionType = 'extractor' | 'databaseMapper' | 'queryPlugin'
type TExtensionBase = {
  name: string
  order?: number
}

type TGalleryContext = {
  type: 'extractorContext' | 'databaseMapperContext' | 'serverContext' | 'cliContext' | 'browserContext'
  plugin: Record<string, any>
  [key: string]: any
}

type TGalleryConfig = Record<string, any>

type TManager = {
  getApiVersion(): string
  getConfig(): TGalleryConfig
  createLogger(module: string): TLogger
  getContext(): TGalleryContext
  register(type: TExtenstionType, extension: TExtensionBase & any): Promise<void>;
}
```

Plugins can store properties and objects in the context, namespaeced by
`plugin.<pluginName>`.
