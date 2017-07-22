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

import {
  Component,
  Input,
} from '@angular/core';
//import 'reflect-metadata';
//import 'zone.js/dist/zone';

class SampleShape{
  selected: boolean;
  url: string;
  constructor(shapeUrl: string) {
    this.url = shapeUrl;
  }
}

@Component({
  selector: 'nav-bar',
  template: `
    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <!--div class="container"-->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="http://www.grizzlystitch.org" target="_blank"><img src="GrizzlyStitchLogo.svg" style="height: 40px; padding-top: 5px; padding-left: 5px; padding-right: 20px" title="Grizzly Stitch"></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Insert Shapes <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#" class="choose-file">From SVG File<input type="file" (change)="svgFileUploaded($event)" id="choose-svg-file" accept="image/svg+xml" multiple></a></li>
                <li><a href="#" data-toggle="modal" data-target="#svgUrlModal">From SVG URL</a></li>
                <li><a href="#" data-toggle="modal" data-target="#svgShapesModal">From Sample Shapes</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Export <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <!--li><a href="#" (click)="exportDst()">DST File</a></li-->
                <li *ngFor="let exportFormat of exportFormats"><a href="#" (click)="exportDst(exportFormat)">{{exportFormat.name}} File</a></li>
                <!--li><a href="#" data-toggle="modal" data-target="#svgUrlModal">XSEW File</a></li-->
              </ul>
            </li>
            <li><a href="#" data-toggle="modal" data-target="#settingsModal">Settings</a></li>
            <li><a href="#about">About</a></li>
            <!--li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li-->
          </ul>
          <!--ul class="nav navbar-nav navbar-right">
            <li><a href="../navbar/">Default</a></li>
            <li><a href="../navbar-static-top/">Static top</a></li>
            <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li>
          </ul-->
        </div><!--/.nav-collapse -->
      <!--/div--> <!-- container -->
    </nav>

<!-- SVG File URL Modal -->
<div class="modal fade" id="svgUrlModal" tabindex="-1" role="dialog" aria-labelledby="svgUrlModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="svgUrlModalLabel">SVG File URL</span>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-control-label" for="inputSuccess1">Please enter the URL for the SVG file to add:</label>
          <input type="url" class="form-control" [(ngModel)]="svgImportUrl" id="inputSuccess1">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="importSVG(svgImportUrl)" data-dismiss="modal">Load Shapes</button>
      </div>
    </div>
  </div>
</div>

<!-- Sample Shapes Modal -->
<div class="modal fade" id="svgShapesModal" tabindex="-1" role="dialog" aria-labelledby="svgShapesModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="svgShapesModalLabel">Choose the Shapes to Insert</span>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img *ngFor="let sampleShape of sampleShapes" src="{{sampleShape.url}}" (click)="svgImportUrl = sampleShape.url" (dblclick)="importSVG(sampleShape.url); closeSampleShapesModal()" [ngStyle]="{'border-color': svgImportUrl === sampleShape.url ? 'blue' : 'white'}" style="height:100px; width:auto; border: 3px solid white; border-radius: 5px; padding: 5px" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="importSVG(svgImportUrl)" data-dismiss="modal">Load Shapes</button>
      </div>
    </div>
  </div>
</div>

<!-- Settings Modal -->
<div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="settingsModalLabel">Settings</span>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body form-group">
        <label class="form-control-label" for="settingsMeasurementUnitSelect">Length Measurement Units: </label>
        <select class="form-control" id="settingsMeasurementUnitSelect" [(ngModel)]="settings.measurement_units">
          <option value="in" title="Inches">in</option>
          <option value="mm" title="Millimeters">mm</option>
          <option value="px" title="Pixels">px</option>
        </select>
        <label class="form-control-label" for="settingsPixelsPerUnit" title="The number of pixels per unit selected in Length Measurement Units to be used when converting px measurements.">Pixels Per Unit: </label>
        <input type="text" class="form-control" [(ngModel)]="settings.pixels_per_unit" id="settingsPixelsPerUnit">
        <label class="form-control-label" for="settingsDefaultStitchType">Default Stitch Type: </label>
        <select class="form-control" id="settingsDefaultStitchType" [(ngModel)]="settings.defaultStitchType">
          <option *ngFor="let stitchType of stitchTypes" value="{{stitchType.name}}">{{stitchType.name}}</option>
        </select>
      </div>
      <div class="modal-footer">
        <!--button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="importSVG(svgImportUrl)" data-dismiss="modal">Load Shapes</button-->
      </div>
    </div>
  </div>
</div>
    `,
})
export class NavBarComponent {
  // We'll tie shapes to the variable passed to [shapes] in <nav-bar>
  @Input() shapeGroups: ShapeGroup[];
  @Input() settings: any;
  svgImportUrl: string;
  sampleShapes: SampleShape[];
  exportFormats: any[];
  stitchTypes: any[];
  constructor() {
    this.svgImportUrl = '';
    this.sampleShapes = [
      new SampleShape("sample-shapes/GrizzlyStitchLogo.svg"),
      new SampleShape("sample-shapes/truck.svg"),
      new SampleShape("sample-shapes/heart.svg"),
      new SampleShape("sample-shapes/square.svg"),
      new SampleShape("sample-shapes/TestStitchShape.svg"),
    ];
    this.exportFormats = exportDataFormats;
    this.stitchTypes = stitchTypes;
  }
  svgFileUploaded(event: any) {
    var files = event.target.files;
    for (var i = 0; i < event.target.files.length; ++i) {
        let file = event.target.files[i];
        let reader = new FileReader();
        let ourappcontroller = this;
        reader.onload = function (e: any) {
          ourappcontroller.importSVG(e.target.result);
        };
        reader.onabort = function (e: any) {
          console.log("WARNING: In onabort() while reading " + file.name + ". Event: ",e);
        };
        reader.onerror = function (e: any) {
          console.log("WARNING: In onerror() while reading " + file.name + ". Event: ",e);
        };
        reader.readAsText(file);
    }
  }
  
