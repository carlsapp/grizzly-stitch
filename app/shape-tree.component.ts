

import {
  Component,
  Input,
} from '@angular/core';
//import 'reflect-metadata';
//import 'zone.js/dist/zone';


@Component({
  selector: 'shape-tree',
  template: `
    <div class="shape-list">
      <div *ngFor="let shapeGroup of shapeGroups">
        <div class="shape-list-title" [ngClass]="{'selected-row': selectedObj === shapeGroup}">
          <i class="glyphicon expand-icon" [ngClass]="{'glyphicon-triangle-bottom': shapeGroup.expanded, 'glyphicon-triangle-right': !shapeGroup.expanded }" (click)="toggleBranch(shapeGroup)"></i>
          <i class="glyphicon glyphicon-unchecked" (click)="selected(shapeGroup)"></i>
          <span id="shapeGroup-name-{{shapeGroup.id}}" href="#" style="font-weight:bold">{{shapeGroup.name}}</span>
          <span class="action-icons"><i (click)="shapeGroup.paperJSGroup.visible = !shapeGroup.paperJSGroup.visible" [ngClass]="{'glyphicon-eye-open': shapeGroup.paperJSGroup.visible, 'glyphicon-eye-close': !shapeGroup.paperJSGroup.visible }" class="glyphicon action-icon" [attr.title]="shapeGroup.paperJSGroup.visible ? 'Hide' : 'Show'"></i></span>
        </div>
        <div id="collapseShapeGroup{{shapeGroup.id}}" class="collapse indent">
          <span style="white-space:nowrap"><span class="non-editable-text">Size: </span><span id="shapeGroup-{{shapeGroup.id}}-width" title="Width">{{pxToUnits(shapeGroup.paperJSGroup.bounds.width)}}</span><span class="non-editable-text"> {{settings.measurement_units}} x </span><span id="shapeGroup-{{shapeGroup.id}}-height" title="Height">{{pxToUnits(shapeGroup.paperJSGroup.bounds.height)}}</span><span class="non-editable-text"> {{settings.measurement_units}}</span></span>
          <div *ngFor="let shape of shapeGroup.shapes">
            <div class="shape-list-title" [ngClass]="{'selected-row': selectedObj === shape}"><span style="white-space:nowrap">
              <i class="glyphicon expand-icon" [ngClass]="{'glyphicon-triangle-bottom': shape.expanded, 'glyphicon-triangle-right': !shape.expanded }" (click)="toggleBranch(shape)"></i>
              <i class="glyphicon glyphicon-unchecked" (click)="selected(shape)"></i>
              <span id="shape-name-{{shape.id}}" href="#" style="font-weight:bold">{{shape.name}}</span>
              <span class="action-icons">
                <i id="shape-{{shape.id}}-color" class="glyphicon glyphicon-stop" title="Shape Color"> </i>
                <i class="glyphicon glyphicon-plus" title="Add a Stitch" (click)="shape.addStitchPath()"> </i>
                <i (click)="shape.path.visible = !shape.path.visible" [ngClass]="{'glyphicon-eye-open': shape.path.visible, 'glyphicon-eye-close': !shape.path.visible }" class="glyphicon action-icon" [attr.title]="shape.path.visible ? 'Hide' : 'Show'"></i>
                <i class="glyphicon glyphicon-trash" (click)="shapeToDelete = shape" data-toggle="modal" data-target="#deleteShapeModal" title="Delete"> </i>
              </span>
            </span></div>
            <div id="collapseShape{{shape.id}}" class="collapse indent">
              <!-- This div gets expanded and collapsed when you click the triangle icon before the shape title above -->
              <!-- Add any shape details here -->
              <div style="padding-bottom:5px"><span style="white-space:nowrap; padding-bottom:5px">Size: <span id="shape-{{shape.id}}-width" title="Width">{{pxToUnits(shape.path.bounds.width)}}</span> {{settings.measurement_units}} x <span id="shape-{{shape.id}}-height" title="Height">{{pxToUnits(shape.path.bounds.height)}}</span> {{settings.measurement_units}}</span></div>
              <div style="padding-bottom:5px"><span style="white-space:nowrap; padding-bottom:10px">Position: <span id="shape-{{shape.id}}-position-x" title="X">{{pxToUnits(shape.path.position.x)}}</span> {{settings.measurement_units}} x <span id="shape-{{shape.id}}-position-y" title="Y">{{pxToUnits(shape.path.position.y)}}</span> {{settings.measurement_units}}</span></div>
              <div class="shape-stitch-list">
                <stitchpath-props *ngFor="let stitchPath of shape.stitchPaths" [stitchPath]="stitchPath" [shapeTreeComponent]="this"></stitchpath-props>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- Delete Shape Confirmation Modal -->
<div class="modal fade" id="deleteShapeModal" tabindex="-1" role="dialog" aria-labelledby="deleteShapeModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="deleteShapeModalLabel">Confirm Shape Delete</span>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete the shape {{shapeToDelete.name}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="shapeToDelete.remove()" data-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>
    `,
})
export class ShapeTreeComponent {
  @Input()
  shapeGroups: ShapeGroup[];
  @Input()
  settings: any;
  
