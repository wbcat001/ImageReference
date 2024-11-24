import { useEffect, useState } from "react";
import useMousePosition, {MousePosition} from "./useMousePosition";
import "./Pointer.css";

interface PointerProps{
    name: string;
    position:{
        x: number;
        y: number;
    }
    
}


export const Pointer:React.FC<PointerProps> = ({ name, position }) => (
  <div
    className={`${name}`}
    style={{
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}
  ></div>
);

interface CustomPointerProps{
    mousePosition: MousePosition
}

const CustomPointer: React.FC<CustomPointerProps> = ({mousePosition}) => {
    

    return(
        <div>

        <Pointer name="pointer is-small" position={mousePosition} />
        <Pointer name="pointer" position={mousePosition} />
        <Pointer name="pointer is-large" position={mousePosition} />
        </div>
    )
}



export default CustomPointer;