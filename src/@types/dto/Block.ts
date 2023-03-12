export type TransactionDto = {
  from: string;
  hash: string;
  to: string;
  value: string;
};

export type BlockDto = {
  jsonrpc: string;
  id: number;
  result: {
    hash: string;
    number: string;
    parentHash: string;
    timestamp: string;
    transactions: TransactionDto[];
    gasUsed: string;
    size: string;
  };
};
