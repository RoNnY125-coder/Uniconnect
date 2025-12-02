import { useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Clock, ExternalLink, Check, X } from 'lucide-react';

interface Placement {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  deadline: string;
  type: 'internship' | 'fulltime';
  eligibility: string;
  applied?: boolean;
}

export function Placements() {
  const [placements, setPlacements] = useState<Placement[]>([
    {
      id: '1',
      company: 'Google',
      role: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      salary: '$8,000/month',
      deadline: '2 days left',
      type: 'internship',
      eligibility: 'CS, IT (3rd Year+)',
      applied: false,
    },
    {
      id: '2',
      company: 'Microsoft',
      role: 'Full Stack Developer',
      location: 'Redmond, WA',
      salary: '$120,000/year',
      deadline: '5 days left',
      type: 'fulltime',
      eligibility: 'CS, IT (Final Year)',
      applied: false,
    },
    {
      id: '3',
      company: 'Amazon',
      role: 'Cloud Solutions Architect',
      location: 'Seattle, WA',
      salary: '$110,000/year',
      deadline: '1 week left',
      type: 'fulltime',
      eligibility: 'CS, IT (Final Year)',
      applied: false,
    },
    {
      id: '4',
      company: 'Meta',
      role: 'Data Science Intern',
      location: 'Menlo Park, CA',
      salary: '$9,000/month',
      deadline: '3 days left',
      type: 'internship',
      eligibility: 'CS, Math (3rd Year+)',
      applied: false,
    },
    {
      id: '5',
      company: 'Apple',
      role: 'iOS Developer',
      location: 'Cupertino, CA',
      salary: '$125,000/year',
      deadline: '1 week left',
      type: 'fulltime',
      eligibility: 'CS, IT (Final Year)',
      applied: true,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'internship' | 'fulltime' | 'applied'>('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);

  const applyForPlacement = (id: string) => {
    setPlacements(placements.map(placement =>
      placement.id === id ? { ...placement, applied: true } : placement
    ));
    setShowApplicationModal(false);
    setSelectedPlacement(null);
  };

  const openApplicationModal = (placement: Placement) => {
    setSelectedPlacement(placement);
    setShowApplicationModal(true);
  };

  const filteredPlacements = placements.filter(placement => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'applied') return placement.applied;
    return placement.type === selectedFilter;
  });

  const appliedCount = placements.filter(p => p.applied).length;
  const internshipCount = placements.filter(p => p.type === 'internship').length;
  const fulltimeCount = placements.filter(p => p.type === 'fulltime').length;

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-gray-100 mb-1">Placement Updates</h2>
        <p className="text-gray-400 text-sm sm:text-base">Latest job opportunities and internships</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 p-3 sm:p-4 rounded-lg border border-indigo-800">
          <div className="text-indigo-300 mb-1 text-xs sm:text-sm">Active Openings</div>
          <div className="text-white text-lg sm:text-xl">{placements.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-3 sm:p-4 rounded-lg border border-green-800">
          <div className="text-green-300 mb-1 text-xs sm:text-sm">Applications</div>
          <div className="text-white text-lg sm:text-xl">{appliedCount}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-3 sm:p-4 rounded-lg border border-blue-800">
          <div className="text-blue-300 mb-1 text-xs sm:text-sm">Internships</div>
          <div className="text-white text-lg sm:text-xl">{internshipCount}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 p-3 sm:p-4 rounded-lg border border-purple-800">
          <div className="text-purple-300 mb-1 text-xs sm:text-sm">Full-time</div>
          <div className="text-white text-lg sm:text-xl">{fulltimeCount}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'internship', 'fulltime', 'applied'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm transition-all ${
              selectedFilter === filter
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Placements List */}
      <div className="space-y-4">
        {filteredPlacements.map((placement) => (
          <div
            key={placement.id}
            className="bg-gray-800/50 p-4 sm:p-5 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all"
          >
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-3 bg-indigo-900/50 rounded-lg flex-shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-gray-100 mb-1 text-sm sm:text-base">{placement.company}</h3>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      placement.type === 'internship'
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-green-900/50 text-green-300'
                    }`}
                  >
                    {placement.type === 'internship' ? 'Internship' : 'Full-time'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-orange-400 text-xs sm:text-sm bg-orange-950/50 px-3 py-1 rounded-full border border-orange-900">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{placement.deadline}</span>
              </div>
            </div>

            <h4 className="text-gray-100 mb-3 text-sm sm:text-base">{placement.role}</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{placement.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{placement.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{placement.eligibility}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {placement.applied ? (
                <button
                  disabled
                  className="flex-1 px-4 py-2 bg-green-900/50 text-green-400 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed text-sm"
                >
                  <Check className="w-4 h-4" />
                  Applied
                </button>
              ) : (
                <button
                  onClick={() => openApplicationModal(placement)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPlacements.length === 0 && (
        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
          <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No placements in this category</p>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedPlacement && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-100">Apply for Position</h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-gray-100 mb-1">{selectedPlacement.role}</h4>
              <p className="text-gray-400 text-sm">{selectedPlacement.company}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Resume</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                  <p className="text-gray-400 text-sm">Click to upload resume</p>
                  <p className="text-gray-600 text-xs mt-1">PDF only (Max 5MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Cover Letter (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Why are you interested in this position?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <button
                onClick={() => applyForPlacement(selectedPlacement.id)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
