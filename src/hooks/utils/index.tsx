import { useEffect } from 'react';

export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | DerHex Launchpad`;
    }, [title]);
}

export function usePageTitleIDO(title: string) {
    useEffect(() => {
        document.title = `${title} on DerHex Launchpad`;
    }, [title]);
}

export function usePageTitleGiveaway(title: string) {
    useEffect(() => {
        document.title = `${title} | DerHex`;
    }, [title]);
}

export function usePageTitleBonds(title:string){
    useEffect(() => {
        document.title = `${title} on DerHex Launchpad`;
    }, [title]);
}