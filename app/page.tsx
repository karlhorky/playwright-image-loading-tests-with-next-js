import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/single-success">Single image: image loads successfully</Link>
      <br />
      <Link href="/single-success-slow">
        Single image: image loads successfully (slow - large image on 3G network
        speed)
      </Link>
      <br />
      <Link href="/single-fail-404">
        Single image: image loads unsuccessfully (404)
      </Link>
      <br />
      <Link href="/single-fail-malformed">
        Single image: image loads unsuccessfully (malformed image)
      </Link>
      <br />
      <Link href="/single-fail-unreachable">
        Single image: image loads unsuccessfully (host unreachable)
      </Link>
      <br />
      <Link href="/multiple-success">
        Multiple images: all images load successfully
      </Link>
      <br />
      <Link href="/multiple-success-slow">
        Multiple images: all images load successfully (slow - large images on 3G
        network speed)
      </Link>
      <br />
      <Link href="/multiple-success-lazy">
        Multiple images: all images load successfully (lazy loading out of
        viewport)
      </Link>
      <br />
      <Link href="/multiple-1st-fail-rest-success">
        Multiple images: 1st image loads unsuccessfully (404), rest load
        successfully
      </Link>
      <br />
      <Link href="/multiple-last-fail-rest-success">
        Multiple images: all images but last load successfully, last image loads
        unsuccessfully (404)
      </Link>
      <br />
      <Link href="/multiple-fail-404">
        Multiple images: all images load unsuccessfully (404)
      </Link>
      <br />
      <Link href="/multiple-fail-unreachable">
        Multiple images: all images load unsuccessfully (host unreachable)
      </Link>
      <br />
    </div>
  );
}
