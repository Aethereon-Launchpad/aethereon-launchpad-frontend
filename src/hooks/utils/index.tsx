import { useEffect } from 'react';

export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | Aethereon Launchpad`;
    }, [title]);
}

export function usePageTitleIDO(title: string) {
    useEffect(() => {
        document.title = `${title} on Aethereon Launchpad`;
    }, [title]);
}

export function usePageTitleGiveaway(title: string) {
    useEffect(() => {
        document.title = `${title} | Aethereon`;
    }, [title]);
}

export function usePageTitleBonds(title:string){
    useEffect(() => {
        document.title = `${title} on Aethereon Launchpad`;
    }, [title]);
}