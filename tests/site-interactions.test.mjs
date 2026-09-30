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
  ["/ru/stories/vedma-otryvok", "/uk/stories/vedma-otryvok"],
  ["/uk/stories/vedma-otryvok", "/ru/stories/vedma-otryvok"],
  ["/en/stories/vedma-otryvok", "/ru/stories/vedma-otryvok"],
  ["/ru/stories/veter-severa-otryvok", "/uk/stories/veter-severa-otryvok"],
  ["/uk/stories/veter-severa-otryvok", "/ru/stories/veter-severa-otryvok"],
  ["/en/stories/veter-severa-otryvok", "/ru/stories/veter-severa-otryvok"],
  [
    "/ru/stories/svetorada-zolotaya-otryvok",
    "/uk/stories/svetorada-zolotaya-otryvok",
  ],
  [
    "/uk/stories/svetorada-zolotaya-otryvok",
    "/ru/stories/svetorada-zolotaya-otryvok",
  ],
  [
    "/en/stories/svetorada-zolotaya-otryvok",
    "/ru/stories/svetorada-zolotaya-otryvok",
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
    const witchStory = await render(`/${lang}/stories/vedma-otryvok`);
    const northWindStory = await render(`/${lang}/stories/veter-severa-otryvok`);
    const svetoradaStory = await render(`/${lang}/stories/svetorada-zolotaya-otryvok`);
    const book = await render(`/${lang}/books/feya-s-ostrovov`);
    const witchBook = await render(`/${lang}/books/vedma`);
    const northWindBook = await render(`/${lang}/books/veter-s-severa`);
    const svetoradaBook = await render(`/${lang}/books/svetorada-zolotaya`);
    const pages = [
      homepage,
      news,
      biography,
      privacy,
      stories,
      story,
      witchStory,
      northWindStory,
      svetoradaStory,
      book,
      witchBook,
      northWindBook,
      svetoradaBook,
    ];

    assert.match(homepage.html, new RegExp(`href="/${lang}/news/official-statement"`));
    assert.match(news.html, new RegExp(`href="/${lang}/news/official-statement"`));
    assert.match(biography.html, new RegExp(`href="/${lang}/privacy"`));
    assert.match(privacy.html, /href="mailto:contact@simonavilar\.com"/);
    assert.doesNotMatch(
      homepage.html,
      new RegExp(`href="/${lang}/stories/feya-s-ostrovov-otryvok"`),
    );
    assert.match(stories.html, new RegExp(`href="/${lang}/stories/feya-s-ostrovov-otryvok"`));
    assert.match(story.html, new RegExp(`href="/${lang}/books/feya-s-ostrovov"`));
    assert.match(book.html, new RegExp(`href="/${lang}/stories/feya-s-ostrovov-otryvok"`));
    assert.doesNotMatch(homepage.html, new RegExp(`href="/${lang}/stories/vedma-otryvok"`));
    assert.match(stories.html, new RegExp(`href="/${lang}/stories/vedma-otryvok"`));
    assert.match(witchStory.html, new RegExp(`href="/${lang}/books/vedma"`));
    assert.match(witchBook.html, new RegExp(`href="/${lang}/stories/vedma-otryvok"`));
    assert.match(
      homepage.html,
      new RegExp(`href="/${lang}/stories/veter-severa-otryvok"`),
    );
    assert.match(
      stories.html,
      new RegExp(`href="/${lang}/stories/veter-severa-otryvok"`),
    );
    assert.match(northWindStory.html, new RegExp(`href="/${lang}/books/veter-s-severa"`));
    assert.match(
      northWindBook.html,
      new RegExp(`href="/${lang}/stories/veter-severa-otryvok"`),
    );
    assert.match(
      homepage.html,
      new RegExp(`href="/${lang}/stories/svetorada-zolotaya-otryvok"`),
    );
    assert.match(
      stories.html,
      new RegExp(`href="/${lang}/stories/svetorada-zolotaya-otryvok"`),
    );
    assert.match(
      svetoradaStory.html,
      new RegExp(`href="/${lang}/books/svetorada-zolotaya"`),
    );
    assert.match(
      svetoradaBook.html,
      new RegExp(`href="/${lang}/stories/svetorada-zolotaya-otryvok"`),
    );
    assert.equal(
      [...homepage.html.matchAll(new RegExp(`href="/${lang}/stories/[^"]+"`, "g"))]
        .map((match) => match[0])
        .filter((value, index, values) => values.indexOf(value) === index).length,
      2,
      `${lang} homepage should link to exactly two featured stories`,
    );
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
