# Task Manager Test

TypeScript-based task management application for testing ProjectScout AI Agent.

## Features

- ✅ Create, read, update, delete tasks
- ✅ Task filtering by status, priority, assignee, tags
- ✅ Date range filtering
- ✅ Event subscription system
- ✅ Input validation and sanitization

## Installation

```bash
npm install
```

## Usage

```bash
# Development
npm run dev

# Build
npm run build

# Run
npm start

# Test
npm test
```

## Project Structure

```
src/
├── index.ts           # Main entry point
├── TaskManager.ts     # Core task management class
├── types.ts           # TypeScript interfaces and enums
├── validation.ts      # Input validation logic
└── sanitization.ts    # Security sanitization utilities
```

## Known Issues

See GitHub Issues for current bugs and feature requests:

- Issue #1: Memory leak in subscriber system (CRITICAL)
- Issue #3: Emoji support in task titles (DONE)
- Issue #7: Date filter edge cases (MEDIUM)
- Issue #10: XSS vulnerability in sanitization (HIGH SECURITY)

## Contributing

This is a test repository for ProjectScout AI Agent demos.

## License

MIT
