# Publishing Guide

Step-by-step guide for publishing @mffl/use-translation to npm.

## Pre-Publishing Checklist

- [ ] All source files are complete
- [ ] Documentation is up to date
- [ ] Examples work correctly
- [ ] Version is updated in package.json
- [ ] CHANGELOG.md is updated
- [ ] All files compile without errors
- [ ] README.md is complete
- [ ] LICENSE file is present

## Setup

### 1. Update package.json

Update the following fields in [package.json](./package.json):

```json
{
  "name": "@mffl/use-translation",
  "version": "1.0.0",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/parmdhillon/mffl-quiz.git",
    "directory": "useTranslation"
  },
  "bugs": {
    "url": "https://github.com/parmdhillon/mffl-quiz/issues"
  },
  "homepage": "https://github.com/parmdhillon/mffl-quiz/tree/main/useTranslation#readme"
}
```

### 2. Build the Package

```bash
cd useTranslation
npm install
npm run build
```

This creates:

- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES Module build
- `dist/index.d.ts` - TypeScript definitions

### 3. Test Locally

Test the package locally before publishing:

```bash
# In the useTranslation directory
npm pack
```

This creates a `.tgz` file. Install it in a test project:

```bash
# In your test project
npm install /path/to/mffl-use-translation-1.0.0.tgz
```

### 4. Login to npm

```bash
npm login
```

Enter your npm credentials.

## Publishing

### First-Time Publishing

```bash
npm publish --access public
```

Note: Use `--access public` for scoped packages (@mffl/use-translation).

### Subsequent Publishes

1. **Update version** in package.json:

   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Build**:

   ```bash
   npm run build
   ```

3. **Publish**:
   ```bash
   npm publish
   ```

## Semantic Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.x): Bug fixes, no breaking changes
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

## Creating Releases

### On GitHub

1. Go to repository → Releases
2. Click "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0`
5. Description: Copy from CHANGELOG.md
6. Publish release

### Automated with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: |
          cd useTranslation
          npm install

      - name: Build
        run: |
          cd useTranslation
          npm run build

      - name: Publish to npm
        run: |
          cd useTranslation
          npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Post-Publishing

### 1. Verify Package

Check on npm:

```
https://www.npmjs.com/package/@mffl/use-translation
```

### 2. Test Installation

Install in a fresh project:

```bash
npm install @mffl/use-translation
```

### 3. Update Documentation

Ensure all links point to the published package.

### 4. Announce

- Update README with npm badge
- Post on social media
- Update project documentation

## Troubleshooting

### Publishing Fails

**Error: Package already exists**

- Version is already published
- Update version and try again

**Error: You must sign in**

- Run `npm login`
- Verify credentials

**Error: No access**

- Check npm account has publish rights
- For scoped packages, use `--access public`

### Package Not Found After Publishing

- Wait a few minutes for npm to index
- Clear npm cache: `npm cache clean --force`
- Check package name is correct

### Types Not Working

- Ensure `types` field in package.json points to correct file
- Verify `.d.ts` files are in `dist/`
- Check `tsconfig.json` includes declaration files

## Unpublishing

⚠️ Use with caution! Unpublishing is permanent.

```bash
# Unpublish specific version
npm unpublish @mffl/use-translation@1.0.0

# Unpublish entire package (within 72 hours of publishing)
npm unpublish @mffl/use-translation --force
```

Note: npm doesn't allow unpublishing after 72 hours if the package has dependents.

## Best Practices

1. **Always test locally** before publishing
2. **Update CHANGELOG.md** with every release
3. **Use semantic versioning** correctly
4. **Tag releases** in git
5. **Write migration guides** for breaking changes
6. **Keep README updated** with latest usage
7. **Respond to issues** promptly
8. **Monitor dependencies** for updates

## Maintaining the Package

### Regular Tasks

- Review and respond to issues
- Merge pull requests
- Update dependencies
- Fix security vulnerabilities
- Improve documentation
- Add new features based on feedback

### Security

- Run `npm audit` regularly
- Update dependencies with security fixes
- Report vulnerabilities responsibly

### Deprecation

If you need to deprecate a version:

```bash
npm deprecate @mffl/use-translation@1.0.0 "This version has a critical bug. Please upgrade to 1.0.1"
```

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Creating and Publishing Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [Package.json Documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

---

Ready to publish? Make sure you've completed the checklist at the top! 🚀
