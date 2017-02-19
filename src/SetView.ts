/**
 * Created by hanmengjiao on 2/18/17.
 */

import * as d3 from 'd3';
import {setviewConfig} from './setviewConfig';


class SetView {

  private $node;

  private width;

  private height;

  private data;

  constructor(parent: Element){
    this.$node = d3.select(parent);
  };

  init(setdata){
    this.data = setdata;
    this.build();
    return Promise.resolve(this);
  };

  private build() {

    console.log(this.data);

    let sets = this.data.sets;

    let rowlength = this.data.attributename[0];
    console.log(rowlength);

    //let rowlength = 24;


    this.width = setviewConfig.cellWidth * sets.length + setviewConfig.majorPadding + setviewConfig.leftOffset
      + setviewConfig.subSetSizeWidth + setviewConfig.expectedValueWidth;

    this.height = setviewConfig.cellDistance * rowlength;

    // set svg for st view
    const bodysvg = this.$node.append('svg')
      .attr("width", this.width)
      .attr("height", this.height);


    // set svg for set coloum
    const columnGroup = bodysvg.append("g")
      .attr('class', 'columnGroup')
      .attr('transform', 'translate("+ctx.leftOffset+","+0+")');

    //set svg for rows
    const rowGroup = bodysvg.append('g')
      .attr('class', 'rowgroup')
      .attr('transform', 'translate("+ctx.leftOffset+","+0+")');

    this.updateSetColumn(this.data.sets);

  };

  private updateSetColumn(sets){

  }


};







export function create(parent: Element) {
  console.log(parent);
  return new SetView(parent);
}
