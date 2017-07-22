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

// This file contains the code for defining your own stitch and also contains stitches that
// have graduated past an alpha development stage.

var stitchTypes = [];

// TODO Stitch Types:
//   Running Stitch
//   Pattern Fill Stitch

class StitchType {
  constructor({displayName, stitchFunction, stitchProps = [], customAngularProps = false}) {
    this.name = displayName;
    this.stitch = stitchFunction;
    this.stitchProps = stitchProps;
    this.customAngularProps = customAngularProps;
    // If stitchProps is a function, we'll get our default stitch props by calling the function
    // with the shape as an argument when we know what we want to stitch
    if (typeof stitchProps !== "function") {
      // Go ahead and create our default stitch properties object based on our StitchProp objects
      this.defaultStitchProps = {};
      for (let i = 0; i < stitchProps.length; i++) {
        this.defaultStitchProps[stitchProps[i].keyName] = stitchProps[i].defaultValue;
      }
    }

  }
}

class StitchProp {
  constructor({ displayName = '', keyName = '',  defaultValue = ''} = {}) {
    this.displayName = displayName;
    this.keyName = keyName;
    this.defaultValue = defaultValue;
  }
}


class StitchCornerType {
  constructor({displayName, cornerProps = []}) {
    this.name = displayName;
    this.cornerProps = cornerProps;
    this.defaultCornerProps = {};
    for (let i = 0; i < cornerProps.length; i++) {
      this.defaultCornerProps[cornerProps[i].keyName] = cornerProps[i].defaultValue;
    }
  }
};


let stitchOrder = 0;
class StitchPath {  
  constructor({shape, stitchType, threadColor}) {
    this.shape = shape;
    // The stitchPoints PaperJS group holds all of the circles showing stitch points on the canvas
    this.stitchPoints = new paper.Group();
    this.threadColor = threadColor;
    this.setStitchType(stitchType);
    this.stitchOrder = ++stitchOrder;
  }
  
  setStitchType(stitchType) {
    if (stitchType !== this.stitchType) {
      this.stitchType = stitchType
      // Copy the default stitch props from the stitch type
      // If stitchProps is a function, we'll get our default stitch props by calling the function
      // with the shape as an argument when we know what we want to stitch
      if (typeof stitchType.stitchProps === "function") {
        this.stitchProps = stitchType.stitchProps(this.shape);
      } else {
        this.stitchProps = {};
        for (var prop in stitchType.defaultStitchProps) {
          this.stitchProps[prop] = stitchType.defaultStitchProps[prop];
        }
      }
      this.reStitch();
    }
  }
  
  reStitch() {
    // Remove the stitch path from the PaperJS project
    if (this.path) {
      this.path.remove();
    }
    this.stitch();
  }
  
  stitch() {
    // Stitch a new path
    this.path = this.stitchType.stitch(this.shape.path, this.stitchProps);
    this.path.strokeColor = this.threadColor;
    this.addStitchPoints();
  }
  
  addStitchPoints() {
    this.stitchPoints.remove();
    this.stitchPoints = new paper.Group();
    //console.log(this.path);
    for (let i = 0; i < this.path.segments.length; i++) {
      this.stitchPoints.addChild(
        new paper.Path.Circle({
          center: this.path.segments[i].point,
          radius: this.path.strokeWidth * .75,
          strokeColor: this.path.strokeColor,
          fillColor: this.path.strokeColor
        })
      );
    }
    //console.log(this.stitchPoints);
  }
  
  remove() {
    // Delete this stitch path
    this.path.remove();
    this.stitchPoints.remove();
    this.shape.stitchPaths.splice(this.shape.stitchPaths.indexOf(this), 1);
  }
}

let nextUniqueId = 1234;
function GetUniqueId() {
  return nextUniqueId++;
}
