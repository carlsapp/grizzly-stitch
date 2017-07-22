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

// Angular Imports
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
// Our Imports
import { AppComponent }  from './app.component';
import { ShapeTreeComponent } from './shape-tree.component';
import { NavBarComponent } from './nav-bar.component';
import { SatinStitchPropsComponent } from './satin-stitch-props.component.ts';
import { SatinStitchCornerPropsComponent } from './satin-stitch-corner-props.component.ts';
import { StitchPathComponent } from './stitchpath-props.component.ts';
import 'reflect-metadata';
import 'zone.js/dist/zone';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ShapeTreeComponent,
    NavBarComponent,
    SatinStitchPropsComponent,
    SatinStitchCornerPropsComponent,
    StitchPathComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
