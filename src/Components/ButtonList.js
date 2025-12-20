import Button from "./Button"

const ButtonList = () => {
    return (
        <div className="flex">
            <Button name="All"/>
            <Button name="Songs"/>
            <Button name="Gaming"/>
            <Button name="Live"/>
            <Button name="Soccer"/>
            <Button name="Cricket"/>
            <Button name="Cooking"/>
            <Button name="News"/>
            <Button name="Valentines"/>
        </div>
    )
}

export default ButtonList