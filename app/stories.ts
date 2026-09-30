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
  imageWidth: number;
  imageHeight: number;
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
    latestTitle: "Истории",
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
    latestTitle: "Історії",
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
    latestTitle: "Stories",
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
    id: "vedma-otryvok",
    slug: "vedma-otryvok",
    type: "excerpt",
    publishedAt: "2026-09-30",
    modifiedAt: "2026-09-30",
    title: {
      ru: "Ведьма — отрывок",
      uk: "Ведьма — уривок",
      en: "The Witch — Excerpt",
    },
    preview: {
      ru: "Свенельд оказывается в смертельной схватке с разъярённым туром. Мгновение — и поединок превращается в безумную скачку сквозь лес.",
      uk: "Свенельд опиняється у смертельній сутичці з розлюченим туром. Мить — і поєдинок перетворюється на шалений біг крізь ліс.",
      en: "Sveneld finds himself locked in a deadly struggle with an enraged aurochs. In an instant, the fight becomes a wild race through the forest.",
    },
    body: {
      ru: [
        "Тур вновь поворачивался, собравшись с духом, потом опустил голову и пошел в наступление. И когда бык оказался совсем рядом, Свенельд вдруг отчаянно закричал и, рванувшись, совершил невероятный прыжок. Он просто взмыл над низко опущенной турьей головой, почти ударив по ней пяткой, - миг, и он схватился за его рога, развернулся, и оказался сидящим на могучей изогнутой спине тура.",
        "Бык замер. Этого короткого мгновения варягу хватило, чтобы сжать чудовище за рога у самого основания, возле головы. Ногами же он обвил его шею, пришпоривая, как взбесившегося тарпана, которых некогда укрощал в степях над Днепром. И тур вдруг совершил стремительный скачок, почти встал на дыбы, словно он и не был могучим лесным быком, а в самом деле превратился в легкого скакуна.",
        "У Свенельда клацнули зубы, когда эта туша опустилась на все четыре ноги, погрузившись копытами в мокрую грязь, смешанную с хвоей. Варяг продолжал сдавливать скрещенными ногами гортань тура, стараясь придушить страшного зверя, пока бык мотал головой, пытаясь освободиться, а потом вдруг рванул с места, с невероятной скоростью устремившись в чащу.",
        "Свенельд смог уклониться от нависавшей хвойной лапы, потом же он просто не замечал их, распластавшись на изогнутой белой спине тура, обвив его ногами и вцепившись руками в рога. Вокруг него все гудело и рвалось, грохот несущихся копыт оглушал, тело болело, хлопья звериной пены летели назад ему в лицо, забивая глаза и ноздри.",
        "Казалось, это будет длиться бесконечно. Мелькали слившиеся в единую массу стволы деревьев, Свенельд то взлетал вверх на спине тура, когда тот с удивительной ловкостью перемахивал через валежник, то словно проваливался в глубину, когда зверь опускался на свои мощные, но такие проворные ноги. Странно проворные… Любой нормальный бык уже должен был устать от подобной скачки, но под Свенельдом был необычный тур. У воина уже зубы не держались в челюстях от тряски, хватка его ног ослабевала, руки начинали скользить по шершавым рогам. Он понимал, что больше не выдержит, что сейчас рухнет, и тогда белое чудовище закончит начатое…",
      ],
      uk: [
        "Тур знову повернувся, зібравшись із духом, потім опустив голову й пішов у наступ. І коли бик опинився зовсім поруч, Свенельд раптом відчайдушно закричав і, рвонувшись, здійснив неймовірний стрибок. Він просто злетів над низько опущеною головою тура, мало не вдаривши її п’ятою, — мить, і він ухопився за його роги, розвернувся й опинився верхи на могутній вигнутій спині тура.",
        "Бик завмер. Цієї короткої миті варягові вистачило, щоб стиснути чудовисько за роги біля самої основи, коло голови. Ногами ж він обвив його шию, пришпорюючи, мов скаженого тарпана, яких колись приборкував у степах над Дніпром. І тур раптом зробив стрімкий стрибок, майже став дибки, наче він і не був могутнім лісовим биком, а справді перетворився на легкого скакуна.",
        "У Свенельда цокнули зуби, коли ця туша опустилася на всі чотири ноги, зануривши копита в мокру багнюку, змішану з хвоєю. Варяг і далі стискав схрещеними ногами горло тура, намагаючись придушити страшного звіра, поки бик мотав головою, намагаючись визволитися, а потім раптом рвонув з місця, з неймовірною швидкістю помчавши в хащу.",
        "Свенельд устиг ухилитися від навислої хвойної лапи, а потім уже просто не помічав їх, розпластавшись на вигнутій білій спині тура, обвивши його ногами й вчепившись руками в роги. Довкола нього все гуло й рвалося, гуркіт копит оглушував, тіло боліло, клапті звіриної піни летіли назад йому в обличчя, забиваючи очі й ніздрі.",
        "Здавалося, це триватиме без кінця. Миготіли злиті в єдину масу стовбури дерев, Свенельд то злітав угору на спині тура, коли той із дивовижною спритністю перескакував через валежник, то наче провалювався в глибину, коли звір опускався на свої могутні, але такі проворні ноги. Дивно проворні… Будь-який звичайний бик уже мав би втомитися від такої скачки, але під Свенельдом був незвичайний тур. У воїна вже зуби не трималися в щелепах від тряски, хватка його ніг слабшала, руки починали ковзати по шорстких рогах. Він розумів, що більше не витримає, що зараз упаде, і тоді біле чудовисько завершить розпочате…",
      ],
      en: [
        "The aurochs turned again, gathering its courage, then lowered its head and charged. When the bull was almost upon him, Sveneld suddenly gave a desperate shout and, hurling himself forward, made an incredible leap. He soared above the aurochs’s lowered head, almost striking it with his heel — and in the next instant he had seized its horns, twisted around, and found himself astride the beast’s mighty curved back.",
        "The bull froze. That brief moment was enough for the Varangian to grip the monster’s horns at their very base, close to its head. He wrapped his legs around its neck, spurring it as though it were a maddened tarpan, like those he had once tamed in the steppes above the Dnipro. Then the aurochs suddenly sprang forward, almost rearing onto its hind legs, as if it were no mighty forest bull at all but had truly transformed into a light-footed steed.",
        "Sveneld’s teeth clacked together when the enormous body came down on all four legs, its hooves sinking into wet mud mixed with pine needles. The Varangian continued squeezing the aurochs’s throat between his crossed legs, trying to strangle the terrifying beast while the bull thrashed its head in an attempt to break free. Then suddenly it lunged forward and tore into the thicket at incredible speed.",
        "Sveneld managed to duck beneath an overhanging pine branch, but after that he scarcely noticed them at all. He lay flattened against the aurochs’s curved white back, his legs locked around the beast and his hands clinging to its horns. Everything around him roared and tore past; the thunder of pounding hooves was deafening, his whole body ached, and flakes of the animal’s foam flew backward into his face, clogging his eyes and nostrils.",
        "It seemed it would last forever. Tree trunks flashed past, merging into a single blur. Sveneld was thrown upward on the aurochs’s back whenever the beast cleared fallen timber with astonishing agility, then seemed to plunge downward again when it landed on its powerful yet remarkably nimble legs. Strangely nimble… Any ordinary bull should already have been exhausted by such a ride, but the aurochs beneath Sveneld was no ordinary beast. The warrior’s teeth were rattling in his jaws from the violent shaking, the grip of his legs was weakening, and his hands were beginning to slip along the rough horns. He knew he could endure no longer, that at any moment he would fall — and then the white monster would finish what it had begun…",
      ],
    },
    image: "/simona-vilar-vedma.jpg",
    imageWidth: 1365,
    imageHeight: 768,
    imageAlt: {
      ru: "Симона Вилар — «Ведьма», иллюстрация",
      uk: "Сімона Вілар — «Ведьма», ілюстрація",
      en: "Simona Vilar — The Witch, illustration",
    },
    bookSlug: "vedma",
    seriesSlug: "vedma",
    seoTitle: {
      ru: "Ведьма — отрывок | Симона Вилар",
      uk: "Ведьма — уривок | Сімона Вілар",
      en: "The Witch — Excerpt | Simona Vilar",
    },
    metaDescription: {
      ru: "Отрывок из романа Симоны Вилар «Ведьма».",
      uk: "Уривок із роману Сімони Вілар «Ведьма».",
      en: "An excerpt from Simona Vilar’s novel “The Witch”.",
    },
  },
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
    imageWidth: 1367,
    imageHeight: 768,
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

const homepageStorySlugs = ["vedma-otryvok", "feya-s-ostrovov-otryvok"] as const;

export const homepageStories: StoryEntry[] = homepageStorySlugs
  .map((slug) => stories.find((story) => story.slug === slug))
  .filter((story): story is StoryEntry => story !== undefined)
  .slice(0, 2);

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
