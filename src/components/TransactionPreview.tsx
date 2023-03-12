import { cutHash } from '../utils/cutHash';

type Props = {
  from: string;
  to: string;
  value: string;
  hash: string;
  className?: string;
};

export function TransactionPreview({
  from,
  to,
  value,
  hash,
  className = '',
}: Props) {
  return (
    <div
      className={`${className} p-2 rounded-lg bg-white flex flex-col w-full  overflow-hidden`}
    >
      <div className="sticky shadow-md top-0 left-0 p-4 bg-white w-full flex items-center text-lg font-bold">
        Транзакция {cutHash(hash)}
      </div>
      <p className="text-base">
        <span className="opacity-75 font-medium">from:</span> {from}
      </p>
      <p className="text-base">
        <span className="opacity-75 font-medium">to:</span> {to}
      </p>
      {value && <p className="text-base">value: {parseInt(value, 16)}</p>}
    </div>
  );
}
