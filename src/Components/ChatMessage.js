const ChatMessage = ({name, message}) => {
    return (
        <div className="flex items-center shadow-sm p-2">
            <img 
                className="h-8" 
                alt="user-icon" 
                src="https://lh3.googleusercontent.com/a/ACg8ocJeNlu44KSL7HV0aeMlOj45WWrZhSfapLeprgHsehAbEBVlrak=s192-c-mo" 
            />
            <span className="font-bold px-2">{name}</span>
            <span>{message}</span>
        </div>
    )
}

export default ChatMessage