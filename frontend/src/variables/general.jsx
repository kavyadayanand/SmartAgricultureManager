// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

var bugs = [
  'CL738465 performance went down by 22% in last week',
  "Sensor SR-M-004 is running on low power.Please change. Node - ND2309006",
  "us-east-2 zone has multiple pending cluster requests. Please check.",
  "Sensor SR-T-002 is down in ND3499711. Please replace."
];
var website = [
  'CL738465 performance went down by 22% in last week',
  "Sensor SR-M-004 is running on low power.Please change. Node - ND2309006",
  "us-east-2 zone has multiple pending cluster requests. Please check.",
  "Sensor SR-T-002 is down in ND3499711. Please replace.",
  "Sensor SR-H-004 is running on low power.Please change. Node - ND236746"
];
var server = [
  'CL738465 performance went down by 22% in last week',
  "Sensor SR-M-004 is running on low power.Please change. Node - ND2309006",
  "us-east-2 zone has multiple pending cluster requests. Please check.",
  "Sensor SR-T-002 is down in ND3499711. Please replace."
];

module.exports = {
  // these 3 are used to create the tasks lists in TasksCard - Dashboard view
  bugs,
  website,
  server
};
