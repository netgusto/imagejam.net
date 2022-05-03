# Image Jam - A Cloudflare Images Tutorial Website

This is the source code of a Cloudflare Pages website used by this [Cloudflare Images tutorial](https://developers.cloudflare.com/images/cloudflare-images/tutorials/cloudflare-images-on-pages).

See the Cloudflare Pages website running at <https://imagejam.net>.

## Requirements

* [NodeJS](https://nodejs.org/) 16.15 (LTS) or newest, with NPM.
* A [Cloudflare account](https://dash.cloudflare.com) with an active Cloudflare Images subscription
* A [Cloudflare API token](https://developers.cloudflare.com/api/tokens/create/) valid for the account, with Read and Update permissions on **Cloudflare Images**

## Branches

This repo contains several branches, each corresponding to a step in the progression of the tutorial. Follow along on the corresponding [Cloudflare Images tutorial](https://developers.cloudflare.com/images/cloudflare-images/tutorials/cloudflare-images-on-pages).

### Branch [01-start](https://github.com/netgusto/imagejam.net/tree/01-start)

In this branch, the website serves original, unoptimized images directly from Amazon S3. We use this state as the starting point for our Cloudflare Images integration.

### Branch [02-migrate](https://github.com/netgusto/imagejam.net/tree/02-migrate)

In this branch, we introduce scripts that upload all of our website images into Cloudflare Images storage.

To upload all the website images to Cloudflare images:

```
npm install

# Find the value for CF_IMAGES_ACCOUNT_ID in the Cloudflare Dashboard, section Images, under `Account ID`
export CF_IMAGES_ACCOUNT_ID=...

# A Cloudflare API token valid for the account, with Read and Update permissions on Cloudflare Images
# See https://developers.cloudflare.com/api/tokens/create/
export CF_IMAGES_API_KEY=...

npm run bulkupload
```

Once done, the images have been uploaded from Amazon S3 to Cloudflare Images.

### Branch [03-serve-from-cf-images](https://github.com/netgusto/imagejam.net/tree/03-serve-from-cf-images)

In this branch, the images are served by Cloudflare Images, on the default delivery domain https://imagedelivery.net

### Branch [04-custom-domain](https://github.com/netgusto/imagejam.net/tree/04-custom-domain)

In this branch, the images are served by Cloudflare Images on a custom domain.

## Install

Checkout the desired [branch](#branches) you want to try, then:

```sh
npm install
```

## Generate the website and browse it locally

This repo embeds a very basic static website generator, that takes the website source present in `src/`, and generates static HTML ready to be served in `dist/`.

To generate the website, run:

```sh
npm run generate
```

To browse the generated website without deploying it, run:

```sh
npm run serve
```

Then open <http://127.0.0.1:8080> in your browser.
