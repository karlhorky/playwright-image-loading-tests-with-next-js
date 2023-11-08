import test from '@playwright/test';

test('single-success', async ({ page }) => {
  await page.goto('/');
});
test('single-success-slow', async ({ page }) => {
  await page.goto('/');
});
test('single-fail-404', async ({ page }) => {
  await page.goto('/');
});
test('single-fail-malformed', async ({ page }) => {
  await page.goto('/');
});
test('single-fail-unreachable', async ({ page }) => {
  await page.goto('/');
});
test('multiple-success', async ({ page }) => {
  await page.goto('/');
});
test('multiple-success-slow', async ({ page }) => {
  await page.goto('/');
});
test('multiple-success-lazy', async ({ page }) => {
  await page.goto('/');
});
test('multiple-1st-fail-rest-success', async ({ page }) => {
  await page.goto('/');
});
test('multiple-last-fail-rest-success', async ({ page }) => {
  await page.goto('/');
});
test('multiple-fail-404', async ({ page }) => {
  await page.goto('/');
});
test('multiple-fail-unreachable', async ({ page }) => {
  await page.goto('/');
});
