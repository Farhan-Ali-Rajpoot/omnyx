import { useEffect } from "react";


interface UseDomProps {
    eleName: string,
    action: (params: {
        ele: HTMLElement
    }) => Promise<void>,
}

export function useDOM ({ eleName }: UseDomProps) {

    useEffect(() => {
        const ele = document.querySelector(eleName);


    },[])
}