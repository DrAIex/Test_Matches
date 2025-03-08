import localFont from 'next/font/local';

export const tacticSans = localFont({
  src: [
    {
      path: '../public/fonts/TacticSans-Bld.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-tactic-sans'
}); 