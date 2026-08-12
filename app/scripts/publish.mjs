// dist/ 빌드 결과를 저장소 루트로 복사합니다.
// GitHub Pages 가 main 브랜치 루트를 서빙하기 때문에 필요한 단계입니다.
import { cp, rm, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(here, '..', 'dist')
const repoRoot = path.resolve(here, '..', '..')

// 해시가 바뀐 옛 번들이 남지 않도록 assets 는 통째로 갈아끼웁니다.
await rm(path.join(repoRoot, 'assets'), { recursive: true, force: true })
await cp(dist, repoRoot, { recursive: true })

const files = await readdir(path.join(repoRoot, 'assets'))
console.log(`published -> ${repoRoot}`)
console.log(`  index.html + assets/{${files.join(', ')}}`)
