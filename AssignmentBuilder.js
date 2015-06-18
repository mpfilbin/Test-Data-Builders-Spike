'use strict'
import fixture from './fixtures/assignment.fixture'
import BaseBuilder from 'BaseBuilder'
import _ from 'lodash'

/*
new AssignMentBuilder()
            .addToPlan(plan)
            .assigns(plan.backlogItems[backlogItemIdx])
            .toGroup(plan.groups[groupIdx])
            .build();

            {
    "assignmentId": "557769b344f47b4d50ea3929",
    "percentAssigned": 1,
    "groupId": "556f75b544f4923678eb93a7",
    "almItemId": "dbc9fc20-659d-4e25-9a73-77d7258f9edb"
}
*/

class AssignmentBuilder extends BaseBuilder {

  constructor() {
    super();
  }

  addToPlan(plan) {
    this._registerOperation((assignment) => {
      plan.assignments.push(assignment)
    });
    return this;
  }

  assign(bcklgItmIdx, groupIdx) {

    return this;
  }

  build() {
    return super.build(fixture());
  }

}
