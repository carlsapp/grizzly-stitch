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

import { Component, Input } from '@angular/core';
// These two imports need to be here for ahead-of-time compilation
import 'reflect-metadata';
import 'zone.js/dist/zone';


@Component({
  selector: 'satin-stitch-props',
  template: `
<div>
  <div style="padding-bottom:5px">Stitch Width: <span id="{{stitchWidthId}}">{{stitchPath.stitchProps.width}}</span></div>
  <div style="padding-bottom:10px">Stitch Density: <span id="{{stitchDensityId}}">{{stitchPath.stitchProps.density}}</span></div>
  <satin-stitch-corner-props *ngFor="let corner of stitchPath.stitchProps.corners" [CornerProps]="corner" [StitchPath]="stitchPath" [shapeTreeComponent]="shapeTreeComponent"></satin-stitch-corner-props>
</div>
    `,
})
export class SatinStitchPropsComponent {
  @Input() stitchPath: StitchPath;
  @Input()
  shapeTreeComponent: any;
  stitchWidthId: string;
  stitchDensityId: string;
  
  constructor() {
    this.stitchWidthId = "stitch-width-" + GetUniqueId();
    this.stitchDensityId = "stitch-density-" + GetUniqueId();
  }
  
  ngAfterViewInit() {
    // We have to wait until after the view has been initialized to access our IDs
    let stitchPath = this.stitchPath;
    let stitchWidthElem = $('#' + this.stitchWidthId);
    stitchWidthElem.editable({
      success: function(response: any, newValue: number) {
        stitchPath.stitchProps.width = parseFloat(newValue.toString());
        stitchPath.reStitch();
      }
    });
    let stitchDensityElem = $('#' + this.stitchDensityId);
    stitchDensityElem.editable({
      success: function(response: any, newValue: number) {
        stitchPath.stitchProps.density = parseFloat(newValue.toString());
        stitchPath.reStitch();
      }
    });
  }
}
