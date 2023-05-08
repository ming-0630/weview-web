
const ProductListPage = () => {

    return (
        <div className="bg-black">
            <p className='text-white'>ProductListPage</p>
            <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-white text-white peer-checked:bg-white peer-checked:text-white">
                    Click me to show/hide content
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>hello</p>
                </div>
            </div>
        </div>
    );
}

export default ProductListPage;
