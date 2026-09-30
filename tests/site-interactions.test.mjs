import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("qa", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function render(path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`),
    env,
    ctx,
  );
  return { response, html: await response.text() };
}

const equivalents = [
  ["/ru", "/uk"],
  ["/uk", "/ru"],
  ["/ru/biography", "/uk/biography"],
  ["/uk/biography", "/ru/biography"],
  ["/ru/news", "/uk/news"],
  ["/uk/news", "/ru/news"],
  ["/ru/stories", "/uk/stories"],
  ["/uk/stories", "/ru/stories"],
  ["/en/stories", "/ru/stories"],
  [
    "/ru/stories/feya-s-ostrovov-otryvok",
    "/uk/stories/feya-s-ostrovov-otryvok",
  ],
  [
    "/uk/stories/feya-s-ostrovov-otryvok",
    "/ru/stories/feya-s-ostrovov-otryvok",
  ],
  [
    "/en/stories/feya-s-ostrovov-otryvok",
    "/ru/stories/feya-s-ostrovov-otryvok",
  ],
  ["/ru/privacy", "/uk/privacy"],
  ["/uk/privacy", "/ru/privacy"],
  ["/ru/news/official-statement", "/uk/news/official-statement"],
  ["/uk/news/official-statement", "/ru/news/official-statement"],
];

test("language switches preserve the equivalent current page", async () => {
  for (const [path, alternate] of equivalents) {
    const { response, html } = await render(path);
    assert.equal(response.status, 200, path);
    assert.ok(
      html.match(new RegExp(`href="${alternate}"`, "g"))?.length >= 2,
      `${path} should link to ${alternate} from header and footer`,
    );
  }
});

test("all internal links resolve and key interactive links are present", async () => {
  for (const lang of ["ru", "uk", "en"]) {
    const homepage = await render(`/${lang}`);
    const news = await render(`/${lang}/news`);
    const biography = await render(`/${lang}/biography`);
    const privacy = await render(`/${lang}/privacy`);
    const stories = await render(`/${lang}/stories`);
    const story = await render(`/${lang}/stories/feya-s-ostrovov-otryvok`);
    const book = await render(`/${lang}/books/feya-s-ostrovov`);
    const pages = [homepage, news, biography, privacy, stories, story, book];

    assert.match(homepage.html, new RegExp(`href="/${lang}/news/official-statement"`));
    assert.match(news.html, new RegExp(`href="/${lang}/news/official-statement"`));
    assert.match(biography.html, new RegExp(`href="/${lang}/privacy"`));
    assert.match(privacy.html, /href="mailto:contact@simonavilar\.com"/);
    assert.match(homepage.html, new RegExp(`href="/${lang}/stories/feya-s-ostrovov-otryvok"`));
    assert.match(stories.html, new RegExp(`href="/${lang}/stories/feya-s-ostrovov-otryvok"`));
    assert.match(story.html, new RegExp(`href="/${lang}/books/feya-s-ostrovov"`));
    assert.match(book.html, new RegExp(`href="/${lang}/stories/feya-s-ostrovov-otryvok"`));
    assert.match(biography.html, /class="back"/);
    assert.match(biography.html, new RegExp(`href="/${lang}/?"`));
    assert.match(privacy.html, /class="back"/);
    assert.match(privacy.html, new RegExp(`href="/${lang}/?"`));
    assert.doesNotMatch(pages.map(({ html }) => html).join("\n"), /href="(?:#|\s*)"/);
    const internalPaths = new Set(
      pages.flatMap(({ html }) =>
        [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) =>
          match[1].split("#")[0] || `/${lang}`,
        ),
      ),
    );
    for (const internalPath of internalPaths) {
      if (!/^\/(?:ru|uk)(?:\/|$)/.test(internalPath)) continue;
      const { response } = await render(internalPath);
      assert.ok(
        response.status >= 200 && response.status < 400,
        `${internalPath} returned ${response.status}`,
      );
    }
  }
});
