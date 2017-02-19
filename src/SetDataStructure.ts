/**
 * Created by hanmengjiao on 2/18/17.
 */

export interface BaseSet {

  setID: number;
  setName: string;
  itemlist: number[];
  combinedSets: number[];
  itemindex: number[];
  setsize: number;
  selected: string;


};

export interface BaseAttribute {

  name: string;
  sort: number;
  type: string;
  values: number[];

};


