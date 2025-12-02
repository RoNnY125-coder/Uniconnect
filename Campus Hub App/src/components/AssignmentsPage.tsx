import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  daysLeft: number;
  progress: number;
  urgent: boolean;
  completed: boolean;
}

export function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Mathematics Project',
      subject: 'Advanced Calculus',
      dueDate: 'Nov 29, 2024',
      daysLeft: 2,
      progress: 60,
      urgent: true,
      completed: false,
    },
    {
      id: 2,
      title: 'DBMS Report',
      subject: 'Database Management',
      dueDate: 'Dec 4, 2024',
      daysLeft: 7,
      progress: 30,
      urgent: false,
      completed: false,
    },
    {
      id: 3,
      title: 'Physics Lab Report',
      subject: 'Quantum Physics',
      dueDate: 'Dec 1, 2024',
      daysLeft: 4,
      progress: 85,
      urgent: false,
      completed: false,
    },
    {
      id: 4,
      title: 'Web Development Project',
      subject: 'Full Stack Development',
      dueDate: 'Nov 30, 2024',
      daysLeft: 3,
      progress: 100,
      urgent: false,
      completed: true,
    },
  ]);

  const updateProgress = (id: number, newProgress: number) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, progress: newProgress, completed: newProgress === 100 }
        : assignment
    ));
  };

  const toggleComplete = (id: number) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed, progress: assignment.completed ? assignment.progress : 100 }
        : assignment
    ));
  };

  const activeAssignments = assignments.filter(a => !a.completed);
  const completedAssignments = assignments.filter(a => a.completed);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-white text-2xl sm:text-3xl mb-2">Assignments Due</h1>
          <p className="text-gray-400">Track your assignments and deadlines</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-orange-400 text-xl">{activeAssignments.length}</div>
            <div className="text-gray-400 text-xs mt-1">Pending</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-green-400 text-xl">{completedAssignments.length}</div>
            <div className="text-gray-400 text-xs mt-1">Completed</div>
          </div>
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3 text-center">
            <div className="text-red-400 text-xl">{assignments.filter(a => a.urgent && !a.completed).length}</div>
            <div className="text-gray-400 text-xs mt-1">Urgent</div>
          </div>
        </div>

        {/* Active Assignments */}
        {activeAssignments.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white mb-4 flex items-center gap-2">
              <span className="text-lg">Active Assignments</span>
              <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                {activeAssignments.length}
              </span>
            </h2>
            <div className="space-y-4">
              {activeAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-800/50 border ${
                    assignment.urgent ? 'border-red-500/30 bg-red-950/10' : 'border-gray-700'
                  } rounded-xl p-5 hover:bg-gray-800/70 transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-3 bg-indigo-900/50 rounded-lg flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white">{assignment.title}</h3>
                          {assignment.urgent && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{assignment.subject}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            <span>{assignment.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span className={assignment.daysLeft <= 3 ? 'text-red-400' : ''}>
                              {assignment.daysLeft} days left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleComplete(assignment.id)}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-green-900/50 hover:text-green-400 text-gray-400 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Progress</span>
                      <span className="text-white text-sm">{assignment.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${assignment.progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          assignment.progress === 100
                            ? 'bg-green-500'
                            : assignment.progress >= 60
                            ? 'bg-blue-500'
                            : 'bg-orange-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Progress Controls */}
                  <div className="flex gap-2">
                    {[25, 50, 75, 100].map((value) => (
                      <button
                        key={value}
                        onClick={() => updateProgress(assignment.id, value)}
                        className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                          assignment.progress === value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Assignments */}
        {completedAssignments.length > 0 && (
          <div>
            <h2 className="text-white mb-4 flex items-center gap-2">
              <span className="text-lg">Completed</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                {completedAssignments.length}
              </span>
            </h2>
            <div className="space-y-3">
              {completedAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-green-950/20 border border-green-900/30 rounded-xl p-4 opacity-75"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-900/50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-300 line-through">{assignment.title}</h3>
                      <p className="text-gray-500 text-sm">{assignment.subject}</p>
                    </div>
                    <button
                      onClick={() => toggleComplete(assignment.id)}
                      className="text-gray-500 hover:text-gray-400 text-sm"
                    >
                      Undo
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
