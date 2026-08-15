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
    stack: ['Next.js', 'Bun', 'Elysia', 'PostgreSQL', 'Redis', 'S3', 'Kotlin', 'Jetpack Compose', 'Expo'],
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
          'The API is organised around feature modules for albums, artists, playlists, radio, songs, uploads, analytics, and bandwidth. PostgreSQL and Drizzle hold the catalogue and application data, Redis supports fast shared state, and S3 stores media. FFmpeg and Shaka-compatible streaming paths handle the less visible part of the product: turning source files into media clients can play reliably.',
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
          'The iOS branch uses Expo and React Native with Expo Router, secure storage, native audio, haptics, system symbols, and glass effects. It implements authentication, collection detail, library flows, and a persistent mini-player against the same backend. The two branches make the platform trade-off explicit: share the product contract, not every line of interface code.'
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
    timeline: '67+ commits and evolving',
    stack: ['Next.js 16', 'React 19', 'Bun', 'Elysia', 'Drizzle', 'PostgreSQL', 'Better Auth', 'AWS S3'],
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
          'Media follows a separate path through AWS S3 and CDN delivery. Secure presigned uploads keep object-storage credentials out of the browser, while resize and optimisation steps keep the feed from treating every image like an unbounded file transfer.'
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
    title: 'Album Art Downloader',
    summary: 'A focused utility for retrieving high-resolution Apple Music artwork without turning a download into a scavenger hunt.',
    description: 'What began as a personal shortcut became a small public service. The interesting part is the clarity of the loop: paste a reference, resolve the asset, communicate progress, and deliver the right file.',
    status: 'Live',
    audience: 'Music listeners and collectors',
    timeline: 'Iterative side project',
    stack: ['Next.js', 'Express', 'WebSockets', 'PostgreSQL', 'OpenTelemetry'],
    metrics: [
      { value: '2.3K', label: 'active users', detail: 'dated snapshot' },
      { value: '32K', label: 'events', detail: 'dated snapshot' },
      { value: '2.3K', label: 'new users', detail: 'dated snapshot' },
    ],
    gallery: [
      { src: '/images/apple-music-covers-03.webp', alt: 'Album Art Downloader resolution selection dialog', wide: true },
    ],
    sections: [
      {
        title: 'A deliberately narrow problem',
        paragraphs: [
          'Album artwork is easy to see and surprisingly awkward to save at a useful resolution. The usual path involves finding the right release, digging through page data, and hoping the image is not a thumbnail. I wanted one obvious action: provide the album and receive the artwork.',
          'Keeping the scope narrow made room for the details users actually notice—clear input, visible progress, a predictable result, and a download that never leaves them wondering whether anything happened.'
        ],
      },
      {
        title: 'The request-and-result loop',
        paragraphs: [
          'Next.js provides the interface while Express handles the service layer. WebSockets carry status changes to the browser, PostgreSQL stores durable application data, and OpenTelemetry makes failures across external lookups diagnosable.',
          'The browser never needs to understand that pipeline. It only needs honest state: the request was accepted, the artwork is being resolved, the result is ready, or something specific prevented completion.'
        ],
        bullets: [
          'Make the first action understandable without setup instructions.',
          'Treat progress feedback as part of the product.',
          'Keep external lookups observable because their failures are outside the app’s control.',
        ],
      },
      {
        title: 'What usage changed',
        paragraphs: [
          'An analytics snapshot recorded 286 active users, 282 new users, and 3.3K events. The numbers are not a growth claim; they are evidence that a tiny side project becomes a reliability problem as soon as other people depend on it.',
          'Real traffic shifted the priorities toward legible errors, input boundaries, caching, and enough operational context to reproduce failures that never happen on the developer’s machine.'
        ],
        note: 'The metrics are a dated analytics snapshot and are intentionally labelled that way.',
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
    description: 'The project turns images containing code, errors, or notes into inspectable text. Its central design problem is making a slow, imperfect operation feel transparent and safe to reuse.',
    status: 'In active development',
    audience: 'Developers working from screenshots and references',
    timeline: 'Built around a recurring need',
    stack: ['Next.js', 'Bun', 'WebSockets', 'PostgreSQL', 'OpenTelemetry'],
    sections: [
      {
        title: 'A tool born from repetition',
        paragraphs: [
          'Useful text was often trapped inside a screenshot: a code sample, an error message, or a note that could not be searched or copied. Extracting it manually was possible. Repeating that interruption was the actual problem.',
          'The interface therefore stays close to the job. Provide an image, see that the system is working, and receive text that remains easy to inspect before it is copied elsewhere.'
        ],
      },
      {
        title: 'Designing for asynchronous work',
        paragraphs: [
          'Image processing is not instantaneous, so the interface treats extraction as a task rather than pretending it is a synchronous form submission. A Next.js client and Bun service communicate progress over WebSockets, while PostgreSQL persists job state and OpenTelemetry traces the request path.',
          'The user’s mental model is “read this image.” The system’s model is accepted input, processing, status changes, and a result. Product copy and reliable state transitions are what connect those models.'
        ],
        bullets: [
          'Show the processing stage instead of hiding all work behind a spinner.',
          'Keep output inspectable so recognition mistakes are caught before reuse.',
          'Trace failures across the client and service boundary.',
        ],
      },
      {
        title: 'The important boundaries',
        paragraphs: [
          'The difficult questions are about limits: upload size, retention, long-running jobs, and images that are valid but produce poor text. Each needs an explicit product response and a corresponding system state.',
          'Instrumentation is useful here because it shortens the distance between a user saying “it failed” and a useful explanation. It also shows where time is spent without exposing the uploaded content itself.'
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
