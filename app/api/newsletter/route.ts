const BREVO_FORM_ACTION =
  "https://9bfc7f37.sibforms.com/serve/MUIFAApmT5fj474ePss9nlC9yMWNjcfgsRBMmI6nQVA16d5wuEhYj50ITfuFDxfxDzRc5_tp0hTKb0POHndNLDR04Iw8NMM2qiO7loSarrH1KGL9a6OqZAmg6gJlKXvSu5Pykn3nNv1Sr-uP5vW_SBLwqwXReMBqmMrPZR1MAaGmIoTxBl6EdkYKI4r26O6-BFPg1ESENRhIk8IYcg==";

type RequestBody = {
  email?: string;
  captchaToken?: string;
};

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  const email = body.email?.trim();
  const captchaToken = body.captchaToken?.trim();

  if (!email || !captchaToken) {
    return Response.json({ success: false }, { status: 400 });
  }

  const payload = new URLSearchParams({
    EMAIL: email,
    email_address_check: "",
    locale: "en",
    "g-recaptcha-response": captchaToken,
  });

  try {
    const brevoResponse = await fetch(BREVO_FORM_ACTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      body: payload.toString(),
      redirect: "manual",
    });

    const raw = await brevoResponse.text();

    let parsed: { success?: boolean } | null = null;
    try {
      parsed = JSON.parse(raw) as { success?: boolean };
    } catch {
      parsed = null;
    }

    const success = brevoResponse.ok && parsed?.success === true;

    if (!success) {
      console.error("Brevo newsletter submission failed", {
        status: brevoResponse.status,
        body: raw.slice(0, 1000),
      });
      return Response.json({ success: false }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Brevo newsletter request failed", error);
    return Response.json({ success: false }, { status: 502 });
  }
}
