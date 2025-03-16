import './global.css';

export const metadata = {
    title: 'Welcome to DIYTASKMANAGER'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
