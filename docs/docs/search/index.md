# Search

The media list can be filtered and ordered by the search input on the
nav bar in list mode. A search term is tested by default agains a space
separated basic text of id prefix, media type, filename, date, camara
vendor, camara model, geo names, tags and objects. The search test is
case insensitive.

By default each space separated word is a search term and all search
term must be a part of the basic text. A search term with a white space
must be escaped by single or double quotations. So the input of *san
francisco* is treaded as *san and francisco* while *\"san francisco\"*
is treaded as complete name with whitespace.

Search terms can be combined with boolean operands of *not*, *and*, *or*
and parenthesis. Search terms of *not*, *and* and *or* must be escaped
by quotations. Advance search terms like explicit tag search or aspect
ratio comparison are listed below.

Date format is currenty in ISO 8601 format: *YYYY-DD-MM\'T\'hh:mm:ss*
like *2020-09-23T08:24:54*

## Search Examples

`berlin`

Search for filename, address or tag containing search term *berlin*

`berlin tower`

Is the same as `berlin and tower`. Search for filename, address or tag
containing search term *berlin* and term *tower*

`city:berlin or tower`

Search for images in the city *berlin* or having *tower* in filename,
address or tag

`city:berlin not tower`

Search for images in the city *berlin* and not haveing *tower* in
filename, address or tag

`tags in (vacation, family)`

Search for all images with tags *vacation* **or** *family*

`tags all in (vacation, family)`

Search for all images with tags *vacation* **and** *family*

`type:video year in [2015:2020] order by duration`

Is the same as `type:video and year in [2015:2020]`. Search all media
type of *video* within the years between 2015 and 2020 with longest
video first.

`ratio:landscape`

Lists all media in landscape orientation

`not exists(geo)`

Lists all images whithout geo information via latitude or longitude

`order by count(faces)`

Lists all images with detected faces, most faces first

## Query BNF

The query language follows following backus naur form.

`?` is optional. `|` is an alternative

```
Query
  : Terms OrderBy? | OrderBy
Terms
  : Term Terms?
Term
  : Term `or` Term | Term `and` Term | `not` Term | `(` Terms `)` |
    Expression
Expression
  : KeyValueExpression | CmpExpression | CountFnExpression |
    ExistsFnExpression | ListExpression | RangeExpression | Value
KeyValueExpression
  : Identifier `:` Value
CmpExpression
  : Identifier Operand Value
CountFnExpression
  : `count(` Identifier `)` Operand Value
ExistsFnExpression
  : `exists(` Identifier `)`
ListExpression
  : Identifier `in (` Values `)` | Identifier `all in (` Values `)`
RangeExpression
  : Identifier `in [` Value `:` Value `]`
Operand
  : `=` | `<` | `<=` | `>` | `>=` | `!=` | `~`
Values
  : Value Values?
Value
  : "double quoted value" | 'single quoted value' | *text or number*
Identifier
  : text
OrderBy
  : `order by` OrderExpression OrderDirection?
OrderExpression
  : see order expressions below below
OrderDirection
  : 'asc' | 'desc'
```

## Operands

Following operands are used for comparison

|Operands       | Descriptions                                    |
|---------------|-------------------------------------------------|
|`:`            | Key value, in most cases it is an alias for `=` |
|`=`            | **Equal to** case sensitive in some cases       |
|`<`            | **Smaller to** for numeric values               |
|`<=`           | **Smaller or equal to** for numeric values      |
|`>=`           | **Greater or equal to** for numeric values      |
|`>`            | **Greater to** for numeric values               |
|`!=`           | **not equal**                                   |
|`~`            | **contains** case insensitive                   |
|`count(key)`   | Counts elements of a list                       |
|`exists(key)`  | Check if elements exists                        |

- Number operands: `:`, `=`, `<`, `<=`, `>`, `>=`, `!=`, `in [from:to]`
- Text operands: `:`, `=`, `!=`, `~`
- List operands: `in (value, ...)`, `all in (value, ...)`

## Advance Search Terms

