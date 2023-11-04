"use client";

import {
    useScroll,
    animate,
    AnimationPlaybackControls,
    stagger,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const FOLDER_NAME = "images";
const IMAGES_NO = 80;

export default function Home() {
    const animControls = useRef<AnimationPlaybackControls>();
    useScroll({
        offset: ["start end", "end start"],
    }).scrollYProgress.on("change", (yProgress) => {
        if (!animControls.current) return;

        // Calculate the new time for the animation based on scroll progress
        animControls.current.time = yProgress * animControls.current.duration;
    });

    useEffect(() => {
        animControls.current = animate([
            [
                "#container img",
                { opacity: [0, 1] },
                { ease: "easeInOut", delay: stagger(1), duration: 1 },
            ],
            [
              '#container img:first-child', {opacity: [1]}
            ]
        ]);
        animControls.current.pause();
    }, []);

    return (
        <>
            <div className="flex h-[4000vh] justify-center items-center ">
                <div className="w-full h-full left-1/2 -translate-x-1/4 fixed top-0 justfiy-center items-center flex">
                    <div
                        className="w-[100svh] h-[100svh] relative"
                        id="container"
                    >
                        {/* <Image src={`/images/${1}.jpg`} alt={`${1}`} fill /> */}
                        {Array.from({ length: IMAGES_NO }).map((_, i) => {
                            return (
                                <>
                                    <Image
                                        key={i}
                                        src={`/images/${i + 1}.jpg`}
                                        alt={`${i + 1}`}
                                        fill
                                    />
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
