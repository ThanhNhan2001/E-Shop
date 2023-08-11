import { Link } from "react-router-dom";
function Test() {
    return (
        <div class="col-sm-3">
            <div class="left-sidebar">
                <h2>ACCOUNT</h2>
                <div style={{textAlign: "left"}} class="panel-group category-products" id="accordian">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to="/account/Add_product">ACCOUNT</Link></h4>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to="/account/My_Product">MY PRODUCT</Link></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Test;