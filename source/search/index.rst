Search
======

The media list can be filtered and ordered by the search input on the nav bar in list mode.
A search term is tested by default agains a space separated basic text of
id prefix, media type, filename, date, camara vendor, camara model, geo names, tags and objects.
The search test is case insensitive.


By default each space separated word is a search term and all search term must be a part of the basic text.
A search term with a white space must be escaped by single or double quotations.
So the input of *san francisco* is treaded as *san and francisco* while *"san francisco"* is treaded as complete name with whitespace.

Search terms can be combined with boolean operands of *not*, *and*, *or* and parenthesis. Search
terms of *not*, *and* and *or* must be escaped by quotations.
Advance search terms like explicit tag search or aspect ratio comparison are listed below.

Date format is currenty in ISO 8601 format: *YYYY-DD-MM'T'hh:mm:ss* like *2020-09-23T08:24:54*

Search Examples
---------------

``berlin``

   Search for filename, address or tag containing search term *berlin*

``berlin tower``

   Is the same as ``berlin and tower``. Search for filename, address or tag containing search term *berlin* and term *tower*

``city:berlin or tower``

   Search for images in the city *berlin* or having *tower* in filename, address or tag

``city:berlin not tower``

   Search for images in the city *berlin* and not haveing *tower* in filename, address or tag

``tags in (vacation, family)``

   Search for all images with tags *vacation* **or** *family*

``tags all in (vacation, family)``

   Search for all images with tags *vacation* **and** *family*

``type:video year in [2015:2020] order by duration``

   Is the same as ``type:video and year in [2015:2020]``. Search all media type of *video* within the years between 2015 and 2020 with longest video first.

``ratio:landscape``

   Lists all media in landscape orientation

``not exists(geo)``

   Lists all images whithout geo information via latitude or longitude

``order by count(faces)``

   Lists all images with detected faces, most faces first

Query BNF
---------

The query language follows following backus naur form.

``?`` is optional. ``|`` is an alternative

Query
  Terms OrderBy? | OrderBy

Terms
  Term Terms?

Term
  Term ``or`` Term | Term ``and`` Term | ``not`` Term | ``(`` Terms ``)`` | Expression

Expression
  KeyValueExpression | CmpExpression | CountFnExpression | ExistsFnExpression | ListExpression | RangeExpression | Value

KeyValueExpression
  Identifier ``:`` Value

CmpExpression
  Identifier Operand Value

CountFnExpression
  ``count(`` Identifier ``)`` Operand Value

ExistsFnExpression
  ``exists(`` Identifier ``)``

ListExpression
  Identifier ``in (`` Values ``)`` | Identifier ``all in (`` Values ``)``

RangeExpression
  Identifier ``in [`` Value ``:`` Value ``]``

Operand
  ``=`` | ``<`` | ``<=`` | ``>`` | ``>=`` | ``!=`` | ``~``

Values
  Value Values?

Value
  "double quoted value" | 'single quoted value' | *text or number*

Identifier
  *text*

OrderBy
  ``order by`` OrderExpression OrderDirection?

OrderExpression
  *see order expressions below below*

OrderDirection
  ``asc`` | ``desc``

Operands
--------

Following operands are used for comparison

.. csv-table:: Operands
   :file: search-operands.csv
   :widths: auto
   :delim: ;
   :header-rows: 1

Number operands
  ``:``, ``=``, ``<``, ``<=``, ``>``, ``>=``, ``!=``, ``in [from:to]``

Text operands
  ``:``, ``=``, ``!=``, ``~``
  
List operands
  ``in (value, ...)``, ``all in (value, ...)``

Advance Search Terms
--------------------

.. csv-table:: Avance Search terms
   :file: search-terms.csv
   :widths: auto
   :delim: ;
   :header-rows: 1

Order Expressions
-----------------

The search result can be ordered by following expressions

.. csv-table:: Order expressions
   :file: order-expressions.csv
   :widths: auto
   :delim: ;
   :header-rows: 1
