import ApiService from './ApiService';
import { EncodedParams } from '../types/Params';


interface GetWorkerChannelsResponse {
  success: boolean;
  workerChannels: Array<WorkerChannelCapacityResponse>;
}

export interface WorkerChannelCapacityResponse {
  accountSid: string;
  assignedTasks: number;
  available: boolean;
  availableCapacityPercentage: number;
  configuredCapacity: number;
  dateCreated: string;
  dateUpdated: string;
  sid: string;
  taskChannelSid: string;
  taskChannelUniqueName: string;
  workerSid: string;
  workspaceSid: string;
  url: string;
}
interface UpdateWorkerChannelResponse {
  success: boolean;
  message?: string;
  workerChannelCapacity: WorkerChannelCapacityResponse;
}


class TaskRouterService extends ApiService {
  private instanceSid = this.manager.serviceConfiguration.flex_service_instance_sid;


  async getWorkerChannels(workerSid: string): Promise<Array<WorkerChannelCapacityResponse>> {
    const response = await this.getWorkerChannel(workerSid);
    if (response && response.workerChannels){
      return response.workerChannels;
    } 
    return [];
  }

  async updateWorkerChannel(
    workerSid: string,
    workerChannelSid: string,
    capacity: number,
    available: boolean,
  ): Promise<boolean> {
    const result = await this.updateWorkerChannels(workerSid, workerChannelSid, capacity, available);

    return result.success;
  }

  getWorkerChannel = async (workerSid: string): Promise<GetWorkerChannelsResponse> => {
    const encodedParams: EncodedParams = {
      workerSid: encodeURIComponent(workerSid),
      Token: encodeURIComponent(this.manager.user.token),
    };

    return this.fetchJsonWithReject<GetWorkerChannelsResponse>(
      `https://${this.serverlessDomain}/supervisorCapacity/get-worker-channels`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    ).then((response): GetWorkerChannelsResponse => {
      console.log(`Response: ${JSON.stringify(response.success)}`);
      return response;
    });
  };

  updateWorkerChannels = async (
    workerSid: string,
    workerChannelSid: string,
    capacity: number,
    available: boolean,
  ): Promise<UpdateWorkerChannelResponse> => {
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(this.manager.user.token),
      workerSid: encodeURIComponent(workerSid),
      workerChannelSid: encodeURIComponent(workerChannelSid),
      capacity: encodeURIComponent(capacity),
      available: encodeURIComponent(available),
    };

    return this.fetchJsonWithReject<UpdateWorkerChannelResponse>(
      `https://${this.serverlessDomain}/supervisorCapacity/update-worker-channel`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    ).then((response): UpdateWorkerChannelResponse => {
      return response;
    });
  };
}

export default new TaskRouterService();
