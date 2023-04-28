import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export interface SearchModalProps {
    isOpen: Boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = (props: SearchModalProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    useEffect(() => {
        setSearchValue("");
        setSearchCategory("All");
        const input = document.getElementById("navSearchInput");
        input?.focus();
    }, [props.isOpen]);

    const transitionClass = classNames({
        ' translate-y-0 opacity-100 transition-all duration-[400ms]': props.isOpen,
    })

    return (
        <div className={"bg-gray-dark w-full h-full absolute -translate-y-full opacity-0" + transitionClass}>
            <div className='flex flex-col py-4 w-2/5 m-auto'>
                <div className='text-left text-white'>Search</div>
                <div className='flex justify-between items-center mt-1'>
                    <div className='flex items-center w-full mr-4'>
                        <select className="select select-sm select-ghost border-2 border-main leading-none bg-gray-dark focus:bg-gray-dark focus:outline-0 mr-4 text-white focus:text-white"
                            value={searchCategory}
                            onChange={e => setSearchCategory(e.target.value)}>
                            <option className='hover:bg-main'>All</option>
                            <option>Computers</option>
                            <option>Home</option>
                            <option>Music</option>
                            <option>Smartphones</option>
                        </select>
                        <input type="text"
                            id="navSearchInput"
                            className='appearance-none py-1 bg-transparent text-main font-medium text-xl focus-visible:outline-0 w-full'
                            autoFocus
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)} />
                    </div>

                    <div className='flex'>
                        <MagnifyingGlassIcon className='fill-white h-6 cursor-pointer transition-colors hover:fill-main mr-3 '
                            onClick={() => { console.log(searchValue); console.log(searchCategory) }}></MagnifyingGlassIcon>
                        <XMarkIcon className='fill-white h-6 cursor-pointer transition-colors hover:fill-red-500 mr-3'
                            onClick={() => { props.setIsOpen(false) }}></XMarkIcon>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default SearchModal;