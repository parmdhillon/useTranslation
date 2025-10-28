# Contributing to @mffl/use-translation

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

Please be respectful and constructive in all interactions. We're here to build something great together.

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check existing issues to avoid duplicates
2. Use the latest version of the library
3. Verify the issue is reproducible

When reporting a bug, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, React version)
- Minimal code example

### Suggesting Features

Feature suggestions are welcome! Please:
1. Check if the feature has been requested
2. Explain the use case clearly
3. Describe the proposed solution
4. Consider backward compatibility

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/mffl-quiz.git
   cd mffl-quiz/useTranslation
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, commented code
   - Follow existing code style
   - Add/update tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run build
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `refactor:` Code refactoring
   - `test:` Test updates
   - `chore:` Build/tooling changes

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a Pull Request on GitHub.

## Development Setup

### Prerequisites

- Node.js >= 16.0.0
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mffl-quiz.git
cd mffl-quiz/useTranslation

# Install dependencies
npm install

# Build the library
npm run build
```

### Project Structure

```
useTranslation/
├── src/              # Source code
│   ├── hooks/       # React hooks
│   ├── contexts/    # React contexts
│   ├── types/       # TypeScript types
│   └── utils/       # Utility functions
├── scripts/         # Build scripts
├── examples/        # Usage examples
├── docs/            # Documentation
└── dist/            # Built files (generated)
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Provide complete type definitions
- Avoid `any` types
- Use interfaces for public APIs

### React

- Use functional components
- Use hooks (not class components)
- Keep components focused and simple
- Extract complex logic to custom hooks

### Naming Conventions

- Components: `PascalCase` (e.g., `TranslationProvider`)
- Hooks: `camelCase` starting with `use` (e.g., `useTranslation`)
- Utilities: `camelCase` (e.g., `interpolate`)
- Types: `PascalCase` (e.g., `TranslationKey`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_LANGUAGE`)

### Comments

- Add JSDoc comments for public APIs
- Explain complex logic with inline comments
- Keep comments up to date with code changes

Example:
```typescript
/**
 * Interpolates variables in a translation string
 *
 * @param text - Translation text with {{variable}} placeholders
 * @param variables - Object with variable values
 * @returns Interpolated string
 *
 * @example
 * ```typescript
 * interpolate('Hello, {{name}}!', { name: 'John' })
 * // => 'Hello, John!'
 * ```
 */
export function interpolate(
  text: string,
  variables: Record<string, string | number>
): string {
  // Implementation...
}
```

## Testing

Currently, the library doesn't have automated tests. If you'd like to contribute tests, that would be highly valued!

Test areas that need coverage:
- Hook behavior
- Context provider
- Type generation scripts
- Hash generation scripts
- Utility functions

## Documentation

When adding features:
1. Update README.md if needed
2. Add examples to `examples/`
3. Update API documentation in `docs/`
4. Add inline code comments

## Performance Considerations

- Minimize bundle size impact
- Avoid unnecessary re-renders
- Use memoization appropriately
- Lazy load translations when possible

## Backward Compatibility

- Avoid breaking changes
- Use deprecation warnings before removing features
- Document migration paths for breaking changes
- Follow semantic versioning

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Build: `npm run build`
5. Publish: `npm publish`

## Questions?

- Open an issue for questions
- Check existing documentation
- Look at examples for usage patterns

Thank you for contributing! 🎉
