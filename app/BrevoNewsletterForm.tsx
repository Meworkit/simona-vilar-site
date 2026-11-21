type Props = {
  title: string;
};

// Brevo's own hosted signup page, embedded via the OFFICIAL iframe embed
// code (Marketing -> Forms -> Website Newsletter RU -> Share -> Embed ->
// Iframe tab in the Brevo dashboard). Copied verbatim, not reconstructed.
//
// Brevo owns everything inside this iframe: field validation, the
// reCAPTCHA challenge, the double opt-in submit, and the success/error
// messages. None of that logic, nor any Brevo script, runs in this
// document's own React tree, so there is nothing here for React to
// conflict with and nothing for us to keep in sync with Brevo's
// undocumented main.js behavior.
//
// TECHNICAL PREVIEW SCOPE: the form and list behind this URL are Russian
// only (Brevo form "Website Newsletter RU" -> list "Simona Vilar
// Newsletter RU"). This component is rendered on all three site languages
// (ru/uk/en) today, same as before this change -- that is pre-existing
// scope, not something this patch adds or fixes. For production,
// separate RU/UK/EN Brevo forms (feeding the same or separate lists) are
// recommended instead of showing the Russian form on every language.
const BREVO_IFRAME_SRC =
  "https://9bfc7f37.sibforms.com/v2/serve/MUIFAApmT5fj474ePss9nlC9yMWNjcfgsRBMmI6nQVA16d5wuEhYj50ITfuFDxfxDzRc5_tp0hTKb0POHndNLDR04Iw8NMM2qiO7loSarrH1KGL9a6OqZAmg6gJlKXvSu5Pykn3nNv1Sr-uP5vW_SBLwqwXReMBqmMrPZR1MAaGmIoTxBl6EdkYKI4r26O6-BFPg1ESENRhIk8IYcg==";

export function BrevoNewsletterForm({ title }: Props) {
  return (
    <div className="newsletterBrevoContainer">
      <iframe
        className="newsletterBrevoIframe"
        src={BREVO_IFRAME_SRC}
        title={title}
        loading="lazy"
        scrolling="no"
        frameBorder={0}
      />
    </div>
  );
}
