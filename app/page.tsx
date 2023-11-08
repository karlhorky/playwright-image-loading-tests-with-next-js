import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/01-single-success">
        Single image: image loads successfully
      </Link>
      <br />
      <Link href="/02-single-success-slow">
        Single image: image loads successfully (slow - large image on 3G network
        speed)
      </Link>
      <br />
      <Link href="/03-single-fail-404">
        Single image: image loads unsuccessfully (404)
      </Link>
      <br />
      <Link href="/04-single-fail-malformed">
        Single image: image loads unsuccessfully (malformed image)
      </Link>
      <br />
      <Link href="/05-single-fail-unreachable">
        Single image: image loads unsuccessfully (host unreachable)
      </Link>
      <br />
      <Link href="/06-multiple-success">
        Multiple images: all images load successfully
      </Link>
      <br />
      <Link href="/07-multiple-success-slow">
        Multiple images: all images load successfully (slow - large images on 3G
        network speed)
      </Link>
      <br />
      <Link href="/08-multiple-success-lazy">
        Multiple images: all images load successfully (lazy loading out of
        viewport)
      </Link>
      <br />
      <Link href="/09-multiple-1st-fail-rest-success">
        Multiple images: 1st image loads unsuccessfully (404), rest load
        successfully
      </Link>
      <br />
      <Link href="/10-multiple-last-fail-rest-success">
        Multiple images: all images but last load successfully, last image loads
        unsuccessfully (404)
      </Link>
      <br />
      <Link href="/11-multiple-fail-404">
        Multiple images: all images load unsuccessfully (404)
      </Link>
      <br />
      <Link href="/12-multiple-fail-unreachable">
        Multiple images: all images load unsuccessfully (host unreachable)
      </Link>
      <br />
    </div>
  );
}
