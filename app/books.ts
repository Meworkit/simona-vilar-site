import type { Lang } from "./content";

export interface LocalizedText {
  ru: string;
  uk: string;
  en: string;
}

export interface SeriesEntry {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  /** Book slugs in reading order. */
  books: string[];
}

export interface BookEntry {
  slug: string;
  /**
   * Published title. Kept identical in ru/uk: these are proper published
   * titles, and no verified official Ukrainian edition title exists for
   * any of them, so the title is not creatively translated (only
   * descriptions and interface copy are). This same string doubles as the
   * "original title" shown (subtly) on the English book pages, since it is
   * the actual Russian/Ukrainian published title.
   */
  title: string;
  /**
   * Fixed English working title for the EN site (manually selected — see
   * the site's English-launch content brief). Not a claim about any
   * existing published English-language edition.
   */
  titleEn: string;
  description: LocalizedText;
  /** Series slug, or null for a standalone novel. */
  series: string | null;
}

export const seriesList: SeriesEntry[] = [
  {
    slug: "anna-nevill",
    title: { ru: "Анна Невиль", uk: "Анна Невіль", en: "Anna Neville" },
    description: {
      ru: "Цикл о войне Алой и Белой розы в Англии XV века. В центре истории — Анна Невиль, дочь могущественного графа Уорвика, вошедшего в историю как «Делатель королей», и люди, чьи судьбы оказываются связаны с борьбой Йорков и Ланкастеров за английский престол. Исторические события здесь тесно переплетаются с личным выбором, любовью, предательством и ценой власти.",
      uk: "Цикл про війну Червоної та Білої троянди в Англії XV століття. У центрі історії — Анна Невіль, донька могутнього графа Уорвіка, який увійшов в історію як «Творець королів», і люди, чиї долі виявляються пов'язаними з боротьбою Йорків і Ланкастерів за англійський престол. Історичні події тут тісно переплітаються з особистим вибором, коханням, зрадою та ціною влади.",
      en: "A series set during the Wars of the Roses in fifteenth-century England. At its center is Anna Neville, daughter of the powerful Earl of Warwick, who went down in history as \"the Kingmaker,\" and the people whose fates become entangled in the struggle between the Yorks and Lancasters for the English throne. Historical events are closely interwoven here with personal choice, love, betrayal, and the price of power.",
    },
    books: ["obruchennaya-s-rozoy", "delatel-koroley", "zamok-na-skale", "tyazhest-ventsa"],
  },
  {
    slug: "normandskaya-legenda",
    title: { ru: "Нормандская легенда", uk: "Нормандська легенда", en: "The Norman Legend" },
    description: {
      ru: "Начало X века. Викинг Ролло стремится завоевать земли на севере Франции и создать собственное владение, которое впоследствии станет Нормандией. Его судьба переплетается с жизнью пленённой им Эммы: язычник и христианка, завоеватель и принцесса проходят через войны, политические союзы, разлуки и отношения, в которых любовь постоянно сталкивается с враждой и долгом.",
      uk: "Початок X століття. Вікінг Ролло прагне завоювати землі на півночі Франції та створити власне володіння, яке згодом стане Нормандією. Його доля переплітається з життям полоненої ним Емми: язичник і християнка, завойовник і принцеса проходять через війни, політичні союзи, розлуки та стосунки, у яких кохання постійно стикається з ворожнечею та обов'язком.",
      en: "The early tenth century. The Viking Rollo sets out to conquer lands in northern France and build a domain of his own — one that will later become Normandy. His fate becomes entwined with that of Emma, whom he has taken captive: a pagan and a Christian, a conqueror and a princess, moving through wars, political alliances, separations, and a relationship in which love is constantly at odds with hostility and duty.",
    },
    books: ["veter-s-severa", "printsessa-vikingov", "ognennyy-omut", "lesnaya-gertsoginya"],
  },
  {
    slug: "vedma",
    title: { ru: "Ведьма", uk: "Відьма", en: "The Witch" },
    description: {
      ru: "Историко-славянский цикл, действие которого разворачивается на Руси X века. История ведьмы Малфриды проходит рядом с реальными историческими фигурами — князем Игорем, княгиней Ольгой, Святославом и Владимиром — и соединяет политическую историю ранней Руси с миром славянских верований, волхвов и древней магии.",
      uk: "Історико-слов'янський цикл, дія якого розгортається на Русі X століття. Історія відьми Малфріди проходить поруч із реальними історичними постатями — князем Ігорем, княгинею Ольгою, Святославом і Володимиром — і поєднує політичну історію ранньої Русі зі світом слов'янських вірувань, волхвів і давньої магії.",
      en: "A historical Slavic series set in tenth-century Rus. The story of the witch Malfrida unfolds alongside real historical figures — Prince Igor, Princess Olga, Svyatoslav, and Vladimir — and links the political history of early Rus with the world of Slavic beliefs, pagan priests, and ancient magic.",
    },
    books: ["vedma", "vedma-i-knyaz", "vedma-knyagini", "vedma-v-tsargrade", "vedma-i-tma", "syn-vedmy"],
  },
  {
    slug: "svetorada",
    title: { ru: "Светорада", uk: "Світорада", en: "Svetorada" },
    description: {
      ru: "История смоленской княжны Светорады разворачивается на Руси конца IX — начала X века и ведёт героиню от родных земель до далёкой Византии. Любовь, княжеская политика, военные союзы и плен постоянно меняют её положение, но Светорада пытается сохранить право самой распоряжаться собственной судьбой.",
      uk: "Історія смоленської князівни Світоради розгортається на Русі кінця IX — початку X століття і веде героїню від рідних земель до далекої Візантії. Кохання, князівська політика, військові союзи та полон постійно змінюють її становище, але Світорада намагається зберегти право самій розпоряджатися власною долею.",
      en: "The story of the Smolensk princess Svetorada unfolds in Rus at the turn of the ninth and tenth centuries and carries the heroine from her homeland all the way to distant Byzantium. Love, princely politics, military alliances, and captivity constantly reshape her circumstances, but Svetorada keeps trying to hold on to the right to decide her own fate.",
    },
    books: ["svetorada-zolotaya", "svetorada-medovaya", "svetorada-yantarnaya"],
  },
  {
    slug: "dalekiy-svet",
    title: { ru: "Далёкий свет", uk: "Далеке світло", en: "Distant Light" },
    description: {
      ru: "Средневековая Англия XII века переживает гражданскую войну и борьбу за престол. На этом фоне Милдрэд и Артур пытаются защитить своё право на любовь и собственную жизнь в обществе, где происхождение, выгодный брак и политический союз нередко значат больше, чем чувства.",
      uk: "Середньовічна Англія XII століття переживає громадянську війну та боротьбу за престол. На цьому тлі Мілдред і Артур намагаються захистити своє право на кохання і власне життя в суспільстві, де походження, вигідний шлюб і політичний союз нерідко важать більше, ніж почуття.",
      en: "Medieval England in the twelfth century is living through civil war and a struggle for the throne. Against this backdrop, Mildred and Arthur try to defend their right to love and to a life of their own, in a society where lineage, an advantageous marriage, and political alliance often count for more than feeling.",
    },
    books: ["ledi-poslushnitsa", "rytsar-sveta"],
  },
  {
    slug: "ten-mecha",
    title: { ru: "Тень меча", uk: "Тінь меча", en: "Shadow of the Sword" },
    description: {
      ru: "Цикл переносит действие в XII век, в мир крестовых походов, рыцарских орденов, сарацинских государств и тайной борьбы разведчиков. Центральный герой Мартин — воспитанник школы ассасинов и опытный лазутчик, чьи задания постепенно оказываются тесно связаны с его чувствами к леди Джоанне.",
      uk: "Цикл переносить дію в XII століття, у світ хрестових походів, лицарських орденів, сарацинських держав і таємної боротьби розвідників. Центральний герой Мартін — вихованець школи асасинів і досвідчений розвідник, чиї завдання поступово виявляються тісно пов'язаними з його почуттями до леді Джоанни.",
      en: "The series moves the action to the twelfth century, into a world of Crusades, knightly orders, Saracen states, and the secret struggle of spies. Its central figure, Martin, is a graduate of an assassins' school and a seasoned agent whose missions gradually become closely bound up with his feelings for Lady Joanna.",
    },
    books: ["lazarit", "assasin", "paladin"],
  },
  {
    slug: "maysgreyv",
    title: { ru: "Майсгрейв", uk: "Майсгрейв", en: "Musgrave" },
    description: {
      ru: "Шотландия XVI века — мир островов, враждующих кланов и противостояния Англии и Шотландии. В центре цикла оказываются Мойра и английский разведчик Дэвид Майсгрейв, чьи отношения развиваются на фоне похищения, побега, клановой борьбы и политических интриг.",
      uk: "Шотландія XVI століття — світ островів, ворогуючих кланів і протистояння Англії та Шотландії. У центрі циклу опиняються Мойра та англійський розвідник Девід Майсгрейв, чиї стосунки розвиваються на тлі викрадення, втечі, кланової боротьби і політичних інтриг.",
      en: "Sixteenth-century Scotland: a world of islands, feuding clans, and the standoff between England and Scotland. At the center of the series are Moira and the English agent David Musgrave, whose relationship unfolds against a backdrop of abduction, escape, clan warfare, and political intrigue.",
    },
    books: ["feya-s-ostrovov", "lovushka-dlya-orla"],
  },
];

