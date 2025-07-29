'use client';

import { Phone, MapPin, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { NGO } from '@/lib/database';

interface NGOCardProps {
  ngo: NGO;
}

export default function NGOCard({ ngo }: NGOCardProps) {
  const handleCallNow = () => {
    window.location.href = `tel:${ngo.phone}`;
  };

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(ngo.address);
    window.open(`https://maps.google.com?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Link 
              href={`/ngo/${ngo.id}`}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {ngo.name}
            </Link>
            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {ngo.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {ngo.description}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="line-clamp-1">{ngo.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>{ngo.phone}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-700">
            {ngo.rating.toFixed(1)}
          </span>
          <span className="ml-1 text-sm text-gray-500">
            ({ngo.reviewCount} reviews)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleCallNow}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
          >
            <Phone className="h-4 w-4 mr-1" />
            Call Now
          </button>
          <button
            onClick={handleGetDirections}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
          >
            <MapPin className="h-4 w-4 mr-1" />
            Directions
          </button>
        </div>

        {/* Website Link */}
        {ngo.website && (
          <div className="mt-2">
            <a
              href={ngo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}