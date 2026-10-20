"use client";

import { useState } from "react";
import type { Lang } from "./content";

const RUSSIAN_VIDEO_ID = "WrT-UzkNLPo";
const UKRAINIAN_VIDEO_ID = "MQok3_gu_Fg";

const songCopy = {
  ru: {
    title: "Песня Артура — «И я туда вернусь»",
    description: "Средневековая баллада по мотивам дилогии Симоны Вилар «Далёкий свет».",
    playerTitle: "Песня Артура — «И я туда вернусь»",
  },
  uk: {
    title: "Пісня Артура — «І я туди вернусь»",
    description: "Середньовічна балада за мотивами дилогії Сімони Вілар «Далеке світло».",
    playerTitle: "Пісня Артура — «І я туди вернусь»",
  },
  en: {
    title: "Arthur’s Song — “And I Will Return There”",
    description: "A medieval ballad inspired by Simona Vilar’s Distant Light duology.",
    playerTitle: "Arthur’s Song",
  },
} as const;

function VideoFrame({ videoId, title }: { videoId: string; title: string }) {
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
  const [englishVideo, setEnglishVideo] = useState<"ru" | "uk">("ru");
  const text = songCopy[lang];

  const videoId =
    lang === "uk"
      ? UKRAINIAN_VIDEO_ID
      : lang === "en" && englishVideo === "uk"
        ? UKRAINIAN_VIDEO_ID
        : RUSSIAN_VIDEO_ID;

  const playerTitle =
    lang === "en"
      ? `${text.playerTitle} — ${englishVideo === "uk" ? "Ukrainian version" : "Russian version"}`
      : text.playerTitle;

  return (
    <section className="arthurSong" aria-labelledby="arthur-song-title">
      <h2 id="arthur-song-title">{text.title}</h2>
      <p className="arthurSongDescription">{text.description}</p>

      {lang === "en" && (
        <div className="arthurSongLanguages" role="group" aria-label="Song language">
          <button
            type="button"
            className={englishVideo === "ru" ? "isActive" : undefined}
            aria-pressed={englishVideo === "ru"}
            onClick={() => setEnglishVideo("ru")}
          >
            Russian
          </button>
          <button
            type="button"
            className={englishVideo === "uk" ? "isActive" : undefined}
            aria-pressed={englishVideo === "uk"}
            onClick={() => setEnglishVideo("uk")}
          >
            Ukrainian
          </button>
        </div>
      )}

      <VideoFrame videoId={videoId} title={playerTitle} />
    </section>
  );
}
