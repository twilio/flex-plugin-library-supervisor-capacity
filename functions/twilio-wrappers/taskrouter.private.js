const { merge, isString, isObject, isNumber, isBoolean, omitBy, isNil } = require('lodash');
const axios = require('axios');

const retryHandler = require(Runtime.getFunctions()['twilio-wrappers/retry-handler'].path).retryHandler;

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.workerSid the worker sid to fetch channels for
 * @returns {object} worker channel object
 * @description the following method is used to fetch the configured
 *   worker channel
 */
exports.getWorkerChannels = async function updateWorkerChannel(parameters) {
  const { context, workerSid } = parameters;

  if (!isObject(context)) throw new Error('Invalid parameters object passed. Parameters must contain context object');
  if (!isString(workerSid))
    throw new Error('Invalid parameters object passed. Parameters must contain workerSid string');

  try {
    const client = context.getTwilioClient();
    const workerChannels = await client.taskrouter.v1
      .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
      .workers(workerSid)
      .workerChannels.list();

    return {
      success: true,
      status: 200,
      workerChannels,
    };
  } catch (error) {
    return retryHandler(error, parameters, exports.getWorkerChannels);
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @returns {object} worker channel capacity object
 * @description the following method is used to robustly update
 *   worker channel capacity
 */
exports.updateWorkerChannel = async function updateWorkerChannel(parameters) {
  const { context, workerSid, workerChannelSid, capacity, available } = parameters;

  if (!isObject(context)) throw new Error('Invalid parameters object passed. Parameters must contain context object');
  if (!isString(workerSid))
    throw new Error('Invalid parameters object passed. Parameters must contain workerSid string');
  if (!isString(workerChannelSid))
    throw new Error('Invalid parameters object passed. Parameters must contain workerChannelSid string');
  if (!isNumber(capacity)) throw new Error('Invalid parameters object passed. Parameters must contain capacity number');
  if (!isBoolean(available))
    throw new Error('Invalid parameters object passed. Parameters must contain available boolean');

  try {
    const client = context.getTwilioClient();
    const workerChannelCapacity = await client.taskrouter.v1
      .workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
      .workers(workerSid)
      .workerChannels(workerChannelSid)
      .update({ capacity, available });

    return {
      success: true,
      status: 200,
      workerChannelCapacity,
    };
  } catch (error) {
    return retryHandler(error, parameters, exports.updateWorkerChannel);
  }
};



