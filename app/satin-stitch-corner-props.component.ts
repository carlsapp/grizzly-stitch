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
  selector: 'satin-stitch-corner-props',
  template: `
<div class="shape-list-title" [ngClass]="{'selected-row': shapeTreeComponent.selectedObj === CornerProps}">
  <i (click)="togglePropDisplay()" [ngClass]="{'glyphicon-triangle-bottom': expanded, 'glyphicon-triangle-right': !expanded }" class="glyphicon action-icon"></i>
  <span style="font-weight:bold" class="myselectable" (click)="shapeTreeComponent.selected(CornerProps)">Corner {{CornerProps.index}}</span>
</div>
<div id="corner{{uniqueId}}props" class="collapse indent">
  <div>
    <span class="dropdown">
      <button class="btn btn-sm dropdown-toggle" style="background-color:white; border-color:#CCC; margin-bottom:5px" type="button" id="dropdownMenu1" data-toggle="dropdown" title="Corner Stitch Type" aria-haspopup="true" aria-expanded="true">
        {{CornerProps.type}}
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li class="disabled"><a href="#">Choose a Corner Type</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#" (click)="changeCornerType('Miter')">Mitered Corner</a></li>
        <li><a href="#" (click)="changeCornerType('Feather')">Feathered Corner</a></li>
        <li><a href="#" (click)="changeCornerType('Butt')">Butted Corner</a></li>
      </ul>
    </span>
  </div>
  <div *ngIf="CornerProps.type == 'Feather'">Feather Distance: <span id="feather-distance-{{uniqueId}}" class="editable" title="Feather Distance">{{CornerProps.featherDistance}}</span></div>
  <div *ngIf="CornerProps.type == 'Butt'">
    Butt Segment:  
    <span class="dropdown">
      <button class="btn btn-sm dropdown-toggle" style="background-color:white; border-color:#CCC" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        {{CornerProps.buttSegment}}
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li class="disabled"><a href="#">Choose Which Segment Will Butt</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#" (click)="changeButtSegment(0)">0</a></li>
        <li><a href="#" (click)="changeButtSegment(1)">1</a></li>
      </ul>
    </span>
  </div>
</div>
    `,
})
export class SatinStitchCornerPropsComponent {
  @Input() CornerProps: any;
  @Input() StitchPath: any;
  @Input() shapeTreeComponent: any;
  expanded: boolean;
  uniqueId: any;
  selectedShape: any;
  
  constructor() {
    this.expanded = false;
    this.selectedShape = undefined;
    this.uniqueId = GetUniqueId();
  }
  
  ngAfterViewInit() {
    this.createXEditable();
  }
  
  createXEditable() {
    // const component = this;
    const featherDistanceElem = $("#feather-distance-" + this.uniqueId);
    featherDistanceElem.editable({
      success: function(response: any, newValue: number) {
        console.log("In xeditable for corner: ", response, newValue, $(this).data('editable'));
        this.CornerProps.featherDistance = parseFloat(newValue.toString());
        this.StitchPath.reStitch();
      }.bind(this)
    });
  }
  
  changeButtSegment(newSegment) {
    if (newSegment === this.CornerProps.buttSegment)
      return;
    this.CornerProps.buttSegment = newSegment;
    this.StitchPath.reStitch();
  }
    
  togglePropDisplay() {
    // This gets called whenever the user clicks on the arrow next to the corner name
    // We use JQuery to do our toggling so we easily get the effects
    $('#corner' + this.uniqueId + 'props').collapse('toggle');
    this.expanded = !this.expanded;
  }
  
  changeCornerType(newCornerType) {
    if (this.CornerProps.type === newCornerType)
      return;
    this.CornerProps.type = newCornerType;
    this.StitchPath.reStitch();
    // We have to set up the X-Editable properties as a timeout b/c the fields haven't been drawn yet
    const component = this;
    setTimeout(() => {
      component.createXEditable();
    }, 0);
  }
  
  select() {
    if (this.selectedShape !== undefined)
      return;
    this.selectedShape = drawBoundingBox(this.CornerProps.paperJsSegment.point);
  }
  
  deselect() {
    if (this.selectedShape === undefined)
      return;
    this.selectedShape.remove();
    this.selectedShape = undefined;
  }
  
}
