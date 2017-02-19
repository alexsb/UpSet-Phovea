/**
 * Created by hanmengjiao on 2/14/17.
 */

import * as d3 from 'd3';
import {BaseSet, BaseAttribute} from './SetDataStructure';



export class setData{


  public file = [];  // all file rows in each array

  public headers = [];  // sets headers

  public rawset = []; // all values for each set

  public setname = []; // all sets name

  public attributename = [];

  public sets = [];

  public attributes = [];


  constructor(data){
    this.LoadData(data);
  }

  private LoadData(data){
    //console.log(data);

    const desc = data[1].desc;
    const url = data[1].url;

    d3.text(url, 'text/plain',(d) => {

      d3.dsv(desc.separator, 'text/plain').parseRows(d, (_data) => {

        this.file.push(_data);
      })

      this.headers = this.file[0];

      // remove header
      this.file.splice(desc.header, 1);

      // the number of sets
      let setstart = desc.sets[0].start;
      let setend = desc.sets[0].end;
      let setnum = setend - setstart + 1;

      // obtain rawset data
      for(let i = 0; i < setnum; i++){
        this.rawset.push(new Array());
      };

      for(let i = 0; i < this.file.length; i++){
        let temp = this.file[i];
        this.attributename.push(temp[0]);

        for(let j = setstart; j <= setend; j++){
          this.rawset[j-1].push(parseInt(temp[j], 10));
        }
      };

      // obtain set names
      for(let j = setstart; j <= setend; j++){
        this.setname.push(this.headers[j]);
      }

      // obtain sets
      let temp_set: BaseSet;
      for(let i = 0; i < this.rawset.length; i++){

        let setID = i;
        let setname =  this.setname[i];
        let itemlist = this.rawset[i];
        let combinedSets = Array.apply(null, new Array(this.rawset.length)).map(Number.prototype.valueOf, 0);
        combinedSets[i] = 1;
        let setsize = this.setname.length;
        let isselected = 'true';
        let itemindex = [];
        for(let j = 0; j < itemlist.length; j++){
          if(itemlist[j] !== 0){
            itemindex.push(j);
          }
        };

        temp_set = {setID: setID, setName: setname, itemlist: itemlist, combinedSets:combinedSets, itemindex:itemindex, setsize:setsize, selected:isselected};
        this.sets.push(temp_set);
      };

      //obtain attributes
      let temp_attribute0: BaseAttribute;
      temp_attribute0 = {
        name: "Name",
        sort: 1,
        type: "id",
        values: this.attributename
      };
      this.attributes.push(temp_attribute0);

      let temp_attribute1: BaseAttribute;
      let temp_attribute2: BaseAttribute;

      let temp_value = [];
      let setList = [];

      for(let i = 0; i < this.file.length; i++){
        let count = 0;
        let setlist = [];

        for(let j = 0; j < this.rawset.length; j++){
          count += this.rawset[j][i];
          if(this.rawset[j][i] === 1){
            setlist.push(this.sets[j].setID);
          }
        }
        temp_value.push(count);
        setList.push(setlist);
      };

      temp_attribute1 = {
        name: "Set Count",
        sort: 1,
        type: 'integer',
        values: temp_value
      };

      temp_attribute2 = {
        name: "SetList",
        sort: 1,
        type: 'setlist',
        values: setList
      };

      this.attributes.push(temp_attribute1);
      this.attributes.push(temp_attribute2);

    });

  };

}

export function create(data){

  return new setData(data);
}

