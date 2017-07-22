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

const debug = {
  drawSegmentVectors: false,
  drawCornerMiters: false,
  //shape: 'Circle',
  //shape: 'Square',
  //shape: 'Path',
	shape: 'None',
};

const CORNER_TYPES = {
  MITER: "Miter",
  FEATHER: "Feather",
  BUTT: "Butt",
};

class Corner {
  constructor() {
    this.index = 0;
    this.point = 0;
    // A negative angle rotates clockwise. Positive counterclockwise.
    // From previous segment tangent direction.
    this.angle = 0;  // A number. Angle between the two segments.
  	this.miterPath = 0;  // A PaperJS Path object.
    this.prevSegmentTangent = 0;  // The segment before the corner.
    this.nextSegmentTangent = 0;  // The segment after the corner.
    // These are the lengths that the segments will extend beyond the corner so that
    // the full miter is stitched.
    this.segmentStitchExtensionLength = 0;
    this.prevSegment = 0;
    this.nextSegment = 0;
    this.prevCorner = 0;
    this.nextCorner = 0;
    this.pathOffset = 0;
    this.stitchStartPathOffset = 0;
    this.stitchStopPathOffset = 0;
    this.props = {};
  }
}

function calcCornerStats(path, stitchProps) {
	let corners = [];
	let stitchWidthHalf = stitchProps.width / 2;
	for(let i = 0; i < path.segments.length; i++) {
    let thisCorner = new Corner();
    thisCorner.index = i;
    thisCorner.props = stitchProps.corners[i];
	  thisCorner.nextSegment = path.segments[i];
	  thisCorner.point = thisCorner.nextSegment.point;
	  if (i === path.segments.length - 1 && !path.closed) {
	    thisCorner.pathOffset = path.length;
	  } else {
	    thisCorner.pathOffset = path.getOffsetOf(thisCorner.point);
    }

	  // Fill out the linkages of our doubly linked list of corners
	  if (i > 0) {
	    thisCorner.prevCorner = corners[i - 1];
	    thisCorner.prevCorner.nextCorner = thisCorner;
	    thisCorner.prevSegment = path.segments[i - 1]
	  }

	  thisCorner.nextSegmentTangent = path.getTangentAt(path.getOffsetOf(thisCorner.point));
	  
	  // Calculate the prevSegmentTangent
	  let prevSegPointOffset = path.getOffsetOf(thisCorner.point) - 1;
	  if(path.closed && path.getOffsetOf(thisCorner.point) < 1)
	    prevSegPointOffset = path.length - 1;
	  thisCorner.prevSegmentTangent = path.getTangentAt(prevSegPointOffset);

	  if(debug.drawSegmentVectors) {
  	  drawVectorArrow({
        vector: thisCorner.nextSegmentTangent,
        point:  thisCorner.point,
        color: 'blue',
        text: i,
      });
      drawVectorArrow({
        vector: thisCorner.prevSegmentTangent,
        point:  thisCorner.point,
        color: 'red'
      });
	  }

	  // Calculate this corner's angle. We rotate the previous segment's tangent b/c its currently
	  // pointing out, rather than down the previous segment's path.
	  thisCorner.angle = thisCorner.prevSegmentTangent.rotate(180).getDirectedAngle(thisCorner.nextSegmentTangent);
	  //thisCorner.angle = thisCorner.nextSegmentTangent.getDirectedAngle(thisCorner.prevSegmentTangent.rotate(180));
    
    // Corner properties for a miter corner
	  thisCorner.segmentStitchExtensionLength = Math.abs(stitchWidthHalf / Math.tan(thisCorner.angle / 2 * Math.PI / 180));
	  var halfMiterVector = new paper.Point({
	  	angle: (thisCorner.angle / 2) + thisCorner.prevSegmentTangent.rotate(180).angle,
	    length: Math.hypot(thisCorner.segmentStitchExtensionLength, stitchWidthHalf),
	  });
	  //new paper.PointText({point: thisCorner.point, content: thisCorner.angle, fillColor: 'blue', fontSize: 12});
	  thisCorner.miterPath = new paper.Path([
	  	thisCorner.point.add(halfMiterVector),
	    thisCorner.point.subtract(halfMiterVector)
	  ]);
	  if(debug.drawCornerMiters) {
	    drawCornerMiter(thisCorner);
	  }
	  
	  // Calculate our start and stop stitch path offsets
    if (thisCorner.props.type === CORNER_TYPES.FEATHER) {
      thisCorner.stitchStartPathOffset = thisCorner.pathOffset - thisCorner.props.featherDistance;
      if (thisCorner.prevCorner !== 0 && thisCorner.stitchStartPathOffset < thisCorner.prevCorner.stitchStopPathOffset) {
        // If our corner's stitching overlaps with the previous corner's stitching, split the distance
        thisCorner.stitchStartPathOffset = thisCorner.pathOffset - ((thisCorner.pathOffset - thisCorner.prevCorner.pathOffset) / 2);
        thisCorner.prevCorner.stitchStopPathOffset = thisCorner.stitchStartPathOffset;
      }
      thisCorner.stitchStopPathOffset = thisCorner.pathOffset + thisCorner.props.featherDistance;
      // We don't have our next corner yet to check and see if our stitch overlaps. We'll catch it while parsing the next corner.
    } else if (thisCorner.props.type === CORNER_TYPES.MITER) {
      thisCorner.stitchStartPathOffset = thisCorner.pathOffset - thisCorner.segmentStitchExtensionLength;
      thisCorner.stitchStopPathOffset = thisCorner.pathOffset + thisCorner.segmentStitchExtensionLength;
    } else if (thisCorner.props.type === CORNER_TYPES.BUTT) {
      // TODO - Update this for non-90 degree angles
      thisCorner.stitchStartPathOffset = thisCorner.pathOffset - (stitchProps.width / 2);
      thisCorner.stitchStopPathOffset = thisCorner.pathOffset + (stitchProps.width / 2);
    } else {
      thisCorner.stitchStartPathOffset = thisCorner.stitchStopPathOffset = thisCorner.pathOffset;
    }
    if (thisCorner.stitchStartPathOffset < 0) {
      thisCorner.stitchStartPathOffset = path.length + thisCorner.stitchStartPathOffset;
    }
	  corners.push(thisCorner);
	}
	if(path.closed) {
		// If our shape is closed connect the last corner to the first corner
	  corners[0].pathOffset = path.length;
	  corners[corners.length - 1].nextCorner = corners[0];
	  corners[0].prevCorner = corners[corners.length - 1];
	  corners[0].prevSegment = path.segments[path.segments.length - 1];
	}
	return corners;
}

