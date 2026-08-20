import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import PropertyListing from '../pages/PropertyListing'
import PropertyDetails from '../pages/PropertyDetails'
// import About from '../pages/About'
import NotFound from '../pages/NotFound'
import AR from '../pages/AR'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path="/ar" element={<AR />} />
                <Route path='/properties' element={<PropertyListing />} />
                <Route path='/property/:id' element={<PropertyDetails />} />
                {/* <Route path='/about-us' element={<About />} /> */}
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
