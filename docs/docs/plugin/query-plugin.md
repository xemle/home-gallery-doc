## Query plugin

The query plugin extends the query language and can extend the simple
text search, manipulates the query abstract syntax tree (AST) or defines
new comparator keys.

The `textFn` function extends the simple text search if only
an identifier is search.

The `transformRules` array contains rules of query AST
manipulation on top to down traversal. A transform rule can create new
query AST nodes to insert expressions.

After the AST is build, the filter and sort function is created from
bottom to top. The `queryHandler` is called in a chain if a
comparison or function key could not be resolved. If the plugin can
handle the query AST node it must return `true` to skip
further chain evaluation.

```js
// plugin definition as above

async function factory(manager) {
  await manager.register('query', queryPlugin(manager))
}

function queryPlugin(manager) {
  return {
    name: 'acmeQuery',
    order: 1,
    // Get simple text search from plugin
    // entry is the database entry
    textFn(entry) {
      return entry.plugin.acme?.value || ''
    },
    // Transform ther query AST before filter and sort function
    transformRules: [
      {
        transform(ast, queryContext) {
          return ast
        }
      }
    ],
    // Add plugin filter or sort functions from query AST
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
}
```

See the query package for further details with [debug.js]{.title-ref}
script to evaluate and inspect the query AST.

```bash
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
```
