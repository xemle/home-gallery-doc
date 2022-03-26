General
=======

Why another gallery?
--------------------

My vision is to consume and discover all my digital family memories on my mobile phones served from the SoC such as Raspberry Pi.
The gallery should support myself to explore forgotten photos and videos in my archive. It should lead me through
common properties via date, place, similarity, person etc to other parts of the archive.

Further the primary storage of my media is on my hardware at home and will be for a very long time. A cloud based solution
is not an option due my privacy concerns.

I was unable to find a suitable solution for it. Since I stopped developing my first web gallery years ago, I did some progress on
web developing. Today's positiblities are incredible with face recognition, object detection, scene detection and even deshaking and upscaling
videos to name a few.

This gallery is to consume, browse and discover all my personal photos and videos.

.. note::
    Do you like HomeGallery? Does it solve your media problem?
    Please support this project through any recurring support to my
    `patreon.com/xemle <https://www.patreon.com/xemle>`_ or one time support to my
    `paypal.me/xemle <https://paypal.me/xemle>`_ account. Thank you in advance.

Use Cases
---------

* You want to browse your photos and videos from your PC on your mobile phone
* You want to consolidate the media of your different folders to a single pool
* You still want to browse your media which are stored offline on backup drives
* You want to export a subset as static gallery for public sharing

Core Features
-------------

* It is fast (by accident) - verify it on the `demo gallery <https://demo.home-gallery.org>`_
* Photos and video support
* Infinite scrolling / infinite photo stream
* Mobile friendly
* Similar image search AKA reverse image search
* Face and object detection
* Single and multi select tagging
* Expressive query language for media search or filtering
* Geo reverse lookup (geo coordinates to localized address)
* Runs on a SoC Raspberry PI
* PWA as light mobile app
* Static site export
* Fetch remote gallery
* Cast media to Google Chromecast TV devices

File Format Features
^^^^^^^^^^^^^^^^^^^^

* JPEG, PNG, TIFF image file format support
* MP4, MOV, AVI, MPEG video file format support (and many more)
* RAW image support due embedded preview files
* HEIC/HEIF image support
* Tags/Labels via XMP sidecar files

Limits
------

* There is only one user who can see all media
* Current tested limits are about 400,000 images/videos
* The whole database is loaded into the browser and requires recent (mobile) devices and internet connection
* No support for RAW image formats (yet)
* No downloads of original files
* Software has beta state and requires some terminal/scripting skills
* There is limited support on installation and usage

HomeGallery is not ...
----------------------

* an editor for photos or videos
* a cloud service
* a commercial product
* a backup solution
