WebApp
======

Main Features

* View photo stream
* Search photo stream
* Edit photos
* `PWA <https://developer.mozilla.org/de/docs/Web/Progressive_web_apps/>`_ enabled (lightweight mobile app)

List View
---------

In the list view the photos and videos are shown in a fluent column based grid. By default
the sort order is by date, youngest first and shows all available media.

The sort order differs if similar images are shown.

Single View
-----------

By clicking a media in the list mode a single media is shown in the the single view.
You can tap/click the left and right array symbols to show the previous or next media.

.. image:: images/icon-prev.png

.. image:: images/icon-next.png

On mobile devices you can also swipe left and right on images to show the previous or next image. Use the pinch gesture
double tab to zoom into your image. In zoom view double tab resets the zoom.

On the bottom there are up to 3 icons:

.. figure:: images/icon-list.png

   Table icon: Show the list view

.. figure:: images/icon-similar.png

   Plant icon: Show list view filtered and sorted by similar images

.. figure:: images/icon-date.png

   Calender icon: Show list view with default order by date.

   The Calender icon is shown if any filter or none default search order is already applied

Search
------

The media list can be filtered by the search input on the nav bar in list mode.
A search term is tested agains a space separated basic text of
id prefix, media type, filename, date, camara vendor, camara model, geo names and tags.
The search test is case insensitive.

By default each space separated word is a search term and all search term must be a part of the basic text.
A search term with a white space must be escaped by single or double quotations.
So the input of *san francisco* is treaded as *san and francisco* while *"san francisco"* is treaded as complete name with whitespace.

Search terms can be combined with boolean operands of *not*, *and*, *or* and parenthesis. Search
terms of *not*, *and* and *or* must be escaped by quotations.

Date format is currenty in ISO 8601 format: *YYYY-DD-MM'T'hh:mm:ss* like *2020-09-23T08:24:54*

Search Examples
^^^^^^^^^^^^^^^

*berlin*

Search for filename, address or tag containing search term *berlin*

*berlin tower*

Is the same as *berlin and tower*. Search for filename, address or tag containing search term *berlin* and term *tower*

*berlin or tower*

Search for filename, address or tag containing search term *berlin* or term *tower*

*berlin not tower*

Search for filename, address or tag containing search term *berlin* but not the term *tower*

*video 2020*

Is the same as *video and 2020*. Search all media type of *video* of date *2020*.

*image 2020 not (2020-04 or 2020-06)*

Is the same as *image and 2020 and not (2020-04 or 2020-06)*. Search all media type of *images* from *2020* but not from April 2020 or June 2020

Edit Mode
---------

In edit mode basic tagging is supported. The edit mode can be entered by the pencil icon in the navivation bar
on the list view.

.. figure:: images/nav-main.png

   Navigation bar

.. figure:: images/nav-main-mobile.png

   Navigation bar in mobile view

.. figure:: images/nav-edit.png

   Navigation bar in edit mode

.. figure:: images/nav-edit-mobile.png

   Navigation bar in mobile edit mode

The edit mode is exited by clicking the back icon in the navigation bar of edit mode.

In edit mode you can select images in the list view by clicking and the selected media is highlighted.
Multiple media are selected by *ctrl* key and a mouse click or by pressing long tap on mobile device.
All media are selected between the last selected media and the current selected media by the selection
state of the last media. If the last media was selected, all media are selected. If the last media
was unselected, all media are unselected.

In the navigation bar of the edit mode you can invert the selection or select all or select none media.
To show all selected media click the eye icon.

After you are done the the selection you can assign tags to the selection by clicking the check icon.

.. figure:: images/dialog-tag.png

   Edit dialog

In the edit dialog you can add comma separated tags to the selected images. A minus prefix removes a tag.

The input *vacation, rome, -city* adds the tag *vacation* and the tag *rome* but removes the tag *city*.

.. note::
   After new tags are submitted, the current selection stays.
   You need to reset the selection by *Reset all* in the edit navigation bar manually if required.
