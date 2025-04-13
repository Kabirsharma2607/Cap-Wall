import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => { 

    return (
        <div className='bg-gray-50 w-full'>
            {children}
        </div>
    );
}

export default Layout;
