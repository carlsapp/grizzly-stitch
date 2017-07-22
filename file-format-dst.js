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

var STITCH_TYPE_FLAGS = STITCH_TYPE_FLAGS || {
  JUMP        : 1 << 0,
  COLOR_CHANGE: 1 << 1,
};

var Stitch = Stitch || function(x, y, flags) {
  this.x = x;
  this.y = y;
  this.flags = flags;
};

function storeString(data, offset, string) {
  for(var i = 0; i < string.length; i++) {
    data.setUint8(offset + i, string.charCodeAt(i));
  }
}

function createDstDataView(stitches) {
  console.log(stitches);
  // Argument stitches needs to be an array of Stitch objects
  var initialData = new Uint8Array(512 + (stitches.length * 3) + 3);
  // In the DST format, lots of stuff is padded with 0x20. We'll make it easier
  // and just start with all 0x20.
  initialData.fill(0x20);
  var data = new DataView(initialData.buffer);
  storeString(data, 0, "LA:                .ST:0000000.CO:000.+X:00000.-X:00000.+Y:00000.-Y:00000.AX:-    0.AY:-    0.MX:+    0.MY:+    0.PD:******..   ");
  // Store the number of stitches in the ST property
  var stitchLenStr = stitches.length.toString();
  storeString(data, 30 - stitchLenStr.length, stitchLenStr);
  // Store the number of color changes in the CO property
  var numColorChanges = 0;
  for(var i = 0; i < stitches.length; i++) {
    if(stitches[i].flags & STITCH_TYPE_FLAGS.COLOR_CHANGE)
      numColorChanges++;
  }
  if(numColorChanges > 999)
    numColorChanges = 999;  // Who has more than 999 color changes?!?!?!
  var numColorChangesStr = numColorChanges.toString();
  storeString(data, 37 - numColorChangesStr.length, numColorChangesStr);
  //var lastStitchX = 0;
  //var lastStitchY = 0;
  let roundingErrorX = 0;
  let roundingErrorY = 0;
  for(var i = 0; i < stitches.length; i++) {
    // Convert our stitch coordinates into DST's weird encoding. Does anyone
    // know what type of encoding this is? Add a comment.
    var stitch3bytes = 0;
    /*var stitchX = Math.round(stitches[i].x - lastStitchX);
    var stitchY = Math.round(stitches[i].y - lastStitchY);
    lastStitchX = stitches[i].x;
    lastStitchY = stitches[i].y;*/
    // The stitch length of stitches are in MM. DST format is in 0.1 mm.
    var stitchX = Math.round((stitches[i].x * 10) + roundingErrorX);
    var stitchY = Math.round((stitches[i].y * 10) + roundingErrorY);
    roundingErrorX = (stitches[i].x * 10) + roundingErrorX - stitchX;
    roundingErrorY = (stitches[i].y * 10) + roundingErrorY - stitchY;
    //var stitchX = Math.round(stitches[i].x);
    //var stitchY = Math.round(stitches[i].y);
    //console.log("Stitch XY: (",stitches[i].x,", ",stitches[i].y,")")
    //console.log("Distance StitchXY: (",stitchX,", ",stitchY,")")
    // Adjust the X coordinate
    if(stitchX >= 41) {
      // Set bit 2 of the 3rd byte
      stitch3bytes |= 1 << 18;
      stitchX -= 81;
    }
    if(stitchX <= -41) {
      // Set bit 3 of the 3rd byte
      stitch3bytes |= 1 << 19;
      stitchX += 81;
    }
    if(stitchX >= 14) {
      // Set bit 2 of the 2nd byte
      stitch3bytes |= 1 << 10;
      stitchX -= 27;
    }
    if(stitchX <= -14) {
      // Set bit 3 of the 2nd byte
      stitch3bytes |= 1 << 11;
      stitchX += 27;
    }
    if(stitchX >= 5) {
      // Set bit 2 of the 1st byte
      stitch3bytes |= 1 << 2;
      stitchX -= 9;
    }
    if(stitchX <= -5) {
      // Set bit 3 of the 1st byte
      stitch3bytes |= 1 << 3;
      stitchX += 9;
    }
    if(stitchX >= 2) {
      // Set bit 0 of the 2nd byte
      stitch3bytes |= 1 << 8;
      stitchX -= 3;
    }
    if(stitchX <= -2) {
      // Set bit 1 of the 2nd byte
      stitch3bytes |= 1 << 9;
      stitchX += 3;
    }
    if(stitchX >= 1) {
      // Set bit 0 of the 1st byte
      stitch3bytes |= 1;
      stitchX -= 1;
    }
    if(stitchX <= -1) {
      // Set bit 1 of the 1st byte
      stitch3bytes |= 1 << 1;
      stitchX += 1;
    }
    if(stitchX !== 0)
      console.log("BUG ALERT! file-format-dst.js:createDstDataView(), x should be zero yet x = ", stitchX);
    // Adjust the Y coordinate
    if(stitchY >= +41) {
      // Set bit 5 of the 3rd byte
      stitch3bytes |= 1 << 21;
      stitchY -= 81;
    }
    if(stitchY <= -41) {
      // Set bit 4 of the 3rd byte
      stitch3bytes |= 1 << 20;
      stitchY += 81;
    }
    if(stitchY >= +14) {
      // Set bit 5 of the 2nd byte
      stitch3bytes |= 1 << 13;
      stitchY -= 27;
    }
    if(stitchY <= -14) {
      // Set bit 4 of the 2nd byte
      stitch3bytes |= 1 << 12;
      stitchY += 27;
    }
    if(stitchY >=  +5) {
      // Set bit 5 of the 1st byte
      stitch3bytes |= 1 << 5;
      stitchY -= 9;
    }
    if(stitchY <=  -5) {
      // Set bit 4 of the 1st byte
      stitch3bytes |= 1 << 4;
      stitchY += 9;
    }
    if(stitchY >=  +2) {
      // Set bit 7 of the 2nd byte
      stitch3bytes |= 1 << 15;
      stitchY -= 3;
    }
    if(stitchY <=  -2) {
      // Set bit 6 of the 2nd byte
      stitch3bytes |= 1 << 14;
      stitchY += 3;
    }
    if(stitchY >=  +1) {
      // Set bit 7 of the 1st byte
      stitch3bytes |= 1 << 7;
      stitchY -= 1;
    }
    if(stitchY <=  -1) {
      // Set bit 6 of the 1st byte
      stitch3bytes |= 1 << 6;
      stitchY += 1;
    }
    if(stitchY !== 0)
      console.log("BUG ALERT! file-format-dst.js:createDstDataView(), y should be zero yet y = ", stitchY);
    
    // Set our flags
    // Bits 0 and 1 of the 3rd byte are always set
    stitch3bytes |= 3 << 16;
    if(stitches[i].flags & STITCH_TYPE_FLAGS.JUMP) {
      // For jump stitches, set bit 7 of the 3rd byte
      stitch3bytes |= 1 << 23;
    }
    if(stitches[i].flags & STITCH_TYPE_FLAGS.COLOR_CHANGE) {
      // For jump stitches, set bit 6 of the 3rd byte
      stitch3bytes |= 1 << 22;
    }
    //console.log("Stitch3Bytes: ",stitch3bytes);
    data.setUint8(512 + (i*3), stitch3bytes & 0xFF);
    data.setUint8(512 + (i*3) + 1, (stitch3bytes >> 8) & 0xFF);
    data.setUint8(512 + (i*3) + 2, (stitch3bytes >> 16) & 0xFF);
  }
  // The END stitch is 0xF3
  data.setUint8(512 + (stitches.length * 3), 0);
  data.setUint8(512 + (stitches.length * 3) + 1, 0);
  data.setUint8(512 + (stitches.length * 3) + 2, 0xF3);
  return data;
}

if(typeof exportDataFormats !== undefined) {
  console.log("Adding DST format to the list of export formats.")
  exportDataFormats.push({
    name: 'DST',
    dataCreateFunction: createDstDataView,
    maxStitchLengthMM: 12.1,
    minStitchLengthMM: .1,
    fileExtension: 'dst',
    flipVertical: true,
  });
  exportDataFormats.push({
    name: 'XSEW',
    dataCreateFunction: createDstDataView,
    maxStitchLengthMM: 121,
  });
}
