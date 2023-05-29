import Category from '@/enums/categoryEnum';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface SearchInputProps {
    category?: Category
}

const SearchInput = (props: SearchInputProps) => {
    const [input, setInput] = useState<string>("");

    const router = useRouter();

    const handleKeyPress = async (e: any) => {
        if (e.key === 'Enter') {
            if (props.category) {
                router.push(
                    {
                        pathname: '/products/' + props.category + '/' + input,
                    }
                );
            } else {
                router.push(
                    {
                        pathname: '/products/all/' + input,
                    }
                );
            }
        }
    }

    return (
        <div className='relative'>
            <MagnifyingGlassIcon className='fill-main h-7 absolute mt-2.5 ml-3 stroke-2'></MagnifyingGlassIcon>
            <input type="text" placeholder="Search"
                className="input input-ghost appearance-none py-1 pl-12 bg-transparent text-main focus:text-main font-medium 
            text-xl focus-visible:outline-main/30 w-full border-2 border-main rounded-xl"
                onChange={(e) => { setInput(e.target.value) }}
                onKeyUp={handleKeyPress.bind(this)}
            />
        </div>

    );
}

export default SearchInput;