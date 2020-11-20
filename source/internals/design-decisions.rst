Design Decisions
----------------

For this gallery I assume a average private photo collection of 100,000 media,
200,000 files and a recent mobile phone.

Web Gallery
^^^^^^^^^^^

Today (almost) every thing can be presented and edited by a web page. Mobile
phones are omnipresent and have enough power to process complex web applications.
So it makes tatal sence to offer a web gallery for the family where everyone
cat consume the gallery on their mobile phone.

JSON
^^^^

The main data structure is encoded in JSON format. JSON is the common data exchange
format of the web. It can be read by machines but also by human, which helps
debugging problems.

It might be stored plain, compressed by gzip or as line-delimited JSON in the HomeGallery.

Database
^^^^^^^^

There is no database, just a JSON array. And the main gallery database is loaded
completly into the browser. Today devices - even mobile phones and SoC - are fast enough
to process and filter 100k entries quickly (below a second and less). So why use a
backend database which is slowed down by client-server requests?

For a private media collection of 100,000 files the execution times are good enough.

Javascript
^^^^^^^^^^

I like Javascript and Typescript and I think these are awesome languages. The eco
system with node packages is wide supported. The language helps me prototyping the
features quickly in the backend and frontend or both. Perfect for a pet project.

SHA1
^^^^

The file index uses SHA1 checksum as unique file identifier. It is used because git
uses it.
