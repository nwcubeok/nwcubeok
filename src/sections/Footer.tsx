const Footer = () => {
    return (
        <footer className="flex h-16 items-center justify-center border-t">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} nwcubeok. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;