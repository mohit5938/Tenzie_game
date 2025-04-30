export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
return(
    <button
    onClick={props.hold}
    style={styles}
    className="Diebutton">
        {props.value}
        </button>
)
}