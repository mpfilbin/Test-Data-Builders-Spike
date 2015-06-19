'use strict'

import fixture from './fixtures/backlogItems/feature.fixture'
import BaseBuilder from './BaseBuilder'

import random from './util/random'
import _ from 'lodash'


/*
{
  "_type": "Project",
  "groupId": "556f75b544f483f9333f36f5",
  "_rallyAPIMajor": "2",
  "_ref": "https://rally1.rallydev.com/slm/webservice/v2.x/project/23716113690",
  "almItemId": "5423e7d7-1bee-4dd1-be2e-b82405e38f68",
  "name": "Some Group Name",
  "_refObjectUUID": "5423e7d7-1bee-4dd1-be2e-b82405e38f68",
  "_refObjectName": "Some Group Name",
  "estimatedCapacity": 100,
  "_objectVersion": "19",
  "_rallyAPIMinor": "0",
  "objectID": 2371611369
}
*/

const transforms= {
  almId: () => {
    return random.uuid('v1');
  },
  _refObjectUUID: (group) => {
    return group.almId;
  },
  groupId: () => {
    return random.uuid('v1');
  },
  _refObjectName: (group) => {
    return `group-${group.objectID}`
  },
  _ref: (group) =>{
    return `https://rally1.rallydev.com/slm/webservice/v2.x/project/${group.objectID}`
  }
}

class GroupBuilder extends BaseBuilder {

  constructor(customTransforms){
    super(customTransforms || transforms);
  }

  addToPlan (plan){
    this._registerOperation((group) => {
      group.planId = plan._id
    });

    return this;
  }

  build (){
    return super.build(fixture())
  }

}

module.exports = GroupBuilder;
