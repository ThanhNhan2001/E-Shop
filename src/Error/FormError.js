
function Error(props) {
    function renderError() {
        let { errE } = props
        if (Object.keys(errE).length > 0) {
            return Object.keys(errE).map((key, index) => {
                return (
                    <li key={index}>{errE[key]}</li>
                )
                
            })
        }
        
    }
    return (
        <ul>
            {renderError()}
        </ul>
    )
}
export default Error;