function getPerpPoints(point, vector, offset) {
  return [
    point.add(vector.rotate(90).normalize(offset)),
    point.add(vector.rotate(-90).normalize(offset))
  ]
}

function stitchOutsideMiter(corner, threadPath, startingOffset, stitchProps) {
  // Finish up the outside corner of our last segment
  let segmentExtension = startingOffset;
  let perpPoints = getPerpPoints(corner.point.add(corner.prevSegmentTangent.normalize(segmentExtension)), corner.prevSegmentTangent, stitchProps.width / 2);
	// If our path rotates right (angle < 0), our outside stitch needs to rotate right (+90)
  let outsideStitchPoint = perpPoints[0];
  let insideStitchPoint = perpPoints[1];
  if(corner.angle < 0) {
    outsideStitchPoint = perpPoints[1];
    insideStitchPoint = perpPoints[0];
  }
  let pathExtenstionVector = corner.prevSegmentTangent.normalize(stitchProps.density);
  while(segmentExtension <= corner.segmentStitchExtensionLength + 0.001) {
    // Get the point where our stitch path intersects with the miter line
    let intersections = new paper.Path([outsideStitchPoint, insideStitchPoint]).getIntersections(corner.miterPath);
    if(intersections.length > 0) {
      threadPath.add(outsideStitchPoint);
      threadPath.add(intersections[0].point);
    } else {
			console.log("Missing intersection! This is probably a bug ...");
			new paper.Path({
	      segments: [outsideStitchPoint, insideStitchPoint],
	      strokeColor: 'black', strokeWidth: 2,
	  	});
		}
    // Move our stitches along the extension
    outsideStitchPoint = outsideStitchPoint.add(pathExtenstionVector);
    insideStitchPoint = insideStitchPoint.add(pathExtenstionVector);
    segmentExtension += stitchProps.density;
  }
  
  // Do our next segment outside miter. We start our stitches out at the end of the segment extension.
  perpPoints = getPerpPoints(corner.point.subtract(corner.nextSegmentTangent.normalize(corner.segmentStitchExtensionLength)), corner.nextSegmentTangent, stitchProps.width / 2);
  // If our path rotates right (angle < 0), our outside stitch needs to rotate right (+90)
  outsideStitchPoint = perpPoints[0];
  insideStitchPoint = perpPoints[1];
  if(corner.angle < 0) {
    outsideStitchPoint = perpPoints[1];
    insideStitchPoint = perpPoints[0];
  }
  pathExtenstionVector = corner.nextSegmentTangent.normalize(stitchProps.density);
  segmentExtension = 0;  // We will reuse this variable from above
  while(segmentExtension <= corner.segmentStitchExtensionLength + 0.001) {
    // Get the point where our stitch path intersects with the miter line
    let intersections = new paper.Path([outsideStitchPoint, insideStitchPoint]).getIntersections(corner.miterPath);
    if(intersections.length > 0) {
      new paper.Shape.Circle({
        center: intersections[0].point,
        radius: 2,
        //strokeColor: 'green'
      });
      threadPath.add(outsideStitchPoint);
      threadPath.add(intersections[0].point);
    } else {
    	console.log("Missing intersection! This is probably a bug ...");
			console.log("Miter Path: ", corner.miterPath);
			console.log("Inside Stitch Point: ", insideStitchPoint);
			console.log("Outside Stitch Point: ", outsideStitchPoint);
      threadPath.add(outsideStitchPoint);
      threadPath.add(insideStitchPoint);
		}
    outsideStitchPoint = outsideStitchPoint.add(pathExtenstionVector);
    insideStitchPoint = insideStitchPoint.add(pathExtenstionVector);
    segmentExtension += stitchProps.density;
  }
  return corner.pathOffset + segmentExtension - corner.segmentStitchExtensionLength;
}

