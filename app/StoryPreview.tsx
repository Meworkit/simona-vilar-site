import Image from "next/image";
import type { Lang } from "./content";
import type { StoryEntry } from "./stories";
import { storiesCopy, storyDisplayTitle } from "./stories";

// Excerpt-type Stories must show the actual beginning of the supplied
// literary text — no generated/synthetic lead paragraph. Non-excerpt
// ("story") entries may still carry their own editorial intro.
function previewParagraphs(story: StoryEntry, lang: Lang): string[] {
  if (story.type === "excerpt") {
    return story.body[lang].slice(0, 2);
  }
  const opening = story.preview[lang].trim();
  const continuation = story.body[lang]
    .slice(0, 2)
    .join(" ")
    .replace(/^\.{3}/, "")
    .trim();
  return [opening, continuation];
}

export function StoryPreview({
  story,
  lang,
  compact = false,
}: {
  story: StoryEntry;
  lang: Lang;
  compact?: boolean;
  bookContext?: boolean;
  featured?: boolean;
}) {
  const labels = storiesCopy[lang];
  const preview = previewParagraphs(story, lang);

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
          <a href={`/${lang}/stories/${story.slug}`}>{storyDisplayTitle(story, lang)}</a>
        </h3>
        <p className="storyPreviewText">
          {preview.map((paragraph, index) => (
            <span key={index}>{paragraph}</span>
          ))}
        </p>
        <a className="storyReadMore" href={`/${lang}/stories/${story.slug}`}>
          {labels.readMore} →
        </a>
      </div>
    </article>
  );
}
