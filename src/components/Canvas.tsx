import React from "react";

type CanvasProps = {
    draw: (context: CanvasRenderingContext2D) => void;
    height: number;
    width: number;
}


const Canvas = ({ draw, height, width }: CanvasProps) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const context = canvas.current!.getContext("2d")!;
    draw(context);
  });           

  return <canvas ref={canvas} height={height} width={width} />;
};

export default Canvas;
