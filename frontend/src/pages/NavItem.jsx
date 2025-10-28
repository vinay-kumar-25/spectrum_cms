/**
 * Renders the navigation item in the sidebar with sketchy style.
 */
const NavItem = ({ icon: Icon, name, isActive, theme, onClick }) => {
    const activeClass = isActive
        ? `bg-${theme.accent} text-white shadow-xl sketchy-card-active`
        : `text-${theme.text} hover:bg-${theme.hover}`;
        
    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium ${activeClass}`}
            onClick={onClick}
            style={ isActive ? {
                '--sketch-color': 'white',
                '--bg-color': theme.accentHex,
                '--shadow-color': theme.accentHex,
            } : {}}
        >
            <Icon className="w-5 h-5" />
            <span className="hidden lg:block">{name}</span>
        </div>
    );
};