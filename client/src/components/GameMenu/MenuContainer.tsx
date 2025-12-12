import './styles/MenuContainer.css'

export const MenuContainer = ({ children }: { children: React.ReactNode }) => {

    return <div className="menu-container">
        {children}
    </div>
}