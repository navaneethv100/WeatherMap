import { Link } from 'react-router-dom'
import Logo1 from '../assets/logo1.png'
import Logo2 from '../assets/logo2.png'
import { useTheme } from '../context/theme-provider'
import { Sun, Moon } from 'lucide-react'

const Header = () => {
	const {theme, setTheme} = useTheme()
	const isDark = theme === 'dark'
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 [backdrop-filter]:bg-background/60'>
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to="/">
					<img 
						src={isDark ? Logo1 : Logo2}
						alt='logo'
						className='h-14'
					/>
				</Link>
				<div>
					{/* search	 */}
					{/* theme toggle? */}
					<div onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`flex items-centre cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}>
						{isDark ? (<Sun className="h-6 w-6 rotate-0 text-yellow-500 transition-all" /> ) : (<Moon className="h-6 w-6 rotate-90 text-slate-800 transition-all" />)}
					</div>
				</div>
			</div>

    </header>
  )
}

export default Header