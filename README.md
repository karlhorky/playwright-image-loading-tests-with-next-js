# Playwright Image Loading Tests with Next.js

For official Playwright recommendation for issue [[Question] Wait for image to be loaded #6046 (comment)](https://github.com/microsoft/playwright/issues/6046#issuecomment-1800102438)

Exploration of `img.complete` and `img.naturalWidth` and see what the detection, performance and robustness characteristics look like across multiple test runs, with the following correct scenarios and breakage scenarios:

1.  Single image: image loads successfully
2.  Single image: image loads successfully (slow - large image on 3G network speed)
3.  Single image: image loads unsuccessfully (404)
4.  Single image: image loads unsuccessfully (malformed image)
5.  Single image: image loads unsuccessfully (host unreachable)
6.  Multiple images: all images load successfully
7.  Multiple images: all images load successfully (slow - large images on 3G network speed)
8.  Multiple images: all images load successfully (lazy loading out of viewport)
9.  Multiple images: 1st image loads unsuccessfully (404), rest load successfully
10. Multiple images: all images but last load successfully, last image loads unsuccessfully (404)
11. Multiple images: all images load unsuccessfully (404)
12. Multiple images: all images load unsuccessfully (host unreachable)

## Results

### 1. Single image: image loads successfully

```js
<Image src="next.svg" alt="image" width="{300}" height="{300}" />
```

```
c: f nw: 0
c: t nw: 1+
c: t nw: 1+
...
```

Playwright test is successful.

```ts
await page.goto('/01-single-success');
await expect(page.locator('img')).toHaveJSProperty('complete', true);
await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
```

### 2. Single image: image loads successfully (slow - large image on 3G network speed)

```js
<Image src="next.svg" alt="image" width="{300}" height="{300}" />
```

```
c: f nw: 0
c: t nw: 1+
c: t nw: 1+
...
```

Playwright test is successful. For this test the network speed was throttled to 3G.

```ts
const client = await page.context().newCDPSession(page);

await client.send('Network.enable');

await client.send('Network.emulateNetworkConditions', {
  offline: false,
  downloadThroughput: ((500 * 1000) / 8) * 0.8,
  uploadThroughput: ((500 * 1000) / 8) * 0.8,
  latency: 70,
});
await page.goto('/02-single-success-slow');
await expect(page.locator('img')).toHaveJSProperty('complete', true);
await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
```

### 3. Single image: image loads unsuccessfully (404)

```js
<Image src="404.svg" alt="image" width={300} height={300} />
```

```
c: f nw: 0
c: t nw: 0
c: t nw: 0
...
```

The Playwright test below for for `img.naturalWidth` fails, because the is broken (404) but reports `img.complete = true`.

```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

```ts
await page.goto('/03-single-fail-404');
await expect(page.locator('img')).toHaveJSProperty('complete', true);
await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
```

### 4. Single image: image loads unsuccessfully (malformed image)

```js
<Image src="/malformed.svg" alt="image" width={300} height={300} />
```

```
c: f nw: 0
c: t nw: 0
c: t nw: 0
...
```

The Playwright test below for for `img.naturalWidth` fails, because the is broken (malformed) but reports `img.complete = true`.

```
Failed to load resource: the server responded with a status of 400 (Bad Request)
```

```ts
await page.goto('/04-single-fail-malformed');
await expect(page.locator('img')).toHaveJSProperty('complete', true);
await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
```

### 5. Single image: image loads unsuccessfully (host unreachable)

```js
<Image src="/image" alt="image" width={300} height={300} />
```

```
c: f nw: 0
c: t nw: 0
c: t nw: 0
...
```

The Playwright test below for for `img.naturalWidth` fails, because the is broken (host unreachable) but reports `img.complete = true`.

```
Failed to load resource: the server responded with a status of 400 (Bad Request)
```

```ts
await page.goto('/05-single-fail-unreachable');
await expect(page.locator('img')).toHaveJSProperty('complete', true);
await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
```

### 6. Multiple images: all images load successfully

```js
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
  <Image src="next.svg" alt="image" width={200} height={200} />
  <br />
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 1+
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 1+
...
```

Playwright test is successful.

```ts
await page.goto('/06-multiple-success');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```

### 7. Multiple images: all images load successfully (slow - large images on 3G network speed)

```js
  <Image src="/large.png" alt="image" width={1800} height={1000} />
  <br />
  <Image src="/large.png" alt="image" width={1800} height={1000} />
  <br />
  <Image src="/large.png" alt="image" width={1800} height={1000} />
  <br />
  <Image src="/large.png" alt="image" width={1800} height={1000} />
  <br />
  <Image src="/large.png" alt="image" width={1800} height={1000} />
  <br />
  <Image src="/large.png" alt="image" width={1800} height={1000} />
  <br />
  <Image src="/large.png" alt="image" width={1800} height={1000} />
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: t t t f f f f nw: 1+ 1+ 1+ 0 0 0 0
c: t t t t f f f nw: 1+ 1+ 1+ 1+ 0 0 0
c: t t t t t f f nw: 1+ 1+ 1+ 1+ 1+ 0 0
c: t t t t t t f nw: 1+ 1+ 1+ 1+ 1+ 1+ 0
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 1+
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 1+
...
```

Playwright test is successful. For this test the network speed was throttled to 3G.

```ts
const client = await page.context().newCDPSession(page);

await client.send('Network.enable');

await client.send('Network.emulateNetworkConditions', {
  offline: false,
  downloadThroughput: ((500 * 1000) / 8) * 0.8,
  uploadThroughput: ((500 * 1000) / 8) * 0.8,
  latency: 70,
});
await page.goto('/07-multiple-success-slow');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```

### 8. Multiple images: all images load successfully (lazy loading out of viewport)

```js
...
  <Image
    src="next.svg"
    alt="image"
    width={200}
    height={200}
    loading="lazy"
  />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <Image
    src="next.svg"
    alt="image"
    width={200}
    height={200}
    loading="lazy"
  />
...
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 1+
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 1+
...
```

Playwright test is successful.

```ts
await page.goto('/08-multiple-success-lazy');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```

### 9. Multiple images: 1st image loads unsuccessfully (404), rest load successfully

```js
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: f t t t t t t nw: 0 1+ 1+ 1+ 1+ 1+ 1+
c: t t t t t t t nw: 0 1+ 1+ 1+ 1+ 1+ 1+
c: t t t t t t t nw: 0 1+ 1+ 1+ 1+ 1+ 1+
...
```

The Playwright test below for `img.loaded` fails, because the first image is broken (404) but reports `img.complete = 'true'`

```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

```ts
await page.goto('/09-multiple-1st-fail-rest-success');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```

### 10. Multiple images: all images but last load successfully, last image loads unsuccessfully (404)

```js
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="next.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: t t t t t t f nw: 1+ 1+ 1+ 1+ 1+ 1+ 0
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 0
c: t t t t t t t nw: 1+ 1+ 1+ 1+ 1+ 1+ 0
...
```

The Playwright test below for `img.loaded` fails, because the last image is broken (404) but reports `img.complete = 'true'`

```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

```ts
await page.goto('/10-multiple-last-fail-rest-success');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```

### 11. Multiple images: all images load unsuccessfully (404)

```js
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
  <br />
  <Image src="404.svg" alt="image" width={300} height={300} />
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: t t t t t t t nw: 0 0 0 0 0 0 0
c: t t t t t t t nw: 0 0 0 0 0 0 0
...
```

The Playwright test below for `img.loaded` fails, because all images are broken (404) but reports `img.complete = 'true'`

```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

```ts
await page.goto('/11-multiple-fail-404');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```

### 12. Multiple images: all images load unsuccessfully (host unreachable)

```js
<div>
  <Image src="/image" alt="image" width={300} height={300} />
  <br />
  <Image src="/image" alt="image" width={300} height={300} />
  <br />
  <Image src="/image" alt="image" width={300} height={300} />
  <br />
  <Image src="/image" alt="image" width={300} height={300} />
  <br />
  <Image src="/image" alt="image" width={300} height={300} />
  <br />
  <Image src="/image" alt="image" width={300} height={300} />
  <br />
  <Image src="/image" alt="image" width={300} height={300} />
</div>
```

```
c: f f f f f f f nw: 0 0 0 0 0 0 0
c: t t t t t t t nw: 0 0 0 0 0 0 0
c: t t t t t t t nw: 0 0 0 0 0 0 0
...
```

The Playwright test below for `img.loaded` fails, because all images are broken (host unreachable) but reports `img.complete = 'true'`

```
Failed to load resource: the server responded with a status of 400 (Bad Request)
```

```ts
await page.goto('/12-multiple-fail-unreachable');
for (const img of await page.getByRole('img').all()) {
  await expect(img).toHaveJSProperty('complete', true);
  await expect(img).not.toHaveJSProperty('naturalWidth', 0);
}
```
