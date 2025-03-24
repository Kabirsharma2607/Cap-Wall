import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => { 

    return (
        <div className='bg-blue-400'>
            {children}
        </div>
    );
}

export default Layout;
