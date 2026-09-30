# IDUN-NU AGBE Agro Chemicals & Co Website

Free static website for IDUN-NU AGBE Agro Chemicals & Co.

## Files

- `index.html` — website structure/content
- `style.css` — design and responsive layout
- `script.js` — product catalogue, search, filters and WhatsApp ordering
- `assets/logo.png` — company logo

## How to edit prices

Open `script.js` and find the `products` list near the top.

A product with a price looks like:

```js
{name:"Cutlass", category:"Equipment & Spares", price:5100, note:"Farm tool"},
```

Change `price:5100` to the current price. Use numbers only — no ₦ sign.

Products with `price:null` show "Contact for price".

## How to add a product

Add a line inside the `products` array:

```js
{name:"New Product", category:"Fertilizers", price:5000, note:"Short description"},
```

Available categories:

- Fast-acting Herbicides
- Slow-acting Herbicides
- Fertilizers
- Pesticides & Insecticides
- Seeds
- Equipment & Spares
- Other Agro Inputs

## WhatsApp

The website currently sends orders to:

`07035593362`

In international format this is:

`2347035593362`

If the business changes its WhatsApp number, search `2347035593362` in `script.js` and `index.html` and replace it.

## Deploy with GitHub Pages — free

1. Create a free GitHub account at https://github.com/
2. Create a new public repository, e.g. `idun-nu-agbe`
3. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose the `main` branch and `/ (root)`.
7. Save.
8. GitHub will give you a free `github.io` website address.

No hosting payment is required.

## Important price check before launch

The initial catalogue contains the prices supplied for this first version. Before publishing, confirm:
- whether `NPK 20:20 Golden — ₦48,000` is correct and what package/weight it represents;
- whether `NPK 15:15 Golden — ₦5,500` and the other fertilizer prices are for specific bag sizes;
- the correct spelling/branding of every product;
- prices for products currently showing "Contact for price".

Do not rely on the website as a chemical-use instruction manual. Product labels and applicable agricultural/regulatory guidance should govern usage and safety.
