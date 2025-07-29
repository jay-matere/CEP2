'use client';

import { useEffect, useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import NGOCard from '@/components/NGOCard';
import { NGO } from '@/lib/database';

export default function Home() {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchNGOs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);

      const response = await fetch(`/api/ngos?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setNgos(data);
      }
    } catch (error) {
      console.error('Failed to fetch NGOs:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchNGOs();
  }, [fetchNGOs]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">
                NGO Directory
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Connecting communities with local NGOs in City Name
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search by name, description, or address..."
              />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading NGOs...</p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All NGOs'}
              </h2>
              <p className="text-gray-600 mt-1">
                {ngos.length} {ngos.length === 1 ? 'NGO' : 'NGOs'} found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* NGO Grid */}
            {ngos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ngos.map((ngo) => (
                  <NGOCard key={ngo.id} ngo={ngo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No NGOs found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 NGO Directory. Connecting communities for a better tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
}
