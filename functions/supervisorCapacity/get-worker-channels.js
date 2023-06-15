const { prepareFlexFunction } = require(Runtime.getFunctions()['helpers/prepare-function'].path);
const TaskRouterOperations = require(Runtime.getFunctions()['twilio-wrappers/taskrouter'].path);

const requiredParameters = [{ key: 'workerSid', purpose: 'unique ID of the worker' }];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const { workerSid } = event;
    const result = await TaskRouterOperations.getWorkerChannels({
      context,
      workerSid,
      attempts: 0,
    });
    const { success, status, workerChannels } = result;
    response.setStatusCode(status);
    response.setBody({ success:success, workerChannels:workerChannels });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});
