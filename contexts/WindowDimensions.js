import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function getWindowDimensions() {
    const width =
        document?.documentElement?.clientWidth ||
        document?.body?.clientWidth ||
        window?.innerWidth ||
        0;
    const height =
        document?.documentElement?.clientHeight ||
        document?.body?.clientHeight ||
        window?.innerHeight ||
        0;

    return {
        width,
        height,
        isMobileView: width < 768,
        isMobileXSView: width < 576,
        isMobileSMView: width >= 576 && width < 768,
        isTabletView: width >= 768 && width < 1200,
        isTabletMDView: width >= 768 && width < 992,
        isTabletLGView: width >= 992 && width < 1200,
        isDesktopView: width >= 1200,
        isDesktopXLView: width >= 1200 && width < 1440,
        isDesktopXXLView: width >= 1440,
    };
}

export default function useWindowDimension() {
    const [windowDimensions, setWindowDimensions] = useState({});

    useEffect(() => {
        setWindowDimensions(getWindowDimensions());
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const WindowDimensionContext = React.createContext();
export const WindowDimensionProvider = (props) => {
    const { children } = props;
    return (
        <WindowDimensionContext.Provider value={useWindowDimension()}>
            {children}
        </WindowDimensionContext.Provider>
    );
};

WindowDimensionProvider.propTypes = {
    children: PropTypes.node,
};

WindowDimensionProvider.defaultProps = {
    children: null,
};
