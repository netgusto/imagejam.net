addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Route the image request either to the original image on S3
 * or to Cloudflare Images, depending on the value of "?use_cf_images" in the URL
 * @param {Request} request
 */

const config = {
  // This is the Images account Hash you'll find in your Cloudflare Images Dashboard
  // It is safe to disclose publicly, as this is not a secret value.
  cloudflare_images_account_hash: "-oMiRxTrr3JCvTMIzx4GvA",
}

async function handleRequest(request) {
  const url = new URL(request.url);

  const { variant, imageName } = extractVariant(url);
  if (!variant || !imageName) {
    return notFound();
  }

  if (!url.searchParams.has("use_cf_images") || parseInt(url.searchParams.get("use_cf_images")) === 0) {
    // Don't use Cloudflare Images 🙈 and serve directly from S3.
    // Corresponds to a website not (yet!) using Cloudflare Images
    //
    // This is supported for illustrative purposes of the tutorial only,
    // as we need the worker to be able to deliver both original images for step 1,
    // and Cloudflare Images for step 4.
    // In a real setup, the worker would serve all traffic on Cloudflare Images,
    // so this whole condition block could be removed
    return fetch("https://imagejam.s3.amazonaws.com/" + imageName); 
  }

  // Use Cloudflare Images to deliver image ✨
  // by cosntructing the CF Images URL with parts extracted from
  // the original website image URLs that this worker intercepts
  return fetch("https://imagedelivery.net/" + config.cloudflare_images_account_hash + "/" + imageName + "/" + variant, {
    // relay request headers to Cloudflare Images,
    // to inform about the media types accepted by the HTTP client
    headers: request.headers,
  });
}

function extractVariant(url) {
  // takes website URLs like /images/public/cakes/gateau.jpg
  // and identifies the variant (here, "public")
  // and imageName ( here, "cakes/gateau.jpg")
  const parts = url.pathname.replace("/images/", "").split("/");
  const variant = parts.shift();
  return { variant: variant, imageName: parts.join("/") };
}

function notFound() {
  return new Response("Not found", { status: 404 });
}