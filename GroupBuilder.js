'use strict'

import groupFixture from './fixtures/group'
import BaseBuilder from './BaseBuilder'
import _ from 'lodash'

class GroupBuilder extends BaseBuilder {

  constructor(){
    super();
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
