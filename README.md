# Image Jam - A Cloudflare Images Tutorial Website

This is the source code of a Cloudflare Pages website used by this [Cloudflare Images tutorial](https://developers.cloudflare.com/images/cloudflare-images/tutorials/cloudflare-images-on-pages).

See the Cloudflare Pages website running at <https://imagejam.net>.

## Tutorial Steps

This website illustrates several steps in the progression of the tutorial.

👉 The only difference in every step: **the URLs to the website images** 👈

Step 1 serves unoptimized images on their original URLs (not using Cloudflare Images),  
Step 2 and 3 serves Cloudflare Images on their Cloudflare Images URLs, and  
Step 4 serves Cloudflare Images on their original URLs, **demonstrating that a full integration can be done without changing anything on the website.**

### Step 1: no Cloudflare Images 🙈

Live at <https://imagejam.net/step-1/>

Presents a website serving unoptimized images (without using Cloudflare Images).

👉 We use this as a basis for the integration of Cloudflare Images in the following step.

Image URLs look like: https://imagejam.net/images/public/cakes/aliet-kitchen-qrDbj7OV2EU-unsplash-ツ.jpg?use_cf_images=0

### Step 2: Cloudflare Images width default delivery domain

Live at <https://imagejam.net/step-2/>

Presents a website serving images from Cloudflare Images, on the default delivery domain https://imagedelivery.net

👉 This step and the following suppose that the images used by the website have been imported on Cloudflare Images; see [migration](#migrating-the-website-images-to-cloudflare-images) about this

Image URLs look like: https://imagedelivery.net/-oMiRxTrr3JCvTMIzx4GvA/cakes/aliet-kitchen-qrDbj7OV2EU-unsplash-ツ.jpg/public

### Step 3: Cloudflare Images with custom delivery domain

Live at <https://imagejam.net/step-3/>

Presents a website serving images from Cloudflare Images on a custom delivery domain.

👉 Demonstrates how one can serve Cloudflare Images on their own donmain with zero setup.

Image URLs look like: https://imagejam.net/cdn-cgi/imagedelivery/-oMiRxTrr3JCvTMIzx4GvA/cakes/aliet-kitchen-qrDbj7OV2EU-unsplash-ツ.jpg/public

### Step 4: Cloudflare Images on existing Images URL

Live at <https://imagejam.net/step-3/>

Presents a website serving images from Cloudflare Images, keeping the Images on their unchanged existing URL.

👉 Demonstrates how low profile the integration of Cloudflare Images can be in your system, requiring zero change in the HTML of your existing website and in the URLs of your existing images.

👉 This is achieved by a simple Cloudflare Worker that relays image trafic to Cloudflare Images. See the source code for this worker in [`/images-worker`](https://github.com/netgusto/imagejam.net/tree/production/images-worker/index.js) on this repo.

Image URLs look like: https://imagejam.net/images/public/cakes/aliet-kitchen-qrDbj7OV2EU-unsplash-ツ.jpg

Note: in Step 1 we added `?use_cf_images=0` to the image URLs for illustrative purposes of the tutorial only, as we need the worker to be able to deliver both original images for step 1, and Cloudflare Images for step 4. In a real setup, the worker would serve all traffic on Cloudflare Images, so this query parameter would not be required.

## Migrating the website Images to Cloudflare Images

For steps 2 and following, we suppose the website Images have been imported in Cloudflare Images.

This migration was achieved using a bulk upload script shipped in this repository; see the code of this script here: [`/scripts/migrate/bulkupload.js`](https://github.com/netgusto/imagejam.net/blob/production/scripts/migrate/bulkupload.js). 

At its core, the script iterates through all original images of the website, and uploads them to Cloudflare Images using [thi Image upload API endpoint](https://developers.cloudflare.com/images/cloudflare-images/upload-images/upload-via-url/), keeping their original path and filename.

To upload all the website images to Cloudflare images:

```
npm install

# Find the value for CF_IMAGES_ACCOUNT_ID in the Cloudflare Dashboard, section Images, under `Account ID`
export CF_IMAGES_ACCOUNT_ID=...

# A Cloudflare API token valid for the account, with Read and Update permissions on Cloudflare Images
# See https://developers.cloudflare.com/api/tokens/create/
export CF_IMAGES_API_KEY=...

npm run migrate:bulkupload
```

Once done, the website original images have been imported on Cloudflare Images.

## Generate the website and browse it locally

Requirements:

* [NodeJS](https://nodejs.org/) 16.15 (LTS) or newest, with NPM.

After checking out the code, run `npm install` at the root of the project to install dependencies.

This repo embeds a very basic static website generator, that takes the website source present in `src/`, and generates static HTML ready to be served in `dist/`.

To generate the website, run:

```sh
npm run generate
```

This will generate the steps of the tutorial.

To browse the generated website, run:

```sh
npm run serve
```

Then open <http://127.0.0.1:8080> in your browser.

## Workshop session Hands-on script

The repo ships with a script in [`scripts/handson`](https://github.com/netgusto/imagejam.net/tree/production/scripts/handson)
used to upload images on Cloudflare Images, for display in the gallery <https://imagejam.net/step-2/connect/>.
