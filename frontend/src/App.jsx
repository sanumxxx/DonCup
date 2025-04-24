import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import Auth from './pages/Auth'
import Bonuses from './pages/Bonuses'
import Bonus from './pages/Bonus'
import Profile from './pages/Profile'
import Rating from './pages/Rating'
import Partners from './pages/Partners'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/auth' replace />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/bonuses' element={<Bonuses />} />
				<Route path='/bonus' element={<Bonus />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/rating' element={<Rating />} />
				<Route path='/partners' element={<Partners />} />
			</Routes>
		</Router>
	)
}

export default App
