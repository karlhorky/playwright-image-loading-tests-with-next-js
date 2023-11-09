import test, { expect } from '@playwright/test';

test('single-success', async ({ page }) => {
  await page.goto('/01-single-success');
  await expect(page.locator('img')).toHaveJSProperty('complete', true);
  await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
});

test('single-success-slow', async ({ page }) => {
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
});

test('single-fail-404', async ({ page }) => {
  await page.goto('/03-single-fail-404');
  await expect(page.locator('img')).toHaveJSProperty('complete', true);
  await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
});

test('single-fail-malformed', async ({ page }) => {
  await page.goto('/04-single-fail-malformed');
  await expect(page.locator('img')).toHaveJSProperty('complete', true);
  await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
});

test('single-fail-unreachable', async ({ page }) => {
  await page.goto('/05-single-fail-unreachable');
  await expect(page.locator('img')).toHaveJSProperty('complete', true);
  await expect(page.locator('img')).not.toHaveJSProperty('naturalWidth', 0);
});

test('multiple-success', async ({ page }) => {
  await page.goto('/06-multiple-success');
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
});

test('multiple-success-slow', async ({ page }) => {
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
});

test('multiple-success-lazy', async ({ page }) => {
  await page.goto('/08-multiple-success-lazy');
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
});

test('multiple-1st-fail-rest-success', async ({ page }) => {
  await page.goto('/09-multiple-1st-fail-rest-success');
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
});

test('multiple-last-fail-rest-success', async ({ page }) => {
  await page.goto('/10-multiple-last-fail-rest-success');
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
});

test('multiple-fail-404', async ({ page }) => {
  await page.goto('/11-multiple-fail-404');
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
});

test('multiple-fail-unreachable', async ({ page }) => {
  await page.goto('/12-multiple-fail-unreachable');
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
});
