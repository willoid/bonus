//calculating the span:

function resizeMasonryItem(item) {
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.getElementsByClassName("masonry")[0],
    rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    ),
    rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
  /*
   * Spanning for any brick = S
   * Grid's row-gap = G = 1em
   * Size of grid's implicitly create row-track = R
   * Height of item content = H
   * Net height of the item = H1 = H + G
   * Net height of the implicit row-track = T = G + R
   * S = H1 / T
   */
  var rowSpan = Math.ceil(
    (item.querySelector("img").getBoundingClientRect().height +
      rowGap) /
      (rowHeight + rowGap)
  );
  /* Set the spanning as calculated above (S) */
  item.style.gridRowEnd = "span " + rowSpan;
}

//resizing the bricks
function resizeAllMasonryItems(){
    // Get all item class objects in one list
    var allItems = document.getElementsByClassName('masonry-brick');
    /*
     * Loop through the above list and execute the spanning function to
     * each list-item (i.e. each masonry item)
     */
    for(var i=0;i<allItems.length;i++){
      resizeMasonryItem(allItems[i]);
    }
  }

//resizing everything before the images loaded
  function waitForImages() {
    var allItems = document.getElementsByClassName('masonry-brick');
    for(var i=0;i<allItems.length;i++){
      imagesLoaded( allItems[i], function(instance) {
        var item = instance.elements[0];
        resizeMasonryItem(item);
      } );
    }
  }

//adapt grid to window resizing
  var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, resizeAllMasonryItems);
} );

/* Do a resize once more when all the images finish loading */
waitForImages();