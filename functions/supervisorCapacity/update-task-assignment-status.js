const { prepareFlexFunction } = require(Runtime.getFunctions()['helpers/prepare-function'].path);
const TaskOperations = require(Runtime.getFunctions()['twilio-wrappers/taskrouter'].path);

const requiredParameters = [
  { key: 'taskSid', purpose: 'unique ID of task to update' },
  {
    key: 'assignmentStatus',
    purpose: 'Set task to assignemnt status of: pending, reserved, assigned, canceled, wrapping, or completed',
  },
];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { taskSid, assignmentStatus } = event;
    const result = await TaskOperations.updateTask({
      context,
      taskSid,
      updateParams: { assignmentStatus },
      attempts: 0,
    });

    response.setStatusCode(result.status);
    response.setBody({ result });
    return callback(null, response);
  } catch (error) {
    console.log(error);
    response.setStatusCode(500);
    response.setBody({ data: null, message: error.message });
    return callback(null, response);
  }
});
