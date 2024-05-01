
const Loader = () => {
    return (
        <div id="root">
            <div className="loading-wrapper" >
                <svg className="loader12" height="57" stroke="#fff" viewBox="0 0 57 57" width="57"
                    xmlns="http://www.w3.org/2000/svg">
                    <g fillRule="evenodd" fill="none">
                        <g strokeWidth="2" transform="translate(1 1)">
                            <circle className="loader12__path-left" cx="5" cy="50" r="5"></circle>
                            <circle className="loader12__path-top" cx="27" cy="5" r="5"></circle>
                            <circle className="loader12__path-right" cx="50" cy="50" r="5"></circle>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Loader;
