import { expect, test, type Locator, type Page } from "@playwright/test";

async function expectReceivesCenterClick(locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  const result = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const receiver = document.elementFromPoint(x, y);
    const style = getComputedStyle(element);
    return {
      pointerEvents: style.pointerEvents,
      zIndex: style.zIndex,
      position: style.position,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      receiver: receiver?.tagName ?? null,
      receiverText: receiver?.textContent?.trim().slice(0, 80) ?? null,
      receivesClick:
        receiver === element ||
        (receiver instanceof Node && element.contains(receiver)),
    };
  });
  expect(result.pointerEvents).not.toBe("none");
  expect(result.receivesClick, JSON.stringify(result)).toBe(true);
}

async function clickAndExpect(page: Page, locator: Locator, pathname: string) {
  await expectReceivesCenterClick(locator);
  await locator.click();
  await expect(page).toHaveURL((url) => url.pathname === pathname);
}

for (const language of ["ru", "uk"] as const) {
  const labels =
    language === "ru"
      ? {
          home: "Главная",
          biography: "Биография",
          news: "Новости",
          contact: "Контакты",
          fullBiography: "Читать полную биографию →",
          read: "Читать →",
          backHome: "Вернуться на главную",
          backNews: "Вернуться к новостям",
          alternate: "UA",
          alternateLanguage: "uk",
        }
      : {
          home: "Головна",
          biography: "Біографія",
          news: "Новини",
          contact: "Контакти",
          fullBiography: "Читати повну біографію →",
          read: "Читати →",
          backHome: "Повернутися на головну",
          backNews: "Повернутися до новин",
          alternate: "RU",
          alternateLanguage: "ru",
        };

  test.describe(`${language.toUpperCase()} real click navigation`, () => {
    test("header navigation and language switch", async ({ page }) => {
      await page.goto(`/${language}/biography`);
      await clickAndExpect(page, page.getByRole("link", { name: /С[іи]мона В[іи]лар Оф/ }), `/${language}`);

      await clickAndExpect(page, page.getByRole("link", { name: labels.biography, exact: true }), `/${language}/biography`);
      await clickAndExpect(page, page.getByRole("link", { name: labels.home, exact: true }), `/${language}`);
      await clickAndExpect(page, page.getByRole("link", { name: labels.news, exact: true }).first(), `/${language}/news`);

      await page.goto(`/${language}`);
      await expectReceivesCenterClick(page.getByRole("link", { name: labels.contact, exact: true }));
      await page.getByRole("link", { name: labels.contact, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/${language}/?#contact$`));

      await page.goto(`/${language}/news`);
      await clickAndExpect(page, page.getByRole("link", { name: labels.alternate, exact: true }).first(), `/${labels.alternateLanguage}/news`);
    });

    test("homepage cards and read actions", async ({ page }) => {
      await page.goto(`/${language}`);
      await clickAndExpect(page, page.getByRole("link", { name: labels.fullBiography, exact: true }), `/${language}/biography`);

      await page.goto(`/${language}`);
      await clickAndExpect(page, page.locator("a.card"), `/${language}/news/official-statement`);

      await page.goto(`/${language}/news`);
      await clickAndExpect(page, page.getByText(labels.read, { exact: true }), `/${language}/news/official-statement`);
    });

    test("back links and footer language", async ({ page }) => {
      await page.goto(`/${language}/biography`);
      await clickAndExpect(page, page.getByRole("link", { name: new RegExp(labels.backHome) }), `/${language}`);

      await page.goto(`/${language}/news/official-statement`);
      await clickAndExpect(page, page.getByRole("link", { name: new RegExp(labels.backNews) }), `/${language}/news`);

      await page.goto(`/${language}/privacy`);
      await clickAndExpect(page, page.locator("footer").getByRole("link", { name: labels.alternate, exact: true }), `/${labels.alternateLanguage}/privacy`);
    });
  });
}
