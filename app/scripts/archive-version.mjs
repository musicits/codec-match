// 특정 커밋 시점의 빌드 결과를 저장소 루트의 /<버전>/ 으로 복사해 보관합니다.
//
//   node scripts/archive-version.mjs v1 643a728
//
// 보관본은 그 시점 그대로 동작하되, 두 가지만 덧붙입니다.
//   1. robots noindex — 검색엔진이 최신본과 중복으로 색인하지 않도록
//   2. 상단 안내 배너 — 방문자가 옛 버전을 최신본으로 착각하지 않도록
import { execFileSync } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const [version, ref] = process.argv.slice(2)
if (!version || !ref) {
  console.error('사용법: node scripts/archive-version.mjs <버전> <커밋>   예) v1 643a728')
  process.exit(1)
}
if (!/^v\d+$/.test(version)) {
  console.error(`버전 이름은 v1, v2 형태여야 합니다: "${version}"`)
  process.exit(1)
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const git = (...args) => execFileSync('git', args, { cwd: repoRoot, maxBuffer: 64 * 1024 * 1024 })

// 그 시점의 배포 파일만 추립니다. app/ 소스와 문서는 제외합니다.
const tracked = git('ls-tree', '-r', '--name-only', ref).toString().trim().split('\n')
const files = tracked.filter(
  (file) => file === 'index.html' || file === 'og-image.png' || file.startsWith('assets/'),
)
if (!files.includes('index.html')) {
  console.error(`${ref} 에 index.html 이 없습니다. 배포 커밋이 맞는지 확인하세요.`)
  process.exit(1)
}

const outDir = path.join(repoRoot, version)
await rm(outDir, { recursive: true, force: true })

for (const file of files) {
  const target = path.join(outDir, file)
  await mkdir(path.dirname(target), { recursive: true })
  let contents = git('show', `${ref}:${file}`)

  if (file === 'index.html') {
    contents = decorate(contents.toString(), version)
  }
  await writeFile(target, contents)
}

console.log(`${version} <- ${ref} · ${files.length}개 파일 -> ${path.relative(repoRoot, outDir)}/`)

function decorate(html, label) {
  const banner = `<div class="archive-banner">이 페이지는 보관된 <b>${label}</b> 버전입니다 · <a href="../">최신 버전 보기 →</a></div>`
  const bannerStyle = `<style>
      .archive-banner{position:sticky;top:0;z-index:99;padding:10px 16px;background:#dffb51;color:#151815;
        font:500 13px/1.5 "Noto Sans KR",sans-serif;text-align:center}
      .archive-banner a{color:#151815;font-weight:700}
    </style>`

  return html
    .replace(/<meta charset="UTF-8" \/>/i, `<meta charset="UTF-8" />\n    <meta name="robots" content="noindex" />`)
    .replace('</head>', `${bannerStyle}\n  </head>`)
    .replace(/<body>/i, `<body>\n    ${banner}`)
}
