'use strict'

import BaseBuilder from './BaseBuilder'
import BackLogItemBuilder from 'BacklogItemBuilder'
import AssignmentBuilder from 'AssignmentBuilder'
import GroupBuilder from 'GroupBuilder'

import fixture from './fixtures/plan.fixture'
import _ from 'lodash'
import random from './utils/random'


/*
{
  "isPublished": false,
  "_id": "556f756c44f404696c96be18",
  "assignments": [],
  "formattedId": "PN108",
  "itemPlanningLevel": "402c5194-9e3f-44ac-95b8-8d8da2826f85",
  "backlogItems": [],
  "createdBy": {
    "timeStamp": 1433367916969,
    "userEmail": "someone@rallydev.com",
    "userId": "fb6dd27e41404258a08347672e7d5a5c"
  },
  "planName": "Selecting Items Plan",
  "lastUpdate": {
    "timeStamp": 1434126295432,
    "userEmail": "someone-else@rallydev.com",
    "userId": "bfed68589fbf471c85c685cbc05e91e3"
  },
  "publishedBy": {
    "timeStamp": 1434060771821,
    "userEmail": "someone-else@rallydev.com",
    "userId": "bfed68589fbf471c85c685cbc05e91e3"
  },
  "planByDeliveryGroup": null,
  "endRelease": "bf20eb7e-b1dc-4f96-9d31-be8704d00b68",
  "cutlinePosition": null,
  "projectScopeId": "5423e7d7-1bee-4dd1-be2e-b82405e38f68",
  "workspaceRef": "/workspace/41529001",
  "workItems": [],
  "groups": [],
  "startRelease": "67c64388-a393-40cf-8baa-a3abcebfc362"
}
*/

const transforms = {
  _id: (plan) => {
    return plan._id = random.uuid('v1');
  },
  endRelease: (plan) => {
    return plan.endRelease = random.uuid('v1');
  },
  startRelease: (plan) => {
    return plan.startRelease = random.uuid('v1');
  },
  itemPlanningLevel: (plan) => {
    return plan.itemPlanningLevel = random.uuid('v1');
  },
  planName: (plan) => {
    return plan.planName = `Plan - $(plan.planId)`;
  },
  formattedId: (plan) => {
    return plan.formattedId = random.integer(100, 1)
  }
};

class PlanBuilder extends BaseBuilder {

  constructor (customTransForms){
    super(customTransForms || transforms);
  }

  addGroups (n){
    this._registerOperation((plan) => {

      _.times(n =>{
        new GroupBuilder().addToPlan(plan).build();
      })

      return plan;
    });

    return this;
  }

  addBacklogItemsWithType(n, type){
    this._registerOperation((plan) => {

      _.times(n => {
        new BackLogItemBuilder(type).addToPlan(plan).build();
      });

      return plan;
    });

    return this;
  }

  assignGroupToBacklogItem(backlogItemIdx, groupIdx){
    this._registerOperation((plan) =>{

      if (plan.backlogItems.length && plan.groups.length){

        new AssignMentBuilder()
            .addToPlan(plan)
            .assigns(plan.backlogItems[backlogItemIdx])
            .toGroup(plan.groups[groupIdx])
            .build();

      } else {
        throw new Error("You must create plans and backlog items before they may be assigned.");
      }

      return plan;
    });

    return this;
  }

  build(){
    return super.build(planFixture());
  }

}

module.exports = PlanBuilder;
