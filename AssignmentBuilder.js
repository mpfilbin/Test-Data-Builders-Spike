'use strict'
import fixture from './fixtures/assignment.fixture'
import BaseBuilder from 'BaseBuilder'

import random from './utils/random'
import _ from 'lodash'

/*
    "assignmentId": "557769b344f47b4d50ea3929",
    "percentAssigned": 1,
    "groupId": "556f75b544f4923678eb93a7",
    "almItemId": "dbc9fc20-659d-4e25-9a73-77d7258f9edb"
}
*/

const transformations = {
  almItemId: (assignment) => {
    return assignment.almItemId = random.uuid('v1');
  },
  percentAssigned: (assignment) => {
    return assigment.percentAssigned = random.float(1, 0);
  }
};

class AssignmentBuilder extends BaseBuilder {

  constructor(customTransforms) {
    super(customTransforms || transformations);
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
