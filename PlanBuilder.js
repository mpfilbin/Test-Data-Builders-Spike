'use strict'

import BaseBuilder from './BaseBuilder'
import BackLogItemBuilder from 'backlog-items'
import AssignmentBuilder from 'assignments'
import GroupBuilder from 'GroupBuilder'

import planFixture from './fixtures/plan.fixture'
import _ from 'lodash'

class PlanBuilder extends BaseBuilder {

  constructor (){
    super();
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