  selectedObj: any;
  lastShapesSize: number;
  shapeToDelete: Shape;
  
  constructor() {
    this.lastShapesSize = -1;
    this.shapeToDelete = new Shape();
  }
  
  ngAfterViewChecked() {
    // This code needs to go in ngAfterViewChecked b/c it needs to be run after the elements have been created
    if(this.shapeGroups.length !== this.lastShapesSize) {
      let controller = this;
      for(let i = 0; i < this.shapeGroups.length; i++) {
        let shapeGroup = this.shapeGroups[i];
        $('#shapeGroup-name-' + shapeGroup.id).editable({
          title: 'Enter New Group Name',
          placement: 'bottom',
          success: function(response: any, newValue: string) {
            console.log("In success handler: ", response, newValue, i);
          }
        });
        $('#shapeGroup-' + shapeGroup.id + '-width').editable({
          success: function(response: any, newValue: string) {
            shapeGroup.changeWidth(controller.unitsToPx(newValue));
          }
        });
        $('#shapeGroup-' + shapeGroup.id + '-height').editable({
          success: function(response: any, newValue: number) {
            shapeGroup.changeHeight(controller.unitsToPx(newValue));
          }
        });
        for(let j = 0; j < this.shapeGroups[i].shapes.length; j++) {
          let shape = this.shapeGroups[i].shapes[j];
          // Set up our editable balloons for the shape name
          $('#shape-name-' + shape.id).editable({
            title: 'Enter Shape Name',
            success: function(response: any, newValue: string) {
              console.log("In success handler: ", response, newValue, i);
            }
          });
          // Set up our editable balloons for the shape size and position
          $('#shape-' + shape.id + '-height').editable({
            success: function(response: any, newValue: number) {
              shape.changeHeight(controller.unitsToPx(newValue));
            }
          });
          $('#shape-' + shape.id + '-width').editable({
            success: function(response: any, newValue: number) {
              shape.changeWidth(controller.unitsToPx(newValue));
            }
          });
          $('#shape-' + shape.id + '-position-x').editable({
            success: function(response: any, newValue: number) {
              shape.moveX(controller.unitsToPx(newValue));
            }
          });
          $('#shape-' + shape.id + '-position-y').editable({
            success: function(response: any, newValue: number) {
              shape.moveY(controller.unitsToPx(newValue));
            }
          });
          // Set the shape color picker color and events
          $('#shape-' + shape.id + '-color').css('color', shape.path.strokeColor.toCSS());
          $('#shape-' + shape.id + '-color').colorpicker({
            color: shape.path.strokeColor.toCSS(),
          }).on('changeColor', function(e) {
            console.log("Color changed to ",e.color.toString('rgba'));
            shape.path.strokeColor = e.color.toString('rgba');
            $('#shape-' + shape.id + '-color').css('color', e.color.toString('rgba'));
          });
        }
      }
      this.lastShapesSize = this.shapeGroups.length;
    }
  }
  
  selected(newSelection) {
    // If we already have something selected and it has a deselect() function, call it
    if (this.selectedObj !== undefined && this.selectedObj.deselect !== undefined)
      this.selectedObj.deselect();
    if (newSelection === this.selectedObj) {
      // If we clicked on something that's already selected, we go to nothing selected
      this.selectedObj = undefined;
      return;
    }
    this.selectedObj = newSelection;
    if (this.selectedObj.select !== undefined)
      newSelection.select();
  }

  toggleBranch(branch: Shape | StitchPath | ShapeGroup) {
    // This gets called whenever the user clicks on the arrow next to the shape group name, shape name, or stitch path
    branch.expanded = !branch.expanded;
    if(branch instanceof Shape) {
      $('#collapseShape'+branch.id).collapse('toggle');
    } else if(branch instanceof StitchPath) {
      $('#collapseStitch'+branch.stitchOrder).collapse('toggle');
    } else if(branch instanceof ShapeGroup) {
      $('#collapseShapeGroup'+branch.id).collapse('toggle');
    }
  }
  
  pxToUnits(pxValue: number) {
    // Limit everything to 2 decimal digits. TODO: Make the rounding customizable
    return Math.round(pxValue / this.settings.pixels_per_unit * 100) / 100;
  }
  
  unitsToPx(unitValue: number) {
    // Limit everything to 2 decimal digits. TODO: Make the rounding customizable
    return unitValue * this.settings.pixels_per_unit;
  }
  
}
