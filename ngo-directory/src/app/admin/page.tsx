'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Settings } from 'lucide-react';
import Link from 'next/link';
import NGOForm from '@/components/admin/NGOForm';
import { NGO, NGOCreate } from '@/lib/database';

type ViewMode = 'list' | 'add' | 'edit';

export default function AdminPage() {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingNgo, setEditingNgo] = useState<NGO | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNGOs = async () => {
    try {
      const response = await fetch('/api/admin/ngos');
      if (response.ok) {
        const data = await response.json();
        setNgos(data);
      }
    } catch (error) {
      console.error('Failed to fetch NGOs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  const handleAddNgo = async (data: NGOCreate) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/ngos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        await fetchNGOs();
        setViewMode('list');
      } else {
        console.error('Failed to add NGO');
      }
    } catch (error) {
      console.error('Error adding NGO:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditNgo = async (data: NGOCreate) => {
    if (!editingNgo) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/ngos/${editingNgo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        await fetchNGOs();
        setViewMode('list');
        setEditingNgo(null);
      } else {
        console.error('Failed to update NGO');
      }
    } catch (error) {
      console.error('Error updating NGO:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNgo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this NGO?')) return;

    try {
      const response = await fetch(`/api/ngos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchNGOs();
      } else {
        console.error('Failed to delete NGO');
      }
    } catch (error) {
      console.error('Error deleting NGO:', error);
    }
  };

  const startEdit = (ngo: NGO) => {
    setEditingNgo(ngo);
    setViewMode('edit');
  };

  const cancelEdit = () => {
    setViewMode('list');
    setEditingNgo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">Manage NGO directory entries</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
                             <Link
                 href="/"
                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center"
               >
                 <Eye className="h-4 w-4 mr-2" />
                 View Site
               </Link>
              {viewMode === 'list' && (
                <button
                  onClick={() => setViewMode('add')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add NGO
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'list' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">All NGO Entries</h2>
              <p className="text-gray-600 mt-1">{ngos.length} total entries</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ngos.map((ngo) => (
                      <tr key={ngo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{ngo.address}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {ngo.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ngo.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ngo.rating.toFixed(1)} ({ngo.reviewCount})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              ngo.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {ngo.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(ngo)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteNgo(ngo.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {viewMode === 'add' && (
          <NGOForm
            onSubmit={handleAddNgo}
            onCancel={cancelEdit}
            isLoading={isSubmitting}
          />
        )}

        {viewMode === 'edit' && editingNgo && (
          <NGOForm
            ngo={editingNgo}
            onSubmit={handleEditNgo}
            onCancel={cancelEdit}
            isLoading={isSubmitting}
          />
        )}
      </main>
    </div>
  );
}