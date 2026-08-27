import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import PropertyListing from '../pages/PropertyListing'
import PropertyDetails from '../pages/PropertyDetails'
import NotFound from '../pages/NotFound'
import ARPage from '../pages/ARPage'
import VRWalkthrough from '../components/vr/VRWalkthrough'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path="/ar" element={<ARPage />} />
                <Route path="/vr" element={<VRWalkthrough />} />
                <Route path='/properties' element={<PropertyListing />} />
                <Route path='/property/:id' element={<PropertyDetails />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
