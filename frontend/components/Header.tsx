import ProfileMenu from "./ProfileMenu";

const Header = () => {
    return <header className="flex-[0_1_auto] shadow-sm w-full z-10 justify-between text-lg font-mono font-bold p-4 bg-black text-gray-100 flex">
        <h1 className=''>Online judge</h1>
        <div><ProfileMenu/></div>
    </header>
}

export default Header;