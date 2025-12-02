import { useState } from 'react';
import { Pin, AlertCircle, Info, CheckCircle, Bookmark, X } from 'lucide-react';

interface Notice {
  id: string;
  type: 'urgent' | 'info' | 'success';
  title: string;
  description: string;
  postedBy: string;
  date: string;
  isPinned?: boolean;
  isBookmarked?: boolean;
}

export function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'Campus Closed Tomorrow',
      description: 'Due to maintenance work, the campus will be closed on November 28th. All classes moved online.',
      postedBy: 'Administration',
      date: 'Today',
      isPinned: true,
      isBookmarked: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Library Hours Extended',
      description: 'The library will now be open until 11 PM during exam week. Additional study spaces available.',
      postedBy: 'Library Services',
      date: 'Yesterday',
      isPinned: true,
      isBookmarked: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'New WiFi Network Available',
      description: 'Campus WiFi upgraded. Connect to "Campus-Fiber" for faster speeds. Password available at IT desk.',
      postedBy: 'IT Department',
      date: '2 days ago',
      isBookmarked: false,
    },
    {
      id: '4',
      type: 'info',
      title: 'Career Fair Next Week',
      description: 'Annual career fair on December 5th. 50+ companies attending. Register through placement portal.',
      postedBy: 'Placement Cell',
      date: '3 days ago',
      isBookmarked: false,
    },
    {
      id: '5',
      type: 'urgent',
      title: 'Course Registration Deadline',
      description: 'Last day to register for spring semester courses is December 1st. Late fees apply after.',
      postedBy: 'Academic Office',
      date: '4 days ago',
      isBookmarked: false,
    },
    {
      id: '6',
      type: 'info',
      title: 'Student Council Elections',
      description: 'Nominations open for student council positions. Submit your application by November 30th.',
      postedBy: 'Student Affairs',
      date: '5 days ago',
      isBookmarked: false,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'urgent' | 'info' | 'success' | 'bookmarked'>('all');

  const toggleBookmark = (id: string) => {
    setNotices(notices.map(notice =>
      notice.id === id ? { ...notice, isBookmarked: !notice.isBookmarked } : notice
    ));
  };

  const dismissNotice = (id: string) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const getIcon = (type: Notice['type']) => {
    switch (type) {
      case 'urgent':
        return AlertCircle;
      case 'info':
        return Info;
      case 'success':
        return CheckCircle;
    }
  };

  const getColor = (type: Notice['type']) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-950/50 border-red-900';
      case 'info':
        return 'bg-blue-950/50 border-blue-900';
      case 'success':
        return 'bg-green-950/50 border-green-900';
    }
  };

  const getIconColor = (type: Notice['type']) => {
    switch (type) {
      case 'urgent':
        return 'text-red-400';
      case 'info':
        return 'text-blue-400';
      case 'success':
        return 'text-green-400';
    }
  };

  const filteredNotices = notices.filter(notice => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'bookmarked') return notice.isBookmarked;
    return notice.type === selectedFilter;
  });

  const urgentCount = notices.filter(n => n.type === 'urgent').length;
  const bookmarkedCount = notices.filter(n => n.isBookmarked).length;

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-gray-100 mb-1">Notice Board</h2>
        <p className="text-gray-400 text-sm sm:text-base">Important campus announcements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-indigo-400 text-lg sm:text-xl">{notices.length}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Total</div>
        </div>
        <div className="bg-red-950/30 p-3 rounded-lg border border-red-900/50 text-center">
          <div className="text-red-400 text-lg sm:text-xl">{urgentCount}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Urgent</div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-yellow-400 text-lg sm:text-xl">{bookmarkedCount}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Saved</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'urgent', 'info', 'success', 'bookmarked'].map((filter) => (
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

      {/* Notices List */}
      <div className="space-y-3">
        {filteredNotices.map((notice) => {
          const Icon = getIcon(notice.type);
          return (
            <div
              key={notice.id}
              className={`bg-gray-800/50 p-4 rounded-lg border ${getColor(notice.type)} relative hover:bg-gray-800/70 transition-all`}
            >
              {notice.isPinned && (
                <div className="absolute top-4 right-4">
                  <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 fill-indigo-400" />
                </div>
              )}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 rounded-full ${getIconColor(notice.type)} flex-shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <h3 className="text-gray-100 mb-2 text-sm sm:text-base">{notice.title}</h3>
                  <p className="text-gray-300 mb-3 text-xs sm:text-sm leading-relaxed">{notice.description}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                    <span>{notice.postedBy}</span>
                    <span className="text-gray-600">•</span>
                    <span>{notice.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                <button
                  onClick={() => toggleBookmark(notice.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                    notice.isBookmarked
                      ? 'bg-yellow-900/50 text-yellow-400'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${notice.isBookmarked ? 'fill-yellow-400' : ''}`} />
                  <span>{notice.isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={() => dismissNotice(notice.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700 text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Dismiss</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
          <Info className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No notices in this category</p>
        </div>
      )}
    </div>
  );
}
