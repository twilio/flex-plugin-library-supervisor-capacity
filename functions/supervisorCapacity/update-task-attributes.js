const { prepareFlexFunction } = require(Runtime.getFunctions()['helpers/prepare-function'].path);
const TaskRouterOperations = require(Runtime.getFunctions()['twilio-wrappers/taskrouter'].path);

const requiredParameters = [
  { key: 'taskSid', purpose: 'unique ID of task to update' },
  {
    key: 'attributesUpdate',
    purpose: 'object to overwrite on existing task attributes',
  },
];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { taskSid, attributesUpdate } = event;
    const result = await TaskRouterOperations.updateTaskAttributes({
      context,
      taskSid,
      attributesUpdate,
      attempts: 0,
    });

    response.setStatusCode(result.status);
    response.setBody({ result });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
