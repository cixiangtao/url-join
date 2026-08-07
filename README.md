# @anys/url-join

A TypeScript utility for joining URL segments with automatic filtering of null/undefined values.

[Try the interactive demo](https://cixiangtao.github.io/url-join/) to explore URL segments, query parameters, normalization, and trailing slashes in the browser.

## Features

- 🚀 **TypeScript First**: Written in TypeScript with full type support
- 🧹 **Auto Filtering**: Automatically filters out `null`, `undefined`, and empty string values
- 🔧 **Flexible**: Supports strings, numbers, and mixed types
- ⚙️ **Configurable**: Options for trailing slashes, normalization, and query parameters
- 🛡️ **Protocol Safe**: Preserves URL protocols (http://, https://, etc.)
- 🔍 **Query Support**: Built-in query parameter handling with automatic encoding
- 📦 **Zero Dependencies**: No external dependencies
- 🌳 **Tree Shakable**: ESM and CJS builds with tree shaking support

## Installation

```bash
# Using pnpm
pnpm add @anys/url-join

# Using npm
npm install @anys/url-join

# Using yarn
yarn add @anys/url-join
```

## Usage

### Basic Usage

```typescript
import { urlJoin } from '@anys/url-join'

// Basic joining
urlJoin('api', 'v1', 'users')
// => 'api/v1/users'

// With protocol
urlJoin('https://api.example.com', 'v1', 'users')
// => 'https://api.example.com/v1/users'

// Auto filtering null/undefined
urlJoin('api', null, 'users', undefined, 'profile')
// => 'api/users/profile'

// With numbers
urlJoin('api', 'users', 123)
// => 'api/users/123'
```

### Advanced Usage

```typescript
// With options
urlJoin('api', 'users', { trailingSlash: true })
// => 'api/users/'

// Disable normalization
urlJoin('api//users', { normalize: false })
// => 'api//users'

// With query parameters
urlJoin('api', 'users', { query: { page: 1, limit: 10 } })
// => 'api/users?page=1&limit=10'

// Query with different types
urlJoin('api', 'search', { query: { q: 'hello world', active: true, tags: ['js', 'ts'] } })
// => 'api/search?q=hello%20world&active=true&tags=js&tags=ts'

// Merge with existing query
urlJoin('api/users?sort=name', { query: { page: 1 } })
// => 'api/users?sort=name&page=1'

// Complex example
urlJoin(
  'https://api.example.com/',
  '/v1/',
  null,
  'users/',
  123,
  undefined,
  '/profile',
  { trailingSlash: true, query: { include: 'avatar' } }
)
// => 'https://api.example.com/v1/users/123/profile/?include=avatar'
```

### Default Export

```typescript
import urlJoin from '@anys/url-join'

urlJoin('api', 'users')
// => 'api/users'
```

## API

The [GitHub Pages playground](https://cixiangtao.github.io/url-join/) runs the package's real implementation and updates its output and TypeScript snippet as you edit.

### `urlJoin(...segments, options?)`

Joins URL segments together, filtering out null/undefined values.

#### Parameters

- `segments`: `UrlSegment[]` - URL segments to join (string, number, null, or undefined)
- `options`: `UrlJoinOptions` - Optional configuration

#### Types

```typescript
type UrlSegment = string | number | null | undefined
type QueryValue = string | number | boolean | null | undefined
type QueryParams = Record<string, QueryValue | QueryValue[]>
```

#### Options

```typescript
interface UrlJoinOptions {
  /** Whether to add a trailing slash to the result */
  trailingSlash?: boolean
  /** Whether to normalize multiple slashes to single slash (default: true) */
  normalize?: boolean
  /** Query parameters to append to the URL */
  query?: QueryParams
}
```

#### Returns

`string` - The joined URL

## Examples

### API Endpoints

```typescript
const baseUrl = 'https://api.example.com'
const version = 'v1'
const userId = 123

const endpoint = urlJoin(baseUrl, version, 'users', userId, 'profile')
// => 'https://api.example.com/v1/users/123/profile'
```

### Conditional Segments

```typescript
const buildUrl = (base: string, path: string, id?: number) => {
  return urlJoin(base, path, id) // id will be filtered if undefined
}

buildUrl('api', 'users') // => 'api/users'
buildUrl('api', 'users', 123) // => 'api/users/123'
```

### File Paths

```typescript
const filePath = urlJoin('assets', 'images', 'avatar.png')
// => 'assets/images/avatar.png'

const absolutePath = urlJoin('/var', 'www', 'html', 'index.html')
// => '/var/www/html/index.html'
```

### Query Parameters

```typescript
// Basic query parameters
const searchUrl = urlJoin('api', 'search', { query: { q: 'typescript', page: 1 } })
// => 'api/search?q=typescript&page=1'

// Array values
const filterUrl = urlJoin('api', 'products', { query: { tags: ['electronics', 'mobile'] } })
// => 'api/products?tags=electronics&tags=mobile'

// Mixed types with null filtering
const complexUrl = urlJoin('api', 'users', {
  query: {
    active: true,
    role: 'admin',
    department: null, // will be filtered out
    permissions: ['read', 'write']
  }
})
// => 'api/users?active=true&role=admin&permissions=read&permissions=write'

// Merging with existing query
const existingQuery = 'api/search?sort=date'
const mergedUrl = urlJoin(existingQuery, { query: { page: 2, limit: 20 } })
// => 'api/search?sort=date&page=2&limit=20'
```

## Development

Use Node.js 24 and pnpm 11. The exact versions are declared in `.nvmrc` and `package.json`.

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm type-check

# Run the complete release gate
pnpm release:check
```

Release Please automatically maintains a release pull request from changes merged
into `master`. After a maintainer reviews its version, Changelog, and required CI
and merges that exact PR, GitHub Actions creates the tag, publishes the inspected
npm artifact through trusted publishing, and creates the matching GitHub Release.
See [RELEASING.md](./RELEASING.md).

## License

MIT © [cixiangtao](https://github.com/cixiangtao)
