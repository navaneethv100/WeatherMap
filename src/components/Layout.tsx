import React, { PropsWithChildren } from 'react'
import Header from './Header'
const Layout = ({children}: PropsWithChildren) => {
    return(
        <div className="bg-gradient-to-br from-background to-mutated">
            <Header />
            <main className='min-h-screen container mx-auto px-4 py-8'
            >{children}
            </main>
            <footer className="text-sm text-muted-foreground supports-[backdrop-filter]:bg-background/60 ">
                <div className="container mx-auto px-4 py-8 text-center text-grey-400">
                    Made with ❤️ by <a href="https://github.com/naveneethv100">Navaneeth V</a>
                </div>
            </footer>
        </div>
    )
}

export default Layout;
