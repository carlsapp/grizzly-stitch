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

declare var stitchTypes: any[];
declare var exportDataFormats: any[];
declare var STITCH_TYPE_FLAGS: any;
declare function initializeDrawingCanvas(a: string): void;
declare function GetUniqueId(): void;
declare function drawBoundingBox(a: any): void;
declare class StitchType {
    constructor(name: string, stitchFunction: () => void, stitchProps: object, defaultStitchProps: object);
    name: string;
    stitch: (a: any, b: any) => any;
    defaultStitchProps: any;
    stitchProps: any;
}
declare class StitchProp {
    constructor(displayName: string, keyName: string);
}

declare class Stitch {
    x: number;
    y: number;
    flags: any;
    constructor(x: number, y: number, flags?: any);
}

declare function createDstDataView(stitches: Stitch[]): any;

// TODO Replace all of these with the PaperJS types
declare var paper: any;

// TODO Replace all of these with the JQuery types
declare function $(a: any): any;

declare class Shape {
  stitchPaths: any[];
  path: any;
  name: string;
  expanded: boolean;
  id: number;
  group: ShapeGroup;
  constructor(path?: any, name?: string);
  reStitch();
  addStitchPath(stitchType: StitchType);
  remove();
  changeWidth(newWidth: number);
  changeHeight(newHeight: number);
  scale(width: number, height: number);
  moveX(x: number);
  moveY(y: number);
  select();
  deselect();
}

declare class ShapeGroup {
  expanded: boolean;
  selected: boolean;
  id: number;
  name: string;
  // TODO Clean up these any props
  paperJSGroup: any;
  shapes: any;
  constructor(shapes?: Shape[], paperJSGroup?: any);
  reStitch();
  select();
  deselect();
  changeWidth(newWidth: number);
  changeHeight(newHeight: number);
  scale(width: number, height: number)
  moveX(x: number);
  moveY(y: number);
}

declare class StitchPath {
  stitchProps: any;
  reStitch: any;
  setStitchType: any;
  stitchPoints: any;
  path: any;
  stitchOrder: any;
  expanded: any;
  stitchType: any;
  remove: any;
}
