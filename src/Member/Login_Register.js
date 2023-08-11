import Login from "./Login"
import Register from "./Register"
function Test(props){
    return(
        <section id="form">
		<div class="container">
			<div class="row">
				<Login/>
				<div class="col-sm-1">
					<h2 class="or">OR</h2>
				</div>
				<Register/>
			</div>
		</div>
	</section>
    )
}
export default Test;