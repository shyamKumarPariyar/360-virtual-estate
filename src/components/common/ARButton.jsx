import { NavLink } from 'react-router-dom';
export default function ARNavButton({ to = '/ar', label = 'AR' }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `arnav${isActive ? ' is-active' : ''}`}
            aria-label="View in your room with augmented reality"
            style={{width: 'min-content'}}
        >
            <span className="arnav__frame">{label}</span>
        </NavLink>
    );
}