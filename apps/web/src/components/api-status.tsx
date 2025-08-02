"use client";

import { useEffect, useState } from 'react';
import { apiCalls } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface ApiStatus {
  status: 'loading' | 'connected' | 'error';
  message?: string;
  timestamp?: string;
}

export function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ status: 'loading' });

  const checkApiStatus = async () => {
    setApiStatus({ status: 'loading' });
    
    const result = await apiCalls.healthCheck();
    
    if (result.error) {
      setApiStatus({
        status: 'error',
        message: result.error
      });
    } else {
      setApiStatus({
        status: 'connected',
        message: result.data?.message || 'API Connected',
        timestamp: result.data?.timestamp
      });
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  const getStatusColor = () => {
    switch (apiStatus.status) {
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusText = () => {
    switch (apiStatus.status) {
      case 'connected':
        return '✅ Connected';
      case 'error':
        return '❌ Error';
      default:
        return '⏳ Loading...';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">API Status</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={checkApiStatus}
          disabled={apiStatus.status === 'loading'}
        >
          Refresh
        </Button>
      </div>
      
      <div className="space-y-2">
        <p className={`font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </p>
        
        {apiStatus.message && (
          <p className="text-sm text-muted-foreground">
            {apiStatus.message}
          </p>
        )}
        
        {apiStatus.timestamp && (
          <p className="text-xs text-muted-foreground">
            Last checked: {new Date(apiStatus.timestamp).toLocaleString()}
          </p>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p>Server URL: {process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}</p>
        <p>RPC Type Safety: ✅ Enabled</p>
      </div>
    </div>
  );
}