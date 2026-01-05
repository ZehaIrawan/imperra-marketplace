## Challenge description

Favorite product is not working properly on sort. For example if I favorite 1st product and then sort, it will still favorite the first product. Correct behavior is a product will stay favorited even after sort.

## Demo

https://github.com/user-attachments/assets/22699238-78f2-47e5-ad24-ef4a35f7c8bb


From root
```bash
base64 -d -i challenges/fe/favorite-product-bug/broken.patch.b64 | git apply
```



