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

// This file is for all of the javascript code that doesn't have a better home.

let shapeId = 0;
class Shape {
  constructor(path, name) {
    this.path = path;
    this.stitchPaths = [];
    this.name = name;
    this.id = ++shapeId;
    this.expanded = false;
    this.selectedShape = undefined
  }
  
  reStitch() {
    for (let i = 0; i < this.stitchPaths.length; i++) {
      this.stitchPaths[i].reStitch();
    }
  }
  
  addStitchPath(stitchType) {
    if (typeof stitchType === "string") {
      // Find our stitchtype
      for (let i = 0; i < stitchTypes.length; i++) {
        //console.log(stitchTypes[i].name);
        //console.log(stitchType === stitchTypes[i].name);
        if (stitchType === stitchTypes[i].name) {
          stitchType = stitchTypes[i];
          break;
        }
      }
    }
    if (typeof stitchType !== typeof stitchTypes[0]) {
      console.log("Unknown Stitch Type " + stitchType + ". Using first stitch type.");
      stitchType = stitchTypes[0];
    }
    this.stitchPaths.push(
      new StitchPath({
        shape: this,
        stitchType: stitchType,
        threadColor: 'blue',
      })
    );
  }
  
  remove() {
    // Delete this shape
    console.log("Deleting shape " + this.name);
    // First, delete any stitch paths
    for(var i=0; i < this.stitchPaths.length; i++) {
      // We could call stitchPath.remove(), but then it would mess with our
      // stitchPaths list and make things unneccessarily complicated
      this.stitchPaths[i].path.remove();
      this.stitchPaths[i].stitchPoints.remove();
    }
    this.path.remove();
    this.group.shapes.splice(this.group.shapes.indexOf(this), 1);
    //console.log(this.group.shapes);
  }
  
  changeWidth(newWidth) {
    this.scale(newWidth / this.path.bounds.width, 1);
  }
  
  changeHeight(newHeight) {
    this.scale(1, newHeight / this.path.bounds.height);
  }
  
  scale(width, height) {
    this.path.scale(width, height);
    this.reStitch();
  }
  
  moveX(x) {
    this.path.position.x = x;
    this.reStitch();
  }
  
  moveY(y) {
    this.path.position.y = y;
    this.reStitch();
  }
  
  // The select() and deselect() functions are to help the UI with selecting these shapes
  select() {
    if (this.selectedShape !== undefined)
      return;
    this.selectedShape = drawBoundingBox(this.path);
  }
  
  deselect() {
    if (this.selectedShape === undefined)
      return;
    this.selectedShape.remove();
    this.selectedShape = undefined;
  }
}

let shapeGroupId = 0;
class ShapeGroup {
  // Represents a group of shapes. In our tree browser on the left, we present groups of shapes
  // represented by the name here and then list all of the shapes.

  constructor(shapes = [], paperJSGroup) {
    this.id = ++shapeGroupId;
    this.expanded = false;
    this.name = "Group " + this.id;
    this.shapes = shapes;
    this.selectedShape = undefined;
    this.paperJSGroup = paperJSGroup;
  }
  
  reStitch() {
    // Called whenever someone modifies something about our shapes that would cause our stitches to change
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].reStitch();
    }
  }
  
  select() {
    if (this.selectedShape !== undefined)
      return;
    this.selectedShape = drawBoundingBox(this.paperJSGroup);
  }
  
  deselect() {
    if (this.selectedShape === undefined)
      return;
    this.selectedShape.remove();
    this.selectedShape = undefined;
  }
  
  changeWidth(newWidth) {
    this.scale(newWidth / this.paperJSGroup.bounds.width, 1);
  }
  
  changeHeight(newHeight) {
    this.scale(1, newHeight / this.paperJSGroup.bounds.height);
  }
  
  scale(width, height) {
    this.paperJSGroup.scale(width, height);
    this.reStitch();
  }
  
  moveX(x) {
    this.paperJSGroup.position.x = x;
    this.reStitch();
  }
  
  moveY(y) {
    this.paperJSGroup.position.y = y;
    this.reStitch();
  }
}

var exportDataFormats = [];

// Length Conversion Functions not used yet ...
function millimetersToInches(length) {
  return length * 0.039370;
}
function inchesToMillimeters(length) {
  return length * 25.400051;
}