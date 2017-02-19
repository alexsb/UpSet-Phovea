/**
 * Created by hanmengjiao on 2/11/17.
 */

import * as datafruits from 'file-loader!./data/fruits.csv';
import * as descfruits from './data/fruits.json';
import * as datasimpsons from 'file-loader!./data/simpsons.csv';
import * as descsimpsons from './data/simpsons.json';

export interface IDataSetSpec {
  id: string;
  name: string;
  desc: any;
  url: string;
}

const data: IDataSetSpec[] = [
  {
    id: 'fruits',
    name: 'Important Information from Fruits',
    desc: descfruits,
    url: datafruits
  },
  {
    id: 'simpsons',
    name: 'Important Information from Simpsons',
    desc: descsimpsons,
    url: datasimpsons

  }
];

export default data;