export const bookList: BookEntry[] = [
  // Анна Невиль
  {
    slug: "obruchennaya-s-rozoy",
    title: "Обрученная с Розой",
    titleEn: "Bound to the Rose",
    series: "anna-nevill",
    description: {
      ru: "Анна Невиль не хочет становиться пешкой в политической игре своего времени и пытается вырваться из судьбы, которую за неё решили другие. Бегство приводит её к молодому рыцарю Филипу Майсгрейву и втягивает обоих в опасные события войны Алой и Белой розы.",
      uk: "Анна Невіль не хоче ставати пішкою в політичній грі свого часу і намагається вирватися із долі, яку за неї вирішили інші. Втеча приводить її до молодого лицаря Філіпа Майсгрейва і втягує обох у небезпечні події війни Червоної та Білої троянди.",
      en: "Anna Neville refuses to become a pawn in the political games of her time and tries to break free from a fate others have chosen for her. Her flight leads her to the young knight Philip Musgrave and draws them both into the dangerous events of the Wars of the Roses.",
    },
  },
  {
    slug: "delatel-koroley",
    title: "Делатель королей",
    titleEn: "The Kingmaker",
    series: "anna-nevill",
    description: {
      ru: "Власть графа Уорвика становится всё более шаткой, Англия вновь приближается к войне, а союзники превращаются во врагов. Анна оказывается между политической борьбой своего отца и собственными чувствами, которые всё труднее отделить от большой истории страны.",
      uk: "Влада графа Уорвіка стає дедалі хиткішою, Англія знову наближається до війни, а союзники перетворюються на ворогів. Анна опиняється між політичною боротьбою свого батька і власними почуттями, які дедалі важче відокремити від великої історії країни.",
      en: "The Earl of Warwick's power grows ever more precarious as England edges back toward war and allies turn into enemies. Anna finds herself caught between her father's political struggle and her own feelings, which become harder and harder to separate from the larger history of the country.",
    },
  },
  {
    slug: "zamok-na-skale",
    title: "Замок на скале",
    titleEn: "Castle on the Crag",
    series: "anna-nevill",
    description: {
      ru: "Действие переносится на суровую англо-шотландскую границу, где набеги, войны и старые счёты становятся частью повседневной жизни. Анне приходится вновь бороться за свою судьбу, когда вокруг неё сталкиваются интересы нескольких могущественных людей.",
      uk: "Дія переноситься на суворий англо-шотландський кордон, де набіги, війни та старі рахунки стають частиною повсякденного життя. Анні доводиться знову боротися за свою долю, коли навколо неї стикаються інтереси кількох могутніх людей.",
      en: "The story moves to the harsh Anglo-Scottish border, where raids, wars, and old scores are part of daily life. Anna must once again fight for her own fate as the interests of several powerful men collide around her.",
    },
  },
  {
    slug: "tyazhest-ventsa",
    title: "Тяжесть венца",
    titleEn: "The Weight of the Crown",
    series: "anna-nevill",
    description: {
      ru: "Ричард Глостер возвращает Анну ко двору и стремится связать с ней свою судьбу. Путь к короне оказывается одновременно дорогой к власти, старым обидам и выбору, за который героям приходится платить высокую цену.",
      uk: "Річард Глостер повертає Анну до двору і прагне пов'язати з нею свою долю. Шлях до корони виявляється водночас дорогою до влади, старих образ і вибору, за який героям доводиться платити високу ціну.",
      en: "Richard of Gloucester brings Anna back to court and seeks to bind his fate to hers. The road to the crown turns out to be, at once, a path to power, to old grievances, and to choices for which the characters must pay a high price.",
    },
  },
  // Нормандская легенда
  {
    slug: "veter-s-severa",
    title: "Ветер с севера",
    titleEn: "Wind from the North",
    series: "normandskaya-legenda",
    description: {
      ru: "Изгнанный викинг Ролло отправляется к берегам Франции с почти невозможной мечтой — завоевать собственные земли. Во время одного из походов его пленницей становится юная Эмма, и встреча с ней начинает менять планы сурового воина.",
      uk: "Вигнаний вікінг Ролло вирушає до берегів Франції з майже неможливою мрією — завоювати власні землі. Під час одного з походів його полонянкою стає юна Емма, і зустріч з нею починає змінювати плани суворого воїна.",
      en: "The exiled Viking Rollo sets out for the shores of France with an almost impossible dream: to conquer lands of his own. During one of his raids, young Emma becomes his captive, and their meeting begins to change the hardened warrior's plans.",
    },
  },
  {
    slug: "printsessa-vikingov",
    title: "Принцесса викингов",
    titleEn: "The Viking Princess",
    series: "normandskaya-legenda",
    description: {
      ru: "Ролло по-прежнему ставит честь, власть и будущее своего народа выше личных чувств. Но отношения с непокорной Эммой становятся всё сложнее, а вокруг них сгущаются интриги, предсказания и соперничество.",
      uk: "Ролло, як і раніше, ставить честь, владу і майбутнє свого народу вище за особисті почуття. Але стосунки з непокірною Еммою стають дедалі складнішими, а навколо них згущуються інтриги, пророцтва та суперництво.",
      en: "Rollo still places honor, power, and the future of his people above his own feelings. But his relationship with the defiant Emma grows ever more complicated, as intrigue, prophecy, and rivalry gather around them.",
    },
  },
  {
    slug: "ognennyy-omut",
    title: "Огненный омут",
    titleEn: "Into the Firestorm",
    series: "normandskaya-legenda",
    description: {
      ru: "Любовь Ролло и Эммы уже прошла через вражду и испытания, но спокойствия героям это не приносит. Новые обстоятельства вновь ставят между ними войну, предательство, различия веры и необходимость выбирать между чувствами и обязанностями.",
      uk: "Кохання Ролло та Емми вже пройшло крізь ворожнечу та випробування, але спокою героям це не приносить. Нові обставини знову ставлять між ними війну, зраду, відмінності віри та необхідність обирати між почуттями й обов'язками.",
      en: "Rollo and Emma's love has already survived hostility and hardship, but it brings the two of them no peace. New circumstances again set war, betrayal, differences of faith, and the need to choose between feeling and duty between them.",
    },
  },
  {
    slug: "lesnaya-gertsoginya",
    title: "Лесная герцогиня",
    titleEn: "The Forest Duchess",
    series: "normandskaya-legenda",
    description: {
      ru: "Судьба снова разлучает Эмму с дорогими ей людьми и переносит её из одного мира в другой. Впереди её ждёт новая встреча с человеком, который стал одновременно главным испытанием и главным чувством её жизни.",
      uk: "Доля знову розлучає Емму з дорогими їй людьми і переносить її з одного світу в інший. Попереду на неї чекає нова зустріч із людиною, яка стала водночас головним випробуванням і головним почуттям її життя.",
      en: "Fate once again separates Emma from those dear to her and carries her from one world into another. Ahead of her waits a new meeting with the man who has become, at once, the greatest trial and the greatest feeling of her life.",
    },
  },
  // Ведьма
  {
    slug: "vedma",
    title: "Ведьма",
    titleEn: "The Witch",
    series: "vedma",
    description: {
      ru: "Молодой варяг Свенельд прибывает в земли древлян не только за данью, но и с особым поручением, связанным с языческими святилищами. Там его путь пересекается с девушкой, чья необычная сила постепенно превращает её судьбу в историю ведьмы Малфриды.",
      uk: "Молодий варяг Свенельд прибуває в землі древлян не лише за даниною, а й з особливим дорученням, пов'язаним із язичницькими святилищами. Там його шлях перетинається з дівчиною, чия незвичайна сила поступово перетворює її долю на історію відьми Малфріди.",
      en: "The young Varangian Sveneld arrives in the lands of the Drevlians not only to collect tribute but on a special mission connected to pagan shrines. There his path crosses that of a girl whose uncanny power gradually turns her fate into the story of the witch Malfrida.",
    },
  },
  {
    slug: "vedma-i-knyaz",
    title: "Ведьма и князь",
    titleEn: "The Witch and the Lord",
    series: "vedma",
    description: {
      ru: "Малфрида оказывается рядом с князем Игорем и предсказывает ему славу и удачу. Но её влияние вызывает страх и неприязнь при дворе, превращая отношения князя и ведьмы в часть опасной политической борьбы.",
      uk: "Малфріда опиняється поруч із князем Ігорем і пророкує йому славу та удачу. Але її вплив викликає страх і неприязнь при дворі, перетворюючи стосунки князя і відьми на частину небезпечної політичної боротьби.",
      en: "Malfrida finds herself at Prince Igor's side and foretells glory and good fortune for him. But her influence stirs fear and hostility at court, turning the relationship between the prince and the witch into part of a dangerous political struggle.",
    },
  },
  {
    slug: "vedma-knyagini",
    title: "Ведьма княгини",
    titleEn: "The Princess's Witch",
    series: "vedma",
    description: {
      ru: "Малфрида живёт жизнью жены Свенельда, однако странные видения напоминают о прошлом, которого она не помнит. Встреча с княгиней Ольгой заставляет её вновь искать утраченную память и столкнуться с силами, связанными с древлянскими волхвами.",
      uk: "Малфріда живе життям дружини Свенельда, однак дивні видіння нагадують про минуле, якого вона не пам'ятає. Зустріч із княгинею Ольгою змушує її знову шукати втрачену пам'ять і зіткнутися із силами, пов'язаними з древлянськими волхвами.",
      en: "Malfrida is living the life of Sveneld's wife, yet strange visions keep reminding her of a past she cannot recall. Meeting Princess Olga forces her to search once more for her lost memory and to confront forces bound up with the Drevlian priests.",
    },
  },
  {
    slug: "vedma-v-tsargrade",
    title: "Ведьма в Царьграде",
    titleEn: "The Witch in Constantinople",
    series: "vedma",
    description: {
      ru: "Княгиня Ольга отправляется в Константинополь и берет Малфриду с собой. Для ведьмы путешествие становится столкновением не только с византийской политикой, но и с новым христианским миром.",
      uk: "Княгиня Ольга вирушає до Константинополя і бере Малфріду із собою. Для відьми подорож стає зіткненням не лише з візантійською політикою, а й із новим християнським світом.",
      en: "Princess Olga travels to Constantinople and takes Malfrida with her. For the witch, the journey becomes a collision not only with Byzantine politics but with the new Christian world.",
    },
  },
  {
    slug: "vedma-i-tma",
    title: "Ведьма и тьма",
    titleEn: "The Witch and the Darkness",
    series: "vedma",
    description: {
      ru: "Во время осады Киева Малфрида вновь вмешивается в события, связанные с князем Святославом и судьбой Руси. Появление византийца Калокира становится для неё новым испытанием, в котором личное чувство трудно отделить от политических замыслов.",
      uk: "Під час облоги Києва Малфріда знову втручається в події, пов'язані з князем Святославом і долею Русі. Поява візантійця Калокира стає для неї новим випробуванням, у якому особисте почуття важко відокремити від політичних задумів.",
      en: "During the siege of Kyiv, Malfrida once again intervenes in events tied to Prince Svyatoslav and the fate of Rus. The arrival of the Byzantine Kalokyros becomes a new trial for her, one in which personal feeling is difficult to separate from political schemes.",
    },
  },
  {
    slug: "syn-vedmy",
    title: "Сын ведьмы",
    titleEn: "The Witch-Born",
    series: "vedma",
    description: {
      ru: "Добрыня отправляется в Новгород, где сопротивление новой вере приобретает пугающий характер. Следы происходящего ведут к Малфриде и в языческие леса, где героям предстоит столкнуться с древними тайнами и собственным прошлым.",
      uk: "Добриня вирушає до Новгорода, де опір новій вірі набуває лякливого характеру. Сліди подій ведуть до Малфріди й у язичницькі ліси, де героям доведеться зіткнутися з давніми таємницями і власним минулим.",
      en: "Dobrynya travels to Novgorod, where resistance to the new faith is taking on a frightening character. The trail leads back to Malfrida and into the pagan forests, where the characters must face ancient secrets and their own pasts.",
    },
  },
  // Светорада
  {
    slug: "svetorada-zolotaya",
    title: "Светорада Золотая",
    titleEn: "Golden Svetorada",
    series: "svetorada",
    description: {
      ru: "Красавица Светорада становится частью брачных и политических планов князей: её рассматривают как возможную невесту молодого Игоря Киевского. Однако у Игоря есть Ольга, а сама Светорада вовсе не собирается покорно принимать решение, принятое без неё.",
      uk: "Красуня Світорада стає частиною шлюбних і політичних планів князів: її розглядають як можливу наречену молодого Ігоря Київського. Однак у Ігоря є Ольга, а сама Світорада зовсім не збирається покірно приймати рішення, ухвалене без неї.",
      en: "The beautiful Svetorada becomes part of the princes' marriage and political plans: she is considered as a possible bride for the young Igor of Kyiv. But Igor already has Olga, and Svetorada herself has no intention of meekly accepting a decision made without her.",
    },
  },
  {
    slug: "svetorada-medovaya",
    title: "Светорада Медовая",
    titleEn: "Honey-Gold Svetorada",
    series: "svetorada",
    description: {
      ru: "Светорада покидает княжеский мир вместе с человеком, которого выбрала сама, и отправляется в земли мерян. Недолгое ощущение свободы сменяется новыми опасностями — набегами, пленом, политическими интересами и испытаниями её чувств.",
      uk: "Світорада залишає князівський світ разом із людиною, яку обрала сама, і вирушає в землі мерян. Недовге відчуття свободи змінюється новими небезпеками — набігами, полоном, політичними інтересами та випробуваннями її почуттів.",
      en: "Svetorada leaves the princely world behind together with the man she chose for herself and sets out for the lands of the Meryans. Her brief taste of freedom soon gives way to new dangers — raids, captivity, political interests, and trials of the heart.",
    },
  },
  {
    slug: "svetorada-yantarnaya",
    title: "Светорада Янтарная",
    titleEn: "Amber Svetorada",
    series: "svetorada",
    description: {
      ru: "Заключительная часть приводит Светораду в Византию, где её красота и ум привлекают внимание людей, стоящих на вершине власти. Дворцовые интриги и политические игры вновь заставляют её искать собственный путь.",
      uk: "Завершальна частина приводить Світораду до Візантії, де її краса та розум привертають увагу людей, які стоять на вершині влади. Палацові інтриги та політичні ігри знову змушують її шукати власний шлях.",
      en: "The concluding volume brings Svetorada to Byzantium, where her beauty and intelligence draw the attention of those at the very top of power. Palace intrigue and political games once again force her to seek out a path of her own.",
    },
  },
  // Далёкий свет
  {
    slug: "ledi-poslushnitsa",
    title: "Леди-послушница",
    titleEn: "The Lady Novice",
    series: "dalekiy-svet",
    description: {
      ru: "Знатная Милдрэд пытается избежать брака, которого не желает, и ищет убежища в монастыре. Но гражданская война и интерес могущественных людей не позволяют ей просто исчезнуть из мира, где высокородная невеста сама по себе является политической ценностью.",
      uk: "Знатна Мілдред намагається уникнути шлюбу, якого не бажає, і шукає притулку в монастирі. Але громадянська війна та інтерес могутніх людей не дозволяють їй просто зникнути зі світу, де високородна наречена сама по собі є політичною цінністю.",
      en: "The noblewoman Mildred tries to escape a marriage she does not want and seeks refuge in a convent. But civil war and the interest of powerful men will not let her simply vanish from a world in which a highborn bride is, in herself, a political asset.",
    },
  },
  {
    slug: "rytsar-sveta",
    title: "Рыцарь света",
    titleEn: "Knight of Light",
    series: "dalekiy-svet",
    description: {
      ru: "Разлучённый с Милдрэд Артур решается присвоить имя и доспехи умершего рыцаря, чтобы получить шанс вновь оказаться рядом с любимой. Но чужая личность приносит с собой собственные тайны и опасности, а их любви по-прежнему противостоят происхождение, семья и политические интриги.",
      uk: "Розлучений з Мілдред Артур наважується привласнити ім'я та обладунки померлого лицаря, щоб отримати шанс знову опинитися поруч із коханою. Але чужа особистість приносить із собою власні таємниці й небезпеки, а їхньому коханню, як і раніше, протистоять походження, родина та політичні інтриги.",
      en: "Separated from Mildred, Arthur decides to take the name and armor of a dead knight for a chance to be near his beloved again. But the borrowed identity brings its own secrets and dangers, and their love still has to contend with lineage, family, and political intrigue.",
    },
  },
  // Тень меча
  {
    slug: "lazarit",
    title: "Лазарит",
    titleEn: "The Lazarite",
    series: "ten-mecha",
    description: {
      ru: "Мартин обладает навыками, которые делают его почти идеальным разведчиком и исполнителем самых опасных поручений. Но задание, связанное с сестрой его врага, превращает привычную игру обмана в историю, способную полностью изменить его жизнь.",
      uk: "Мартін має навички, які роблять його майже ідеальним розвідником і виконавцем найнебезпечніших доручень. Але завдання, пов'язане із сестрою його ворога, перетворює звичну гру обману на історію, здатну повністю змінити його життя.",
      en: "Martin's skills make him an almost perfect agent, equal to the most dangerous assignments. But a mission involving his enemy's sister turns his familiar game of deception into a story that could change his entire life.",
    },
  },
  {
    slug: "assasin",
    title: "Ассасин",
    titleEn: "The Assassin",
    series: "ten-mecha",
    description: {
      ru: "Маршал тамплиеров пытается заманить Мартина в ловушку, используя собственную сестру Джоанну как приманку. Однако чувства девушки нарушают тщательно рассчитанный план и делают противостояние ещё опаснее для всех участников.",
      uk: "Маршал тамплієрів намагається заманити Мартіна в пастку, використовуючи власну сестру Джоанну як приманку. Однак почуття дівчини порушують ретельно розрахований план і роблять протистояння ще небезпечнішим для всіх учасників.",
      en: "The Templar Marshal tries to lure Martin into a trap, using his own sister Joanna as bait. But the young woman's feelings upend the carefully laid plan and make the confrontation even more dangerous for everyone involved.",
    },
  },
  {
    slug: "paladin",
    title: "Паладин",
    titleEn: "The Paladin",
    series: "ten-mecha",
    description: {
      ru: "Леди Джоанна оказывается пленницей на Востоке, где её судьба связывается с братом султана Саладина. Несмотря на безопасность и внимание эмира, прошлое и чувства к Мартину не отпускают её, а появление загадочного рыцаря вновь меняет ход событий.",
      uk: "Леді Джоанна опиняється полонянкою на Сході, де її доля пов'язується з братом султана Саладіна. Попри безпеку та увагу еміра, минуле й почуття до Мартіна не відпускають її, а поява загадкового лицаря знову змінює хід подій.",
      en: "Lady Joanna becomes a captive in the East, where her fate becomes bound up with the brother of Sultan Saladin. Despite the safety and attention of the emir, her past and her feelings for Martin will not let her go, and the arrival of a mysterious knight again changes the course of events.",
    },
  },
  // Майсгрейв
  {
    slug: "feya-s-ostrovov",
    title: "Фея с островов",
    titleEn: "The Fairy of the Isles",
    series: "maysgreyv",
    description: {
      ru: "Юная Мойра вместе с матерью начинает новую жизнь на далёких шотландских островах. Но план английского агента Дэвида Майсгрейва втягивает девушку в конфликт между кланами и заставляет отправиться с человеком, которому у неё нет причин доверять.",
      uk: "Юна Мойра разом із матір'ю починає нове життя на далеких шотландських островах. Але план англійського агента Девіда Майсгрейва втягує дівчину в конфлікт між кланами і змушує вирушити з людиною, якій у неї немає підстав довіряти.",
      en: "Young Moira, together with her mother, begins a new life on the remote Scottish isles. But a scheme devised by the English agent David Musgrave draws the girl into conflict between the clans and forces her to set out with a man she has no reason to trust.",
    },
  },
  {
    slug: "lovushka-dlya-orla",
    title: "Ловушка для орла",
    titleEn: "A Trap for the Eagle",
    series: "maysgreyv",
    description: {
      ru: "После шторма Дэвид и Мойра оказываются на суровом шотландском севере, где раскрытие личности английского шпиона может стоить ему жизни. Мойра уже знает его тайну, но и сама скрывает нечто, способное изменить отношения между ними.",
      uk: "Після шторму Девід і Мойра опиняються на суворій шотландській півночі, де розкриття особистості англійського шпигуна може коштувати йому життя. Мойра вже знає його таємницю, але й сама приховує дещо, здатне змінити стосунки між ними.",
      en: "After a storm, David and Moira find themselves in the harsh Scottish north, where the exposure of an English spy could cost him his life. Moira already knows his secret, but she too is hiding something that could change everything between them.",
    },
  },
  // Standalone novels
  {
    slug: "poedinok-sopernits",
    title: "Поединок соперниц",
    titleEn: "Duel of the Rivals",
    series: null,
    description: {
      ru: "Две очень разные женщины — внебрачная дочь короля и беглая монахиня — любят одного человека, крестоносца Эдгара. Их соперничество постепенно вовлекает в историю множество людей и превращает личный конфликт в большое средневековое приключение.",
      uk: "Дві дуже різні жінки — позашлюбна донька короля і втікачка-черниця — кохають одну людину, хрестоносця Едгара. Їхнє суперництво поступово втягує в історію безліч людей і перетворює особистий конфлікт на велику середньовічну пригоду.",
      en: "Two very different women — the king's illegitimate daughter and a runaway nun — love the same man, the crusader Edgar. Their rivalry gradually draws a great many people into the story and turns a personal conflict into a sweeping medieval adventure.",
    },
  },
  {
    slug: "zamok-tayn",
    title: "Замок тайн",
    titleEn: "Castle of Secrets",
    series: null,
    description: {
      ru: "Англия времён противостояния Карла II и сторонников Кромвеля. Спасающийся от преследования король находит убежище в старом замке Сент-Прайори, где политическая опасность неожиданно соединяется с семейной тайной и легендой о проклятии.",
      uk: "Англія часів протистояння Карла II і прихильників Кромвеля. Король, що рятується від переслідування, знаходить притулок у старому замку Сент-Прайорі, де політична небезпека несподівано поєднується з родинною таємницею та легендою про прокляття.",
      en: "England at the time of the standoff between Charles II and Cromwell's supporters. A king fleeing pursuit finds refuge in the old castle of Saint-Priory, where political danger unexpectedly meets a family secret and a legend of a curse.",
    },
  },
  {
    slug: "koroleva-v-pridachu",
    title: "Королева в придачу",
    titleEn: "A Queen into the Bargain",
    series: null,
    description: {
      ru: "Роман посвящён Мэри Тюдор, сестре Генриха VIII, которую против её желания отправляют во Францию и выдают замуж за короля Людовика XII. Но сердце Мэри давно принадлежит Чарльзу Брэндону, и большая династическая политика сталкивается с её попыткой самой выбрать свою судьбу.",
      uk: "Роман присвячений Мері Тюдор, сестрі Генріха VIII, яку проти її волі відправляють до Франції та видають заміж за короля Людовика XII. Але серце Мері давно належить Чарльзу Брендону, і велика династична політика стикається з її спробою самій обрати свою долю.",
      en: "The novel is devoted to Mary Tudor, sister of Henry VIII, who is sent to France against her will and married off to King Louis XII. But Mary's heart has long belonged to Charles Brandon, and grand dynastic politics collides with her attempt to choose her own fate.",
    },
  },
  {
    slug: "chuzhak",
    title: "Чужак",
    titleEn: "The Stranger",
    series: null,
    description: {
      ru: "Древняя Русь IX века. После тяжёлых испытаний Карина встречает варяга Торира и узнаёт, что тот тайно служит Олегу Новгородскому, а значит, их совместный путь связан не только с чувствами, но и с опасной борьбой за власть.",
      uk: "Давня Русь IX століття. Після важких випробувань Карина зустрічає варяга Торіра і дізнається, що той таємно служить Олегу Новгородському, а отже, їхній спільний шлях пов'язаний не лише з почуттями, а й з небезпечною боротьбою за владу.",
      en: "Ancient Rus in the ninth century. After enduring hard trials, Karina meets the Varangian Thorir and learns that he is secretly in the service of Oleg of Novgorod — which means their shared path is bound up not only with feeling but with a dangerous struggle for power.",
    },
  },
  {
    slug: "v-tot-den",
    title: "В тот день…",
    titleEn: "That Day…",
    series: null,
    description: {
      ru: "988 год. Князь Владимир готовится к крещению Киева, но во время обряда происходит загадочное убийство. Расследовать преступление поручают волхву Озару, и исторический перелом эпохи становится фоном для детективной истории о старой и новой вере.",
      uk: "988 рік. Князь Володимир готується до хрещення Києва, але під час обряду відбувається загадкове вбивство. Розслідувати злочин доручають волхву Озару, і історичний перелом епохи стає тлом для детективної історії про стару і нову віру.",
      en: "The year 988. Prince Vladimir is preparing for the baptism of Kyiv, but a mysterious murder takes place during the rite. The pagan priest Ozar is charged with investigating the crime, and this historic turning point becomes the backdrop for a detective story about the old faith and the new.",
    },
  },
];

