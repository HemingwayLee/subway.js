# subway.js

A javascript app to display an interactive subway map. Javascript reads from HTML and uses Raphael to render a map.

## Introduction
This app allows a user to render a subway map from HTML lists.
Features include:
* Rendering of "stations" and 4-directional "tracks"
* Islands to group "stations"
* Interactive "stations" that could show additional links
* Automatic scaling of map to the width of it's container
* Display a grid to aid positioning

The map works on a grid system. Cooridnates are defined at the cross-sections of the grid, and __all__ settings in the HTML file should be defined in terms of grid coordinates.

### Libraries
* Raphael: http://raphaeljs.com/
    * ScaleRaphael: http://www.shapevent.com/scaleraphael/
* jQuery: http://jquery.com/
    * jQuery throttle / debounce: http://benalman.com/projects/jquery-throttle-debounce-plugin/

## Set-up
Include the Javascript libraries before closing your `<body>` tag. They are provided in the resources folder.
```html
<script src="./resources/jquery.min.js"></script>
<script src="./resources/raphael.min.js"></script>
<script src="./subway.min.js"></script>
```

Create a display `<div>` tag with an ID. The map will be rendered within this tag.
```html
<div id="subway-display"></div>
```

Optionally create another `<div>` tag to contain the data for the map. If you choose not to create a separate tag, data will be read from the display tag. `data-debug="true"` can be included to display a grid for referencing. The width and height of the canvas will be determined automatically from the elements created.
```html
<div id="subway" data-debug="true"></div>
```
> Note: Placing data in the display tag will cause it be be replaced by the map when it is created.

Finally, write a script to create a subway map. Each OLSubway is a different object, so multiple maps can be created. (The second parameter of `OLSubway.create()` can be left blank. Data will then be read from the display tag.) Contents of the data tag are automatically hidden upon creation of the map. Note that `OLSubway.create()` will always be deferred till the document has loaded.
```javascript
var sub = new OLSubway();
sub.create("subway-display","subway");
```

You may also use the `destroy()` method to remove the map, which will allow you to use the object to create yet a new map.
```javascript
sub.destroy();
sub.create("subway2");
```

Elements below should be contained within the data tag.

## Stations
Stations are where your data-points are shown. This app supports stations with multiple "terminals", i.e. A station may take up more than a single point. Terminals are connected to each other via connectors in a linear fashion. When the mouse is hovered over a station, the station will "glow".

Stations are defined as elements of an unordered list, and go between a `<ul id="subway-stations"></ul>` tag. Each element defines the coordinates of the terminals, and they are linked in order of how they are specified. X and Y coordinates are seperated by a comma, and coordinate pairs are seperated by a semi-colon.

Each station can be named. Simply include the name of the station anywhere between the list element tag. The location of the label can then be specified(N,NE,E,SE,S,SW,W,NW), with the default being South. You can also specify the terminal which the label appears next to, e.g. `label-ter="1"` will place the label next to the first terminal you have specified. First terminal is selected by default.

Hyperlinks can be added to the stations. Include them using `<a href="{url}"></a>` as you would normally do, inside the list element.

Refer to the example below:
```html
<ul id="subway-stations">
	<li data-pos="2,2; 4,4; 2,6" data-label-dir="E" data-label-ter="3" ><a href="http://openlectures.org/">Google</a></li>
	<li data-pos="13, 8; 13,9" data-label-ter = "2">ABC</li>
	<li data-pos="11,16" data-label-dir="SE">DEF</li>
	<li data-pos="2,18"></li>
	<li data-pos="6,18"></li>
</ul>
```
>Note: All data attributes are defined as custom HTML attributes, as defined in HTML5.

### Links
Stations that are related can be "linked". When the mouse is hovered over a station, all stations that are linked to it will also light up, in a different colour. To define links, enter the station numbers of the links in the `data-links` attribute. Station numbers are defined in the order in which the station are listed, i.e. The first list item is Station 1, the second Station 2. Station numbers are also displayed on the station itself.

In the example below, when the mouse is hovered over the Station "ABC", Station "Google" and "DEF" will also light up.
```html
<ul id="subway-stations">
	<li data-pos="2,2; 4,4; 2,6" data-label-dir="E" data-label-ter="3" data-link="2,3,5,22" ><a href="http://www.google.com/">Google</a></li>
	<li data-pos="13, 8; 13,9" data-label-ter = "2" data-link="1,3">ABC</li>
	<li data-pos="11,16" data-label-dir="SE">DEF</li>
	<li data-pos="2,18" data-link="2"></li>
	<li data-pos="6,18"></li>
</ul>
```

## Tracks
Tracks connect the various "stations". Currently, this app supports 4-directions for tracks (North, South, East, West), with smooth turns.

Each track is an unordered list, under `class="subway-tracks"`, with each element representing a segment. Specify the colour of the track, as well as the starting point. A track that is defined first will appear behind a track defined later, should they overlap.

For each subsequent segment, you may:

1. Define a straight link by simply specifying the coordinates of the next point.
2. Define a curve, by specifying the coordinates of the next point, as well as the direction the track faces after the curve.

At the end of the defined track, an arrowhead will point to the final destination. Avoid defining sharp turns at the very end to prevent the arrow to appear in an awkard way.

Refer to the example below:
```html
<ul class="subway-tracks" data-color="#f3b" data-start-point="2,2">
    <li data-dest="5,2"></li>
    <li data-dest="6,3" data-turn="S"></li>
    <li data-dest="6,6"></li>
    <li data-dest="9,9" data-turn="E"></li>
    <li data-dest="16,9"></li>
    <li data-dest="17,10" data-turn="S"></li>
    <li data-dest="15,12" data-turn="W"></li>
    <li data-dest="11,16" data-turn="S"></li>
    <li data-dest="9,18" data-turn="W"></li>
    <li data-dest="2,18"></li>
</ul>
```
> Note that it is possible to create tracks that do not stick to the four directions this app is designed to handle, though it might not look the way it is intended to look like.

## Islands
Islands can be used to group certain "stations". All islands should be defined between a `<ul id="subway-islands"></ul>` tag.

Each island is an unordered list, under `class="subway-tracks"`, with each element defining an edge (with coordinates) of the island. Specify the name, background colour, label font size and colour. The name of the island will be displayed at the centroid of the polygon which defines the island. Islands will be rounded during processing in a manner that ensures the outline passes through all points specified. To turn off automatic rounding, add `data-sharp="true"` to the `<ul>` tag. Refer to the exmaple below.
```html
<ul class="subway-islands" data-island-name="Test" data-background-color="#ddd" data-font-size="50px" data-font-color="#fff">
    <li data-edge="1,1"></li>
    <li data-edge="18.5,1"></li>
    <li data-edge="18.5,20"></li>
    <li data-edge="10,25"></li>
    <li data-edge="1,20"></li>
</ul>
```
> As islands do not have to be defined along the grid, you may use decimals for the coordinates.

## Scaling
The map is scaled automatically based on the width of the container it is in, i.e. The container of the display `<div>` tag.

The map is rescaled(debounced) when the window is resized. Thus, in any application where the map container's width is changed when resizing the window, the map will be scaled accordingly to fit the width of the container.

>This means that the map will fit exactly into the container horizontally, but not vertically.