'use client';


interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  type='submit',
}) => {
  return ( 
     <button className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full font-semibold
      ${outline ? 'bg-white' : 'bg-color3'}
      ${outline ? 'border-black' : 'border-color2'}
      ${small ? 'py-1 px-2 text-sm' : 'py-2 px-4 text-md'}
      ${small ? 'border-[1px]' : 'border-2'}
      ${disabled ? 'bg-gray-400' : 'bg-color3'}
      `}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
   );
}
 
export default Button;