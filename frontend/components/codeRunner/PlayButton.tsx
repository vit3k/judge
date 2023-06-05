"use client";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function PlayButton({onClick}: {onClick: ()=>{}}) {
    return <button className="w-8 h-8" onClick={onClick}>
                <PlayIcon className="text-white"/>
            </button>
}
