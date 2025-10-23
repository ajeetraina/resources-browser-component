# Resources Browser Component

A fully functional React component that recreates a resources browser UI with filters, search, and card-based layout.

## Features

- **Sidebar Filters**
  - Search by keyword
  - Filter by date (year)
  - Filter by content type (Infographics, Videos, White Papers)
  - Filter by tags (AI/ML, Docker MCP, Enterprise, Security)
  - Reset all filters with one click

- **Main Content Area**
  - Grid layout of resource cards
  - Sort results dropdown
  - Card types: White Paper, Infographic, Video
  - Call-to-action links (Read now, Watch now)

- **Responsive Design**
  - Clean, modern UI
  - Card-based layout
  - Professional styling

## Component Structure

```
ResourcesBrowser/
├── ResourcesBrowser.jsx      # Main component
├── ResourcesBrowser.test.jsx # Comprehensive test suite (41 tests)
├── package.json              # Dependencies and scripts
├── .babelrc.js              # Babel configuration
└── README.md                # This file
```

## Installation

```bash
npm install
```

## Running Tests

All 41 tests pass successfully:

```bash
npm test
```

### Test Coverage

✅ Rendering tests (13 tests)
✅ Search functionality (2 tests)
✅ Date filtering (3 tests)
✅ Sort functionality (2 tests)
✅ Type filter functionality (5 tests)
✅ Tag filter functionality (6 tests)
✅ Reset functionality (6 tests)
✅ Resource cards (4 tests)

## Usage

```jsx
import ResourcesBrowser from './ResourcesBrowser';

function App() {
  return <ResourcesBrowser />;
}
```

## Component State

The component manages the following state:
- `searchQuery`: Current search input
- `selectedYear`: Selected year filter
- `sortBy`: Selected sort option
- `typeFilters`: Checked state of type filters
- `tagFilters`: Checked state of tag filters

## Technologies Used

- **React 18.2.0** - UI library
- **Jest 29.7.0** - Testing framework
- **React Testing Library 14.0.0** - Component testing utilities
- **Babel** - JSX transformation

## Features Demonstrated

1. **State Management** - Complex filter state with React hooks
2. **Event Handling** - Input changes, checkbox toggles, button clicks
3. **Conditional Rendering** - Dynamic content based on state
4. **Component Composition** - Well-structured, maintainable code
5. **Responsive Layout** - CSS Grid for card layout
6. **Accessibility** - Semantic HTML, proper labels

## Test Results

```
Test Suites: 1 passed, 1 total
Tests:       41 passed, 41 total
Time:        2.772 s
```

## Screenshots

The component recreates this design:

- Filters sidebar with multiple filter categories
- Resource cards with type labels, titles, descriptions, and action links
- Sort dropdown for organizing results
- Clean, modern UI with proper spacing and typography

## License

MIT

## Author

Created from UI screenshot analysis and implementation