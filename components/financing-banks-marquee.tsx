'use client';

import React from 'react';

const banks = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'Yes Bank',
  'IDFC First Bank',
  'Bajaj Finserv',
  'Tata Capital'
];

export function FinancingBanksMarquee() {
  return (
    <div className="bg-muted/50 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-sm font-medium text-center text-muted-foreground mb-3">Financing Partners</h3>
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {banks.map((bank, index) => (
              <div key={index} className="mx-6 text-nowrap text-sm font-medium text-foreground/80">
                {bank}
              </div>
            ))}
          </div>
          <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap">
            {banks.map((bank, index) => (
              <div key={index} className="mx-6 text-nowrap text-sm font-medium text-foreground/80">
                {bank}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
