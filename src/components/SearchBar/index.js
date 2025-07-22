import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import MiniSearch from 'minisearch';
import './styles.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [miniSearch, setMiniSearch] = useState(null);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const modalRef = useRef(null);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  // Initialize MiniSearch with the search index
  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/search-index.json');
        const documents = await response.json();
        
        const ms = new MiniSearch({
          fields: ['title', 'content'], // fields to index for full-text search
          storeFields: ['title', 'url', 'category'], // fields to return with search results
          searchOptions: {
            boost: { title: 2 }, // boost title matches
            fuzzy: 0.2, // enable fuzzy search
            prefix: true, // enable prefix search
            combineWith: 'AND' // require all terms to match
          }
        });

        // Add documents to the search index
        ms.addAll(documents);
        setMiniSearch(ms);
      } catch (error) {
        console.error('Failed to load search index:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchIndex();
  }, []);

  // Perform search
  const performSearch = useCallback((searchQuery) => {
    if (!miniSearch || !searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const searchResults = miniSearch.search(searchQuery, {
        limit: 10,
        boost: { title: 2 },
        fuzzy: 0.2,
        prefix: true
      });
      
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
  }, [miniSearch]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    performSearch(value);
  };

  // Handle result click
  const handleResultClick = (result) => {
    history.push(result.url);
    setQuery('');
    setIsOpen(false);
    setIsModalOpen(false);
    searchRef.current?.blur();
  };

  // Handle mobile search icon click
  const handleMobileSearchClick = () => {
    setIsModalOpen(true);
    // Focus on the modal input after a brief delay
    setTimeout(() => {
      const modalInput = modalRef.current?.querySelector('.search-input');
      modalInput?.focus();
    }, 100);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (isModalOpen) {
        handleModalClose();
      } else {
        setIsOpen(false);
        searchRef.current?.blur();
      }
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          resultsRef.current && !resultsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Search Bar */}
      <div className="search-bar-container search-bar-desktop" ref={searchRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            id="search-input-desktop"
            name="search"
            className="search-input"
            placeholder={translate({
              id: 'theme.SearchBar.label',
              message: 'Search documentation...',
              description: 'The ARIA label and placeholder for search button'
            })}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(true)}
            disabled={isLoading}
          />
          <div className="search-icon">
            {isLoading ? (
              <div className="search-loading">⏳</div>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="search-results" ref={resultsRef}>
            {results.length > 0 ? (
              <div className="search-results-list">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="search-result-title">{result.title}</div>
                    <div className="search-result-category">{result.category}</div>
                    <div className="search-result-url">{result.url}</div>
                  </div>
                ))}
              </div>
            ) : query.trim() && !isLoading ? (
              <div className="search-no-results">
                No results found for "{query}"
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Mobile Search Icon */}
      <button 
        className="search-bar-mobile" 
        onClick={handleMobileSearchClick}
        aria-label="Search"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>

      {/* Mobile Search Modal */}
      {isModalOpen && (
        <div className="search-modal-overlay" onClick={handleModalClose}>
          <div className="search-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  id="search-input-mobile"
                  name="search"
                  className="search-input"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <div className="search-icon">
                  {isLoading ? (
                    <div className="search-loading">⏳</div>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                  )}
                </div>
              </div>
              <button className="search-modal-close" onClick={handleModalClose}>
                ✕
              </button>
            </div>
            
            {results.length > 0 ? (
              <div className="search-results search-results-modal">
                <div className="search-results-list">
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-category">{result.category}</div>
                      <div className="search-result-url">{result.url}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : query.trim() && !isLoading ? (
              <div className="search-no-results">
                No results found for "{query}"
              </div>
            ) : (
              <div className="search-modal-placeholder">
                Start typing to search documentation...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
