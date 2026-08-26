# Content parity and information recovery audit

Date: 23 August 2026  
Current application: Next.js App Router migration in this worktree  
Comparison source: commit `1999f81e3947f15db1cebdb2ae89a4f2087c11c3` and the matching `legacy/vite-app/` archive

## Scope and decision rules

The archived Vite application is the last complete pre-migration content source. The goal is not pixel or copy parity. The goal is to recover useful, supportable business information inside the current localized Next.js architecture while preserving the newer design, SEO model, product catalogue and route structure.

Content is recovered when it helps a buyer understand the company, container types, condition, ordering, delivery, returns or contact process. Content is omitted or softened when the source does not substantiate it, when it conflicts with another old page, or when publishing it could create a commercial or legal promise.

The site-wide contact number remains `+49 01512 4371427`, as most recently supplied by the business owner. Old telephone numbers are not restored.

## Implementation outcome

The recovery pass is implemented in the current Next.js worktree. It adds six-language buyer guidance to the home, catalogue, category, product, company, delivery, condition, conversion, FAQ and guide experiences. Cookie, complaint, warranty, accessibility and model-withdrawal routes are now localized, statically generated, included in the sitemap and linked from the expanded footer. Product specifications are rendered only when present in catalogue data; internal catalogue metadata is not exposed as customer-facing copy.

The production build generates 368 static pages. Type checking, linting, the translation audit and rendered production smoke tests pass. Desktop and 390-pixel mobile checks cover the homepage, product, category, contact and policy layouts, the language switcher, footer navigation and horizontal overflow.

## Route-by-route audit

