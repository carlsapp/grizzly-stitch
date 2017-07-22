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

var runningStitchDebug = {
  printShapeLength: false,
  printEachStitch: false,
  printSegmentDetails: false,
  printStitchProps: false,
};

var createRunningStitchPath = function(stitchShapePath, stitchProps) {
  //console.log("Stitching a running stitch");
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
  while(stitchPathOffset < stitchShapePath.length) {
    if (runningStitchDebug.printEachStitch) {
      console.log("stitchPathOffset: ",stitchPathOffset," nextSegmentIndex: ",nextSegmentIndex);
    }
    if (stitchPathOffset > nextSegmentOffset) {
      if (runningStitchDebug.printEachStitch) {
        console.log("We are past the corner. Truncating stitch to the corner.");
      }
      // We are past our next corner. Lets stitch at the corner and set our stitchPathOffset to the corner
      threadPath.add(stitchShapePath.segments[nextSegmentIndex].point);
      stitchPathOffset = nextSegmentOffset;
      // Now, lets determine if we're past our last segment and calculate the offset of our next segment
      nextSegmentIndex += 1;
      if (nextSegmentIndex >= stitchShapePath.segments.length) {
        nextSegmentOffset = stitchShapePath.length;
      } else {
        nextSegmentOffset = stitchShapePath.getOffsetOf(stitchShapePath.segments[nextSegmentIndex].point);
      }
      if (runningStitchDebug.printSegmentDetails) {
        console.log("New segment details: Path Offset: ",nextSegmentOffset);
      }
    } else {
      threadPath.add(stitchShapePath.getPointAt(stitchPathOffset));
      stitchPathOffset += maxStitchLength;
    }
    //console.log("stitchPathOffset: ",stitchPathOffset," stitchShapePath.length: ",stitchShapePath.length);
  }
  // Make sure we have a stitch at the end of the path
  if (stitchPathOffset != stitchShapePath.length) {
    threadPath.add(stitchShapePath.getPointAt(stitchShapePath.length));
  }
  paper.view.draw();
  return threadPath;
};

if(stitchTypes && typeof stitchTypes !== undefined) {
  console.log("Adding Running Stitch to the types of stitches.");
  let stitchProps = [
    new StitchProp({displayName: "Max Stitch Length", keyName: "maxStitchLength", defaultValue: 8}),
  ];
  stitchTypes.push(
    new StitchType({
      displayName: 'Running Stitch',
      stitchFunction: createRunningStitchPath,
      stitchProps: stitchProps,
    })
  );
}
