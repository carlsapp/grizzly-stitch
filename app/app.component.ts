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

import { Component } from '@angular/core';
import 'reflect-metadata';
import 'zone.js/dist/zone';

@Component({
  selector: 'my-app',
  template: `
    <nav-bar [shapeGroups]="shapeGroups" [settings]="settings"></nav-bar>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-3" style="height: calc(100vh - 122px); overflow-y: auto;">
          <shape-tree [shapeGroups]="shapeGroups" [settings]="settings"></shape-tree>
        </div>
        <div class="col-sm-8 col-md-7" style="height: calc(100vh - 122px);">
          <canvas id="myCanvas" resize="true"></canvas>
        </div>
        <div class="col-sm-1 col-md-2"></div>
      </div>
    </div>

    <!-- Bottom Fixed Footer -->
    <nav class="navbar navbar-default navbar-fixed-bottom">
      <div class="container">
        <div class="col-sm-12 text-center navbar-text">
            <a href="http://www.grizzlystitch.org" target="_blank">An Open Source Project By People Like You</a>
        </div>
      </div>
    </nav>
    `,
})
export class AppComponent {
  shapeGroups: any[];
  settings: any;
  
  constructor() {
    this.shapeGroups = [];
    this.settings = {
      measurement_units: "mm",
      pixels_per_unit: 72,
      defaultStitchType: stitchTypes[0].name,
    };
    
    // Configure our defaults for X-Editable
    $.fn.editable.defaults.container = 'body';
    $.fn.editable.defaults.type = 'text';
    $.fn.editable.defaults.unsavedclass = '';
    $.fn.editable.defaults.inputclass = '';
  }
  
  ngAfterViewInit() {
    console.log("Initializing our drawing canvas ...");
    // This function call needs to be in a ngAfterViewInit() so that its called after Angular
    // creates our <canvas> object
    initializeDrawingCanvas('myCanvas');
  }


}
