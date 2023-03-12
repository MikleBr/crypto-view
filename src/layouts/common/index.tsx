import React from 'react';

type Props = React.PropsWithChildren & {};

export function CommonLayout({ children }: Props) {
  return (
    <div className="w-full  min-h-screen relative pb-20 bg-[#f8f9fe]">
      <header className="h-20 bg-white flex items-center justify-center">
        <div className="w-full max-w-[1200px]">
          <h2 className="font-bold text-gray-800 text-xl">CryptoView</h2>
        </div>
      </header>
      <div className="w-[calc(100%-20px)] mx-auto max-w-[1200px]">
        {children}
      </div>
      <footer className="absolute w-full bottom-0 left-0 h-20 bg-white flex items-center justify-center ">
        <div className="w-full flex items-center justify-between max-w-[1200px]">
          <h2 className="w-1/3 font-bold text-gray-800 text-xl">CryptoView</h2>
          <p className="w-1/3 text-center">
            Powered by <a href="https://etherscan.io">etherscan.io</a>
          </p>
          <div className="w-1/3" />
        </div>
      </footer>
    </div>
  );
}
