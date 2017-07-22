/**
 * Copyright 2017 Grizzly Stitch
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

var initializeDrawingCanvas = function(canvasId) {

  // Only executed our code once the DOM is ready.
  // Get a reference to the canvas object
  var canvas = document.getElementById(canvasId);
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);
  
  var pxPerInch = 48;
  
  /*var eighthInchPath = new paper.Symbol(new paper.Path({
      segments: [[0, 0], [0, 5]],
      strokeColor: 'black',
  }), true);
  var fourthInchPath = new paper.Symbol(new paper.Path({
      segments: [[0, 0], [0, 10]],
      strokeColor: 'black',
  }), true);
  var halfInchPath = new paper.Symbol(new paper.Path({
      segments: [[0, 0], [0, 15]],
      strokeColor: 'black',
  }), true);
  var inchPath = new paper.Symbol(new paper.Path({
      segments: [[0, 0], [0, 20]],
      strokeColor: 'black',
  }), true);
  var mouseRulerPosPath = new paper.Path({
      segments: [[0, 0], [0, 20]],
      strokeColor: 'blue',
  });
  mouseRulerPosPath.pivot = new paper.Point(0, 0);
  mouseRulerPosPath.position = new paper.Point(0, 0);
  
  var pxPerEighthInch = pxPerInch / 8;
  var inchRuleGroup = new paper.Group([
  	//inchPath.place(new paper.Point(40, 50)),
  	eighthInchPath.place(new paper.Point(pxPerEighthInch, 0)),
    fourthInchPath.place(new paper.Point(pxPerEighthInch * 2, 0)),
    eighthInchPath.place(new paper.Point(pxPerEighthInch * 3, 0)),
    halfInchPath.place(new paper.Point(pxPerEighthInch * 4, 0)),
    eighthInchPath.place(new paper.Point(pxPerEighthInch * 5, 0)),
    fourthInchPath.place(new paper.Point(pxPerEighthInch * 6, 0)),
    eighthInchPath.place(new paper.Point(pxPerEighthInch * 7, 0)),
    inchPath.place(new paper.Point(pxPerEighthInch * 8, 0))
  ]);
  inchRuleGroup.pivot = new paper.Point(0, 0);
  for (var i = 1; i <= 6; ++i) {
    inchRuleGroup.clone().position = new paper.Point(i * pxPerInch, 0);
  }
  
  var text = new paper.PointText({
      point: [50, 50],
      content: '1.24", 1.34"',
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontSize: 12
  });
  
  var mouseRulerPosPath = new paper.Path({
      segments: [[0, 0], [0, 20]],
      strokeColor: 'blue',
  });
  mouseRulerPosPath.pivot = new paper.Point(0, 0);
  mouseRulerPosPath.position = new paper.Point(0, 0);*/
  var tool = new paper.Tool();
  
  //Start of mouse scroll zoom. The mouse zoom ''homes'' in on the current mouse position.
  //Each mouse scroll calls the drawGrid function which checks if there is a previously drawed grid, deletes it and start drawing a new grid..
  var toolZoomIn = new paper.Tool();
  toolZoomIn.distanceThreshold = 8;
  toolZoomIn.mouseStartPos = new paper.Point();
  toolZoomIn.zoomFactor = 1.3;
  $('#myCanvas').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){
    var delta = 0;
    var children = paper.project.activeLayer.children;
    var upperZoomLimit = 30;
    var lowerZoomLimit = 0.40;
  
    e.preventDefault();
    e = e || window.event;
    if (e.type == 'mousewheel') {       //this is for chrome/IE
            delta = e.originalEvent.wheelDelta;
        }
        else if (e.type == 'DOMMouseScroll') {  //this is for FireFox
            delta = e.originalEvent.detail*-1;  //FireFox reverses the scroll so we force to to re-reverse...
        }
  
  
  
    if((delta > 0) && (paper.view.zoom<upperZoomLimit)) {
        //scroll up
    	var point = paper.DomEvent.getOffset(e.originalEvent, $('#myCanvas')[0]);
    	point = paper.view.viewToProject(point);
    	var zoomCenter = point.subtract(paper.view.center);
      var moveFactor = toolZoomIn.zoomFactor - 1.0;
    paper.view.zoom *= toolZoomIn.zoomFactor;
    paper.view.center = paper.view.center.add(zoomCenter.multiply(moveFactor / toolZoomIn.zoomFactor));
    toolZoomIn.mode = '';
  
    }
  
    else if((delta < 0) && (paper.view.zoom>lowerZoomLimit)){ //scroll down
        var point = paper.DomEvent.getOffset(e.originalEvent, $('#canvas')[0]);
    	point = paper.view.viewToProject(point);
    	var zoomCenter = point.subtract(paper.view.center);
    	var moveFactor = toolZoomIn.zoomFactor - 1.0;
        paper.view.zoom /= toolZoomIn.zoomFactor;
    paper.view.center = paper.view.center.subtract(zoomCenter.multiply(moveFactor))
  
    // Call draw grid
    //drawGrid();
  
    }
  });
  
  // Draw the view now:
  paper.view.draw();
}

function drawVectorArrow({vector, point, text = '', length = 50, color = 'blue'}) {
  var debugVectorSegmentTangent = vector.clone();
  debugVectorSegmentTangent.length = 50;
  var debugVectorEndPoint = point.add(debugVectorSegmentTangent);
  var debugVectorArrowHead1 = vector.clone();
  debugVectorArrowHead1.length = 10;
  var debugVectorArrowHead2 = debugVectorArrowHead1.clone();
  debugVectorArrowHead1.angle += 135;
  debugVectorArrowHead2.angle -= 135;
  debugVectorArrowHead1 = debugVectorArrowHead1.add(debugVectorEndPoint);
  debugVectorArrowHead2 = debugVectorArrowHead2.add(debugVectorEndPoint);
  new paper.Path({  // Path for the arrow and arrowhead
    segments: [point, debugVectorEndPoint, debugVectorArrowHead1,
               debugVectorArrowHead2, debugVectorEndPoint],
    strokeColor: color,
    strokeWidth: 3,
	});
  new paper.Shape.Circle({
    center: point,
    radius: 2,
    strokeColor: color
  });
  if (text !== '') {
    var textVector = vector.clone();
    textVector.angle += 180;  // Go the opposite direction of the arrow
    textVector.length = 15;
    var textLocation = point.add(textVector);
    new paper.PointText({
      point: textLocation,
      content: text,
      fillColor: color,
      fontWeight: 'bold',
      fontSize: 12
  	});
  }
}

function drawBoundingBox(paperObj) {
  console.log(paperObj);
  let boundBox;
  if (paperObj instanceof paper.Point) {
    console.log("We're drawing a bounding box around a point");
    boundingBox = paper.Shape.Circle(paperObj, 20);  // Circle of radius 20
  } else {
    let boundingRect = paperObj.bounds.clone();
    boundingBox = paper.Shape.Rectangle(new paper.Rectangle(boundingRect.x - 20, boundingRect.y - 20, boundingRect.width + 40, boundingRect.height + 40), 5);
  }
  boundingBox.style = {
    strokeColor: 'red',
    dashArray: [10, 4],  // Dash Length, Gap Length
    strokeWidth: 2,
    strokeCap: 'round'
  };
  boundingBox.strokeColor.alpha = 0.6;
  return boundingBox;
}