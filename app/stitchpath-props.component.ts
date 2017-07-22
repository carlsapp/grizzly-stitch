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
  selector: 'stitchpath-props',
  template: `
<div style="text-decoration:nowrap; padding-bottom:5px"><!-- Stitch Path Title --><span style="white-space:nowrap">
  <i class="glyphicon expand-icon" [ngClass]="{'glyphicon-triangle-bottom': expanded, 'glyphicon-triangle-right': !expanded }" (click)="togglePropDisplay()"></i>
  <i class="glyphicon glyphicon-pencil"> </i>
  <span class="dropdown">
    <button class="btn btn-sm dropdown-toggle" style="background-color:white; border-color:#CCC" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      {{stitchPath.stitchType.name}}
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li class="disabled"><a href="#">Choose a Stitch</a></li>
      <li role="separator" class="divider"></li>
      <li *ngFor="let stitchType of stitchTypes">
        <a href="#" (click)="changeStitchType(stitchType)">{{stitchType.name}}</a>
      </li>
    </ul>
  </span>
  <span class="action-icons">
    <i id="stitchpath-{{stitchPath.stitchOrder}}-color" class="glyphicon glyphicon-stop" title="Stitch Color"> </i>
    <i class="glyphicon" [ngClass]="{'glyphicon-eye-open': stitchPath.path.visible, 'glyphicon-eye-close': !stitchPath.path.visible }" (click)="stitchPath.path.visible = stitchPath.stitchPoints.visible = !stitchPath.path.visible" [attr.title]="stitchPath.path.visible ? 'Hide' : 'Show'"></i>
    <i class="glyphicon glyphicon-trash" (click)="stitchPath.remove()"title="Delete Stitch"> </i>
  </span>
</span></div>
<div id="collapseStitch{{stitchPath.stitchOrder}}" class="collapse indent">
  <satin-stitch-props *ngIf="stitchPath.stitchType.name == 'Satin Outline Stitch'" [stitchPath]="stitchPath" [shapeTreeComponent]="shapeTreeComponent"></satin-stitch-props>
  <ng-container *ngIf="!stitchPath.stitchType.customAngularProps">
    <div *ngFor="let stitchProp of stitchPath.stitchType.stitchProps" style="padding-bottom:5px">{{stitchProp.displayName}}: {{stitchPath.stitchProps[stitchProp.keyName]}}</div>
  </ng-container>
</div>
    `,
})
export class StitchPathComponent {
  @Input() stitchPath: StitchPath;
  @Input() shapeTreeComponent: any;
  expanded: boolean;
  stitchTypes: StitchType[];
  
  constructor() {
    this.stitchTypes = stitchTypes;
  }
  
  ngAfterViewInit() {
    // stitchpath-{{stitchPath.stitchOrder}}-color
    let stitchPath = this.stitchPath
    let colorPicker = $('#stitchpath-' + stitchPath.stitchOrder + '-color');
    colorPicker.css('color', stitchPath.path.strokeColor.toCSS());
    colorPicker.colorpicker({
      color: stitchPath.path.strokeColor.toCSS(),
    }).on('changeColor', function(e) {
      //console.log("Color changed to ",e.color.toString('rgba'));
      let colorString = e.color.toString('rgba');
      stitchPath.path.strokeColor = colorString;
      stitchPath.stitchPoints.strokeColor = colorString;
      stitchPath.stitchPoints.fillColor = colorString;
      colorPicker.css('color', colorString);
    });
  }
  
  togglePropDisplay() {
    // This gets called whenever the user clicks on the arrow next to the stitch
    // We use JQuery to do our toggling so we easily get the effects
    $('#collapseStitch' + this.stitchPath.stitchOrder).collapse('toggle');
    this.expanded = !this.expanded;
  }
  
  changeStitchType(stitchType: StitchType) {
    console.log("Changing stitch type for ", this.stitchPath, " to ", stitchType);
    this.stitchPath.setStitchType(stitchType);
    console.log("After changing the stitch type our shapeGroups now look like this:");
    console.log(this.shapeTreeComponent);
  }
  
}
