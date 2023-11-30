const { TaskRouterUtils } = require('@twilio/flex-plugins-library-utils');

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.workerSid the worker sid to fetch channels for
 * @returns {object} worker channel object
 * @description the following method is used to fetch the configured
 *   worker channel
 */
exports.getWorkerChannels = async function getWorkerChannels(parameters) {
  const { context, workerSid } = parameters;
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: 3,
    workerSid,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
    flexWorkSpaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);
  try {
    const workerChannels = await taskRouterClient.getWorkerChannels(config);

    return {
      ...workerChannels,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
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
  const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: 3,
    workerSid,
    workerChannelSid,
    capacity,
    available,
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    region,
    flexWorkSpaceSid: context.TWILIO_FLEX_WORKSPACE_SID,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);
  try {
    const workerChannels = await taskRouterClient.updateWorkerChannel(config);

    return {
      ...workerChannels,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};



