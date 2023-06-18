const Layout = ({children}) => {
    return (
        <div className='py-10 bg-zinc-900 min-w-828 sm:min-h-screen '>
            {children}
        </div>
    );
};

export {Layout};