  closeSampleShapesModal() {
    $('#svgShapesModal').modal('hide');
  }
  
  importSVG(svgStringOrUrl: string) {
    console.log("Importing SVG: ", svgStringOrUrl);
    var ourappcontroller = this;
    paper.project.importSVG(svgStringOrUrl, {
      expandShapes: true,
      insert: false,
      onLoad: function(paperJsShapesGroup: any){
        // https://upload.wikimedia.org/wikipedia/commons/1/1d/Linecons_small-truck.svg
        //https://run.plnkr.co/Tkq0QXNn1QiT4kuO/sample-shapes/truck.svg
        //console.log("Object returned from paperjs: ", paperJsShapesGroup);
        paperJsShapesGroup.fitBounds(paper.view.bounds);
        paperJsShapesGroup.visible = false;
        let paths = getPaths(paperJsShapesGroup);
        let newShapeGroup = new ShapeGroup();
        newShapeGroup.paperJSGroup = new paper.Group(paths);
        newShapeGroup.paperJSGroup.fillColor = new paper.Color(1, 1, 1, 0);
        console.log("Creating shapes for " + paths.length + " paths");
        // We have a maxPaths here to debug hangs and issues with images that have lots of paths
        let maxPaths = paths.length;
        if (maxPaths > 80)
          maxPaths = 80;
        //for(var i = 0; i < paths.length; i++) {
        for(var i = 0; i < maxPaths; i++) {
          paths[i].clipMask = false;
          //var newShape = new Shape(paths[i].copyTo(paper.project), 'Shape X');
          var newShape = new Shape(paths[i], 'Shape X');
          newShape.path.strokeColor = 'black';
          newShape.path.strokeWidth = 1;
          newShape.path.visible = true;
          newShape.path.opacity = 1; 
          //newShape.path.selected = true;
          newShape.path.fillColor = new paper.Color(1, 1, 1, 0);
          newShape.path.clipMask = false;
          try {
            newShape.addStitchPath(ourappcontroller.settings.defaultStitchType);
          } catch (e) {
            console.log("Exception occurred while attempting to stitch!");
            console.log(e);
          } finally {}
          newShape.group = newShapeGroup;
          newShapeGroup.shapes.push(newShape);
        }
        ourappcontroller.shapeGroups.push(newShapeGroup);
        paper.project.activeLayer.clipped = false;
        console.log("After importing new SVG shapes, our shapeGroups look like this:");
        console.log(ourappcontroller.shapeGroups);
      }
    });
    //console.log('PaperJS paper object:');
    //console.log(paper);
  }
  
