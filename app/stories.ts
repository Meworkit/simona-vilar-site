import type { Lang } from "./content";
import { getBook, getSeries, bookTitle } from "./books";

export type StoryType = "story" | "excerpt";

type LocalizedText = Record<Lang, string>;
type LocalizedParagraphs = Record<Lang, string[]>;

export interface StoryEntry {
  id: string;
  slug: string;
  type: StoryType;
  publishedAt: string;
  modifiedAt: string;
  title: LocalizedText;
  preview: LocalizedText;
  body: LocalizedParagraphs;
  image: string;
  imageAlt: LocalizedText;
  bookSlug?: string;
  seriesSlug?: string;
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
}

export const storiesCopy: Record<
  Lang,
  {
    sectionTitle: string;
    latestTitle: string;
    eyebrow: string;
    storyType: string;
    excerptType: string;
    readMore: string;
    allStories: string;
    fromBook: string;
    bookSection: string;
    bookDetails: string;
    relatedHeading: string;
    indexDescription: string;
  }
> = {
  ru: {
    sectionTitle: "Истории",
    latestTitle: "Последние истории",
    eyebrow: "Литературный журнал",
    storyType: "История",
    excerptType: "Отрывок",
    readMore: "Читать полностью",
    allStories: "Все истории",
    fromBook: "Из книги",
    bookSection: "Из книги",
    bookDetails: "Подробнее о книге",
    relatedHeading: "Истории по этой книге",
    indexDescription: "Истории, исторические материалы и отрывки из книг Симоны Вилар.",
  },
  uk: {
    sectionTitle: "Історії",
    latestTitle: "Останні історії",
    eyebrow: "Літературний журнал",
    storyType: "Історія",
    excerptType: "Уривок",
    readMore: "Читати повністю",
    allStories: "Усі історії",
    fromBook: "Із книжки",
    bookSection: "Із книжки",
    bookDetails: "Докладніше про книжку",
    relatedHeading: "Історії за цією книгою",
    indexDescription: "Історії, історичні матеріали та уривки з книжок Сімони Вілар.",
  },
  en: {
    sectionTitle: "Stories",
    latestTitle: "Latest stories",
    eyebrow: "Literary journal",
    storyType: "Story",
    excerptType: "Excerpt",
    readMore: "Read more",
    allStories: "All stories",
    fromBook: "From the book",
    bookSection: "From the book",
    bookDetails: "About the book",
    relatedHeading: "Stories from this book",
    indexDescription: "Stories, historical features, and excerpts from books by Simona Vilar.",
  },
};

export const stories: StoryEntry[] = [
  {
    id: "feya-s-ostrovov-otryvok",
    slug: "feya-s-ostrovov-otryvok",
    type: "excerpt",
    publishedAt: "2026-09-30",
    modifiedAt: "2026-09-30",
    title: {
      ru: "Фея с островов — отрывок",
      uk: "Фея с островов — уривок",
      en: "The Fairy of the Isles — excerpt",
    },
    preview: {
      ru: "Иногда возвращение домой — это не только радость. Это ещё и память о том, что уже не вернуть.",
      uk: "Іноді повернення додому — це не лише радість. Це ще й пам’ять про те, чого вже не повернути.",
      en: "Sometimes coming home is not only a joy. It is also a reminder of what can never be brought back.",
    },
    body: {
      ru: [
        "«Под бесконечным небом простирались древние Чевиотские горы — одна за другой, пока не растворялись в сероватой дымке зимнего дня.\nВоздух был стылым, пропитанным сыростью подтаявшего снега, а тёмные облака медленно плыли в вышине.",
        "— Господи, сэр, как же хорошо дома! — воскликнул оруженосец.",
        "…",
        "У Дэвида при виде вотчины защемило сердце.\nЕго дом, его замок… который однажды достанется кому-то другому.",
        "Родовое имя Майсгрейв уже никогда не будет звучать тут.",
        "…",
        "И всё же видеть приветливые лица своих людей было приятно.\nЛюди выходили из домов, махали руками, дети шумели и бежали навстречу.",
        "— Бурый Орёл вернулся в Гнездо! — радостно кричали они.»",
      ],
      uk: [
        "«Під безкраїм небом простягалися древні Чевіотські гори — одна за одною, аж поки не розчинялися в сіруватій імлі зимового дня.\nПовітря було крижаним, просякнутим вогкістю талого снігу, а темні хмари повільно пливли у височині.",
        "— Господи, сер, як же добре вдома! — вигукнув зброєносець.",
        "…",
        "У Девіда при вигляді вотчини защеміло серце.\nЙого дім, його замок… який одного дня дістанеться комусь іншому.",
        "Родове ім’я Майсгрейв уже ніколи не лунатиме тут.",
        "…",
        "І все ж бачити привітні обличчя своїх людей було приємно.\nЛюди виходили з будинків, махали руками, діти галасували й бігли назустріч.",
        "— Бурий Орел повернувся до Гнізда! — радісно кричали вони.»",
      ],
      en: [
        "“Beneath an endless sky stretched the ancient Cheviot Hills — one after another, until they dissolved into the greyish haze of the winter day.\nThe air was bitterly cold, steeped in the damp of thawing snow, while dark clouds drifted slowly overhead.",
        "‘Lord, sir, how good it is to be home!’ the squire exclaimed.",
        "…",
        "At the sight of his estate, David’s heart tightened.\nHis home, his castle… which one day would pass to someone else.",
        "The Musgrave family name would never sound here again.",
        "…",
        "And yet it was good to see the welcoming faces of his people.\nPeople came out of their houses and waved; children shouted and ran to meet them.",
        "‘The Brown Eagle has returned to the Eyrie!’ they cried joyfully.”",
      ],
    },
    image: "/simona-vilar-feya-s-ostrovov-maizgreiv.png",
    imageAlt: {
      ru: "Симона Вилар — «Фея с островов» («Майсгрейв»), иллюстрация",
      uk: "Сімона Вілар — «Фея с островов» («Майсгрейв»), ілюстрація",
      en: "Simona Vilar — The Fairy of the Isles (Musgrave), illustration",
    },
    bookSlug: "feya-s-ostrovov",
    seriesSlug: "maysgreyv",
    seoTitle: {
      ru: "Фея с островов («Майсгрейв») — отрывок | Симона Вилар",
      uk: "Фея с островов («Майсгрейв») — уривок | Сімона Вілар",
      en: "The Fairy of the Isles (Musgrave) — excerpt | Simona Vilar",
    },
    metaDescription: {
      ru: "Отрывок из романа Симоны Вилар «Фея с островов» («Майсгрейв»).",
      uk: "Уривок із роману Сімони Вілар «Фея с островов» («Майсгрейв»).",
      en: "An excerpt from Simona Vilar’s novel The Fairy of the Isles (Musgrave).",
    },
  },
];

export function getStory(slug: string): StoryEntry | undefined {
  return stories.find((story) => story.slug === slug);
}

export function storiesForBook(bookSlug: string): StoryEntry[] {
  return stories.filter((story) => story.bookSlug === bookSlug);
}

export function storyTypeLabel(story: StoryEntry, lang: Lang): string {
  const labels = storiesCopy[lang];
  return story.type === "excerpt" ? labels.excerptType : labels.storyType;
}

export function relatedBook(story: StoryEntry, lang: Lang) {
  if (!story.bookSlug) return undefined;
  const book = getBook(story.bookSlug);
  if (!book) return undefined;
  const series = story.seriesSlug ? getSeries(story.seriesSlug) : undefined;
  return {
    book,
    title: bookTitle(book, lang),
    series,
    seriesTitle: series?.title[lang],
  };
}
