Design Decisions
----------------

For this gallery I assume a average private photo collection of 100,000 media,
200,000 files and a recent mobile phone.

Web Gallery
^^^^^^^^^^^

Today (almost) every thing can be presented and edited by a web page. Mobile
phones are omnipresent and have enough power to process complex web applications.
So it makes tatal sence to offer a web gallery for the family where everyone
can consume the gallery on their mobile phone.

Prerendering Previews
^^^^^^^^^^^^^^^^^^^^^

The HomeGallery uses precalulated preview images and videos. There are pro and
cons regarding prerendering and on demand rendering:

Pros of prerendering

* Some feature require preview images. The similarity search as core feature
  plays only well if (almost) all similarity data are available
* All previews can be served immediately and gives good user experience
* Server can be simple such as a SoC like a Raspberry Pi
* Server can be static for the static site export
* Original files can be offline (and safe) after preview and meta data extraction

Cons of prerendering

* Prerendering taks time. Preview image calculation of 20,000 image takes few
  hours. 200,000 require days. Video previews needs weeks - depending on the used system
* Prerendered images and videos consume about 15% of the orginal size, depending
  on image/video ratio
* Gallery can be used after preview calculation is done

Pros of on demand previews

* Initialization of the gallery (time to first usage) takes less time
* Only requested previews are calculated and saves preview storage

Cons of on demand previews

* Access to original files is required
* Image previews need a powerful host for good user experience
* Videos requires supported hardware to trancode videos just in time
* Some features can not be suppored (e.g. similiarity search)

The prerendered previews is choosen due the core feature of similarity search,
SoC targets and decoupeling of (offline) originials. I do not think that storage
consumption of the previews is an issue to the private storage space. Further,
the time of the preview calculation can be splited in several chunk steps (e.g.
by years) to use the gallery quickly until all previews are calculated.

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
