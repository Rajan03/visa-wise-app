'use client';

import AppWriteService from '@/config/appwrite';
import { env } from '@/env';

type AppInitProps = {
    children: React.ReactNode;
};

export function AppInit({children}: AppInitProps) {
    // Initialize the AppWrite Service
    const instance = new AppWriteService(env.API_URL, env.API_KEY);
    console.log(instance);
    
    // Return the children
    return children; 
}