| Current route | Archived equivalent | Current state | Valuable archived information to recover | Information to omit or qualify | Localization and SEO action |
| --- | --- | --- | --- | --- | --- |
| Home | `/` | Strong new branded landing page with hero, categories, products, benefits, process, depots and FAQ | Clear new-versus-used guidance, buying-help links and a concise route into condition and size guidance | Fixed delivery prices, response-time promises, unverifiable partnerships and unverified opening hours | Keep six localized home routes, canonical/hreflang metadata and existing performance-oriented server rendering |
| Catalogue | `/container-kaufen` | Better catalogue and filters than the archive | Post-catalogue buying guidance, condition/delivery links and category discovery | Archived mock shipping calculator and fixed freight prices | Redirect the old German URL; keep current localized catalogue routes and noindex filtered states |
| Product | `/container/:slug` | Product gallery, price, availability, basic dimensions, delivery and related products | All available catalogue fields: condition grade, colour, depot, maximum gross weight, payload, floor, lockbox, vents, forklift pockets, wind-and-watertight and cargo-worthy flags; links to delivery, condition, sizing and returns guidance | Invented shipping estimates, unavailable specifications or guarantees not present in the product data | Preserve Product JSON-LD, canonical/hreflang and six localized product paths; redirect the old product pattern |
| Container types | Home/category blocks | Category overview exists | Buying criteria and related guidance below category listings | Generic filler and unsupported suitability claims | Keep category indexable with localized metadata and add contextual internal links |
| Category | Archived category blocks | Product grids exist | Typical uses, what to check, size/condition/delivery prompts and neighbouring category links | Claims of universal suitability | Preserve localized category slugs and metadata |
| Buying guides | Scattered home sections | Four guide routes exist; German is strongest | Condition terminology, purchase process, delivery preparation, conversion options and related guide navigation | Legal or certification promises stated as absolutes | Give every locale equivalent useful guidance and retain indexable guide metadata |
| Quote | `/angebot-anfordern` | Localized enquiry form exists | Clear information checklist and next-step explanation | Guaranteed response times and automatic pricing | Redirect old URL and retain conversion-focused metadata |
| Conversions | `/containerumbau` | Localized route exists | Archived conversion sequence and option examples | Engineering feasibility promises before technical review | Redirect old URL; keep server-rendered localized copy |
| About | `/ueber-uns` | Too brief outside German | Founded in February 1983; new and used container activity; company/customer focus; condition, size, equipment and use-case selection; delivery coordination and three operating locations | Unverified shipping-line/leasing partnerships and unsupported market-leadership language | Replace generic translated filler with equivalent six-language company content; redirect old URL |
| Contact | `/kontakt` | Contact details, depots and form exist | Enquiry types, what information to include, company identity and service-policy links | `[VERIFY]` opening hours and 24-hour response claim | Add localized enquiry guidance; redirect old URL and keep Organization/contact data consistent |
| Delivery | `/lieferung-aufstellung` | Present but too short | Delivery method overview, access/ground/site preparation, handover and failed-delivery risk, expressed without unsupported measurements or prices | Fixed zone pricing, hard access dimensions that are not verified, included-service promises and automatic failed-delivery fees | Expand in six languages; old URL redirects to the localized page |
| Locations | `/standorte` | Dedicated depot page exists | Three depots and route into quote/contact | Old routing bug that rendered the About page | Preserve localized depot pages and Location metadata; redirect old URL |
| FAQ | `/faq` | Present but shallow outside German | Buying, condition, inspection, delivery, conversion, documentation, returns and contact questions | Response-time and payment promises | Restore useful questions in all languages and redirect the old URL |
| Condition guide | Archived condition section | Dedicated page exists | New, one-trip, used WWT, cargo-worthy, IICL and CSC terminology, carefully distinguished | Claims that a label alone guarantees suitability | Expand and link from home, category and product pages |
| Imprint | `/impressum` | Safe but minimal | Provider/contact structure and dispute-information prompt | Placeholder register/VAT/representative data | Keep unverified fields unpublished, retain launch-review notice and redirect old URL |
| Privacy | `/datenschutz` | Safe but minimal | Controller, server logs, enquiries/orders, cookie choices, processors, rights and contact | Unverified fixed retention periods | Restore operational coverage with GDPR-aware but non-promissory wording; redirect old URL |
| Terms | `/agb` | Safe but minimal | Scope, contract documents, pricing/payment document, delivery, condition, title, liability and governing terms | Unverified invoice terms, exact warranty periods and blanket legal conclusions | Restore structure with a clear legal-review notice; redirect old URL |
| Withdrawal | `/widerruf` | Safe but minimal | Consumer applicability, exercise process, return coordination and a separate model form | Blanket applicability, bespoke-container eligibility assumptions and unsupported return-cost figures | Add a separate localized model-form route and redirect old URL |
| Returns | `/rueckgabe-erstattung` | Too short | Delivery inspection, photo documentation, damage reporting, heavy-freight coordination and approved-return process | Contradictory archived 30-day/“no returns” rules and fixed processing deadlines | Expand in six languages and redirect old URL |
| Payments | `/zahlungsarten` | Too short | Quote/order-confirmation controls, invoice/reference handling, prepayment workflow where applicable and fraud-safe bank-detail verification | Credit-card/PayPal availability, 7/14-day invoice terms, deposits and placeholder bank details | Expand without promising specific methods; redirect old URL |
| Cookies | Privacy section only | Missing distinct discoverable page | Necessary versus optional storage, choice handling and contact route | Claims about consent tooling not implemented | Add localized cookie-policy routes and metadata; link from footer |
| Complaints | Returns/contact information | Missing distinct service route | What to report, evidence, acknowledgement and proposed-resolution process | Guaranteed outcomes or deadlines | Add localized complaint routes; link from contact, returns and footer |
| Warranty | Terms/condition fragments | Missing distinct buyer-help route | Difference between condition description, contractual agreement and statutory rights; reporting defects | Blanket warranties and invented durations | Add localized warranty/information routes; link from product and footer |
| Accessibility | None | Missing | Accessibility intent, known continuous-improvement status and an accessible contact channel | Compliance certification that has not been audited | Add localized accessibility statement and footer link |

## Navigation and internal-link findings

The current footer does not expose enough customer-service and policy coverage. It will be reorganized into Containers, Company, Customer service, Guides and Legal. The recovered routes must be reachable through ordinary HTML links, not only through the sitemap.

The following buyer journeys need explicit links:

1. Home → category → product → quote.
2. Product → condition guide / size guide / delivery / returns or warranty.
3. Contact → complaints / delivery / quote.
4. Returns → complaints / withdrawal / contact.
5. Footer → all customer-service and legal routes.

## Translation and metadata findings

The route system, language switcher, canonical URLs, hreflang alternates and localized product/category/guide slugs are structurally sound. Several non-German static pages still use short generic copy, so content depth is not yet equivalent across the six locales. Recovered sections must therefore be supplied for German, English, Dutch, Italian, Czech and Spanish rather than falling back to German or English.

New service and policy routes must be added to the centralized route map, static generation list, sitemap, language-switch resolution and localized metadata source. The migration must continue using server-rendered content and the existing Product structured data.

## Validation acceptance criteria

- Every archived public URL has a deliberate localized destination or is intentionally retired.
- All navigation and content links resolve without loops or missing routes.
- Every public content route has a localized title, description, canonical URL and hreflang set.
- Product pages render only specifications present in the catalogue data.
- No `[VERIFY]` markers, legacy phone numbers, fixed freight prices or unsupported payment/response promises reach production HTML.
- Type checking, linting, production build and rendered-page smoke tests pass.
- Major desktop and mobile pages receive a final visual check after the production server is restarted.
