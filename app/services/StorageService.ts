import { Bee } from '@ethersphere/bee-js';

import { config } from '../constants/config';

export type TSwarmUploadFilePayload = {
    file: File | string;
    fileName: string;
}

const defaultPostageStampId = '0000000000000000000000000000000000000000000000000000000000000000';

// TODO: add restriction to the file size and to how many times the user can upload a file
export class StorageService {
  private static bee: Bee = new Bee(config.externalSorageUrls.publicSwarmNode);

  static swarmUploadFile = async (
    payload: TSwarmUploadFilePayload,
  ): Promise<{
    reference: string;
    swarmUrl: string;
    swarmTag: number;
  }> => {
    // const encodedData = new TextEncoder().encode(data);
    // const contentType = 'text/html';
    // const contentType = 'image/svg+xml';
    const { file, fileName } = payload;
    const response = await this.bee.uploadFile(defaultPostageStampId, file, fileName);
    console.log('response ', response);

    return {
      reference: response.reference,
      swarmUrl: `${config.externalSorageUrls.publicSwarmNode}/bzz/${response.reference}`,
      swarmTag: response.tagUid,
    };
  };

  static swarmUploadData = async (
    data: string,
  ): Promise<{
    reference: string;
    swarmUrl: string;
    swarmTag: number;
  }> => {
    const response = await this.bee.uploadData(defaultPostageStampId, data);
    
    return {
      reference: response.reference,
      swarmUrl: `${config.externalSorageUrls.publicSwarmNode}/bzz/${response.reference}`,
      swarmTag: response.tagUid,
    };
  };
}