const seriesBySlug = new Map(seriesList.map((s) => [s.slug, s]));
const booksBySlug = new Map(bookList.map((b) => [b.slug, b]));

export function getSeries(slug: string): SeriesEntry | undefined {
  return seriesBySlug.get(slug);
}

export function getBook(slug: string): BookEntry | undefined {
  return booksBySlug.get(slug);
}

export function seriesForBook(book: BookEntry): SeriesEntry | undefined {
  return book.series ? seriesBySlug.get(book.series) : undefined;
}

export function booksInSeries(series: SeriesEntry): BookEntry[] {
  return series.books.map((slug) => booksBySlug.get(slug)!).filter(Boolean);
}

/** Display title for a given site language: the shared ru/uk title, or the
 * fixed English working title on /en. */
export function bookTitle(book: BookEntry, lang: Lang): string {
  return lang === "en" ? book.titleEn : book.title;
}

export interface BooksCopy {
  navLabel: string;
  allBooks: string;
  catalogTitle: string;
  catalogH1: string;
  catalogIntro: string;
  seriesBooksHeading: string;
  otherSeriesBooks: string;
  author: string;
  authorName: string;
  series: string;
  ctaText: string;
  ctaButton: string;
  breadcrumbRoot: string;
  /** Shown (subtly) above/near the H1 on EN book pages only. */
  originalTitleLabel: string;
  standaloneHeading: string;
}

