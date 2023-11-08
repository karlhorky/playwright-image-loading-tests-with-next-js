'use client';

import { useEffect } from 'react';

export default function Logger() {
  // Log the following every 10 milliseconds
  // "c: t t f t  nW: 1+ 1+ 0 +1"
  // where `c` is img.complete and `nW` is img.naturalWidth
  // for each image queried on the page
  //
  // Stop logging after 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line no-restricted-syntax
      const images = document.querySelectorAll('img');
      const { complete, naturalWidth } = Array.from(images).reduce(
        (acc, img) => {
          acc.complete.push(img.complete ? 't' : 'f');
          acc.naturalWidth.push(img.naturalWidth > 0 ? '1+' : '0');
          return acc;
        },
        { complete: [] as ('t' | 'f')[], naturalWidth: [] as ('1+' | '0')[] },
      );
      console.log(`c: ${complete.join(' ')}  nW: ${naturalWidth.join(' ')}`);
    }, 10);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  });

  return null;
}
