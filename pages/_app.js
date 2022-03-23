import '../styles/globals.less';
import '../styles/antd.less';

import { EmployeeDetailsProvider } from '../contexts/EmployeeDetails';

function MyApp({ Component, pageProps }) {
    return (
        <EmployeeDetailsProvider>
            <Component {...pageProps} />
        </EmployeeDetailsProvider>
    );
}

export default MyApp;