var stitchSatin = function(path, stitchProps) {
  console.log("Stitching Satin Outline Stitch");
  console.log("  Path: ",path);
  console.log("  Stitch Props: ",stitchProps);
  // Check our arguments
  if (stitchProps === undefined)
    stitchProps = getStitchSatinProps(path);

	let threadPath = new paper.Path({
	    strokeColor: 'red',
	    strokeWidth: 1,
			strokeCap: 'round',
			strokeJoin: 'round',
	});

  let corners = calcCornerStats(path, stitchProps);
  console.log("Corners: ",corners);
	let miterPaths = [];
	for (let i = 0; i < corners.length; i++) {
	  miterPaths.push(corners[i].miterPath);
	}
	let stitchWidthHalf = stitchProps.width / 2;

	let nextCorner = corners[1];
	let stitchPathOffset = 0;
	let loopNumStitches = 0;
	while(stitchPathOffset < path.length) {
	  loopNumStitches += 1;
	  //console.log("Stitch path offset: ", stitchPathOffset);
	  if (loopNumStitches > 1000)
	    break;
	  //if (stitchPathOffset > 10)
	  //  break; 
	  if (stitchPathOffset > nextCorner.pathOffset) {
	    console.log("Stitching past corner");
	    // If we're a mitered corner, we need to finish stitching the corner
	    if (nextCorner.props.type === CORNER_TYPES.MITER) {
	      stitchPathOffset = stitchOutsideMiter(nextCorner, threadPath, stitchPathOffset - nextCorner.pathOffset, stitchProps);
	    } else if (nextCorner.props.type === CORNER_TYPES.BUTT) {
	      // Stitch the outside butt
	      let buttStitchVector;
	      if (nextCorner.props.buttSegment === 0) {
	        // If our butt segment is segment 0, we need to stitch along next segment's tangent
	        buttStitchVector = nextCorner.nextSegmentTangent.clone();
	      } else {
	        // If our butt segment is segment 1, we need to stitch along the previous segment's tangent, in the opposite direction
	        buttStitchVector = nextCorner.prevSegmentTangent.rotate(180);
	      }
	      threadPath.add(nextCorner.point);
	      let distFromCorner;
	      // First stitch along our path to go out away from the corner
	      for (distFromCorner = 0; distFromCorner < stitchProps.width / 2; distFromCorner += stitchProps.density) {
	        threadPath.add(nextCorner.point.subtract(buttStitchVector.normalize(distFromCorner)));
	      }
	      // And then come back to the corner, stitching the satin
	      for (; distFromCorner >= 0; distFromCorner -= stitchProps.density) {
	        let pathPoint = nextCorner.point.subtract(buttStitchVector.normalize(distFromCorner));
	        threadPath.add(pathPoint.add(buttStitchVector.rotate(-90).normalize(stitchWidthHalf)));
          threadPath.add(pathPoint.add(buttStitchVector.rotate(90).normalize(stitchWidthHalf)));
	      }
	      if (nextCorner.props.buttSegment === 1) {
          // Lets stitch our way out of the corner
          while (stitchPathOffset < nextCorner.stitchStopPathOffset) {
            threadPath.add(path.getPointAt(stitchPathOffset));
            stitchPathOffset += stitchProps.density;
          }
        }
	      //stitchPathOffset = stitchOutsideMiter(nextCorner, threadPath, stitchPathOffset - nextCorner.pathOffset, stitchProps);
	    }
	    console.log("Setting nextCorner to corner ",nextCorner.nextCorner.index);
	    nextCorner = nextCorner.nextCorner;
    }
    
    let pathPoint = path.getPointAt(stitchPathOffset);
    if (!pathPoint) {
      console.log("Unable to get a point for offset " + stitchPathOffset + " for path ", path, " of length " + path.length);
	    stitchPathOffset += stitchProps.density;
      continue;
    }
	  // consoA negative angle rotates counter-clockwise. A positive angle rotates clockwise.
	  // If the angle of a corner is positive (> 0),
	  let tangentVector = path.getTangentAt(stitchPathOffset);
	  let leftStitchPoint = pathPoint.add(tangentVector.rotate(-90).normalize(stitchWidthHalf));
    let rightStitchPoint = pathPoint.add(tangentVector.rotate(90).normalize(stitchWidthHalf));

	  if (stitchPathOffset > nextCorner.stitchStartPathOffset) {
	    //console.log("Stitching corner start");
	    // We are somewhere between the corner's stitchStartPathOffset and pathOffset
	    if (nextCorner.props.type === CORNER_TYPES.MITER) {
	      // If we are a mitered corner, we need to trim our inside stitch to the miter path
	      // If our angle is negative, we're turning right, so our stitch will intersect the miter path on the right
	      if (nextCorner.angle < 0) {
	        let intersections = new paper.Path([pathPoint, rightStitchPoint]).getIntersections(nextCorner.miterPath);
    	    if(intersections.length > 0) {
    	      rightStitchPoint = intersections[0].point;
    	    }
	      } else {
	        // Our next segment goes to the left
	        let intersections = new paper.Path([pathPoint, leftStitchPoint]).getIntersections(nextCorner.miterPath);
    	    if(intersections.length > 0) {
    	      leftStitchPoint = intersections[0].point;
    	    }
	      }
      } else if (nextCorner.props.type === CORNER_TYPES.FEATHER) {
        let numRotations = (nextCorner.pathOffset - nextCorner.stitchStartPathOffset) / stitchProps.density;
        let rotationNum = numRotations - ((nextCorner.pathOffset - stitchPathOffset) / stitchProps.density);
        //console.log("Total num rotations: ",numRotations," our rotation num: ",rotationNum);
        let rotationAngle;
        if (nextCorner.angle < 0) {
          rotationAngle = ((-180 - nextCorner.angle) / 2 / numRotations) * rotationNum;
        } else {
          rotationAngle = ((180 - nextCorner.angle) / 2 / numRotations) * rotationNum;
        }
        //let rotationAngle = (nextCorner.angle / 2 / numRotations) * rotationNum;
        console.log("Feathering pre-corner stitch",rotationNum,"of",numRotations,". Rotating ", rotationAngle, " degrees");
        let stitchLength = stitchWidthHalf / Math.cos(rotationAngle * Math.PI / 180);
        //leftStitchPoint = pathPoint.add(leftStitchPoint.rotate(-rotationAngle, pathPoint).normalize(stitchLength));
        //rightStitchPoint = pathPoint.add(rightStitchPoint.rotate(-rotationAngle, pathPoint).normalize(stitchLength));
        let leftAngle = -90 - rotationAngle;
        let rightAngle = 90 - rotationAngle;
        //console.log("Left: ",leftAngle,"Right: ",rightAngle, "StitchLength:",stitchLength);
        leftStitchPoint = pathPoint.add(tangentVector.rotate(leftAngle).normalize(stitchLength));
        rightStitchPoint = pathPoint.add(tangentVector.rotate(rightAngle).normalize(stitchLength));
      } else if (nextCorner.props.type === CORNER_TYPES.BUTT) {
        if (nextCorner.props.buttSegment === 0) {
          // Lets stitch our way to the corner
          while (stitchPathOffset < nextCorner.pathOffset) {
            threadPath.add(path.getPointAt(stitchPathOffset));
            stitchPathOffset += stitchProps.density;
          }
          // Don't stitch the left/right stitches previously calculated.
          continue;
        }
      }
	  } else if (stitchPathOffset < nextCorner.prevCorner.stitchStopPathOffset) {
	    //console.log("Stitching corner end");
	    // We are somewhere between the corner's stitchStartPathOffset and pathOffset
	    if (nextCorner.prevCorner.props.type === CORNER_TYPES.MITER) {
	      // If we are a mitered corner, we need to trim our inside stitch to the miter path
	      // If our angle is negative, we turned right, so our stitch will intersect the miter path on the right
	      if (nextCorner.prevCorner.angle < 0) {
	        let intersections = new paper.Path([pathPoint, rightStitchPoint]).getIntersections(nextCorner.prevCorner.miterPath);
    	    if(intersections.length > 0) {
    	      rightStitchPoint = intersections[0].point;
    	    }
	      } else {
	        // Our next segment goes to the left
	        let intersections = new paper.Path([pathPoint, leftStitchPoint]).getIntersections(nextCorner.prevCorner.miterPath);
    	    if(intersections.length > 0) {
    	      leftStitchPoint = intersections[0].point;
    	    }
	      }
      } else if (nextCorner.prevCorner.props.type === CORNER_TYPES.FEATHER) {
        let numRotations = (nextCorner.prevCorner.stitchStopPathOffset - nextCorner.prevCorner.pathOffset) / stitchProps.density;
        if (nextCorner.prevCorner === corners[0]) {
          numRotations = (nextCorner.prevCorner.stitchStopPathOffset - 0) / stitchProps.density;
        }
        let rotationNum = (nextCorner.prevCorner.stitchStopPathOffset - stitchPathOffset) / stitchProps.density;
        //console.log("Total num rotations: ",numRotations," our rotation num: ",rotationNum);
        let rotationAngle;
        if (nextCorner.prevCorner.angle < 0) {
          rotationAngle = ((-180 - nextCorner.prevCorner.angle) / 2 / numRotations) * rotationNum;
        } else {
          rotationAngle = ((180 - nextCorner.prevCorner.angle) / 2 / numRotations) * rotationNum;
        }
        //let rotationAngle = (nextCorner.angle / 2 / numRotations) * rotationNum;
        console.log("Feathering post-corner stitch",rotationNum,"of",numRotations,". Rotating ", rotationAngle, " degrees");
        //console.log("Rotating ", rotationAngle, " degrees");
        let stitchLength = stitchWidthHalf / Math.cos(rotationAngle * Math.PI / 180);
        //leftStitchPoint = pathPoint.add(leftStitchPoint.rotate(-rotationAngle, pathPoint).normalize(stitchLength));
        //rightStitchPoint = pathPoint.add(rightStitchPoint.rotate(-rotationAngle, pathPoint).normalize(stitchLength));
        let leftAngle = -90 + rotationAngle;
        let rightAngle = 90 + rotationAngle;
        //console.log("Left: ",leftAngle,"Right: ",rightAngle, "StitchLength:",stitchLength);
        leftStitchPoint = pathPoint.add(tangentVector.rotate(leftAngle).normalize(stitchLength));
        rightStitchPoint = pathPoint.add(tangentVector.rotate(rightAngle).normalize(stitchLength));
      }
	  }
	  
	  // Lets always stitch left to right
	  threadPath.add(leftStitchPoint);
	  threadPath.add(rightStitchPoint);
	  stitchPathOffset += stitchProps.density;
	}
	// If the last corner is a mitered corner and the path is closed, stitch it
	if (path.closed && nextCorner.props.type === CORNER_TYPES.MITER) {
	  stitchOutsideMiter(nextCorner, threadPath, stitchPathOffset - nextCorner.pathOffset, stitchProps);
	}
	paper.view.draw();
	return threadPath;
}

