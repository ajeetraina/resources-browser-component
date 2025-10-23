import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResourcesBrowser from './ResourcesBrowser';

describe('ResourcesBrowser Component', () => {
  // RENDERING TESTS (13 tests)
  describe('Rendering', () => {
    test('renders the main component without crashing', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    test('renders the sidebar with Filters heading', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    test('renders the search input', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByPlaceholderText('Search resources...')).toBeInTheDocument();
    });

    test('renders the date filter dropdown', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByLabelText('Date')).toBeInTheDocument();
    });

    test('renders the sort dropdown', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByLabelText('Sort by:')).toBeInTheDocument();
    });

    test('renders the Type filter section', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('Type')).toBeInTheDocument();
    });

    test('renders the Tags filter section', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    test('renders all type filter checkboxes', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByLabelText('Infographics')).toBeInTheDocument();
      expect(screen.getByLabelText('Videos')).toBeInTheDocument();
      expect(screen.getByLabelText('White Papers')).toBeInTheDocument();
    });

    test('renders all tag filter checkboxes', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByLabelText('AI/ML')).toBeInTheDocument();
      expect(screen.getByLabelText('Docker MCP')).toBeInTheDocument();
      expect(screen.getByLabelText('Enterprise')).toBeInTheDocument();
      expect(screen.getByLabelText('Security')).toBeInTheDocument();
    });

    test('renders the Reset All Filters button', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('Reset All Filters')).toBeInTheDocument();
    });

    test('renders resource cards', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
    });

    test('renders results count', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText(/results/)).toBeInTheDocument();
    });

    test('renders resources grid', () => {
      const { container } = render(<ResourcesBrowser />);
      expect(container.querySelector('.resources-grid')).toBeInTheDocument();
    });
  });

  // SEARCH FUNCTIONALITY (2 tests)
  describe('Search Functionality', () => {
    test('filters resources by search query', () => {
      render(<ResourcesBrowser />);
      const searchInput = screen.getByPlaceholderText('Search resources...');
      
      fireEvent.change(searchInput, { target: { value: 'Security' } });
      
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
      expect(screen.queryByText('AI/ML Integration Guide')).not.toBeInTheDocument();
    });

    test('search is case-insensitive', () => {
      render(<ResourcesBrowser />);
      const searchInput = screen.getByPlaceholderText('Search resources...');
      
      fireEvent.change(searchInput, { target: { value: 'docker' } });
      
      expect(screen.getByText('Docker MCP Architecture')).toBeInTheDocument();
      expect(screen.getByText('Enterprise Docker Deployment')).toBeInTheDocument();
    });
  });

  // DATE FILTERING (3 tests)
  describe('Date Filtering', () => {
    test('filters resources by year', () => {
      render(<ResourcesBrowser />);
      const yearSelect = screen.getByLabelText('Date');
      
      fireEvent.change(yearSelect, { target: { value: '2023' } });
      
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
      expect(screen.queryByText('AI/ML Integration Guide')).not.toBeInTheDocument();
    });

    test('shows all resources when "All Years" is selected', () => {
      render(<ResourcesBrowser />);
      const yearSelect = screen.getByLabelText('Date');
      
      fireEvent.change(yearSelect, { target: { value: '2023' } });
      fireEvent.change(yearSelect, { target: { value: '' } });
      
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
    });

    test('updates results count after date filtering', () => {
      render(<ResourcesBrowser />);
      const yearSelect = screen.getByLabelText('Date');
      
      fireEvent.change(yearSelect, { target: { value: '2023' } });
      
      expect(screen.getByText(/2 results/)).toBeInTheDocument();
    });
  });

  // SORT FUNCTIONALITY (2 tests)
  describe('Sort Functionality', () => {
    test('sorts resources by newest first', () => {
      render(<ResourcesBrowser />);
      const sortSelect = screen.getByLabelText('Sort by:');
      
      fireEvent.change(sortSelect, { target: { value: 'newest' } });
      
      const cards = screen.getAllByText(/2024|2023/);
      expect(cards[0].textContent).toBe('2024');
    });

    test('sorts resources by title A-Z', () => {
      render(<ResourcesBrowser />);
      const sortSelect = screen.getByLabelText('Sort by:');
      
      fireEvent.change(sortSelect, { target: { value: 'title' } });
      
      const titles = screen.getAllByRole('heading', { level: 3 });
      expect(titles[0].textContent).toBe('AI/ML Integration Guide');
    });
  });

  // TYPE FILTER FUNCTIONALITY (5 tests)
  describe('Type Filter Functionality', () => {
    test('filters resources by Infographics type', () => {
      render(<ResourcesBrowser />);
      const infographicsCheckbox = screen.getByLabelText('Infographics');
      
      fireEvent.click(infographicsCheckbox);
      
      expect(screen.getByText('Docker MCP Architecture')).toBeInTheDocument();
      expect(screen.queryByText('AI/ML Integration Guide')).not.toBeInTheDocument();
    });

    test('filters resources by Videos type', () => {
      render(<ResourcesBrowser />);
      const videosCheckbox = screen.getByLabelText('Videos');
      
      fireEvent.click(videosCheckbox);
      
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
      expect(screen.queryByText('AI/ML Integration Guide')).not.toBeInTheDocument();
    });

    test('filters resources by White Papers type', () => {
      render(<ResourcesBrowser />);
      const whitePapersCheckbox = screen.getByLabelText('White Papers');
      
      fireEvent.click(whitePapersCheckbox);
      
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
      expect(screen.queryByText('Docker MCP Architecture')).not.toBeInTheDocument();
    });

    test('allows multiple type filters simultaneously', () => {
      render(<ResourcesBrowser />);
      const infographicsCheckbox = screen.getByLabelText('Infographics');
      const videosCheckbox = screen.getByLabelText('Videos');
      
      fireEvent.click(infographicsCheckbox);
      fireEvent.click(videosCheckbox);
      
      expect(screen.getByText('Docker MCP Architecture')).toBeInTheDocument();
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
      expect(screen.queryByText('AI/ML Integration Guide')).not.toBeInTheDocument();
    });

    test('shows no results when type filter excludes all resources', () => {
      render(<ResourcesBrowser />);
      const searchInput = screen.getByPlaceholderText('Search resources...');
      const infographicsCheckbox = screen.getByLabelText('Infographics');
      
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      fireEvent.click(infographicsCheckbox);
      
      expect(screen.getByText('No resources found matching your filters.')).toBeInTheDocument();
    });
  });

  // TAG FILTER FUNCTIONALITY (6 tests)
  describe('Tag Filter Functionality', () => {
    test('filters resources by AI/ML tag', () => {
      render(<ResourcesBrowser />);
      const aimlCheckbox = screen.getByLabelText('AI/ML');
      
      fireEvent.click(aimlCheckbox);
      
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning Pipelines')).toBeInTheDocument();
    });

    test('filters resources by Docker MCP tag', () => {
      render(<ResourcesBrowser />);
      const dockerCheckbox = screen.getByLabelText('Docker MCP');
      
      fireEvent.click(dockerCheckbox);
      
      expect(screen.getByText('Docker MCP Architecture')).toBeInTheDocument();
      expect(screen.getByText('Enterprise Docker Deployment')).toBeInTheDocument();
    });

    test('filters resources by Enterprise tag', () => {
      render(<ResourcesBrowser />);
      const enterpriseCheckbox = screen.getByLabelText('Enterprise');
      
      fireEvent.click(enterpriseCheckbox);
      
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
      expect(screen.getByText('Docker MCP Architecture')).toBeInTheDocument();
    });

    test('filters resources by Security tag', () => {
      render(<ResourcesBrowser />);
      const securityCheckbox = screen.getByLabelText('Security');
      
      fireEvent.click(securityCheckbox);
      
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
      expect(screen.getByText('Enterprise Docker Deployment')).toBeInTheDocument();
    });

    test('allows multiple tag filters simultaneously', () => {
      render(<ResourcesBrowser />);
      const aimlCheckbox = screen.getByLabelText('AI/ML');
      const securityCheckbox = screen.getByLabelText('Security');
      
      fireEvent.click(aimlCheckbox);
      fireEvent.click(securityCheckbox);
      
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
      expect(screen.getByText('Security Best Practices')).toBeInTheDocument();
    });

    test('tag filters work with OR logic', () => {
      render(<ResourcesBrowser />);
      const aimlCheckbox = screen.getByLabelText('AI/ML');
      
      fireEvent.click(aimlCheckbox);
      
      const resultsText = screen.getByText(/results/);
      expect(resultsText.textContent).toContain('2 results');
    });
  });

  // RESET FUNCTIONALITY (6 tests)
  describe('Reset Functionality', () => {
    test('resets search query', () => {
      render(<ResourcesBrowser />);
      const searchInput = screen.getByPlaceholderText('Search resources...');
      const resetButton = screen.getByText('Reset All Filters');
      
      fireEvent.change(searchInput, { target: { value: 'Docker' } });
      fireEvent.click(resetButton);
      
      expect(searchInput.value).toBe('');
    });

    test('resets year filter', () => {
      render(<ResourcesBrowser />);
      const yearSelect = screen.getByLabelText('Date');
      const resetButton = screen.getByText('Reset All Filters');
      
      fireEvent.change(yearSelect, { target: { value: '2023' } });
      fireEvent.click(resetButton);
      
      expect(yearSelect.value).toBe('');
    });

    test('resets sort selection', () => {
      render(<ResourcesBrowser />);
      const sortSelect = screen.getByLabelText('Sort by:');
      const resetButton = screen.getByText('Reset All Filters');
      
      fireEvent.change(sortSelect, { target: { value: 'oldest' } });
      fireEvent.click(resetButton);
      
      expect(sortSelect.value).toBe('newest');
    });

    test('resets type filters', () => {
      render(<ResourcesBrowser />);
      const infographicsCheckbox = screen.getByLabelText('Infographics');
      const resetButton = screen.getByText('Reset All Filters');
      
      fireEvent.click(infographicsCheckbox);
      fireEvent.click(resetButton);
      
      expect(infographicsCheckbox.checked).toBe(false);
    });

    test('resets tag filters', () => {
      render(<ResourcesBrowser />);
      const aimlCheckbox = screen.getByLabelText('AI/ML');
      const resetButton = screen.getByText('Reset All Filters');
      
      fireEvent.click(aimlCheckbox);
      fireEvent.click(resetButton);
      
      expect(aimlCheckbox.checked).toBe(false);
    });

    test('resets all filters simultaneously', () => {
      render(<ResourcesBrowser />);
      const searchInput = screen.getByPlaceholderText('Search resources...');
      const yearSelect = screen.getByLabelText('Date');
      const aimlCheckbox = screen.getByLabelText('AI/ML');
      const resetButton = screen.getByText('Reset All Filters');
      
      fireEvent.change(searchInput, { target: { value: 'Security' } });
      fireEvent.change(yearSelect, { target: { value: '2023' } });
      fireEvent.click(aimlCheckbox);
      fireEvent.click(resetButton);
      
      expect(searchInput.value).toBe('');
      expect(yearSelect.value).toBe('');
      expect(aimlCheckbox.checked).toBe(false);
      expect(screen.getByText(/6 results/)).toBeInTheDocument();
    });
  });

  // RESOURCE CARDS (4 tests)
  describe('Resource Cards', () => {
    test('displays resource type badges', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('White Paper')).toBeInTheDocument();
      expect(screen.getByText('Infographic')).toBeInTheDocument();
      expect(screen.getByText('Video')).toBeInTheDocument();
    });

    test('displays resource titles', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('AI/ML Integration Guide')).toBeInTheDocument();
      expect(screen.getByText('Docker MCP Architecture')).toBeInTheDocument();
    });

    test('displays resource descriptions', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText(/Comprehensive guide to integrating AI/)).toBeInTheDocument();
    });

    test('displays appropriate action text based on resource type', () => {
      render(<ResourcesBrowser />);
      expect(screen.getByText('Read now →')).toBeInTheDocument();
      expect(screen.getByText('View now →')).toBeInTheDocument();
      expect(screen.getByText('Watch now →')).toBeInTheDocument();
    });
  });
});
