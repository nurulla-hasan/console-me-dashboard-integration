
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import ReduxProvider from './ReduxProvider';
export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <NextTopLoader
                        color="#00B047"
                        height={2}
                        showSpinner={false}
                    />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}