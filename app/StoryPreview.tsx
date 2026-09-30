import Image from "next/image";
import type { Lang } from "./content";
import type { StoryEntry } from "./stories";
import { relatedBook, storiesCopy } from "./stories";

function editorialPreview(story: StoryEntry, lang: Lang) {
  const opening = story.preview[lang].trim();
  const continuation = story.body[lang]
    .slice(0, 2)
    .join(" ")
    .replace(/^\.{3}/, "")
    .trim();

  return { opening, continuation };
}

export function StoryPreview({
  story,
  lang,
  compact = false,
  bookContext = false,
}: {
  story: StoryEntry;
  lang: Lang;
  compact?: boolean;
  bookContext?: boolean;
  featured?: boolean;
}) {
  const labels = storiesCopy[lang];
  const related = relatedBook(story, lang);
  const preview = editorialPreview(story, lang);

  return (
    <article
      className={`storyPreview${compact ? " storyPreviewCompact" : ""}${story.imageHeight > story.imageWidth ? " storyPreviewPortrait" : ""}`}
    >
      <a className="storyPreviewImage" href={`/${lang}/stories/${story.slug}`}>
        <Image
          src={story.image}
          alt={story.imageAlt[lang]}
          width={story.imageWidth}
          height={story.imageHeight}
          sizes={compact ? "(max-width: 850px) 100vw, 45vw" : "(max-width: 850px) 100vw, 540px"}
        />
      </a>
      <div className="storyPreviewCopy">
        <h3>
          <a href={`/${lang}/stories/${story.slug}`}>{story.title[lang]}</a>
        </h3>
        <p className="storyPreviewText">
          <span>{preview.opening}</span>
          <span>{preview.continuation}</span>
        </p>
        {related && !bookContext && (
          <p className="storyBookReference">
            {labels.fromBook} «{related.title}»
          </p>
        )}
        <a className="storyReadMore" href={`/${lang}/stories/${story.slug}`}>
          {labels.readMore} →
        </a>
      </div>
    </article>
  );
}
