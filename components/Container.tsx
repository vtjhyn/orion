import { ReactNode } from "react";

interface ContainerProps{
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return ( 
    <div className={`w-full bg-white shadow-xl p-4 rounded-2xl ${className}`}>
      {children}
    </div>
   );
}
 
export default Container;