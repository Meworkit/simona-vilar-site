import Image from "next/image";
import type { Lang } from "./content";
import type { StoryEntry } from "./stories";
import { relatedBook, storiesCopy, storyTypeLabel } from "./stories";

export function StoryPreview({
  story,
  lang,
  compact = false,
  bookContext = false,
  featured = false,
}: {
  story: StoryEntry;
  lang: Lang;
  compact?: boolean;
  bookContext?: boolean;
  featured?: boolean;
}) {
  const labels = storiesCopy[lang];
  const related = relatedBook(story, lang);

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
        {!bookContext && <p className="storyType">{storyTypeLabel(story, lang)}</p>}
        <h3>
          <a href={`/${lang}/stories/${story.slug}`}>{story.title[lang]}</a>
        </h3>
        <p className="storyPreviewText">{story.preview[lang]}</p>
        {featured && story.homepageExtra && (
          <p className="storyPreviewExtra">{story.homepageExtra[lang]}</p>
        )}
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