export const booksCopy: Record<Lang, BooksCopy> = {
  ru: {
    navLabel: "Книги",
    allBooks: "Все книги",
    catalogTitle: "Книги Симоны Вилар — официальный сайт",
    catalogH1: "Книги Симоны Вилар",
    catalogIntro:
      "Исторические романы Симоны Вилар переносят читателя в разные эпохи — от Древней Руси и эпохи викингов до средневековой Англии, крестовых походов и Ренессанса. В центре большинства историй — сильные герои, политические интриги, столкновение долга и чувства и судьбы людей, оказавшихся рядом с большими историческими событиями.",
    seriesBooksHeading: "Книги серии",
    otherSeriesBooks: "Другие книги серии",
    author: "Автор",
    authorName: "Симона Вилар",
    series: "Серия",
    ctaText: "О новых публикациях будем сообщать в рассылке.",
    ctaButton: "Подписаться",
    breadcrumbRoot: "Книги",
    originalTitleLabel: "Оригинальное название",
    standaloneHeading: "Отдельные романы",
  },
  uk: {
    navLabel: "Книжки",
    allBooks: "Усі книжки",
    catalogTitle: "Книжки Сімони Вілар — офіційний сайт",
    catalogH1: "Книжки Сімони Вілар",
    catalogIntro:
      "Історичні романи Сімони Вілар переносять читача в різні епохи — від Давньої Русі та доби вікінгів до середньовічної Англії, хрестових походів і Ренесансу. У центрі більшості історій — сильні герої, політичні інтриги, зіткнення обов'язку та почуттів і долі людей, які опинилися поруч із великими історичними подіями.",
    seriesBooksHeading: "Книжки серії",
    otherSeriesBooks: "Інші книжки серії",
    author: "Авторка",
    authorName: "Сімона Вілар",
    series: "Серія",
    ctaText: "Про нові публікації повідомлятимемо в розсилці.",
    ctaButton: "Підписатися",
    breadcrumbRoot: "Книжки",
    originalTitleLabel: "Оригінальна назва",
    standaloneHeading: "Окремі романи",
  },
  en: {
    navLabel: "Books",
    allBooks: "All books",
    catalogTitle: "Books by Simona Vilar — Official Website",
    catalogH1: "Books by Simona Vilar",
    catalogIntro:
      "Simona Vilar's historical novels take readers across different eras — from ancient Rus and the age of the Vikings to medieval England, the Crusades, and the Renaissance. Most of her stories center on strong characters, political intrigue, the clash between duty and feeling, and the fates of people caught up in major historical events.",
    seriesBooksHeading: "Books in the series",
    otherSeriesBooks: "Other books in the series",
    author: "Author",
    authorName: "Simona Vilar",
    series: "Series",
    ctaText: "We'll share news about new publications in our newsletter.",
    ctaButton: "Subscribe",
    breadcrumbRoot: "Books",
    originalTitleLabel: "Original title",
    standaloneHeading: "Standalone novels",
  },
};
