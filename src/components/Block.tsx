import { cutHash } from '../utils/cutHash';

import EtheriumLogo from './../assets/etherium-logo.png';

type Props = {
  hash: string;
  number: string;
  style?: React.CSSProperties;
  className?: string;
  parentHash?: string;
  timestamp?: string;
  transactionsCount?: number;
  gas?: string;
  isActive?: boolean;
  onClick?: () => void;
};

export function Block({
  hash,
  number,
  className,
  timestamp,
  transactionsCount,
  gas,
  isActive = false,
  onClick,
}: Props) {
  const creationDate =
    timestamp &&
    new Date(+parseInt(timestamp, 16) * 1000).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${
        isActive ? 'border-[#6f7dfe]' : 'border-white'
      } text-left border-[1px] border-solid transition-all p-2 w-[200px] items-start h-[300px] overflow-hidden rounded-lg bg-white flex flex-col justify-between`}
    >
      <div>
        <p className="font-medium flex items-center text-lg mb-2">
          <img className="w-5 mr-2" src={EtheriumLogo} alt="ethereum" />{' '}
          {parseInt(number, 16)}
        </p>
        <p className="text-base">{cutHash(hash, 12, 7)}</p>
        <p className="text-base text-[#6f7dfe]">
          Transactions: {transactionsCount}
        </p>
      </div>
      <div>
        {gas && <p className="text-sm mb-1">gas: {parseInt(gas, 16)}</p>}
        <p className="text-sm text-[#b4b5c7]">{creationDate}</p>
      </div>
    </button>
  );
}
