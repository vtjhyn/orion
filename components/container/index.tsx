'use client'

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children
}) => {
  return ( 
    <div className="h-screen mx-4 pt-12">
      {children}
    </div>
   );
}
 
export default Container;