import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Upload, Download, Star, Search, Plus, X } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  subject: string;
  uploadedBy: string;
  downloads: number;
  rating: number;
  fileType: string;
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Data Structures Complete Guide',
      subject: 'Computer Science',
      uploadedBy: 'Sarah Chen',
      downloads: 234,
      rating: 4.8,
      fileType: 'PDF',
    },
    {
      id: 2,
      title: 'Physics Notes - Quantum Mechanics',
      subject: 'Physics',
      uploadedBy: 'Mike Johnson',
      downloads: 156,
      rating: 4.6,
      fileType: 'DOCX',
    },
    {
      id: 3,
      title: 'UX Design Principles',
      subject: 'Design',
      uploadedBy: 'Emma Davis',
      downloads: 189,
      rating: 4.9,
      fileType: 'PPT',
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = (id: number) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, downloads: note.downloads + 1 } : note
    ));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-white text-2xl sm:text-3xl mb-2">Notes Sharing</h1>
          <p className="text-gray-400">Share and access study materials</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upload Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowUploadModal(true)}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white p-4 rounded-xl mb-6 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Note</span>
        </motion.button>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title or subject..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-indigo-400 text-xl">{notes.length}</div>
            <div className="text-gray-400 text-xs mt-1">Total Notes</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-green-400 text-xl">{notes.reduce((acc, n) => acc + n.downloads, 0)}</div>
            <div className="text-gray-400 text-xs mt-1">Downloads</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-purple-400 text-xl">12</div>
            <div className="text-gray-400 text-xs mt-1">Uploaded</div>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-3">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-900/50 rounded-lg flex-shrink-0">
                  <FileText className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white mb-1">{note.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      {note.subject}
                    </span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded">
                      {note.fileType}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                    <span>By {note.uploadedBy}</span>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{note.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span>{note.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(note.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0 text-sm"
                >
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl">Upload Notes</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Select Subject</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                <p className="text-gray-600 text-xs mt-1">PDF, DOC, PPT (Max 10MB)</p>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Upload
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
