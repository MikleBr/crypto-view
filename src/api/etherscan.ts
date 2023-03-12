import { BlockDto } from '../@types/dto/Block';
import { BlockData } from '../@types/dto/BlockData';

class EtherscanApi {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async getLastBlock(): Promise<BlockData> {
    const data = await fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${this.token}`
    ).then(res => res.json());
    return data;
  }

  async getBlockByNumber(hexNumber: string): Promise<BlockDto> {
    const data = await fetch(
      `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${hexNumber}&boolean=true&apikey=${this.token}`
    ).then(res => res.json());
    return data;
  }

  async getBlockByTimestamp({
    timestamp,
    closest = 'before',
  }: {
    timestamp: string;
    closest?: 'before' | 'after';
  }): Promise<BlockData> {
    const data = await fetch(
      `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=${closest}&apikey=${this.token}`
    ).then(res => res.json());
    return data;
  }

  async getLastBlocks(blocksCount = 5): Promise<BlockDto[]> {
    const lastBlockData = await this.getLastBlock();

    if (lastBlockData.status === 0)
      throw new Error('Ошибка получения последнего блока');

    const blocks = [];
    const lastBock = await this.getBlockByNumber(lastBlockData.result);
    blocks.push(lastBock);
    let timestamp = lastBock.result.timestamp;
    for (let i = 1; i <= blocksCount - 1; i++) {
      const parsedTimestamp = String(parseInt(timestamp, 16));

      const prevBlockData = await etherscanApi.getBlockByTimestamp({
        timestamp: parsedTimestamp,
      });
      const prevBlock = await etherscanApi.getBlockByNumber(
        prevBlockData.result
      );
      blocks.push(prevBlock);
      timestamp = prevBlock.result.timestamp;
    }

    return blocks;
  }
}

export const etherscanApi = new EtherscanApi(
  process.env.REACT_APP_API_KEY || ''
);
