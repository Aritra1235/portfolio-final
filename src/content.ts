export type Metric = {
  value: string
  label: string
  detail?: string
}

export type CaseStudySection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  note?: string
}

export type Project = {
  slug: string
  number: string
  type: string
  title: string
  summary: string
  description: string
  status: string
  audience: string
  timeline: string
  stack: string[]
  metrics?: Metric[]
  sections: CaseStudySection[]
  externalUrl?: string
  externalLabel?: string
  sourceUrl?: string
  gallery?: { src: string; alt: string; portrait?: boolean; wide?: boolean }[]
}

export const projects: Project[] = [
  {
    slug: 'music-platform',
    number: '01',
    type: 'Cross-platform product',
    title: 'Music Platform',
    summary: 'A self-hosted streaming system spanning web, Android, iOS, media processing, analytics, and the API beneath all of it.',
    description: 'The most ambitious project in this portfolio: a music service designed as one product across three clients. The repository is split across main, android, and ios branches, with a shared backend contract and platform-specific playback experiences.',
    status: 'Active development',
    audience: 'Listeners managing a private music library',
    timeline: 'Ongoing product build',
    stack: ['Next.js 15', 'Bun', 'Elysia', 'SQLite', 'Drizzle', 'Redis', 'S3', 'Kotlin', 'Jetpack Compose', 'Expo'],
    metrics: [
      { value: '3', label: 'product surfaces', detail: 'web, Android, iOS' },
      { value: '20+', label: 'core screens', detail: 'web client' },
      { value: '1', label: 'shared API', detail: 'across every client' },
    ],
    gallery: [
      { src: '/images/music-platform-web-02.webp', alt: 'Synced lyrics view in the Music Platform web player', wide: true },
      { src: '/images/music-platform-web-03.webp', alt: 'Listening statistics dashboard in the Music Platform web player', wide: true },
      { src: '/images/music-platform-android-03.webp', alt: 'Synced lyrics on the Music Platform Android client', portrait: true },
      { src: '/images/music-platform-android-04.webp', alt: 'Playback queue on the Music Platform Android client', portrait: true },
      { src: '/images/music-platform-android-05.webp', alt: 'Landscape now-playing view on Android', wide: true },
      { src: '/images/music-platform-android-06.webp', alt: 'Music journey statistics on Android', portrait: true },
      { src: '/images/music-platform-android-07.webp', alt: 'Listening activity and top songs on Android', portrait: true },
    ],
    sections: [
      {
        title: 'One library, three product surfaces',
        paragraphs: [
          'This project began as a web music player and grew into a full system. The main branch contains a Next.js client and Bun/Elysia API for albums, artists, playlists, songs, radio, lyrics, uploads, listening statistics, and administration. It is not a static catalogue: playback state, queues, search, library management, and media delivery all have to behave like parts of the same product.',
          'The Android and iOS branches test whether that product model survives outside the browser. The useful work is not simply recreating screens. Each client has its own lifecycle, storage model, audio APIs, navigation conventions, and expectations around background playback.'
        ],
      },
      {
        title: 'The service behind the player',
        paragraphs: [
          'The Bun/Elysia API is organised around feature modules for albums, artists, playlists, radio, songs, uploads, analytics, bandwidth, and administration. SQLite and Drizzle hold the catalogue, users, playlists, jobs, and listening data; Redis supports caching and shared auth state; S3 stores music and static assets. FFmpeg produces adaptive media while the web client uses Shaka Player for playback.',
          'Administration is part of the architecture rather than an afterthought. The web client includes upload flows, album and lyrics management, process visibility, and analytics. That makes the system operable as a real library instead of a polished player with no way to maintain what it shows.'
        ],
        bullets: [
          'Keep catalogue, playback, upload, and analytics concerns separate at the API boundary.',
          'Treat transcoding progress and failed jobs as user-visible product states.',
          'Use one service contract while allowing each platform to implement playback natively.',
        ],
      },
      {
        title: 'Native Android and iOS work',
        paragraphs: [
          'The Android branch is a native Kotlin application built with Jetpack Compose. Retrofit and OkHttp cover networking, Koin provides dependency injection, Coil handles artwork, DataStore persists settings, WorkManager flushes analytics, and Media3 powers playback and media sessions. Its structure separates remote data, domain models, use cases, view models, and Compose screens.',
          'The iOS branch uses Expo 54 and React Native with Expo Router, SecureStore, Expo Audio, haptics, system symbols, and glass effects. It implements authentication, album, artist and playlist detail, tabbed library browsing, search, full-player and persistent mini-player experiences against the same backend. The two branches make the platform trade-off explicit: share the product contract, not every line of interface code.'
        ],
      },
      {
        title: 'What this project is teaching me',
        paragraphs: [
          'Media software exposes integration problems quickly. A track can exist in the database and still fail at upload, transcoding, CDN delivery, queue transition, background playback, or analytics qualification. Building across clients forces each state to be named and handled instead of hidden inside a single happy-path demo.',
          'The next milestone is consistency: the same library and queue should feel dependable everywhere, while each platform still feels native. That means improving contract tests, playback recovery, offline tolerance, and the operational tooling around long-running media work.'
        ],
        note: 'Repository details were reviewed across the main, android, and ios branches. The source is currently private, so this case study focuses on architecture and shipped product behavior rather than linking to code.',
      },
    ],
  },
  {
    slug: 'scream',
    number: '02',
    type: 'Full-stack social product',
    title: 'Scream',
    summary: 'A social network built around posts, conversations, media, and the backend systems that make those interactions coherent.',
    description: 'Scream is a full-stack social platform with real user identity, profiles, threaded posts, likes, reposts, follows, and media uploads. It pairs a Next.js interface with a modular Bun/Elysia service.',
    status: 'Public repository',
    audience: 'People sharing short-form posts and media',
    timeline: '72 commits and evolving',
    stack: ['Next.js 15', 'React 19', 'Bun', 'Elysia', 'Drizzle', 'PostgreSQL', 'Better Auth', 'AWS S3'],
    gallery: [
      { src: '/images/scream-02.webp', alt: 'Scream user profile and activity feed', wide: true },
      { src: '/images/scream-03.webp', alt: 'Scream profile timeline with published posts', wide: true },
      { src: '/images/scream-04.webp', alt: 'Scream post composer overlay', wide: true },
    ],
    sections: [
      {
        title: 'Building the interaction graph',
        paragraphs: [
          'A social feed looks simple only after its relationships are working. Scream supports original posts, threaded replies, reposts, likes, and follows. Those actions affect more than one screen: they reshape the feed, profile counts, conversation context, and the controls a signed-in user sees.',
          'The product also includes onboarding and editable profiles with avatars, banners, bios, and display names. Authentication uses verified email and managed sessions, so identity is part of the core model rather than a placeholder around the interesting features.'
        ],
      },
      {
        title: 'A deliberately modular backend',
        paragraphs: [
          'The API runs on Bun with Elysia and is organised into feature modules. PostgreSQL and Drizzle model users, posts, media, likes, follows, and sessions. Valibot validates incoming data, Better Auth handles identity, and OpenAPI keeps the service contract inspectable.',
          'Media follows a separate path through AWS S3 and CDN delivery. The API issues 15-minute presigned PUT URLs for avatars, banners, post images, and video objects, then records their dimensions and relationships in PostgreSQL without exposing storage credentials to the browser.'
        ],
        bullets: [
          'Use Snowflake-style identifiers so records can be created without a single database sequence bottleneck.',
          'Model replies and reposts as relationships, not duplicated display content.',
          'Keep authentication, onboarding, and media upload isolated behind feature boundaries.',
        ],
      },
      {
        title: 'Observability as a product habit',
        paragraphs: [
          'The backend is instrumented with OpenTelemetry and sends operational data to Axiom. That matters in a social application because one user action can cross authentication, database queries, object storage, and feed assembly. A generic error message is not enough to explain which boundary failed.',
          'The goal is not to collect the most telemetry. It is to preserve enough context to connect a visible problem to the request and dependency that caused it, without leaking sensitive user data into diagnostics.'
        ],
      },
      {
        title: 'Where Scream goes next',
        paragraphs: [
          'The existing product loop is complete enough to test real interaction patterns. The next work is about quality under pressure: pagination that stays stable as the feed changes, stronger media processing, more deliberate abuse controls, and tests around concurrency-sensitive actions such as likes and follows.',
          'Scream is useful to me because it forces frontend polish and backend correctness into the same conversation. Neither side can compensate for the other when a social interaction feels wrong.'
        ],
      },
    ],
    sourceUrl: 'https://github.com/Aritra1235/scream',
  },
  {
    slug: 'apple-music-art-downloader',
    number: '03',
    type: 'Public utility',
    title: 'Apple Music Covers',
    summary: 'A public utility for retrieving high-resolution still and animated Apple Music artwork, including complete playlist cover exports.',
    description: 'What began as a shortcut for saving Apple Music artwork became a public service for tracks, albums, artists, and playlists. Paste a link, resolve the available artwork and video variants, then download the right asset with visible progress.',
    status: 'Live',
    audience: 'Music listeners and collectors',
    timeline: 'Iterative side project',
    stack: ['Next.js 15', 'React 19', 'Bun.serve', 'WebSockets', 'Redis', 'Prisma', 'PostgreSQL', 'OpenTelemetry'],
    metrics: [
      { value: '654', label: 'active users', detail: 'July 2026 · up 2.7%' },
      { value: '10K', label: 'events', detail: 'July 2026 · up 29.5%' },
      { value: '585', label: 'new users', detail: 'July 2026 · up 6.6%' },
    ],
    gallery: [
      { src: '/images/apple-music-covers-03.webp', alt: 'Album Art Downloader resolution selection dialog', wide: true },
    ],
    sections: [
      {
        title: 'One link, every useful artwork format',
        paragraphs: [
          'Apple Music artwork is easy to see and surprisingly awkward to save at its original quality—especially animated artwork delivered as HLS variants. The utility accepts Apple Music links, resolves still covers and animated streams, and exposes useful resolution and file-size choices instead of making the user inspect page data.',
          'The product has grown beyond single releases. It can resolve artist media and process an entire playlist into a downloadable ZIP, with resumable job state, cancellation, server-sent progress events, and an optional email when the archive is ready.'
        ],
      },
      {
        title: 'A Bun-native request pipeline',
        paragraphs: [
          'Next.js 15 and React 19 provide the interface. The separate backend is built directly on Bun.serve—there is no Express layer—and dispatches HTTP routes and WebSocket connections itself. WebSockets report video-download progress, while playlist archive jobs use server-sent events.',
          'Redis caches Apple Music responses, while Prisma and PostgreSQL persist response and cache records. OpenTelemetry traces inbound requests, route work, cache operations, Apple Music lookups, outbound HTTP, and WebSocket lifecycles; correlated OTLP logs make failures inspectable across the same request path.'
        ],
        bullets: [
          'Parse Apple Music HLS manifests and present animated artwork variants by resolution and size.',
          'Cache external metadata in Redis while retaining durable request records in PostgreSQL.',
          'Expose health checks for the database, token, Apple Music, filesystem, WebSockets, video service, and Redis.',
        ],
      },
      {
        title: 'From side project to public utility',
        paragraphs: [
          'In July 2026, the site served 654 active users, including 585 new users, and recorded 10K events. Compared with the previous period, active users increased 2.7%, new users increased 6.6%, and event activity increased 29.5%. The point is not growth for its own sake; it is evidence that even a deliberately small utility needs production-grade reliability once people depend on it.',
          'Across the analytics window from July 2023 through July 2026, the service reached 5.8K active users and recorded 84K events. Traffic is international: over the latest 90-day view, the largest audiences came from the United States, Mexico, Brazil, Canada, France, India, and the United Kingdom.'
        ],
      },
      {
        title: 'Next improvements',
        paragraphs: [
          'The best next steps are improvements to resilience rather than a larger feature list: clearer cache behavior, better explanations when artwork cannot be resolved, and stronger automated coverage across the browser, service, and external metadata boundary.',
          'I would keep the public interface calm even when a dependency is not. That is the standard a single-purpose utility has to meet.'
        ],
      },
    ],
    externalUrl: 'https://applemusic.aritra.ovh',
    externalLabel: 'Open live utility',
  },
  {
    slug: 'ocr-text-extraction-tool',
    number: '04',
    type: 'Workflow utility',
    title: 'OCR Text Extraction',
    summary: 'A screenshot-to-text workflow built to remove friction from a task that kept interrupting real work.',
    description: 'The project turns uploaded, dropped, or pasted images into inspectable text through two OCR modes. Its central design problem is making asynchronous extraction, usage limits, and machine-generated output understandable.',
    status: 'In active development',
    audience: 'Developers working from screenshots and references',
    timeline: 'Built around a recurring need',
    stack: ['Next.js 15', 'Bun', 'Elysia', 'Tesseract.js', 'SarvamAI', 'Drizzle', 'PostgreSQL', 'Better Auth'],
    sections: [
      {
        title: 'A tool born from repetition',
        paragraphs: [
          'Useful text was often trapped inside a screenshot: a code sample, an error message, or a note that could not be searched or copied. Extracting it manually was possible. Repeating that interruption was the actual problem.',
          'The interface therefore stays close to the job. Provide an image, see that the system is working, and receive text that remains easy to inspect before it is copied elsewhere.'
        ],
      },
      {
        title: 'Two OCR paths, one workflow',
        paragraphs: [
          'A Next.js 15 interface talks to a Bun/Elysia API. Standard mode performs local recognition with Tesseract.js; Pro mode sends the image to SarvamAI Vision for higher-quality extraction. The API returns a session ID immediately, and the browser polls a progress endpoint every 500 milliseconds until text or an error is available—there are no WebSockets in this project.',
          'Users can drag, browse, or paste an image, preview it, watch processing progress, and then copy or download the extracted text. Temporary upload files are removed after processing, while PostgreSQL retains the result metadata needed for usage tracking.'
        ],
        bullets: [
          'Standard OCR uses Tesseract.js; Pro OCR uses SarvamAI Vision.',
          'Better Auth supports accounts, sessions, email verification, and user-managed API keys.',
          'A credit system and IP-based daily limits separate authenticated usage from the free path.',
        ],
      },
      {
        title: 'The important boundaries',
        paragraphs: [
          'OCR work runs in the background after upload, with progress and results held briefly in memory. Failed jobs refund the user’s credit or anonymous IP allowance, and successful jobs store the OCR mode, file metadata, credit cost, and extracted text through Drizzle.',
          'The product also includes a usage dashboard, API-key management, credit reporting, and an OpenAPI endpoint. Scheduled jobs reset eligible user credits daily and clean expired in-memory rate-limit records.'
        ],
      },
      {
        title: 'Where it is going',
        paragraphs: [
          'The next milestone is a dependable core loop for people beyond my own workflow: clearer failure states, resilient task recovery, and a result view that makes corrections easy.',
          'I would rather make those fundamentals trustworthy before expanding it into a larger document-processing service.'
        ],
      },
    ],
    externalUrl: 'https://ocr.aritra.ovh',
    externalLabel: 'Try the OCR tool',
  },
]

export const skillGroups = [
  { title: 'Product engineering', skills: ['TypeScript', 'React', 'Next.js', 'Expo', 'Kotlin', 'Jetpack Compose'] },
  { title: 'Services & data', skills: ['Bun', 'Node.js', 'Elysia', 'PostgreSQL', 'Redis', 'Drizzle ORM'] },
  { title: 'Infrastructure', skills: ['Docker', 'Kubernetes', 'AWS', 'OpenTelemetry', 'Vercel', 'Oracle OCI'] },
]
