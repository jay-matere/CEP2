'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MapPin, Star, ExternalLink, Mail, ArrowLeft, Globe } from 'lucide-react';
import { NGO } from '@/lib/database';

export default function NGODetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [ngo, setNgo] = useState<NGO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNGO = async () => {
      try {
        const response = await fetch(`/api/ngos/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setNgo(data);
        } else {
          setError('NGO not found');
        }
             } catch {
         setError('Failed to load NGO details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNGO();
    }
  }, [params.id]);

  const handleCallNow = () => {
    if (ngo?.phone) {
      window.location.href = `tel:${ngo.phone}`;
    }
  };

  const handleGetDirections = () => {
    if (ngo?.address) {
      const encodedAddress = encodeURIComponent(ngo.address);
      window.open(`https://maps.google.com?q=${encodedAddress}`, '_blank');
    }
  };

  const handleEmailContact = () => {
    if (ngo?.email) {
      window.location.href = `mailto:${ngo.email}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading NGO details...</p>
        </div>
      </div>
    );
  }

  if (error || !ngo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">NGO Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The requested NGO could not be found.'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Directory
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{ngo.name}</h1>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {ngo.category}
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center bg-white rounded-lg border border-gray-200 px-4 py-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
              <span className="text-lg font-semibold text-gray-900">
                {ngo.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 ml-1">
                ({ngo.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{ngo.description}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-700">{ngo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-700">{ngo.phone}</p>
                  </div>
                </div>

                {ngo.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-700">{ngo.email}</p>
                    </div>
                  </div>
                )}

                {ngo.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <a
                        href={ngo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        {ngo.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleCallNow}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </button>
                
                <button
                  onClick={handleGetDirections}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Get Directions
                </button>

                {ngo.email && (
                  <button
                    onClick={handleEmailContact}
                    className="w-full bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center font-medium"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Send Email
                  </button>
                )}

                {ngo.website && (
                  <a
                    href={ngo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center font-medium"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            {/* Organization Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Organization Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{ngo.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium text-gray-900">{ngo.rating.toFixed(1)}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium text-gray-900">{ngo.reviewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}