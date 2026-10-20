import type { Lang } from "./content";

const RUSSIAN_VIDEO_ID = "WrT-UzkNLPo";
const UKRAINIAN_VIDEO_ID = "MQok3_gu_Fg";

const songCopy = {
  ru: {
    title: "Песня Артура — «И я туда вернусь»",
    description: "Средневековая баллада из мира романов Симоны Вилар «Далёкий свет».",
    playerTitle: "Песня Артура — «И я туда вернусь»",
  },
  uk: {
    title: "Пісня Артура — «І я туди вернусь»",
    description: "Середньовічна балада зі світу романів Сімони Вілар «Далеке світло».",
    playerTitle: "Пісня Артура — «І я туди вернусь»",
  },
} as const;

export function SongVideoFrame({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="songVideoFrame">
      <iframe
        key={videoId}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export function ArthurSong({ lang }: { lang: Lang }) {
  if (lang === "en") return null;
  const text = songCopy[lang];
  const videoId = lang === "uk" ? UKRAINIAN_VIDEO_ID : RUSSIAN_VIDEO_ID;
  const storyHref = `/${lang}/stories/arthur-song`;

  return (
    <section className="arthurSong" aria-labelledby="arthur-song-title">
      <h2 id="arthur-song-title">{text.title}</h2>
      <p className="arthurSongDescription">{text.description}</p>

      <SongVideoFrame videoId={videoId} title={text.playerTitle} />
      <a className="arthurSongStoryLink" href={storyHref}>
        {lang === "uk" ? "Прочитати текст пісні" : "Прочитать текст песни"} →
      </a>
    </section>
  );
}
