import customBangs from "./custom-bangs.mjs";
import bangs from "./bangs.mjs";

const allBangs = customBangs.concat(bangs);

const DEFAULT_BANG = localStorage.getItem("default-bang") ?? "ddg";
const defaultBang = allBangs.find((b) => b.t === DEFAULT_BANG);

function redirect() {
  const newUrl = getRedirectUrl();
  console.log("Redirecting to:", newUrl);
  if (!newUrl) {
    hydrateDefaultPage();
    return;
  }
  window.location.replace(newUrl);
}

function getRedirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) return null;

  const firstBang = query.match(/!(\S+)/i);
  const bangCandidate = firstBang?.[1]?.toLowerCase();
  const bang =
    bangCandidate !== undefined
      ? (allBangs.find((b) => b.t === bangCandidate) ?? defaultBang)
      : defaultBang;

  const queryWithoutBang = query.replace(/!\S+\s*/i, "").trim();

  const resolvedUrl = bang?.u?.replace(
    "{{{s}}}",
    encodeURIComponent(queryWithoutBang).replace(/%2F/g, "/"),
  );

  return resolvedUrl ?? null;
}

function hydrateDefaultPage() {
  const copyButton = document.getElementById("copy");
  const urlInput = document.getElementById("url");

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
  });
}

redirect();
