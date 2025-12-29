import React, { useMemo } from 'react';
import type { LearnedWord, LearningLog } from '../types';

interface ProgressStatsProps {
    vocabulary: LearnedWord[];
    learningLog: LearningLog;
}

const getUTCDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};

const getTodayUTC = () => {
    const d = new Date();
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};

const calculateStreak = (log: LearningLog): number => {
    const learnedDates = Object.keys(log)
        .filter(date => log[date].status === 'learned')
        .map(date => getUTCDate(date))
        .sort((a, b) => b.getTime() - a.getTime());

    if (learnedDates.length === 0) return 0;

    const today = getTodayUTC();
    const mostRecentDate = learnedDates[0];
    
    const diffMillis = today.getTime() - mostRecentDate.getTime();
    const diffDays = Math.round(diffMillis / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
        return 0; // Streak broken
    }

    let streak = 1;
    let lastDate = mostRecentDate;

    for (let i = 1; i < learnedDates.length; i++) {
        const currentDate = learnedDates[i];
        const dayDiffMillis = lastDate.getTime() - currentDate.getTime();
        const dayDiff = Math.round(dayDiffMillis / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
            streak++;
            lastDate = currentDate;
        } else if (dayDiff > 1) {
            break; // Gap found, streak ends
        }
    }
    return streak;
};

const ProgressStats: React.FC<ProgressStatsProps> = ({ vocabulary, learningLog }) => {
    const totalWords = vocabulary.length;
    const currentStreak = useMemo(() => calculateStreak(learningLog), [learningLog]);

    const masteryStats = useMemo(() => {
        const stats = {
            new: 0,       
            learning: 0,  
            consolidating: 0, 
            mastered: 0,    
        };
        if (totalWords === 0) return stats;
        vocabulary.forEach(word => {
            const level = word.srsLevel ?? 0;
            if (level === 0) stats.new++;
            else if (level >= 1 && level <= 2) stats.learning++;
            else if (level >= 3 && level <= 4) stats.consolidating++;
            else stats.mastered++;
        });
        return stats;
    }, [vocabulary, totalWords]);

    const masteryLevels = [
        { label: 'New', count: masteryStats.new, color: 'bg-blue-500' },
        { label: 'Learning', count: masteryStats.learning, color: 'bg-yellow-500' },
        { label: 'Consolidating', count: masteryStats.consolidating, color: 'bg-orange-500' },
        { label: 'Mastered', count: masteryStats.mastered, color: 'bg-green-500' }
    ];

    return (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:border dark:border-gray-700 animate-fade-in">
            <h2 className="text-lg font-bold text-textDark dark:text-gray-200 mb-4">Your Progress</h2>
            
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div className="bg-secondary dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{totalWords}</p>
                    <p className="text-sm text-textLight dark:text-gray-400">Words Learned</p>
                </div>
                <div className="bg-secondary dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{currentStreak} <span className="text-xl" role="img" aria-label="fire emoji">🔥</span></p>
                    <p className="text-sm text-textLight dark:text-gray-400">Day Streak</p>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-textDark dark:text-gray-200 mb-2">Vocabulary Mastery</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 flex overflow-hidden">
                    {totalWords > 0 ? masteryLevels.map(level => {
                        if (level.count === 0) return null;
                        const percentage = (level.count / totalWords) * 100;
                        return (
                            <div key={level.label} className={`${level.color} h-4 transition-all duration-500`} style={{ width: `${percentage}%` }} title={`${level.label}: ${level.count} words`}></div>
                        )
                    }) : (
                        <div className="bg-gray-300 dark:bg-gray-600 h-4 w-full"></div>
                    )}
                </div>
                <div className="flex justify-between text-xs text-textLight dark:text-gray-400 mt-2 flex-wrap gap-x-4 gap-y-1">
                    {masteryLevels.map(level => (
                        <div key={level.label} className="flex items-center">
                            <span className={`w-3 h-3 rounded-full mr-1.5 ${level.color}`}></span>
                            {level.label}: {level.count}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressStats;
