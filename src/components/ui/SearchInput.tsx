import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

export interface SearchInputProps {
}

const SearchInput = (props: SearchInputProps) => {

    return (
        <div className='relative'>
            <MagnifyingGlassIcon className='fill-main h-7 absolute mt-2.5 ml-3 stroke-2'></MagnifyingGlassIcon>
            <input type="text" placeholder="Search"
                className="input input-ghost appearance-none py-1 pl-12 bg-transparent text-main focus:text-main font-medium 
            text-xl focus-visible:outline-main/30 w-full border-2 border-main rounded-xl" />
        </div>

    );
}

export default SearchInput;