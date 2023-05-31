"use client";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function PlayButton({onClick}: {onClick: ()=>{}}) {
    return <button className="w-full h-full" onClick={onClick}>
                <PlayIcon className="text-white"/>
            </button>
}
