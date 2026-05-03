import { bangs, currencyBangs, translateBangs } from "./bang.js";

// Register service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registered:", registration);
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed:", err);
      });
  });
}

function noSearchDefaultPageRender() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Bang Search</h1>
        <p>DuckDuckGo's bang redirects are slow, so let's use something cacheable. Add the following URL as a custom search engine to your browser for better performance. Enables (almost) <a href="https://duckduckgo.com/bang.html" target="_blank">all of DuckDuckGo's bangs.</a></p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="https://search.vendittelli.co.uk/?q=%s"
            readonly 
          />
          <button class="copy-button">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
      </div>
      <footer class="footer">
        <a href="https://github.com/SVendittelli/bang-search" target="_blank">GitHub</a>
        •
        <a href="https://vendittelli.co.uk/" target="_blank">Vendittelli</a>
      </footer>
    </div>
  `;

  const copyButton = app.querySelector(".copy-button");
  const copyIcon = copyButton.querySelector("img");
  const urlInput = app.querySelector(".url-input");

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangRedirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();

  const currencyRegExp = /[a-z]{3,4}2[a-z]{3,4}/;

  let bangList = bangs;
  if (bangCandidate.startsWith("trt-") || bangCandidate.startsWith("trf-")) {
    bangList = translateBangs;
  } else if (currencyRegExp.test(bangCandidate)) {
    bangList = currencyBangs;
  }

  const selectedBang =
    (bangCandidate && bangList.find((b) => b.t === bangCandidate)) ||
    defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
  if (cleanQuery === "")
    return selectedBang ? `https://${selectedBang.d}` : null;

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+username/repo"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangRedirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