  exportDst(dataFormat: any) {
    console.log("Exporting DST file.");
    // Create our stitch list
    var stitchList = [];
    var maxStitchDistance = 0;
    var lastStitchX = 0;
    var lastStitchY = 0;
    var maxX = 0;
    var maxY = 0;
    if(dataFormat.flipHorizontal || dataFormat.flipVertical) {
      for (let shapeGroupIndex = 0; shapeGroupIndex < this.shapeGroups.length; shapeGroupIndex++) {
        // We need to calculate our max X and Y coordinates
        for(var i = 0; i < this.shapeGroups[shapeGroupIndex].shapes.length; i++) {
          var shape = this.shapeGroups[shapeGroupIndex].shapes[i];
          for(var j = 0; j < shape.stitchPaths.length; j++) {
            var stitchPath = shape.stitchPaths[j].path;
            for(var k = 0; k < stitchPath.segments.length; k++) {
              maxX = Math.max(stitchPath.segments[k].point.x, maxX);
              maxY = Math.max(stitchPath.segments[k].point.y, maxY);
            }
          }
        }
      }
    }
    for (let shapeGroupIndex = 0; shapeGroupIndex < this.shapeGroups.length; shapeGroupIndex++) {
        for(var i = 0; i < this.shapeGroups[shapeGroupIndex].shapes.length; i++) {
        //for(var i = 5; i < 6; i++) {
          var shape = this.shapeGroups[shapeGroupIndex].shapes[i];
          for(var j = 0; j < shape.stitchPaths.length; j++) {
            var stitchPath = shape.stitchPaths[j].path;
            for(var k = 0; k < stitchPath.segments.length; k++) {
            //for(var k = 0; k < 10; k++) {
              //console.log("k: ",k)
              console.log("Stitchpath Point: (", stitchPath.segments[k].point.x, ", ", stitchPath.segments[k].point.y, ")");
              var stitchX = stitchPath.segments[k].point.x / this.settings.pixels_per_unit;
              var stitchY = stitchPath.segments[k].point.y / this.settings.pixels_per_unit;
              if(dataFormat.flipHorizontal)
                stitchX = maxX - stitchX;
              if(dataFormat.flipVertical)
                stitchY = maxY - stitchY;
              if(dataFormat.minStitchLengthMM) {
                stitchX = stitchX - (stitchX % dataFormat.minStitchLengthMM)
                stitchY = stitchY - (stitchY % dataFormat.minStitchLengthMM)
              }
              var stitchDistanceX = stitchX - lastStitchX;
              var stitchDistanceY = stitchY - lastStitchY;

              console.log("Stitch Distance: (", stitchDistanceX, ", ", stitchDistanceY, ")");
              var currentStitch = new Stitch(stitchDistanceX, stitchDistanceY);
              lastStitchX = stitchX;
              lastStitchY = stitchY;
              if(stitchDistanceX > maxStitchDistance)
                maxStitchDistance = stitchDistanceX;
              if(stitchDistanceY > maxStitchDistance)
                maxStitchDistance = stitchDistanceY;
              //console.log("currentStitch: ", currentStitch);
              if(k === 0) {
                currentStitch.flags |= STITCH_TYPE_FLAGS.JUMP;
              }
              stitchList.push(currentStitch);
            }
          }
        }
    }
    console.log("Max Stitch Distance: ", maxStitchDistance);
    console.log("Stitches before normalization: ", stitchList);
    console.log("ShapeGroups: ", this.shapeGroups);
    if(dataFormat.maxStitchLengthMM && maxStitchDistance > dataFormat.maxStitchLengthMM) {
      // Adjust all of our stitch moves to be under the max stitch distance
      for(var i=0; i < stitchList.length; i++) {
        var stitchAbsX = Math.abs(stitchList[i].x);
        var stitchAbsY = Math.abs(stitchList[i].y);
        if(stitchAbsX > dataFormat.maxStitchLengthMM || stitchAbsY > dataFormat.maxStitchLengthMM) {
          console.log("Stitch ",stitchList[i]," exceeds max stitch length of ",dataFormat.maxStitchLengthMM);
          // Split into chunks smaller than the max stitch length
          var numSplits = Math.max(Math.ceil(stitchAbsX / dataFormat.maxStitchLengthMM), Math.ceil(stitchAbsY / dataFormat.maxStitchLengthMM));
          var stitchLengthX = stitchList[i].x / numSplits;
          var stitchLengthY = stitchList[i].y / numSplits;
          var flags = stitchList[i].flags;
          console.log("Splitting into ",numSplits," chunks of (",stitchLengthX,",",stitchLengthY,")");
          for(var j=0; j < numSplits; j++) {
            if(j === 0) {
              stitchList.splice(i, 1, new Stitch(stitchLengthX, stitchLengthY, flags));
            } else {
              stitchList.splice(i, 0, new Stitch(stitchLengthX, stitchLengthY, flags));
            }
          }
        }
        //stitchList[i].x = stitchList[i].x / (maxStitchDistance / 120);
        //stitchList[i].y = stitchList[i].y / (maxStitchDistance / 120);
      }
    }

    var downloadBlob = function(data: any, fileName: string, mimeType: string) {
      var blob, url: any;
      blob = new Blob([data], {
        type: mimeType
      });
      url = window.URL.createObjectURL(blob);
      downloadURL(url, fileName, mimeType);
      setTimeout(function() {
        return window.URL.revokeObjectURL(url);
      }, 1000);
    };
    
    var downloadURL = function(data: any, fileName: string, mimeType?: string) {
      var a: any;
      a = document.createElement('a');
      a.href = data;
      a.download = fileName;
      document.body.appendChild(a);
      a.style = 'display: none';
      a.click();
      a.remove();
    };
    var outputFileName = 'EmbroideryDesign.bin'
    if(dataFormat.fileExtension)
      outputFileName = 'EmbroideryDesign.' + dataFormat.fileExtension
    downloadBlob(createDstDataView(stitchList), outputFileName, 'application/octet-stream');
  }
}

var getPaths = function(shape: any): any[] {
  // This function will take a complicated PaperJS shape made up of several
  // groups, paths, etc and split it up into a list of paths for easier processing.
  //console.log("In getPaths() processing shape ", shape);
  var paths: any[] = [];
  if(shape instanceof paper.Group || shape instanceof paper.CompoundPath) {
   // console.log("Processing ",shape.children.length," children of shape.")
    for(var i = 0; i < shape.children.length; i++) {
      paths = paths.concat(getPaths(shape.children[i]));
      //console.log("paths: ",paths,shape,i);
    }
  } else if(shape instanceof paper.Shape) {
    paths.push(shape.toPath());
    shape.remove();
  } else if(shape instanceof paper.Path){
    paths.push(shape);
  } else {
    console.log("WARNING: Unknown shape: ", shape);
  }
  //console.log("Paths returned from getPaths: ",paths);
  return paths;
}
