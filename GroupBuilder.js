'use strict'

import groupFixture from './fixtures/group'
import BaseBuilder from './BaseBuilder'

import UUID from 'uuid'
import generateUniqueKeys from 'generateUniqueKeys'
import _ from 'lodash'

const keyMap = {
  "almId": () => {return new UUID();}
}

class GroupBuilder extends BaseBuilder {

  constructor(){
    super();
    this._registerOperation((group) =>{
      generateUniqueKeys(keyMap, group);
    });
  }

  addToPlan (plan){
    this._registerOperation((group) => {
      group.planId = plan._id
    });
    return this;
  }

  build (){
    return super.build(groupFixture())
  }

}

module.exports = GroupBuilder;
