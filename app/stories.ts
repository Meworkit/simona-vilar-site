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
  homepageExtra?: LocalizedText;
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
    id: "veter-severa-otryvok",
    slug: "veter-severa-otryvok",
    type: "excerpt",
    publishedAt: "2026-09-30",
    modifiedAt: "2026-09-30",
    title: {
      ru: "Ветер с севера — отрывок",
      uk: "Ветер с севера — уривок",
      en: "Wind from the North — excerpt",
    },
    preview: {
      ru: "Эмма спускается в подземелье и видит пленённого Ролло. Униженный, но не сломленный, он встречает её взглядом, в котором больше достоинства, чем покорности.",
      uk: "Емма спускається до підземелля і бачить полоненого Ролло. Принижений, але не зламаний, він зустрічає її поглядом, у якому більше гідності, ніж покори.",
      en: "Emma descends into the dungeon and finds Rollo a prisoner. Humiliated but unbroken, he meets her gaze with more dignity than submission.",
    },
    homepageExtra: {
      ru: "Мелит поднял факел повыше, в его дымном свете Эмма с замиранием сердца увидела Ролло.",
      uk: "Меліт підняв смолоскип вище, і в його димному світлі Емма із завмиранням серця побачила Ролло.",
      en: "Melite raised the torch higher, and in its smoky light Emma saw Rollo. Her heart seemed to stop.",
    },
    body: {
      ru: [
        "...Эврар удержал Эмму на последней ступеньке, дабы она не испачкала свой роскошный подол в жидкой грязи подземелья. Мелит поднял факел повыше, в его дымном свете Эмма с замиранием сердца увидела Ролло.",
        "Он сидел в знакомой ей позе, облокотившись о стену и небрежно уронив скованные руки между согнутых колен. Викинг был перепачкан глиной, его длинные волосы сосульками свисали на глаза. Лицо было темным, он щурился от света, но у Эммы дрогнуло сердце, когда она поймала знакомый серо-стальной взгляд. Ролло был унижен, но ни в его небрежной позе, ни в глазах, ни в повороте головы не было затравленности. Скорее пренебрежение и достоинство.",
        "Душа Эммы рванулась к нему. Ей пришлось взять себя в руки, чтобы остаться стоять с выражением брезгливого любопытства. Ролло скривил рот в усмешке.",
        "- Принцесса франков! Ты прекрасно выглядишь, Эмма. Надеюсь, теперь твоя душа довольна и ты счастлива, созерцая меня здесь.",
        "У девушки задрожали губы. Но когда она заговорила, голос её звучал твердо:",
        "- Да, Ролло. Многое изменилось, и теперь ты пленник, а власть над тобой - у меня.",
        "- Власть? Но власть и прежде была у тебя. Только ты не понимала этого.",
        "Она молчала, оглушенная...",
      ],
      uk: [
        "...Еврар затримав Емму на останній сходинці, аби вона не забруднила свій розкішний поділ у рідкому багні підземелля. Меліт підняв смолоскип вище, і в його димному світлі Емма із завмиранням серця побачила Ролло.",
        "Він сидів у знайомій їй позі, спершись на стіну й недбало опустивши закуті руки між зігнутими колінами. Вікінг був вимазаний глиною, його довге волосся бурульками спадало на очі. Обличчя було темне, він мружився від світла, але в Емми здригнулося серце, коли вона впіймала знайомий сіро-сталевий погляд. Ролло був принижений, але ні в його недбалій позі, ні в очах, ні в повороті голови не було нічого загнаного. Радше зневага й гідність.",
        "Душа Емми рвонулася до нього. Їй довелося взяти себе в руки, щоб і далі стояти з виразом гидливої цікавості. Ролло скривив губи в усмішці.",
        "- Принцесо франків! Ти чудово виглядаєш, Еммо. Сподіваюся, тепер твоя душа задоволена і ти щаслива, дивлячись на мене тут.",
        "У дівчини затремтіли губи. Але коли вона заговорила, її голос звучав твердо:",
        "- Так, Ролло. Багато що змінилося, і тепер ти полонений, а влада над тобою — у мене.",
        "- Влада? Але влада й раніше була в тебе. Тільки ти цього не розуміла.",
        "Вона мовчала, приголомшена...",
      ],
      en: [
        "...Evrard stopped Emma on the final step so that she would not soil the rich hem of her gown in the watery filth of the dungeon floor. Melite raised the torch higher, and in its smoky light Emma saw Rollo. Her heart seemed to stop.",
        "He was sitting in a pose she knew well, leaning back against the wall, his shackled hands resting carelessly between his bent knees. The Viking was smeared with clay, his long hair hanging in damp strands over his eyes. His face was dark with grime and he squinted against the light, but Emma’s heart gave a jolt when she met that familiar steel-grey gaze. Rollo had been humiliated, yet there was nothing hunted or broken in his careless posture, his eyes, or the tilt of his head. If anything, there was contempt — and dignity.",
        "Emma’s whole soul yearned toward him. She had to master herself and remain where she was, wearing an expression of cool, disdainful curiosity. Rollo’s mouth twisted into a smile.",
        "“Princess of the Franks! You look beautiful, Emma. I hope your soul is satisfied now, and that you are happy to see me here.”",
        "Her lips trembled. But when she spoke, her voice was steady.",
        "“Yes, Rollo. Much has changed. Now you are a prisoner, and I have power over you.”",
        "“Power? But you always had power over me. You simply never understood it.”",
        "She stood silent, stunned...",
      ],
    },
    image: "/simona-vilar-veter-severa.jpg",
    imageWidth: 571,
    imageHeight: 856,
    imageAlt: {
      ru: "Симона Вилар — «Ветер с севера», иллюстрация",
      uk: "Сімона Вілар — «Ветер с севера», ілюстрація",
      en: "Simona Vilar — “Wind from the North”, illustration",
    },
    bookSlug: "veter-s-severa",
    seriesSlug: "normandskaya-legenda",
    seoTitle: {
      ru: "Ветер с севера — отрывок | Симона Вилар",
      uk: "Ветер с севера — уривок | Сімона Вілар",
      en: "Wind from the North — excerpt | Simona Vilar",
    },
    metaDescription: {
      ru: "Отрывок из романа Симоны Вилар «Ветер с севера».",
      uk: "Уривок із роману Сімони Вілар «Ветер с севера».",
      en: "An excerpt from Simona Vilar’s novel “Wind from the North”.",
    },
  },
  {
    id: "svetorada-zolotaya-otryvok",
    slug: "svetorada-zolotaya-otryvok",
    type: "excerpt",
    publishedAt: "2026-09-30",
    modifiedAt: "2026-09-30",
    title: {
      ru: "Светорада Золотая — отрывок",
      uk: "Светорада Золотая — уривок",
      en: "Golden Svetorada — excerpt",
    },
    preview: {
      ru: "Светорада и Стема пускают коней в галоп, превращая невинное состязание в момент юного азарта, свободы и пьянящей радости скорости.",
      uk: "Светорада і Стема пускають коней у шалений галоп, і невинне змагання перетворюється на мить юного запалу, свободи й п’янкого щастя швидкості.",
      en: "Svetorada and Stema spur their horses into a wild gallop, and a playful race becomes a moment of youthful exhilaration, freedom, and the intoxicating joy of speed.",
    },
    body: {
      ru: [
        "Стема на этот раз выехал на своем Пегаше. Княжна посмеивалась над его черно-белым коренастым жеребчиком, удивляясь, отчего парню нравятся лошади такой «коровьей» масти. Стема же защищал любимца: дескать, Пегаш и вынослив, и быстр, и не раз в степных дозорах спасал всадника даже от быстроногих хазарских коней.",
        "Светорада лишь насмешливо фыркнула, пришпорила свою белую кобылицу и пустила ее вскачь. Стеме только того и надо было: стегнул Пегаша — и тоже в галоп.",
        "Хитрая Светорада, заметив, что парень начинает ее нагонять, слегка попридержала свою хазарскую лошадку, но близко к себе так и не подпустила. Однако тут уже Пегаш показал, на что способен. Вскоре они уже неслись бок о бок, и только ветер свистел в ушах. Они азартно покрикивали, подгоняя коней, и трудно было понять: соревнование ли это или просто рвется наружу молодой задор и пьянящее счастье, когда хочется мчаться наперегонки с самим ветром...",
      ],
      uk: [
        "Стема цього разу виїхав на своєму Пегаші. Княжна посміювалася з його чорно-білого кремезного жеребчика, дивуючись, чому хлопцеві до вподоби коні такої «коров’ячої» масті. Стема ж боронив свого улюбленця: мовляв, Пегаш і витривалий, і швидкий, і не раз у степових дозорах рятував вершника навіть від прудконогих хозарських коней.",
        "Светорада лише насмішкувато фиркнула, пришпорила свою білу кобилицю й пустила її навскач. Стемі тільки того й треба було: він стьобнув Пегаша — і теж пустився в галоп.",
        "Хитра Светорада, помітивши, що хлопець починає її наздоганяти, трохи притримала свою хозарську конячку, але близько до себе так і не підпустила. Та тут уже Пегаш показав, на що здатен. Незабаром вони вже неслися пліч-о-пліч, і лише вітер свистів у вухах. Вони азартно покрикували, підганяючи коней, і важко було зрозуміти: чи це змагання, чи просто рветься назовні молодий запал і п’янке щастя, коли хочеться мчати наввипередки з самим вітром...",
      ],
      en: [
        "This time, Stema rode out on his Pegash. The princess teased him about his sturdy little black-and-white stallion, wondering why he was so fond of horses with such a “cow-like” coloring. Stema, however, defended his favorite: Pegash was both hardy and swift, he insisted, and more than once during patrols across the steppe had carried his rider to safety even from the fleet-footed horses of the Khazars.",
        "Svetorada merely gave a mocking snort, urged her white mare forward, and sent her racing into a gallop. That was all the encouragement Stema needed. He flicked Pegash on and galloped after her.",
        "Clever Svetorada noticed that the young man was beginning to catch up and reined in her Khazar mare ever so slightly, though she still refused to let him come too close. But now Pegash showed what he was capable of. Before long, the two horses were racing side by side with the wind whistling in their ears. Svetorada and Stema called out excitedly as they urged their mounts onward, and it was hard to tell whether this was still a contest at all, or simply youthful exhilaration breaking free — that intoxicating happiness that makes you want to race the wind itself...",
      ],
    },
    image: "/simona-vilar-svetorada-zolotaya.jpg",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: {
      ru: "Симона Вилар — «Светорада Золотая», иллюстрация",
      uk: "Сімона Вілар — «Светорада Золотая», ілюстрація",
      en: "Simona Vilar — “Golden Svetorada”, illustration",
    },
    bookSlug: "svetorada-zolotaya",
    seriesSlug: "svetorada",
    seoTitle: {
      ru: "Светорада Золотая — отрывок | Симона Вилар",
      uk: "Светорада Золотая — уривок | Сімона Вілар",
      en: "Golden Svetorada — excerpt | Simona Vilar",
    },
    metaDescription: {
      ru: "Отрывок из романа Симоны Вилар «Светорада Золотая».",
      uk: "Уривок із роману Сімони Вілар «Светорада Золотая».",
      en: "An excerpt from Simona Vilar’s novel “Golden Svetorada”.",
    },
  },
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

const homepageStorySlugs = [
  "veter-severa-otryvok",
  "svetorada-zolotaya-otryvok",
] as const;

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

// Display-only: strips a trailing " — <type label>" suffix (e.g. "— отрывок")
// from the story title, since the type is now shown as a separate small label
// under the heading instead of inline in the title text. The underlying
// title data (used for SEO/schema/meta) is left untouched.
export function storyDisplayTitle(story: StoryEntry, lang: Lang): string {
  const title = story.title[lang];
  const typeLabel = storyTypeLabel(story, lang);
  const suffixPattern = new RegExp(`\\s*[—-]\\s*${typeLabel}\\s*$`, "i");
  return title.replace(suffixPattern, "").trim();
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
