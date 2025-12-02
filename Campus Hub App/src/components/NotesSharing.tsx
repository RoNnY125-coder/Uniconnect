import { useState } from 'react';
import { Upload, Download, FileText, Search, Plus, X, Filter, Star } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  subject: string;
  uploadedBy: string;
  downloads: number;
  uploadDate: string;
  rating: number;
}

export function NotesSharing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Data Structures - Trees & Graphs',
      subject: 'Computer Science',
      uploadedBy: 'Sarah Chen',
      downloads: 145,
      uploadDate: '2 days ago',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Calculus II - Integration Techniques',
      subject: 'Mathematics',
      uploadedBy: 'Mike Johnson',
      downloads: 203,
      uploadDate: '1 week ago',
      rating: 4.9,
    },
    {
      id: '3',
      title: 'Organic Chemistry - Reaction Mechanisms',
      subject: 'Chemistry',
      uploadedBy: 'Emma Davis',
      downloads: 87,
      uploadDate: '3 days ago',
      rating: 4.5,
    },
    {
      id: '4',
      title: 'World History - Industrial Revolution',
      subject: 'History',
      uploadedBy: 'Alex Kim',
      downloads: 56,
      uploadDate: '5 days ago',
      rating: 4.2,
    },
    {
      id: '5',
      title: 'Physics - Quantum Mechanics Notes',
      subject: 'Physics',
      uploadedBy: 'Jordan Lee',
      downloads: 178,
      uploadDate: '1 day ago',
      rating: 4.7,
    },
  ]);

  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating'>('recent');

  const subjects = ['all', ...Array.from(new Set(notes.map(note => note.subject)))];

  const downloadNote = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, downloads: note.downloads + 1 } : note
    ));
  };

  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recent (default order)
    });

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-gray-100 mb-1">Notes Sharing</h2>
        <p className="text-gray-400 text-sm sm:text-base">Share and access study materials</p>
      </div>

      {/* Upload Button */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="w-full bg-indigo-600 text-white p-3 sm:p-4 rounded-lg mb-6 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm sm:text-base">Upload Notes</span>
      </button>

      {/* Search and Filter */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes by subject or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm transition-all ${
                selectedSubject === subject
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Sort by:</span>
          <div className="flex gap-2">
            {(['recent', 'popular', 'rating'] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1 rounded text-xs sm:text-sm transition-all ${
                  sortBy === sort
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-indigo-400 text-lg sm:text-xl">{notes.length}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Total Notes</div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-green-400 text-lg sm:text-xl">{notes.reduce((acc, note) => acc + note.downloads, 0)}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Downloads</div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-purple-400 text-lg sm:text-xl">{subjects.length - 1}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Subjects</div>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-full bg-indigo-900/50 text-indigo-400 flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-100 mb-1 text-sm sm:text-base">{note.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-2 text-xs sm:text-sm">
                  <span className="px-2 py-0.5 bg-gray-700 rounded">{note.subject}</span>
                  <span className="text-gray-500">•</span>
                  <span>{note.uploadedBy}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{note.downloads} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                    <span>{note.rating}</span>
                  </div>
                  <span>{note.uploadDate}</span>
                </div>
              </div>
              <button
                onClick={() => downloadNote(note.id)}
                className="px-3 sm:px-4 py-2 bg-indigo-900/50 text-indigo-400 rounded-lg hover:bg-indigo-900 transition-colors flex-shrink-0 text-xs sm:text-sm"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No notes found</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-100">Upload Notes</h3>
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
                <option>History</option>
              </select>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                <p className="text-gray-600 text-xs mt-1">PDF, DOC, DOCX (Max 10MB)</p>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
