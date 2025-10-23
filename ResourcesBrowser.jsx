import React, { useState, useMemo } from 'react';
import './ResourcesBrowser.css';

// Sample resources data
const RESOURCES = [
  {
    id: 1,
    title: 'AI/ML Integration Guide',
    description: 'Comprehensive guide to integrating AI and ML capabilities into your applications.',
    type: 'White Paper',
    tags: ['AI/ML', 'Enterprise'],
    year: 2024,
    link: '#'
  },
  {
    id: 2,
    title: 'Docker MCP Architecture',
    description: 'Understanding the Docker Model Context Protocol architecture and implementation.',
    type: 'Infographic',
    tags: ['Docker MCP', 'Enterprise'],
    year: 2024,
    link: '#'
  },
  {
    id: 3,
    title: 'Security Best Practices',
    description: 'Essential security practices for container-based applications.',
    type: 'Video',
    tags: ['Security', 'Enterprise'],
    year: 2023,
    link: '#'
  },
  {
    id: 4,
    title: 'Enterprise Docker Deployment',
    description: 'Strategies for deploying Docker at enterprise scale.',
    type: 'White Paper',
    tags: ['Docker MCP', 'Enterprise', 'Security'],
    year: 2024,
    link: '#'
  },
  {
    id: 5,
    title: 'Machine Learning Pipelines',
    description: 'Building efficient ML pipelines with containerization.',
    type: 'Infographic',
    tags: ['AI/ML'],
    year: 2023,
    link: '#'
  },
  {
    id: 6,
    title: 'Container Security Deep Dive',
    description: 'Advanced container security techniques and tools.',
    type: 'Video',
    tags: ['Security', 'Docker MCP'],
    year: 2024,
    link: '#'
  }
];

const ResourcesBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [typeFilters, setTypeFilters] = useState({
    'Infographics': false,
    'Videos': false,
    'White Papers': false
  });
  const [tagFilters, setTagFilters] = useState({
    'AI/ML': false,
    'Docker MCP': false,
    'Enterprise': false,
    'Security': false
  });

  // Handle type filter toggle
  const handleTypeFilterChange = (type) => {
    setTypeFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle tag filter toggle
  const handleTagFilterChange = (tag) => {
    setTagFilters(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSortBy('newest');
    setTypeFilters({
      'Infographics': false,
      'Videos': false,
      'White Papers': false
    });
    setTagFilters({
      'AI/ML': false,
      'Docker MCP': false,
      'Enterprise': false,
      'Security': false
    });
  };

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = RESOURCES;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      filtered = filtered.filter(resource => resource.year === parseInt(selectedYear));
    }

    // Apply type filters
    const activeTypeFilters = Object.keys(typeFilters).filter(key => typeFilters[key]);
    if (activeTypeFilters.length > 0) {
      filtered = filtered.filter(resource => activeTypeFilters.includes(resource.type));
    }

    // Apply tag filters
    const activeTagFilters = Object.keys(tagFilters).filter(key => tagFilters[key]);
    if (activeTagFilters.length > 0) {
      filtered = filtered.filter(resource =>
        resource.tags.some(tag => activeTagFilters.includes(tag))
      );
    }

    // Sort resources
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => b.year - a.year);
    } else if (sortBy === 'oldest') {
      filtered = [...filtered].sort((a, b) => a.year - b.year);
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [searchQuery, selectedYear, sortBy, typeFilters, tagFilters]);

  // Get action text based on type
  const getActionText = (type) => {
    switch (type) {
      case 'Video':
        return 'Watch now';
      case 'White Paper':
        return 'Read now';
      case 'Infographic':
        return 'View now';
      default:
        return 'Learn more';
    }
  };

  return (
    <div className="resources-browser">
      <div className="sidebar">
        <h2>Filters</h2>
        
        {/* Search */}
        <div className="filter-section">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Date Filter */}
        <div className="filter-section">
          <label htmlFor="year">Date</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {/* Type Filters */}
        <div className="filter-section">
          <label>Type</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={typeFilters['Infographics']}
                onChange={() => handleTypeFilterChange('Infographics')}
              />
              Infographics
            </label>
            <label>
              <input
                type="checkbox"
                checked={typeFilters['Videos']}
                onChange={() => handleTypeFilterChange('Videos')}
              />
              Videos
            </label>
            <label>
              <input
                type="checkbox"
                checked={typeFilters['White Papers']}
                onChange={() => handleTypeFilterChange('White Papers')}
              />
              White Papers
            </label>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="filter-section">
          <label>Tags</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={tagFilters['AI/ML']}
                onChange={() => handleTagFilterChange('AI/ML')}
              />
              AI/ML
            </label>
            <label>
              <input
                type="checkbox"
                checked={tagFilters['Docker MCP']}
                onChange={() => handleTagFilterChange('Docker MCP')}
              />
              Docker MCP
            </label>
            <label>
              <input
                type="checkbox"
                checked={tagFilters['Enterprise']}
                onChange={() => handleTagFilterChange('Enterprise')}
              />
              Enterprise
            </label>
            <label>
              <input
                type="checkbox"
                checked={tagFilters['Security']}
                onChange={() => handleTagFilterChange('Security')}
              />
              Security
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <button className="reset-button" onClick={handleResetFilters}>
          Reset All Filters
        </button>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h1>Resources</h1>
          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        <div className="results-count">
          {filteredResources.length} {filteredResources.length === 1 ? 'result' : 'results'}
        </div>

        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="card-header">
                <span className={`type-badge ${resource.type.toLowerCase().replace(/\s+/g, '-')}`}>
                  {resource.type}
                </span>
                <span className="year">{resource.year}</span>
              </div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="card-tags">
                {resource.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a href={resource.link} className="action-link">
                {getActionText(resource.type)} →
              </a>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="no-results">
            <p>No resources found matching your filters.</p>
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesBrowser;
