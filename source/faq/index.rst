FAQ
===

What data is requested from public services?
--------------------------------------------

The goal of HomeGallery is to use as less public serivces as possible
due sensitive private image data. It tries to use service which can
be deployed local. However the setup requires technical knowlege and
technical maintenance. Following services are called:

For geo reverse lookups (resolve geo coordinates to addess), HomeGallery
queries the `Nominatim Service <https://nominatim.openstreetmap.org/reverse>`_
from `OpenStreetMap <https://openstreetmap.org>`_. Only geo coordinates
are transmitted.

For reverse image lookups (similar image search), object detection and face
recogintion, HomeGallery uses the
its own public API at ``api.home-gallery.org``. This public API supports
low powered devices to run HomeGallery such as the SoC Raspberry PI.
All low resolution preview images are send to this public API by default.
No images or privacy data are kept from this API.

The API can be configured and ran also locally or as Docker container. See
:ref:`api-server` section for details.

How many data is stored in the storage directory?
-------------------------------------------------

The media storage holds all extracted meta data, preview images and videos.
See :ref:`data structure <data-structure-storage>` for details.
Videos are transcoded to a web friendly 702p video and preview images are
resize to full HD (1920x1080) and lower.

Therefore, the memory consumption on the storage directory depends on the
amount of images and videos. A rule of thumb would be 20% of your
original space.

How long does the initial setup take?
-------------------------------------

It depends on the amount and images and videos. On the initial
run all preview images and videos needs to be calculated. See
design desisions for :ref:`precalculations <design-decision-prerendering>`.

For images you have think in hours or days. For videos in days
or weeks. For that reason it is a good idea to start with some
sub directories and exclude video files like AVI, MOV, MPEG or MP4
files. Process further partent directories or videos later
for you need and patience.

Use following exclude file to process only image files (JPG and PNG):

.. literalinclude:: files/only-images.exclude
    :language: text

Due the internal structure already processed previews are not
recalculated later.

Do I need to delete the storage directory?
------------------------------------------

Usually you do not need to delete any file in the storage directory.
In the strorage directory all previews and meta data are kept.
During processing existing previews and meta data are recognized
and skiped.

You should only delete this storage if you migrate the storage
or you like to delete the HomeGallery files (e.g. switching to another
gallery solution).

Entry files cache is missing
----------------------------

If your stumble across a *Entry files cache is missing* error like:

.. code-block::

    extract:meta Entry files cache for
    4d6c610:Pictures:Themen\Wallpaper\marriage toni\RIMG0056.JPG is missing.
    Read files and meta from storage +4ms

The reason for this message is that the extractor most
probably did not processed this file. This might happen due an
incomplete or broken full media processing.

