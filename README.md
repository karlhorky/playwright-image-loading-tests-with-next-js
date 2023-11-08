# Playwright Image Loading Tests with Next.js

For official Playwright recommendation for issue [[Question] Wait for image to be loaded #6046 (comment)](https://github.com/microsoft/playwright/issues/6046#issuecomment-1800102438)

Exploration of `img.complete` and `img.naturalWidth` and see what the detection, performance and robustness characteristics look like across multiple test runs, with the following correct scenarios and breakage scenarios:

01) Single image: image loads successfully
02) Single image: image loads successfully (slow - large image on 3G network speed)
03) Single image: image loads unsuccessfully (404)
04) Single image: image loads unsuccessfully (malformed image)
05) Single image: image loads unsuccessfully (host unreachable)
06) Multiple images: all images load successfully
07) Multiple images: all images load successfully (slow - large images on 3G network speed)
08) Multiple images: all images load successfully (lazy loading out of viewport)
09) Multiple images: 1st image loads unsuccessfully (404), rest load successfully
10) Multiple images: all images but last load successfully, last image loads unsuccessfully (404)
11) Multiple images: all images load unsuccessfully (404)
12) Multiple images: all images load unsuccessfully (host unreachable)

## Results
