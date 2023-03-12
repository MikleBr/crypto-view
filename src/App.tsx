import { useEffect, useRef, useState } from 'react';
import { BlockDto, TransactionDto } from './@types/dto/Block';
import { BlockData } from './@types/dto/BlockData';

import { etherscanApi } from './api/etherscan';
import { BlocksList } from './components/BlocksList';
import { TransactionPreview } from './components/TransactionPreview';
import { TransactionsList } from './components/TransactionsList';
import { CommonLayout } from './layouts/common';

function App() {
  const lastBlock = useRef<BlockData | null>(null);
  const [blocks, setBlocks] = useState<BlockDto['result'][]>([]);
  const [openedBlock, setOpenedBlock] = useState<BlockDto['result'] | null>(
    null
  );
  const [openedTransaction, setOpenedTransaction] =
    useState<TransactionDto | null>(null);

  useEffect(() => {
    const requestLastBlock = async () => {
      const lastBlockData = await etherscanApi.getLastBlock();
      if (lastBlockData.status) return;
      if (lastBlock.current?.result === lastBlockData.result) return;
      lastBlock.current = lastBlockData;
      const block = await etherscanApi.getBlockByNumber(
        lastBlock.current.result
      );
      setBlocks(prev => [block.result, ...prev]);
    };
    setInterval(() => {
      requestLastBlock();
    }, 3000);
  }, []);

  const handleOpenBlock = (block: BlockDto['result']) => {
    setOpenedBlock(block);
    setOpenedTransaction(null);
  };

  const handleOpenTransaction = (hash: string) => {
    const transaction = openedBlock?.transactions.find(
      transaction => transaction.hash === hash
    );
    if (!transaction) return setOpenedTransaction(null);
    return setOpenedTransaction(transaction);
  };

  return (
    <CommonLayout>
      {!lastBlock.current && (
        <p className="mt-5 text-xl font-medium">Загрузка первого блока...</p>
      )}
      <div className="w-full overflow-hidden">
        <BlocksList
          blocks={blocks}
          openedBlockHash={openedBlock?.hash}
          onClickBlock={handleOpenBlock}
        />
      </div>
      <div className="w-full grid grid-cols-5 gap-3">
        {openedBlock && (
          <TransactionsList
            blockNumber={openedBlock.number}
            className="col-span-3"
            openedTransactionHash={openedTransaction?.hash}
            transactions={openedBlock.transactions}
            onClickTransaction={handleOpenTransaction}
          />
        )}
        {openedTransaction && (
          <TransactionPreview
            className="col-span-2"
            from={openedTransaction.from}
            to={openedTransaction.to}
            value={openedTransaction.value}
            hash={openedTransaction.hash}
          />
        )}
      </div>
    </CommonLayout>
  );
}

export default App;
