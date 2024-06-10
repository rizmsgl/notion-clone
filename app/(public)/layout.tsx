

const PublicLayout = ({children} : {children: React.ReactNode}) =>{
    return(
        <div className="h-full dark:bg-darkBackground">
            {children}
        </div>
    )
}
export default PublicLayout;