import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
export const metadata = {
    title: 'Promptopia',  // Make sure the name is correct here
    description: 'Discover & Share AI prompt' // Small correction for consistency
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}