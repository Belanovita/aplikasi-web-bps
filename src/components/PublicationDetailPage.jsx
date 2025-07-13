// src/components/PublicationDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicationService } from '../services/publicationService';

export default function PublicationDetailPage() {
  const { id } = useParams();
  const [pub, setPub] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await publicationService.getPublicationById(id);
        setPub(data);
      } catch (err) {
        alert('Gagal mengambil detail publikasi: ' + err.message);
        navigate('/publications');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!pub) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
      <img
        src={pub.coverUrl}
        alt={`Sampul ${pub.title}`}
        className="w-64 h-auto rounded shadow object-cover"
        onError={e => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/100x140/cccccc/ffffff?text=Error';
        }}
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{pub.title}</h1>
        <p className="text-gray-500 mb-2">
          <strong>Tanggal Rilis:</strong> {pub.releaseDate}
        </p>
        {pub.description && (
          <p className="mb-4 text-gray-700 whitespace-pre-line">
            {pub.description}
          </p>
        )}
      </div>
    </div>
  );
}