function drawCornerMiter(corner) {
	corner.miterPath.strokeColor = 'green';
  corner.miterPath.strokeWidth = 3;
  var prevSegmentExtensionVector = corner.prevSegmentTangent.clone();
  prevSegmentExtensionVector.length = corner.segmentStitchExtensionLength;
  new paper.Path({  // Path for the arrow and arrowhead
    segments: [corner.point, corner.point.add(prevSegmentExtensionVector)],
    strokeColor: 'grey',
    strokeWidth: 2,
	});
  var nextSegmentExtensionVector = corner.nextSegmentTangent.clone();
  nextSegmentExtensionVector.angle += 180;
  nextSegmentExtensionVector.length = corner.segmentStitchExtensionLength;
  new paper.Path({  // Path for the arrow and arrowhead
    segments: [corner.point, corner.point.subtract(nextSegmentExtensionVector)],
    strokeColor: 'green',
    strokeWidth: 2,
	});
}

let getStitchSatinProps = function (shape) {
  let corners = [];
  // Currently, we don't support modifying the number of segments, so the number of corners
  // shouldn't change.
  for (let i = 0; i < shape.path.segments.length; i++) {
    // Calculate our corner angle and use that to determine the type
    let nextSegmentTangent = shape.path.getTangentAt(shape.path.getOffsetOf(shape.path.segments[i].point));
	  // Calculate the prevSegmentTangent
	  let prevSegPointOffset = shape.path.getOffsetOf(shape.path.segments[i].point) - 1;
	  if(shape.path.closed && shape.path.getOffsetOf(shape.path.segments[i].point) < 1)
	    prevSegPointOffset = shape.path.length - 1;
	  let prevSegmentTangent = shape.path.getTangentAt(prevSegPointOffset);
    let cornerAngle = prevSegmentTangent.rotate(180).getDirectedAngle(nextSegmentTangent);
    let type = CORNER_TYPES.MITER;
    if (Math.abs(cornerAngle) > 135)
      type = CORNER_TYPES.FEATHER;
    corners.push({
      // In these objects, we put every property that might be used
      index: i,
      paperJsSegment: shape.path.segments[i],
      type: type,
      //type: CORNER_TYPES.BUTT,
      //type: CORNER_TYPES.FEATHER,
      //type: "Miter",
      featherDistance: 20,
      buttSegment: 0,
      density: 'auto',
      select: function() {
        if (this.selectedShape !== undefined)
          return;
        this.selectedShape = drawBoundingBox(this.paperJsSegment.point);
      },
      deselect: function() {
        if (this.selectedShape === undefined)
          return;
        this.selectedShape.remove();
        this.selectedShape = undefined;
      },
    });
  }
  return {
    width: 16,
    density: 4,
    corners: corners,
  }
}

if(stitchTypes && typeof stitchTypes !== undefined) {
  console.log("Adding Satin Outline Stitch to the types of stitches.");
  let stitchProps = [
    new StitchProp({displayName: "Width", keyName: "width", defaultValue: 8}),
    new StitchProp({displayName: "Density", keyName: "density", defaultValue: 4}),
  ];
  let cornerTypes = [
    new StitchCornerType({
      displayName: "Feather",
      cornerProps: [
        new StitchProp({displayName: "Distance", keyName: "distance", defaultValue: 10}),
      ],
    }),
    new StitchCornerType({
      displayName: "Miter",
      cornerProps: [],
    }),
    new StitchCornerType({
      displayName: "Butt",
      cornerProps: [],
    }),
  ];
  let cornerProps = [
    new StitchProp({displayName: "Type", keyName: "type", defaultValue: 'Feather'}),
  ];
  stitchTypes.push(
    new StitchType({
      displayName: 'Satin Outline Stitch',
      stitchFunction: stitchSatin,
      stitchProps: getStitchSatinProps,
      cornerProps: cornerTypes,
      customAngularProps: true,
    })
  );

}
