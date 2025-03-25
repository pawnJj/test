"use client";

import { createContext, useState, useEffect, useContext } from 'react';

type FirstLoadContextType = {
	isFirstLoad: boolean;
	markAsLoaded: () => void;
};

const FirstLoadContext = createContext<FirstLoadContextType | null>(null);

export function FirstLoadProvider({ children }: { children: React.ReactNode }) {
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	// 从 localStorage 读取首次加载状态
	useEffect(() => {
		const loadedBefore = localStorage.getItem('hasLoadedBefore');
		setIsFirstLoad(!loadedBefore);
	}, []);

	const markAsLoaded = () => {
		localStorage.setItem('hasLoadedBefore', 'true');
		setIsFirstLoad(false);
	};

	return (
		<FirstLoadContext.Provider value={{ isFirstLoad, markAsLoaded }}>
			{children}
		</FirstLoadContext.Provider>
	);
}

export function useFirstLoad() {
	const context = useContext(FirstLoadContext);
	if (!context) {
		throw new Error('useFirstLoad must be used within FirstLoadProvider');
	}
	return context;
}