import { ReactNode } from "react";

export interface CategoriesImageProps {
    children?: ReactNode;
    title: string;
}

const CategoriesImage = (props: CategoriesImageProps) => {

    return (
        <div className="h-full group relative">
            <div className="h-full transition-all ease-in-out duration-300 cursor-pointer
        grayscale group-hover:grayscale-0 
        after:transition-all after:ease-in-out after:duration-300
        after:absolute after:content-[''] after:bg-gradient-to-t after:from-black after:to-50% after:inset-0 after:opacity-1 after:group-hover:opacity-1">
                {props.children}
            </div>
            <span className="text-main text-3xl font-medium absolute bottom-5 right-5 group-hover:text-white transition-all duration-300">{props.title}</span>
        </div>

    );
}

export default CategoriesImage;
