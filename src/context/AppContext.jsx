"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import friendsData from '../data/friends.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data (simulate network request)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Initialize with UI avatars since local ones don't exist
      const populatedFriends = friendsData.map(friend => ({
        ...friend,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=random`
      }));
      setFriends(populatedFriends);
      setIsLoading(false);
      
      // Initialize some dummy timeline entries
      setTimeline([
        {
          id: 't1',
          friendId: 2,
          type: 'Call',
          title: 'Call with Michael Chen',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 't2',
          friendId: 8,
          type: 'Text',
          title: 'Text with Maria Garcia',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ]);
    }, 1000); // 1-second simulated delay as per requirements
    
    return () => clearTimeout(timer);
  }, []);

  const addTimelineEntry = (friendId, type, title) => {
    const newEntry = {
      id: Date.now().toString(),
      friendId,
      type, // 'Call', 'Text', 'Video'
      title,
      date: new Date().toISOString()
    };
    
    setTimeline(prev => [newEntry, ...prev]);
    
    // Also update the friend's days_since_contact to 0 and status to "on-track"
    setFriends(prev => prev.map(f => {
      if (f.id === friendId) {
        return {
          ...f,
          days_since_contact: 0,
          status: 'on-track'
        };
      }
      return f;
    }));
  };

  const updateGoal = (friendId, newGoal) => {
    setFriends(prev => prev.map(f => {
      if (f.id === friendId) {
        return {
          ...f,
          goal: newGoal
        };
      }
      return f;
    }));
  };

  return (
    <AppContext.Provider value={{
      friends,
      timeline,
      isLoading,
      addTimelineEntry,
      updateGoal
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
