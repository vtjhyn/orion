'use client'

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

const NavMenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return ( 
    <div 
      className="hover:bg-slate-200 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </div>
   );
}
 
export default NavMenuItem;