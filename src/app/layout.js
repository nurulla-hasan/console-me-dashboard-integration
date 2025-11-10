
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import Provider from '../providers/Provider';
import { Toaster } from 'react-hot-toast';
export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body>
                <Provider>
                    <NextTopLoader
                        color="#00B047"
                        height={2}
                        showSpinner={false}
                    />
                    {children}
                    <Toaster position='top-right'/>
                </Provider>
            </body>
        </html>
    );
}