import { useEffect, useRef, useState } from 'react';
import { BlockDto } from '../@types/dto/Block';
import { Block } from './Block';

type Props = {
  blocks: BlockDto['result'][];
  openedBlockHash?: string;
  onClickBlock?: (block: BlockDto['result']) => void;
};

export function BlocksList({ blocks, openedBlockHash, onClickBlock }: Props) {
  const [transition, setTransition] = useState(false);
  const blocksListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blocksListRef.current) return;
    blocksListRef.current.style.left = '-212px';
    blocksListRef.current.style.transitionProperty = 'transform';
    blocksListRef.current.style.transitionDuration = '200ms';
    blocksListRef.current.style.transform = 'translateX(212px)';
    setTimeout(() => {
      if (!blocksListRef.current) return;
      blocksListRef.current.style.left = '0';
      blocksListRef.current.style.transitionProperty = 'transform';
      blocksListRef.current.style.transitionDuration = '0ms';
      blocksListRef.current.style.transform = 'translateX(0)';
    }, 200);
  }, [blocks]);

  return (
    <div
      ref={blocksListRef}
      className="my-4 relative flex gap-x-3 w-full max-w-full"
    >
      {blocks.map((block, i) => (
        <Block
          key={block.hash}
          className="shrink-0"
          hash={block.hash}
          number={block.number}
          isActive={block.hash === openedBlockHash}
          timestamp={block.timestamp}
          gas={block.gasUsed}
          transactionsCount={block.transactions?.length}
          onClick={() => onClickBlock?.(block)}
        />
      ))}
    </div>
  );
}
