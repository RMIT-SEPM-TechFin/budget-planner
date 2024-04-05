import Image from "next/image"


const Logo = () => {
    return (
        <>
            <Image
                src="/images/logo/logo-1.svg"
                alt='logo'
                width={50}
                height={50}
            />
        </>
     );
}
 
export default Logo;