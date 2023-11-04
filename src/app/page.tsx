"use client";

import { useScroll, useTransform } from "framer-motion";
import Canvas from "~/components/Canvas";
import { calcDrawImage, preloadImages } from "~/utils";

const FOLDER_NAME = "images";
const IMAGES_NO = 80;
const URLS: string[] = [];

for (let i = 1; i <= IMAGES_NO; i++) {
    URLS.push(`/${FOLDER_NAME}/${i}.jpg`);
}

export default function Home() {
    const { scrollYProgress } = useScroll({
        offset: ["start end", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, IMAGES_NO]);

    const draw = async (context: CanvasRenderingContext2D) => {
        const images = await preloadImages(URLS);

        calcDrawImage(context, images[0]);

        scrollYProgress.on("change", () => {
            calcDrawImage(context, images[Math.round(y.get()) - 1]);
        });
    };

    return (
        <>
            <div className="flex h-[4000vh] justify-center items-center ">
                <div className="w-full h-full left-1/2 -translate-x-1/4 fixed top-0 justfiy-center items-center flex">
                    <div
                        className="w-[100svh] h-[100svh] relative"
                        id="container"
                    >
                        <Canvas draw={draw} height={700} width={900} />
                    </div>
                </div>
            </div>
        </>
    );
}