| Term (*alias*)                    |  Operands         | Value type       | Examples |
|-----------------------------------|-------------------|------------------|---------------------------------------------------------------|
| `id`                              |  text operands    | *text*           | id\~a52f8e                                                    |
| `type`                            |  `:`, `=`, `!=`   | *text*           | type:image, type != video, type=rawImage                      |
| `index`                           |  text operands    | *text*           | index:Pictures                                                |
| `file`                            |  text operands    | *text*           | file\~101Canon/IMG_1234                                       |
| `filename`                        |  text operands    | *text*           | filename\~IMG_1234                                            |
| `path`                            |  text operands    | *text*           | path\~101Canon                                                |
| `ext`                             |  text operands    | *text*           | ext:xmp                                                       |
| `filesize`                        |  number operands  | *number*/*text*  | filesize \>= 1024, filesize \> 2MB                            |
| `width`                           |  number operands  | *number*         | width \>= 1980                                                |
| `height`                          |  number operands  | *number*         | height \< 3000                                                |
| `ratio`                           |  number operands  | *number*         | ratio \> 2                                                    |
| `ratio`                           |  `:` `=`          | *text*           | ratio:panorama, ratio:landscape, ratio:square, ratio:portrait |
| `duration`                        |  number operands  | *number*         | duration \> 60, duration in \[120:360\]                       |
| `year` (`y`)                      |  number operands  | *number*         | year:2000, y \>= 2020, y in \[2010 : 2020\]                   |
| `month` (`m`)                     |  number operands  | *number*         | month != 12, m in \[1 : 6\]                                   |
| `day` (`d`)                       |  number operands  | *number*         | day = 3, d in \[4 : 10\]                                      |
| `hour` (`H`)                      |  number operands  | *number*         | hour \> 6, H in \[9 : 17\]                                    |
| `minute` (`M`)                    |  number operands  | *number*         | minute = 4, M in \[0 : 30\]                                   |
| `make`                            |  text operands    | *text*           | make:canon, make \~ niko                                      |
| `model`                           |  text operands    | *text*           | model:m50, model \~ A22                                       |
| `location`                        |  text operands    | *text*           | location:germany, location \~ thai                            |
| `country`                         |  text operands    | *text*           | location:germany, location \~ thai                            |
| `state`                           |  text operands    | *text*           | state != florida, state \~ fornia                             |
| `city`                            |  text operands    | *text*           | city = rome, city \~ stock                                    |
| `road` (`street`)                 |  text operands    | *text*           | road:main, street \~ way                                      |
| `longitude` (`lon`)               |  number operands  | *number*         | lon \> 0                                                      |
| `latitude` (`lat`)                |  number operands  | *number*         | latitude \< -20                                               |
| `tag`                             |  text operands    | *text*           | tag:vacation, tag != \'san francisco\'                        |
| `tags`                            |  list operands    | *list*           | tag in (vacation, winter)                                     |
| `object`                          |  text operands    | *text*           | object:couch                                                  |
| `exists(make)`                    |                   |                  | exists(make)                                                  |
| `exists(model)`                   |                   |                  | exists(model)                                                 |
| `exists(location)`                |                   |                  | exists(location)                                              |
| `exists(country)`                 |                   |                  | exists(country)                                               |
| `exists(state)`                   |                   |                  | exists(state)                                                 |
| `exists(city)`                    |                   |                  | exists(city)                                                  |
| `exists(road)` (`exists(street)`) |                   |                  | exists(road)                                                  |
| `exists(geo)`                     |                   |                  | exists(geo)                                                   |
| `exists(tags)`                    |                   |                  | exists(tags)                                                  |
| `exists(objects)`                 |                   |                  | exists(objects)                                               |
| `exists(faces)`                   |                   |                  | exists(faces)                                                 |
| `count(files)`                    |  number operands  | *number*         | count(files) = 1                                              |
| `count(tags)`                     |  number operands  | *number*         | count(tags) \> 1                                              |
| `count(objects)`                  |  number operands  | *number*         | count(objects) = 0                                            |
| `count(faces)`                    |  number operands  | *number*         | count(faces) = 0                                              |

## Order Expressions

The search result can be ordered by following expressions

| Expression        | Example                                  |
|-------------------|------------------------------------------|
| `date`            | Default order by date desc, newest first |
| `updated`         | Order by file updates                    |
| `random`          | Order randomly                           |
| `duration`        | Order by video duration                  |
| `width`           | Order by image width                     |
| `height`          | Order by image heigt                     |
| `filesize`        | Order by the largest file                |
| `count(files)`    | Number of files                          |
| `count(tags)`     | Order by detected faces                  |
| `count(faces)`    | Order by detected faces                  |
| `count(objects)`  | Order by detected objects                |

  : Order expressions
