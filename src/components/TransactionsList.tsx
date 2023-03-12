type Transaction = {
  from: string;
  hash: string;
  to: string;
  value: string;
};

type Props = {
  blockNumber?: string;
  className?: string;
  openedTransactionHash?: string;
  transactions: Transaction[];
  onClickTransaction?: (hash: string) => void;
};

export function TransactionsList({
  blockNumber,
  transactions,
  openedTransactionHash,
  onClickTransaction,
  className = '',
}: Props) {
  return (
    <div
      className={`${className} relative max-h-[400px] pb-2 overflow-y-scroll rounded-lg bg-white flex flex-col `}
    >
      <div className="sticky tr shadow-md scrollbar-hide top-0 left-0 p-4 bg-white w-full flex items-center text-lg font-bold">
        Список транзакций {blockNumber && `блока ${parseInt(blockNumber, 16)}`}
      </div>
      {transactions.map(transaction => (
        <p
          key={transaction.hash}
          className={`${
            transaction.hash === openedTransactionHash
              ? 'bg-[#6f7dfe] text-white'
              : 'hover:bg-[#6f7dfe]/50'
          } px-4 py-2 transition-all rounded-sm cursor-pointer `}
          onClick={() => onClickTransaction?.(transaction.hash)}
        >
          {transaction.hash}
        </p>
      ))}
    </div>
  );
}
