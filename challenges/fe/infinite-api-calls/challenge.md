## Challenge description

The cart page has a serious performance bug. It creates an infinite loop of API calls when the component renders.
If you open the browser's Network tab on the Cart page, you will see it spamming requests to the backend indefinitely.

Your task is to identify why this infinite loop happens and fix it.

## Introduce challenge to working directory
From root
```bash
base64 -d -i challenges/fe/infinite-api-calls/broken.patch.b64 | git apply
```

