import '../styles/globals.less';
import '../styles/antd.less';

import { EmployeeDetailsProvider } from '../contexts/EmployeeDetails';
import { WindowDimensionProvider } from '../contexts/WindowDimensions';

function MyApp({ Component, pageProps }) {
    return (
        <WindowDimensionProvider>
            <EmployeeDetailsProvider>
                <Component {...pageProps} />
            </EmployeeDetailsProvider>
        </WindowDimensionProvider>
    );
}

export default MyApp;
