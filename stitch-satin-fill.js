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

// WARNING!! The algorithms in this file are not yet complete.
// Contact Carl Sapp (CarlSapp@gmail.com) for more details.

var satinFillStitchDebug = {
	printShapeLength: true,
	printEachStitch: true,
	printSegmentDetails: true,
	printStitchProps: true,
};

var createSatinFillStitchPath = function(stitchShapePath, stitchProps) {
  console.log("Stitching a satin fill stitch");
  var maxStitchLength = 8;
  if(stitchProps && stitchProps !== undefined && stitchProps.maxStitchLength !== undefined) {
    maxStitchLength = stitchProps.maxStitchLength;
  }
  var threadPath = new paper.Path({
    strokeColor: 'red',
    strokeWidth: 1,
    strokeCap: 'round',
    strokeJoin: 'round',
	});
	let stitchPathOffset = 0;
	let nextSegmentIndex = 1;
  let nextSegmentOffset = 0;
  if (stitchShapePath.segments.length == 1) {
    nextSegmentOffset = stitchShapePath.length;
	} else {
    nextSegmentOffset = stitchShapePath.getOffsetOf(stitchShapePath.segments[1].point);
	}
	if (runningStitchDebug.printShapeLength) {
    console.log("Max Stitch Length: ",maxStitchLength);
	}
	if (runningStitchDebug.printShapeLength) {
    console.log("Shape Path Length: ",stitchShapePath.length);
	}
	let lastAngle = stitchShapePath.getTangentAt(stitchShapePath.length-0.1).angle;
	// Draw a red circle at the beginning
	/*new paper.Path.Circle({
    center: stitchShapePath.getPointAt(0),
    radius: 4,
    strokeColor: 'red',
  });
  new paper.Path.Circle({
    center: stitchShapePath.getPointAt(10),
    radius: 4,
    strokeColor: 'green',
  });*/
  // Calculate our high and low points
  while(stitchPathOffset < stitchShapePath.length) {
    // Find all of our highs and lows
    let currentTangentAngle = stitchShapePath.getTangentAt(stitchPathOffset).angle;
    // If angle was 0-180 and now is 180-360
    if (lastAngle < 0 && currentTangentAngle > 0) {
      // We have a high point. Mark it in green.
      new paper.Path.Circle({
        center: stitchShapePath.getPointAt(stitchPathOffset),
        radius: 4,
        strokeColor: 'green',
        //fillColor: this.path.strokeColor
      });
    } else if (lastAngle > 0 && currentTangentAngle < 0) {
      // We have a low point. Mark it in red.
      new paper.Path.Circle({
        center: stitchShapePath.getPointAt(stitchPathOffset),
        radius: 4,
        strokeColor: 'red',
        //fillColor: this.path.strokeColor
      });
    }
    lastAngle = currentTangentAngle;
    //console.log("Current Angle: ",currentTangentAngle);
    //threadPath.add(stitchShapePath.getPointAt(stitchPathOffset));
    stitchPathOffset += 0.1;
	}
	// Now that we have all of our high and low points. Lets start with the left most high point.
	// Then, we'll stitch down until our right intersection point is further right than our closest
	// low point.
	// Make sure we have a stitch at the end of the path
	if (stitchPathOffset != stitchShapePath.length) {
	  //threadPath.add(stitchShapePath.getPointAt(stitchShapePath.length));
	}
	paper.view.draw();
  return threadPath;
};

if(stitchTypes && typeof stitchTypes !== undefined) {
  console.log("Adding Satin Fill Stitch to the types of stitches.");
  let stitchProps = [
    new StitchProp({displayName: "Max Stitch Length", keyName: "maxStitchLength", defaultValue: 8}),
  ];
  stitchTypes.push(
    new StitchType({
      displayName: 'Satin Fill Stitch',
      stitchFunction: createSatinFillStitchPath,
      stitchProps: stitchProps,
    })
  );
}
