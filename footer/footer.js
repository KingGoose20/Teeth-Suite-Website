const scriptPath = document.currentScript.src;
const footerDir = scriptPath.substring(0, scriptPath.lastIndexOf('/')); fetch(`${footerDir}/footer.html`)
  .then(r => r.text())
  .then(html => {
    const container = document.createElement("div");
    container.innerHTML = html;
    // -----------------------------------------
    // PREPEND "../" BASED ON DIRECTORY DEPTH
    // -----------------------------------------
    const depth = getDirDepthFooter(); // calculate depth
    prependDotsToLinksAndImagesFooter(container, depth); // rewrite all <a> hrefs

    document.getElementById('footer').innerHTML = container.innerHTML;

  });

// -------- Helper functions ----------
function getDirDepthFooter() {
  const path = window.location.pathname;
  const withoutFile = path.replace(/[^\/]+$/, "");
  const parts = withoutFile.split("/").filter(Boolean);
  if (parts[0] === "Teeth-Suite-Website") {
    parts.splice(0, 1);
  }
  return parts.length;
}

function prependDotsToLinksAndImagesFooter(container, depth) {
  const prefix = "../".repeat(depth);


  // --------- A TAGS ---------
  container.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");

    if (!href) return;

    // ignore absolute links
    if (/^(https?:)?\/\//.test(href)) return;

    // ignore leading slash (root-relative)
    if (href.startsWith("/")) return;

    // ignore if already has ../
    if (href.startsWith("../")) return;

    a.setAttribute("href", prefix + href);
  });

  // --------- IMG TAGS ---------
  container.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");

    if (!src) return;

    // ignore absolute URLs
    if (/^(https?:)?\/\//.test(src)) return;

    // ignore root-relative paths
    if (src.startsWith("/")) return;

    // ignore if already adjusted
    if (src.startsWith("../")) return;
    console.log(src);

    img.setAttribute("src", prefix + src);
    console.log(img.getAttribute("src"));
  });
}