import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image src="/large.png" alt="image" width={1800} height={1000} />
    </div>
  );
}
