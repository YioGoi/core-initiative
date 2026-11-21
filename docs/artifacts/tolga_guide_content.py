"""Agreed direction and open decisions for the English project brief."""

DATE = '21 November 2026'

SUBTITLE = 'Concept and architecture notes for Tolga'

BRANDS = [('Core Initiative',
  'coreinitiative.nl',
  'Shared direction, specialist brands, and products in one connected family.',
  '#355c50'),
 ('Construct', 'construct.coreinitiative.nl', 'Websites and e-commerce experiences.', '#496b8c'),
 ('Cookie', 'cookie.coreinitiative.nl', 'Brand identity, interfaces, and digital experience design.', '#b65270'),
 ('Tool', 'tool.coreinitiative.nl', 'Custom software, applications, and working systems.', '#6a6389'),
 ('Agent', 'agent.coreinitiative.nl', 'Collaborating AI agents, integrations, and automation.', '#317c7b'),
 ('Reflection', 'reflection.coreinitiative.nl', 'SEO, AEO, content, and search visibility.', '#877231'),
 ('Spoon',
  'spoon.coreinitiative.nl',
  'Art, craft, music, video, images, games, and creative web tools.',
  '#b96b43')]

PAGES = [{'title': 'Core Initiative and six specialist brands',
  'kicker': '01 / CONCEPT AND BRAND MAP',
  'blocks': [('lead', 'Core Initiative sits at the center of six boutique specialist brands.'),
             ('p',
              'Each brand has its own site and character. A shared origin, approach to making, and connected '
              'areas of expertise bring the family together. The names draw on The Matrix and Tool; the '
              'seven-circle relationship follows the Seed of Life idea.'),
             ('p',
              'The first goal is to reach people with small web and software needs in the Netherlands, while '
              'developing our own products and measuring visibility and enquiries.'),
             ('diagram', None),
             ('brands', None),
             ('note',
              'Current status: coreinitiative.nl is registered. The seven names and target subdomains are '
              'selected. The GitHub monorepo contains runnable Core and Construct starters and shared config. '
              'Backend services and production deployment are planned.')]},
 {'title': 'One family, distinct visual worlds',
  'kicker': '02 / ART DIRECTION AND STYLE GUIDES',
  'blocks': [('lead',
              'We want the confidence of an established business, the character of a boutique studio, and the '
              'energy of making things. Each site gets its own art direction, connected through a few '
              'recognizable family details.'),
             ('h', 'Agreed visual direction'),
             ('ul',
              ['A separate style guide for each brand: fonts, colors, grids, spacing, surfaces, shadows, and '
               'motion.',
               'Strong transitions and considered scroll narratives, especially for design and creative '
               'production. Motion should express the work and the idea behind the brand.',
               '<b>Construct:</b> Blue-gray, structural, spatial, and masculine as an initial direction.',
               '<b>Cookie:</b> Red moving toward pink; warm, caring, sensory, and feminine as an initial '
               'direction.']),
             ('h', 'Proposed family standards'),
             ('table',
              (['Potential shared standards', 'Brand-specific decisions'],
               [['Core link and a small family signature', 'Logo interpretation, typography, and palette.'],
                ['Clear language selection and contact behavior',
                 'Page composition, navigation, and tone of voice.'],
                ['Meaningful design token names', 'Spacing scales, shadows, textures, and corner shapes.'],
                ['Accessibility, mobile support, and performance',
                 'Transitions, scroll scenes, and interaction choreography.']])),
             ('p',
              "A small Core signature and a 'Part of Core Initiative' link can connect the different visual "
              'worlds. Seed of Life is a candidate for the shared mark. The final logo and shared visual '
              'constants are still open.'),
             ('note',
              'Design note: a direction board, one sample screen, and a small style guide can help evaluate the '
              'family resemblance early. The colors in this brief are presentation choices, not final palettes '
              'for the other brands.')]},
 {'title': 'Shared foundations behind the sites',
  'kicker': '03 / TECHNICAL ARCHITECTURE',
  'blocks': [('lead',
              'Next.js brand sites, a shared ASP.NET Core backend, and a simple enquiry dashboard built with our '
              'own components. The initial goal is to keep incoming interest visible in one place.'),
             ('architecture', None),
             ('h', 'Agreed decisions'),
             ('ul',
              ['<b>Frontend:</b> Next.js. Dutch by default, with English and Turkish versions.',
               '<b>Backend:</b> ASP.NET Core. One application for shared form intake, records, and enquiry '
               'management.',
               '<b>Dashboard:</b> Our own interface, with team sign-in, a table, record details, notes, and '
               'status tracking.',
               '<b>Infrastructure:</b> No Supabase in the initial plan.']),
             ('h', 'Application structure'),
             ('p',
              'One monorepo contains independent site applications and shared code in common/. Core and Construct '
              'starters are implemented. The planned backend can separate contact intake, enquiries, and email '
              'into modules. The database engine is open; PostgreSQL is a candidate.'),
             ('note',
              'This diagram shows the proposed operations flow. The backend, dashboard, database, and email '
              'service are not implemented yet. Node.js remains an option for specialized tools when needed.')]},
 {'title': 'From a message to a tracked enquiry',
  'kicker': '04 / FORMS, EMAIL, AND THE DASHBOARD',
  'blocks': [('lead',
              'People can reach us through each brand. Forms feed a shared record; phone calls and direct emails '
              'can be entered manually in the first version.'),
             ('h', 'Proposed form flow'),
             ('ol',
              ['Collect name, email, and message; phone is optional. Include the originating brand, language, and '
               'source page.',
               'Validate on the server and apply basic spam controls. Persist the enquiry and the notification '
               'job.',
               'Confirm receipt after the record is saved. Send the notification and retry temporary email '
               'failures.']),
             ('p',
              'Handle duplicate submissions. If email delivery fails, the enquiry remains in the dashboard. Keep '
              'private keys on the server and validate the submitted brand against the configured brand '
              'registry.'),
             ('h', 'Initial dashboard scope'),
             ('table',
              (['Table columns', 'Record details and actions'],
               [['Date, brand, person / business, channel', 'Message and contact information.'],
                ['Status, owner, follow-up date', 'Add notes and update the status or follow-up date.'],
                ['Brand / status filters and search', 'Add a record manually for a phone call or email.']])),
             ('p',
              '<b>Example statuses:</b> New / Discussing / Proposal sent / Completed / Closed. Final status names '
              'and the point at which an enquiry becomes a project remain open.'),
             ('h', 'Email setup'),
             ('ul',
              ['<b>Brand addresses:</b> construct@coreinitiative.nl, cookie@coreinitiative.nl, and similar '
               'addresses. A shared inbox is an initial option.',
               '<b>Form notifications:</b> Send from our own verified address and use the visitor address as '
               'Reply-To. An acknowledgement email is an optional addition.',
               '<b>Human correspondence:</b> We need to reply from the relevant brand address. The mailbox '
               'provider and automated sending service are still open.']),
             ('note',
              'The first dashboard is restricted to the team through authentication and authorization. Automatic '
              'matching between mailbox conversations and enquiry records can be added when needed.')]},
 {'title': 'Products, tools, and visibility',
  'kicker': '05 / FROM PRODUCTION TO DISCOVERY',
  'blocks': [('lead',
              'Our own applications and useful small tools give this structure a place to produce real work. What '
              'we learn and the results we measure can feed the services we eventually offer clients.'),
             ('h', 'Proposed product placement'),
             ('ul',
              ['<a href="https://www.yigit-dogan.dev/projects#mind-palace"><u><b>Mind Palace</b></u></a>: Can be '
               'showcased through Tool while keeping its own product identity.',
               '<a href="https://www.yigit-dogan.dev/projects#ai-team"><u><b>AI Team</b></u></a>: Can connect to '
               'Agent and demonstrate the idea of collaborating agents.',
               '<b>Spoon:</b> A workshop for images, video, music, games, and creative web tools. HTML-to-image '
               'conversion is one idea to explore.']),
             ('p',
              'Product users, accounts, and data stay within their own boundaries. Shared operations services can '
              'be introduced where useful. Long-running image or video work may need a queue, background '
              'processing, file retention rules, and usage limits.'),
             ('h', 'SEO and AEO approach'),
             ('ul',
              ['Each brand develops its own expertise, audience, and original content. Related projects and '
               'services link to one another where useful.',
               'Crawlable content, page titles, canonical URLs, sitemaps, mobile performance, and correctly '
               'matched language versions form the shared technical foundation.',
               'Links can support discovery and relevance signals. Connecting seven sites does not automatically '
               'produce a ranking advantage. [1]',
               'SEO fundamentals also apply to Google AI search features. For AEO, focus on clear answers, '
               'reliable content, and understandable expertise. [2]']),
             ('p',
              'Google generally groups subdomains with the root domain for search-result diversity; we cannot '
              'assume seven separate positions for the same query. [1] Match language versions with reciprocal '
              'hreflang links. [3]'),
             ('note',
              'Measurement: track search visibility, visits, tool usage, and contact enquiries separately. A tool '
              'user and a potential service client may arrive with different needs.'),
             ('references',
              [('[1] Google ranking systems',
                'https://developers.google.com/search/docs/appearance/ranking-systems-guide'),
               ('[2] Google AI search guidance',
                'https://developers.google.com/search/docs/appearance/ai-features'),
               ('[3] Matching language versions',
                'https://developers.google.com/search/docs/specialty/international/localized-versions')])]},
 {'title': 'Open technical and creative decisions',
  'kicker': '06 / DETAILS STILL TO CHOOSE',
  'blocks': [('lead',
              'The main direction is set. These details remain open for discussion with Tolga, based on technical '
              'preferences, cost, and how we want to work.'),
             ('table',
              (['Topic', 'Notes'],
               [['Database',
                 'PostgreSQL is a candidate. Choose the engine, hosting, migrations, and backup strategy. Durable '
                 'enquiry records are the core requirement.'],
                ['Hosting and deployment',
                 'Vercel is an option for Next.js. ASP.NET Core hosting needs a separate choice. The domain is '
                 'registered; DNS and production deployment come next.'],
                ['Email',
                 'Brand addresses, a shared inbox, and replies from those addresses. Resend is a candidate for '
                 'automated sending; no provider is selected.'],
                ['Dashboard and access',
                 'Authentication method, team accounts, final status names, follow-up reminders, and message '
                 'retention.'],
                ['Design standards',
                 'Family signature and shared constants; brand fonts, palettes, motion direction, and the Seed of '
                 'Life mark.'],
                ['Working structure',
                 'The monorepo is established. Shared component contracts, initial publication scope, and content '
                 'editing workflow are open.']])),
             ('h', 'Scope of the first operational release'),
             ('p',
              'Sites explaining the specialisms, a shared contact flow, and a simple enquiry dashboard. The first '
              'need is to notice and follow up on incoming interest. Product infrastructure, deeper email '
              'integrations, and heavier creative tools can grow with their own requirements.'),
             ('h', 'Small operational details to plan'),
             ('ul',
              ['Separate development and production; manage secrets and data access.',
               'Detect failed notifications and define database backup and restore procedures.',
               'Budget hosting, email, file storage, and AI usage together.']),
             ('references',
              [('Repository and README', 'https://github.com/YioGoi/core-initiative'),
               ('Developer onboarding',
                'https://github.com/YioGoi/core-initiative/blob/main/docs/onboarding.md')])]}]

ARCH = {'width': 510,
 'height': 246,
 'nodes': [('sites', 0, 10, 146, 43, '7 brand sites', 'Next.js / NL · EN · TR', False),
           ('api', 182, 10, 146, 43, 'Shared API', 'ASP.NET Core', True),
           ('db', 364, 10, 146, 43, 'Durable records', 'Database engine open', False),
           ('phone', 0, 113, 146, 43, 'Phone / email', 'Manual entry in version one', False),
           ('panel', 182, 113, 146, 43, 'Enquiry dashboard', 'Next.js / team sign-in', False),
           ('mailjob', 364, 113, 146, 43, 'Notification delivery', 'After recording / retry on failure', False),
           ('inbox', 364, 198, 146, 43, 'Team inbox', 'Provider open', False)],
 'edges': [([(146, 31.5), (182, 31.5)], None),
           ([(328, 31.5), (364, 31.5)], None),
           ([(255, 113), (255, 53)], 'authenticated'),
           ([(146, 134.5), (182, 134.5)], None),
           ([(437, 53), (437, 113)], 'after recording'),
           ([(437, 156), (437, 198)], None)]}
