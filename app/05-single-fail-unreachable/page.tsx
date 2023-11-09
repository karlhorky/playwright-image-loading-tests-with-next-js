import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image src="https://i/img.jpg" alt="image" width={300} height={300} />
    </div>
  );
}
