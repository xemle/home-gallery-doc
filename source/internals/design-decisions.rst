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

.. _design-decision-prerendering:

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

It might be stored plain, compressed by gzip or as newline-delimited JSON in the HomeGallery.

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

Offline File Index
^^^^^^^^^^^^^^^^^^

HomeGallery uses an offline file index which stores meta data a directory tree.
It keeps a state of a file such as name, file time and
inodes. With it, a change can be detected quickly by comparing the stored state
with the current state.

This method is choosen over live filesystem notifications like inotify because
it offers more flexibility. A live notification needs to be run while the gallery
application runs. Any change outside the lifetime of the application are not
recognized. This drawback is crucial.

Further a live notification is not required since the time when files or
directory change are mostly well known. E.g. a user copies new files from the
camara memory card or a user renames some files or folders. For all these
scenarios an update happens infrequently and it can be performed fast engough.

An offline file index offers also the possibilty to load the directory tree of
an offline media source and operations can still be performed on existing
previews or meta data on the storage.

File identifier
^^^^^^^^^^^^^^^

As file or media identifier a SHA1 checksum is used. This checksum is calculated
over the file content and if a single bit changes, the checksum changes. SHA1
algorithm is used because git uses it and is good enough where the gallery
has not more than one million files.
Due the usage of the file index, an calculation of the checksum happens only for unknown
file such as new or changed files.

A renamed or moved file might trigger a recalculation of the checksum as
identifier but results to a known identifier. So already calculated preview files or
meta data can be kept.

It has also some security properties: The identifier is not guessable.
As long the identifier is not known, the image can not be retrived. A storage
can hold images for several user galleries.

.. note::
    Any change on the file (also embedding new meta data such as GEO data, IPTC or XMP) leads to
    a new identifier and to new preview file generations.
    Therefore it is recommended to use side car files such as `.xmp` files.
