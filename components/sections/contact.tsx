import { MaskedText } from "@/components/motion/masked-text";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { RichText } from "@/components/ui/rich-text";
import { contact, navItems, person, sections } from "@/content/site";

const ordinal = navItems.find((item) => item.id === "contact")?.ordinal ?? "04";

const channels = [
  { label: "GitHub", value: contact.github.handle, href: contact.github.url },
  {
    label: "LinkedIn",
    value: contact.linkedin.handle,
    href: contact.linkedin.url,
  },
  { label: "Phone", value: contact.phone, href: `tel:${contact.phoneHref}` },
] as const;

/**
 * §04 — Contact.
 *
 * The page ends the way it began: hard facts, set large. The email is the
 * single largest interactive target on the site, which is the point.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-1 pt-(--section-y)"
    >
      <div className="shell">
        <div data-rule-draw className="h-px w-full bg-[var(--edge)]" aria-hidden />
        <p className="t-meta flex items-baseline gap-3 pt-4">
          <span className="text-signal">§{ordinal}</span>
          <span>{sections.contact.label}</span>
        </p>
      </div>

      <div className="shell pt-16 pb-20 md:pt-24 md:pb-28">
        <h2 id="contact-heading" className="t-h1 max-w-[16ch] text-balance">
          {sections.contact.titleLines.map((line, index) => (
            <MaskedText key={index}>
              <RichText parts={line} />
            </MaskedText>
          ))}
        </h2>

        <div className="grid gap-x-8 gap-y-14 pt-16 md:grid-cols-12 md:pt-20">
          {/* ── Primary channel ───────────────────────────────────── */}
          <div className="col-span-full flex flex-col gap-6 md:col-span-7">
            <p className="t-meta-sm text-fg-4">Email</p>
            <MagneticLink
              href={`mailto:${contact.email}`}
              className="t-h2 inline-flex w-fit max-w-full items-baseline gap-3 break-all text-fg-1"
            >
              {contact.email}
            </MagneticLink>
            <p className="t-body max-w-[46ch]">{contact.note}</p>
          </div>

          {/* ── Secondary channels ────────────────────────────────── */}
          <dl
            data-reveal-batch
            className="col-span-full flex flex-col md:col-span-4 md:col-start-9"
          >
            {channels.map((channel) => (
              <div
                key={channel.label}
                className="group/row flex items-baseline justify-between gap-6 border-t border-[var(--edge)] py-5"
              >
                <dt className="t-meta-sm text-fg-4">{channel.label}</dt>
                <dd>
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="link-draw t-mono text-fg-1"
                  >
                    {channel.value}
                    {channel.href.startsWith("http") ? (
                      <span aria-hidden className="pl-2 text-fg-4 transition-colors group-hover/row:text-signal">
                        ↗
                      </span>
                    ) : null}
                  </a>
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 border-t border-b border-[var(--edge)] py-5">
              <dt className="t-meta-sm text-fg-4">Location</dt>
              <dd className="t-mono text-fg-2">{person.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
